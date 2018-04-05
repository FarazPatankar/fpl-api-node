import * as async from 'async';
import * as _ from 'lodash';
import * as NodeCache from 'node-cache';

import * as dataService from '../data/data.service';

import {
  ElementsMap,
  EntryStats,
  EntryTransferHistory,

} from '../data/data.interfaces';

import {
  EntryChip,
  EntryDetails,
  EntryGameweek,

  GameweekPick,
  SeasonPick,
  SeasonPickStats,

} from './entry.interfaces';

export class Entry {

  /**
   * Returns entry summary / details.
   * @param entryId The id of entry
   */
  public static async getDetails(entryId: number): Promise<EntryDetails> {
    const data = await dataService.fetchEntryRoot(entryId);
    return data.entry;
  }

  /**
   * Returns a collection of completed or ongoing events
   * @param entryId The id of entry
   */
  public static async getGameweekHistory(entryId: number): Promise<EntryGameweek[]> {
    const data = await dataService.fetchEntryRoot(entryId);
    return data.history;
  }

  /**
   * Returns chip details of a specified entry
   * @param entryId The id of entry
   * @param eventNumber The event number
   */
  public static async getUsedChips(entryId: number): Promise<EntryChip[]> {
    const data = await dataService.fetchEntryRoot(entryId);
    return data.chips;
  }

  /**
   * Returns a collection of picks for a specified event
   * @param entryId The id of entry
   * @param event The event number
   */

  public static getSeasonPicks(entryId: number): Promise<GameweekPick[]> {
    return new Promise((resolve, reject) => {
      Promise.all([dataService.fetchElements(), dataService.fetchEntryRoot(entryId)]).then((result) => {

        const elements = result[0];
        const gameweeks = result[1].history;

        const picks: GameweekPick[][] = [];

        async.each(gameweeks, (gameweek, nextGameweek) => {
          nextGameweek();
        });

      });

    });
  })

  public static getSeasonPicks2(entryId: number): Promise<SeasonPick[]> {

    return new Promise((resolve, reject) => {

      Promise.all([dataService.fetchElements(), dataService.fetchEntryRoot(entryId)]).then((result) => {

        const elements = result[0];
        const gameweeks = result[1].history;

        const picks: GameweekPick[][] = [];

        async.each(gameweeks, (gameweek, nextGameweek) => {

          const event = gameweek.event;

          Entry.getPicks(entryId, event, elements).then((pickDataArray) => {
            picks.push(pickDataArray);
            nextGameweek();
          });

        }, (err) => {

          if (err) {
            reject(err);
          } else {

            const groupedPlayers = _.groupBy(_.flatten(picks), 'element');

            const players = _.toArray(_.mapValues(groupedPlayers, (value, playerKey) => {

              let playerRoot;

              const playerStats: SeasonPickStats = _.reduce(value, (playerStatsResult, pick): SeasonPickStats => {

                if (!playerRoot) {
                  playerRoot = {
                    element: pick.element,
                    web_name: pick.web_name,
                    element_type: pick.element_type,
                  };
                }

                function setProp(prop: string, increment = false, propOveride?: string) {
                  playerStatsResult[prop] =
                    increment ? playerStatsResult[prop] + 1 :
                      playerStatsResult[prop] + pick.stats[propOveride ? propOveride : prop];
                }

                if (pick.is_captain) {
                  setProp('times_captained', true);
                  setProp('total_captain_points', false, 'total_points');
                }

                if (pick.position > 11 && pick.stats.minutes > 0) {
                  setProp('times_played', true);
                  Object.keys(pick.stats).forEach((key) => {
                    setProp(key);
                  });

                } else if (pick.stats.minutes > 0) {
                  setProp('times_benched', true);
                  setProp('total_bench_points', false, 'total_points');
                } else {
                  setProp('times_absent', true);
                }

                return playerStatsResult;
              }, {
                  yellow_cards: 0,
                  own_goals: 0,
                  creativity: 0,
                  goals_conceded: 0,
                  bonus: 0,
                  red_cards: 0,
                  saves: 0,
                  influence: 0,
                  bps: 0,
                  clean_sheets: 0,
                  assists: 0,
                  ict_index: 0,
                  goals_scored: 0,
                  threat: 0,
                  penalties_missed: 0,
                  total_points: 0,
                  penalties_saved: 0,
                  in_dreamteam: false,
                  minutes: 0,
                  average_played: 0,
                  average_benched: 0,
                  average_captained: 0,
                  times_played: 0,
                  times_captained: 0,
                  times_benched: 0,
                  times_absent: 0,
                  times_in_dreamteam: 0,
                  total_captain_points: 0,
                  total_bench_points: 0,
                });

              // const element = _.find(elements, { id: parseInt(playerKey, 10) } || elements[0]);

              const averages = {
                average_played: playerStats.total_points / playerStats.times_played || 0,
                average_benched: playerStats.total_bench_points / playerStats.times_benched || 0,
                average_captained: playerStats.total_captain_points / playerStats.times_captained || 0,
              };
              const stats = { ...playerStats, ...averages };

              return {
                ...playerRoot,
                stats,
              };
              // }

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
  public static getOverallStats(entryId: number): Promise<EntryStats> {

    return new Promise((resolve, reject) => {

      Promise.all([
        Entry.getDetails(entryId),
        Entry.getGameweekHistory(entryId)]).then((result) => {

          const entryData = result[0];
          const gameweeksData = result[1];

          const gameweeks = _.remove(gameweeksData, (gameweek: EntryGameweek) => {
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
   * Returns transfer history of an entry
   * @param entryId The id of entry
   */
  public static async getTransferHistory(entryId: number): Promise<EntryTransferHistory[]> {
    const data = await dataService.fetchEntryTransfers(entryId);
    return data.history;
  }

  /**
   * Returns a collection of picks for a specified event
   * @param entryId The id of entry
   * @param gameweek The event number
   */
  public static async getPicksByGameweek(entryId: number, gameweek: number): Promise<GameweekPick[]> {
    const elements = await dataService.fetchElements();
    const elementsMap = _.keyBy(elements, 'id');
    const data = Entry.getPicks(entryId, gameweek, elementsMap);
    return data;
  }

  /**
   * @param entryId
   * @param event
   * @private
   */
  private static getPicks(entryId: number, event: number, elementsMap: ElementsMap): Promise<GameweekPick[]> {

    return new Promise((resolve, reject) => {

      Promise.all([
        dataService.fetchEventByNumber(event),
        dataService.fetchEntryPicksByGameweek(entryId, event),
      ]).then((result) => {

        const eventElements = result[0].elements;
        const picks = result[1].picks;

        const pickDataArray: GameweekPick[] = [];

        async.each(picks, (pick, nextPicks) => {

          // const element =
          const stats = eventElements[pick.element].stats;
          const element = elementsMap[pick.element];

          const item: GameweekPick = {
            ...pick,
            web_name: element.web_name,
            element_type: element.element_type,
            stats,
          };

          pickDataArray.push(item);

          nextPicks();

        }, (err) => {

          if (err) {
            reject(err);
          } else {
            resolve(pickDataArray);
          }

        });

      });

    });

  }
}
