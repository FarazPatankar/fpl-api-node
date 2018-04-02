import * as async from 'async';
import * as _ from 'lodash';

import * as dataService from './data.service';

import {
  Element,
  ElementType,
  Entry,
  EntryChip,
  EntryEvent,
  EntryPick,
  EntryPickStats,
  EntryStats,
  EntryTransferHistory,
  Event,
  EventElements,
  League,
  LeagueStandings,
  Pick,
  PickStatsHolder,
  PlayerResult,
  Team,
} from './interfaces';

// *************
// Entry methods
// *************

/**
 * Returns entry summary / details.
 * @param entryId The id of entry
 */
export async function findEntry(entryId: number): Promise<Entry> {
  const data = await dataService.findEntryRoot(entryId);
  return data.entry;
}

/**
 * Returns a collection of completed or ongoing events
 * @param entryId The id of entry
 */
export async function findEntryEvents(entryId: number): Promise<EntryEvent[]> {
  const data = await dataService.findEntryRoot(entryId);
  return data.history;
}

/**
 * Returns chip details of a specified entry
 * @param entryId The id of entry
 * @param eventNumber The event number
 */
export async function findEntryChips(entryId: number): Promise<EntryChip[]> {
  const data = await dataService.findEntryRoot(entryId);
  return data.chips;
}

/**
 * Returns a details of a specified event
 * @param entryId The id of entry
 * @param eventNumber The event number
 */
export async function findEntryEvent(entryId: number, eventNumber: number): Promise<EntryEvent> {
  const data = await dataService.findEntryEventPicksRoot(entryId, eventNumber);
  return data.entry_history;
}

/**
 * Returns a collection of picks for a specified event
 * @param entryId The id of entry
 * @param event The event number
 */
export function findEntryPicks(entryId: number): Promise<EntryPick[]> {

  return new Promise((resolve, reject) => {

    Promise.all([getElements(), findEntryEvents(entryId)]).then((result) => {

      const elements = result[0];
      const gameweeks = result[1];

      const picks: PickStatsHolder[][] = [];

      async.each(gameweeks, (gameweek, nextGameweek) => {

        const event = gameweek.event;

        Promise.all([findElementsByEvent(event), findEntryPicksByEvent(entryId, event)]).then((result1) => {

          const eventElements = result1[0];

          const entryPicks = result1[1].map((entryPick, i) => {
            const isSub = i > 10;
            return { ...entryPick, is_sub: isSub };
          });

          const pickDataArray: PickStatsHolder[] = [];

          async.each(entryPicks, (pick, nextPicks) => {

            const picksData = eventElements[pick.element].stats;

            pickDataArray.push({
              ...picksData,
              element: pick.element,
              is_captain: pick.is_captain,
              is_sub: pick.is_sub,
            });

            nextPicks();

          }, (err) => {

            if (err) {
              reject(err);
            } else {
              picks.push(pickDataArray);
              nextGameweek();
            }

          });

        });

      }, (err) => {

        if (err) {
          reject(err);
        } else {

          const groupedPlayers: {
            [key: number]: PickStatsHolder[];
          } = _.groupBy(_.flatten(picks), 'element');

          const players: EntryPick[] = _.toArray(_.mapValues(groupedPlayers, (value, playerKey) => {

            const player: PlayerResult
              = _.reduce(value, (playerResult, pick): PlayerResult => {

                function setProp(prop: string, increment = false, propOveride?: string) {
                  playerResult[prop] =
                    increment ? playerResult[prop] + 1 :
                      playerResult[prop] + pick[propOveride ? propOveride : prop];
                }

                if (pick.is_captain) {
                  setProp('times_captained', true);
                  setProp('total_captain_points', false, 'total_points');
                }

                if (!pick.is_sub && pick.minutes > 0) {
                  setProp('times_played', true);
                  Object.keys(pick)
                    .filter((key) => {

                      return key !== 'is_sub'
                        && key !== 'is_captain'
                        && key !== 'element'
                        && key !== 'creativity'
                        && key !== 'ict_index'
                        && key !== 'in_dreamteam'
                        && key !== 'threat';
                    })
                    .forEach((key) => {
                      setProp(key);
                    });

                } else if (pick.minutes > 0) {
                  setProp('times_benched', true);
                  setProp('total_bench_points', false, 'total_points');
                } else {
                  setProp('times_absent', true);
                }

                return playerResult;
              }, {
                  yellow_cards: 0,
                  own_goals: 0,
                  goals_conceded: 0,
                  bonus: 0,
                  red_cards: 0,
                  saves: 0,
                  influence: 0,
                  bps: 0,
                  clean_sheets: 0,
                  assists: 0,
                  goals_scored: 0,
                  penalties_missed: 0,
                  total_points: 0,
                  penalties_saved: 0,
                  minutes: 0,
                  times_played: 0,
                  times_benched: 0,
                  times_absent: 0,
                  times_captained: 0,
                  total_captain_points: 0,
                  total_bench_points: 0,
                });

            const element = _.find(elements, { id: parseInt(playerKey, 10) } || elements[0]);

            if (element) {
              const elementDetails = {
                id: element.id,
                name: element.web_name,
                type: element.element_type,
              };

              const averages = {
                average_played: player.total_points / player.times_played || 0,
                average_benched: player.total_bench_points / player.times_benched || 0,
                average_captained: player.total_captain_points / player.times_captained || 0,
              };
              const stats = { ...player, ...averages };
              return {
                ...elementDetails,
                stats,
              };
            }

          }));
          resolve(players);
        }
      });
    });

  });
}

