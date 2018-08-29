/**
 * @module entries
 */

import * as async from 'async';

import * as _ from 'lodash';
import * as dataService from '../../data/data.service';
import {
  Chip,
  Gameweek,
  GameweekPick,
  Manager,
  SeasonHistory,
  SeasonPick,
  SeasonPickStats,
  TransferHistory,
} from './entries.interfaces';

export {
  Chip,
  Gameweek,
  GameweekPick,
  Manager,
  SeasonPick,
  SeasonPickStats,
  TransferHistory,
};

/**
 * Returns entry summary / details.
 * @param entryId The id of entry
 */
export async function getManager(entryId: number): Promise<Manager> {
  console.log(entryId);
  const data = await dataService.fetchEntryRoot(entryId);
  return data.entry;
}

/**
 * Returns chip details of a specified entry.
 * @param entryId The id of entry
 */
export async function getUsedChips(entryId: number): Promise<Chip[]> {
  const data = await dataService.fetchEntryRoot(entryId);
  return data.chips;
}

/**
 * Returns gameweek history of a specified entry.
 * @param entryId The id of entry
 */
export function getGameweekHistory(entryId: number): Promise<Gameweek[]> {

  return new Promise((resolve, reject) => {

    Promise.all([dataService.fetchEntryRoot(entryId)]).then((result) => {

      const gameweeks = result[0].history;

      const gameweekPicks: Gameweek[] = [];

      async.each(gameweeks, (gameweek, nextGameweek) => {

        getPicks(entryId, gameweek.event).then((pickDataArray) => {
          gameweekPicks.push({ ...gameweek, picks: pickDataArray });
          nextGameweek();
        });

      }, () => {
        resolve(gameweekPicks);
      });

    });
  });
}

/**
 * Returns stats and details of entry picks over the season up to the current gameweek.
 * @param entryId The id of entry
 */
