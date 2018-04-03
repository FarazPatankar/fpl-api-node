import * as async from 'async';
import * as _ from 'lodash';

import * as dataService from '../data/data.service';

import {
  EntryStats,
  EntryTransferHistory,
  Pick,
  PickStatsHolder,
} from '../data/data.interfaces';

import {
  EntryChip,
  EntryDetails,
  EntryGameweek,
  EntryPick,
  PlayerStats,
} from './entry.interfaces';

import { Utils } from '../utils/utils.class';

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
  public static getAllPicks(entryId: number): Promise<EntryPick[]> {

    return new Promise((resolve, reject) => {

      Promise.all([Utils.getAllPlayers(), Entry.getGameweekHistory(entryId)]).then((result) => {

        const elements = result[0];
        const gameweeks = result[1];

        const picks: PickStatsHolder[][] = [];

        async.each(gameweeks, (gameweek, nextGameweek) => {

          const event = gameweek.event;

          Promise.all([
            Utils.getPlayersByGameweek(event),
            Entry.getPicksByGameweek(entryId, event),
          ]).then((result1) => {

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

              const player: PlayerStats
                = _.reduce(value, (playerResult, pick): PlayerStats => {

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
   * Returns a collection of picks for a specified event
   * @param entryId The id of entry
   * @param gameweek The event number
   */
  public static async getPicksByGameweek(entryId: number, gameweek: number): Promise<Pick[]> {
    const data = await dataService.fetchEntryPicksByGameweek(entryId, gameweek);
    return data.picks;
  }

  /**
   * Returns transfer history of an entry
   * @param entryId The id of entry
   */
  public static async getTransferHistory(entryId: number): Promise<EntryTransferHistory[]> {
    const data = await dataService.fetchEntryTransfers(entryId);
    return data.history;
  }

}
