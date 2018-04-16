/**
 * Methods relating to FPL managers and their team entries.
 *
 * __Usage:__
 *
 * ```js
 * fplapi.entries.getManagerDetails(123).then((data) => console.log(data));
 * ```
 *
 * @module entries
 * @preferred
 */
/**
 */

import * as async from 'async';
import * as _ from 'lodash';
import * as dataService from '../data/data.service';

import {
  Chip,
  Gameweek,
  GameweekPick,
  GameweekPicks,
  ManagerDetails,
  ManagerStats,
  SeasonPick,
  SeasonPickStats,
  TransferHistory,
} from './entries.interfaces';

export {
  Chip,
  Gameweek,
  GameweekPick,
  ManagerDetails,
  ManagerStats,
  SeasonPick,
  SeasonPickStats,
  TransferHistory,
};

/**
 * Returns entry summary / details.
 * @param entryId The id of entry
 */
export async function getManagerDetails(entryId: number): Promise<ManagerDetails> {
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
export async function getGameweekHistory(entryId: number): Promise<Gameweek[]> {
  const data = await dataService.fetchEntryRoot(entryId);
  return data.history;
}

/**
 * Returns picks for each gameweek
 * @param entryId The id of entry
 */
export function getGameweekPicks(entryId: number): Promise<GameweekPicks[]> {

  return new Promise((resolve, reject) => {

    Promise.all([dataService.fetchEntryRoot(entryId)]).then((result) => {

      const gameweeks = result[0].history;

      const gameweekPicks: GameweekPicks[] = [];

      async.each(gameweeks, (gameweek, nextGameweek) => {

        getPicks(entryId, gameweek.event).then((pickDataArray) => {
          gameweekPicks.push({ event: gameweek.event, picks: pickDataArray });
          nextGameweek();
        });

      }, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(gameweekPicks);
        }
      });

    });
  });
}

/**
 * Returns stats and details of entry picks over the season up to the current gameweek.
 * @param entryId The id of entry
 */
export function getSeasonPicks(entryId: number): Promise<SeasonPick[]> {

  return new Promise((resolve, reject) => {

    Promise.all([dataService.fetchEntryRoot(entryId)]).then((result) => {

      const gameweeks = result[0].history;

      const picks: GameweekPick[][] = [];

      async.each(gameweeks, (gameweek, nextGameweek) => {

        const event = gameweek.event;

        getPicks(entryId, event).then((pickDataArray) => {
          picks.push(pickDataArray);
          nextGameweek();
        });

      }, (err) => {

        if (err) {
          reject(err);
        } else {

          const groupedPlayers = _.groupBy(_.flatten(picks), 'element');

          const players = _.toArray(_.mapValues(groupedPlayers, (value, playerKey) => {

            let pickRoot;

            const playerStats: SeasonPickStats = _.reduce(value, (playerStatsResult, pick): SeasonPickStats => {

              if (!pickRoot) {
                pickRoot = pick;
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

            const averages = {
              average_played: playerStats.total_points / playerStats.times_played || 0,
              average_benched: playerStats.total_bench_points / playerStats.times_benched || 0,
              average_captained: playerStats.total_captain_points / playerStats.times_captained || 0,
            };
            const stats = { ...playerStats, ...averages };

            return {
              element: pickRoot.element,
              stats,
            };

          }));
          resolve(players);
        }
      });
    });

  });
}

/**
 * Returns some general stats for a specified entry.
 * @param entryId
 */
export function getManagerStats(entryId: number): Promise<ManagerStats> {

  return new Promise((resolve, reject) => {

    Promise.all([

      dataService.fetchEntryRoot(entryId),
      dataService.fetchEntryRoot(entryId)]).then((result) => {

        const entryData = result[0].entry;
        const gameweeksData = result[1].history;

        const gameweeks = _.remove(gameweeksData, (gameweek: Gameweek) => {
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
        let lowestScore = 500;

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

        const stats: ManagerStats = {
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