export function getSeasonHistory(entryId: number): Promise<SeasonHistory> {

  return new Promise((resolve, reject) => {

    Promise.all([dataService.fetchEntryRoot(entryId), dataService.fetchElements()]).then((result) => {

      const entry = result[0].entry;
      const gameweeks = result[0].history;
      const elements = result[1];

      const elementsMap = _.keyBy(elements, 'id');

      const averageScore = entry.summary_overall_points / entry.current_event;
      const picks: GameweekPick[][] = [];
      let highestGameweekRank = 10000000;
      let lowestGameweekRank = 0;
      let highestOverallRank = 10000000;
      let lowestOverallRank = 0;
      let highestGameweekScore = 0;
      let lowestGameweekScore = 500;
      let totalTransferCost = 0;

      async.each(gameweeks, (gameweek, nextGameweek) => {

        // gw ranks
        const gwRank = gameweek.rank;
        if (gwRank && gwRank > lowestGameweekRank) {
          lowestGameweekRank = gwRank;
        }
        if (gwRank && gwRank < highestGameweekRank) {
          highestGameweekRank = gwRank;
        }

        // overall ranks
        const overallRank = gameweek.overall_rank;
        if (overallRank && overallRank > lowestOverallRank) {
          lowestOverallRank = overallRank;
        }
        if (overallRank && overallRank < highestOverallRank) {
          highestOverallRank = overallRank;
        }

        // gw scores
        const score = gameweek.points - gameweek.event_transfers_cost;
        if (score < lowestGameweekScore) {
          lowestGameweekScore = score;
        }
        if (score > highestGameweekScore) {
          highestGameweekScore = score;
        }

        // transfers
        totalTransferCost = totalTransferCost + gameweek.event_transfers_cost;

        getPicks(entryId, gameweek.event).then((pickDataArray) => {
          picks.push(pickDataArray);
          nextGameweek();
        });

      }, () => {

        const groupedPlayers = _.groupBy(_.flatten(picks), 'element');

        const players = _.toArray(_.mapValues(groupedPlayers, (value, playerKey) => {

          let pickRoot: GameweekPick;

          const playerStats: SeasonPickStats = _.reduce(value, (playerStatsResult, pick): SeasonPickStats => {

            if (!pickRoot) {
              pickRoot = pick;
            }

            function setProp(prop: string, increment = false, propOveride?: string) {
              return playerStatsResult[prop] =
                increment ? playerStatsResult[prop] + 1 :
                  playerStatsResult[prop] + pick.stats[propOveride ? propOveride : prop];
            }

            if (pick.is_captain) {
              setProp('times_captained', true);
              setProp('total_captain_points', false, 'total_points');
            }

            if (pick.position <= 11 && pick.stats.minutes > 0) {
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

          const averages = {
            average_played: playerStats.total_points / playerStats.times_played || 0,
            average_benched: playerStats.total_bench_points / playerStats.times_benched || 0,
            average_captained: playerStats.total_captain_points / playerStats.times_captained || 0,
          };
          const stats = { ...playerStats, ...averages };
          const element = elementsMap[pickRoot.element];

          return {
            element: pickRoot.element,
            element_type: element.element_type,
            web_name: element.web_name,
            stats,
          };

        }));

        // picks
        let goals = 0;
        let assists = 0;
        let bonus = 0;
        let yellowCards = 0;
        let redCards = 0;
        let cleanSheets = 0;
        let ownGoals = 0;
        let pensMissed = 0;
        let saves = 0;
        let pensSaved = 0;
        let dreamteam = 0;

        players.forEach((player) => {

          goals = goals + (player.stats.goals_scored > 0 ? player.stats.goals_scored : 0);
          ownGoals = ownGoals + (player.stats.own_goals > 0 ? player.stats.own_goals : 0);
          assists = assists + (player.stats.assists > 0 ? player.stats.assists : 0);
          bonus = bonus + (player.stats.bonus > 0 ? player.stats.bonus : 0);
          yellowCards = yellowCards + (player.stats.yellow_cards > 0 ? player.stats.yellow_cards : 0);
          pensMissed = pensMissed + (player.stats.penalties_missed > 0 ? player.stats.penalties_missed : 0);
          redCards = redCards + (player.stats.red_cards > 0 ? player.stats.red_cards : 0);
          pensSaved = pensSaved + (player.stats.penalties_saved > 0 ? player.stats.penalties_saved : 0);
          saves = saves + (player.stats.saves > 0 ? player.stats.saves : 0);
          dreamteam = dreamteam + (player.stats.times_in_dreamteam > 0 ? player.stats.times_in_dreamteam : 0);
          if (player.element_type === 1 || player.element_type === 2) {
            cleanSheets = cleanSheets + (player.stats.clean_sheets > 0 ? player.stats.clean_sheets : 0);
          }
        });

        resolve({
          highest_gameweek_rank: highestGameweekRank,
          lowest_gameweek_rank: lowestGameweekRank,
          highest_overall_rank: highestOverallRank,
          lowest_overall_rank: lowestOverallRank,
          highest_gameweek_score: highestGameweekScore,
          average_score: averageScore,
          lowest_gameweek_score: lowestGameweekScore,
          total_transfer_cost: totalTransferCost,
          goals_scored: goals,
          yellow_cards: yellowCards,
          own_goals: ownGoals,
          bonus,
          red_cards: redCards,
          saves,
          clean_sheets: cleanSheets,
          assists,
          penalties_missed: pensMissed,
          penalties_saved: pensSaved,
          times_in_dreamteam: dreamteam,
          picks: players,
        });

      });
    });
  });
}

/**
 * Returns transfer history of an entry
 * @param entryId The id of entry
 */
export async function getTransferHistory(entryId: number): Promise<TransferHistory[]> {
  const data = await dataService.fetchEntryTransfers(entryId);
  return data.history;
}

/**
 * @private
 */
export function getPicks(entryId: number, event: number): Promise<GameweekPick[]> {

  return new Promise((resolve, reject) => {

    Promise.all([
      dataService.fetchEventByNumber(event),
      dataService.fetchEntryPicksByGameweek(entryId, event),
    ]).then((result) => {

      const eventElements = result[0].elements;

      const picksRoot = result[1];

      const picks = picksRoot.picks;

      const pickDataArray: GameweekPick[] = [];

      async.each(picks, (pick, nextPicks) => {

        const stats = eventElements[pick.element].stats;
        const item: GameweekPick = {
          ...pick,
          stats,
        };

        pickDataArray.push(item);

        nextPicks();

      }, () => {
        resolve(pickDataArray);
      });

    });

  });

}