/**
 * Returns some general stats
 * @param entryId
 */
export function findEntryStats(entryId: number): Promise<EntryStats> {

  return new Promise((resolve, reject) => {

    Promise.all([
      findEntry(entryId),
      findEntryEvents(entryId)]).then((result) => {

        const entryData = result[0];
        const gameweeksData = result[1];

        const gameweeks = _.remove(gameweeksData, (gameweek: EntryEvent) => {
          return gameweek;
        });

        const moneyInBank = entryData.bank / 10;
        const totalValue = (entryData.value + entryData.bank) / 10;

        // ranks
        const overallRank = entryData.summary_overall_rank;
        let highestGwRank = 10000000;
        let lowestRank = 0;

        // scores
        const overallPoints = entryData.summary_overall_points;

        let highestScore = 0;
        let lowestScore = 200;

        let totalTransferCost = 0;

        gameweeks.forEach((gameweek) => {

          // ranks
          const rank = gameweek.rank;
          if (rank && rank > lowestRank) {
            lowestRank = rank;
          }
          if (rank && rank < highestGwRank) {
            highestGwRank = rank;
          }

          // scores
          const score = gameweek.points - gameweek.event_transfers_cost;

          if (score < lowestScore) {
            lowestScore = score;
          }

          if (score > highestScore) {
            highestScore = score;
          }

          // transfers
          totalTransferCost = totalTransferCost + gameweek.event_transfers_cost;

        });

        const stats: EntryStats = {
          overall_rank: overallRank,
          highest_gameweek_rank: highestGwRank,
          lowest_gameweek_rank: lowestRank,
          overall_points: overallPoints,
          highest_score: highestScore,
          lowest_score: lowestScore,
          average_score: overallPoints / entryData.current_event,
          total_transfer_cost: totalTransferCost,
          money_in_bank: moneyInBank,
          total_value: totalValue,
        };

        resolve(stats);

      });
  });
}

/**
 * Returns a collection of picks for a specified event
 * @param entryId The id of entry
 * @param event The event number
 */
export async function findEntryPicksByEvent(entryId: number, event: number): Promise<Pick[]> {
  const data = await dataService.findEntryEventPicksRoot(entryId, event);
  return data.picks;
}

/**
 * Returns transfer history of an entry
 * @param entryId The id of entry
 */
export async function findEntryTransferHistory(entryId: number): Promise<EntryTransferHistory[]> {
  const data = await dataService.findEntryTransfers(entryId);
  return data.history;
}

/**
 * Returns all element data for a specified event
 * @param event The event number
 */
export async function findElementsByEvent(event: number): Promise<EventElements> {
  const data = await dataService.findLiveEvent(event);
  return data.elements;
}

// *************
// League methods
// *************

/**
 * Returns specified details of a classic league
 * @param leagueId The id of the league
 */
export async function findLeague(leagueId: number): Promise<League> {
  const data = await dataService.findLeagueRoot(leagueId);
  return data.league;
}

/**
 * Returns specified standings of a classic league
 * @param leagueId The id of the league
 * @param pageNumber The page number of the standings (50 results per page)
 */
export async function findLeagueStandings(leagueId: number, pageNumber = 1): Promise<LeagueStandings> {
  const data = await dataService.findLeagueRoot(leagueId, pageNumber);
  return data.standings;
}

// *************
// Other
// *************

/**
 * Returns a collection of all elements.
 */
export async function getElements(): Promise<Element[]> {
  const data = await dataService.getBootstrapData();
  return data.elements;
}

/**
 * Returns a collection of all element types in the game
 */
export async function getElementTypes(): Promise<ElementType[]> {
  const data = await dataService.getBootstrapData();
  return data.element_types;
}

/**
 * Returns a collection of all events
 */
export async function getEvents(): Promise<Event[]> {
  const data = await dataService.getBootstrapData();
  return data.events;
}

/**
 * Returns a collection of all teams
 */
export async function getTeams(): Promise<Team[]> {
  const data = await dataService.getBootstrapData();
  return data.teams;
}

/**
 * Returns the total number of entries
 */
export async function getTotalNumberOfEntries(): Promise<number> {
  const data = await dataService.getBootstrapData();
  return data['total-players'];
}

/**
 * Returns the current event number
 */
export async function getCurrentEventNumber(): Promise<number> {
  const data = await dataService.getBootstrapData();
  return data['current-event'];
}

// export interfaces
export {
  ElementType,
  Entry,
  EntryChip,
  EntryEvent,
  Pick,
  EntryTransferHistory,
  EventElements,
  EntryPickStats,
  League,
  LeagueStandings,
  Team,
};
