/**
 * @module entries
 */
import * as async from 'async';

import * as _ from 'lodash';
import * as dataService from '../data/data.service';
import {
  EntryChip,
  EntryClub,
  EntryGameweek,
  EntryOverview,
  EntryPick,
  EntryPickStats,
  EntrySeasonStats,
  EntryTransferHistory,
} from '../interfaces';

import { getStatsHeadings } from './api.game';
import { getEventPicks } from './api.helpers';

/**
 * Returns entry summary / details.
 * @param entryId The id of entry
 */
export async function getOverview(entryId: number): Promise<EntryOverview> {
  const data = await dataService.fetchEntryRoot(entryId);
  return data.entry;
}

/**
 * Returns chip details of a specified entry.
 * @param entryId The id of entry
 */
export async function getUsedChips(entryId: number): Promise<EntryChip[]> {
  const data = await dataService.fetchEntryRoot(entryId);
  return data.chips;
}

/**
 * Returns gameweek history of a specified entry.
 * @param entryId The id of entry
 */

export async function getGameweekHistory(entryId: number): Promise<EntryGameweek[]> {
  const entry = await dataService.fetchEntryRoot(entryId);
  return entry.history;
}

/**
 * Returns stats and details of entry picks over the season up to the current gameweek.
 * @param entryId The id of entry
 */

export function getSeasonStats(entryId: number): Promise<EntrySeasonStats> {

  return new Promise((resolve, reject) => {

    Promise.all([dataService.fetchEntryRoot(entryId), getSeasonPicks(entryId)]).then((result) => {

      const entry = result[0].entry;
      const gameweeks = result[0].history;

      const averageScore = entry.summary_overall_points / entry.current_event;
      const picks = result[1];

      let highestGameweekRank = 10000000;
      let lowestGameweekRank = 0;
      let highestOverallRank = 10000000;
      let lowestOverallRank = 0;
      let highestGameweekScore = 0;
      let lowestGameweekScore = 500;
      let totalTransferCost = 0;
      let transferHits = 0;

      gameweeks.forEach((gameweek) => {

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
        if (gameweek.event_transfers_cost > 0) {
          totalTransferCost = totalTransferCost + gameweek.event_transfers_cost;
          transferHits = transferHits + gameweek.event_transfers_cost / 4;

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
        total_transfer_cost: totalTransferCost * -1,
        transfer_hits: transferHits,
      });

    });

  });
}

/**
 * Returns stats and details of entry picks over the season up to the current gameweek.
 * @param entryId The id of entry
 */
export function getSeasonPicks(entryId: number): Promise<any[]> {

  return new Promise((resolve, reject) => {

    Promise.all([dataService.fetchEntryRoot(entryId), getStatsHeadings()]).then((result) => {

      const entry = result[0].entry;
      const gameweeks = result[0].history;
      const statHeadings = [
        { field: 'minutes', label: 'Minutes played' },
        { field: 'goals_scored', label: 'Goals scored' },
        { field: 'assists', label: 'Assists' },
        { field: 'clean_sheets', label: 'Clean sheets' },
        { field: 'goals_conceded', label: 'Goals conceded' },
        { field: 'own_goals', label: 'Own goals' },
        { field: 'penalties_saved', label: 'Penalties saved' },
        { field: 'penalties_missed', label: 'Penalties missed' },
        { field: 'yellow_cards', label: 'Yellow cards' },
        { field: 'red_cards', label: 'Red cards' },
        { field: 'saves', label: 'Saves' },
        { field: 'bonus', label: 'Bonus' },
      ];
      const capMins = 0;

      const picks: EntryPick[][] = [];

      async.each(gameweeks, (gameweek, nextGameweek) => {

        getEventPicks(entryId, gameweek.event).then((pickDataArray) => {
          picks.push(pickDataArray);
          nextGameweek();
        });

      }, () => {

        const groupedPlayers = _.groupBy(_.flatten(picks), 'element');

        const players = _.mapValues(groupedPlayers, (value, playerKey) => {

          let pickRoot: EntryPick;
          const explain = {};
          const captain = {};

          const playerStats: any = {};

          statHeadings.forEach((heading) => {
            explain[heading.field] = {
              points: 0,
              value: 0,
            };
          });

          statHeadings.forEach((heading) => {
            captain[heading.field] = {
              points: 0,
              value: 0,
            };
          });

          value.forEach((pick) => {

            if (!pickRoot) {
              pickRoot = pick;
            }

            function setProp(prop: string, increment = false, propOveride?: string) {
              if (playerStats[prop] === undefined) {
                playerStats[prop] = 0;
              }
              playerStats[prop] =
                increment ? playerStats[prop] + 1 :
                  playerStats[prop] + pick.stats[propOveride ? propOveride : prop];
            }

            if (pick.multiplier > 1) {

              setProp('times_captained', true);
              setProp('total_captain_points', false, 'total_points');

              if (pick.explain.length > 0) {
                pick.explain.forEach((pickExplain) => {
                  pickExplain.forEach((innerExplain) => {
                    Object.keys(innerExplain).forEach((key) => {
                      captain[key].points = captain[key].points + innerExplain[key].points;
                      captain[key].value = captain[key].value + innerExplain[key].value;
                      if (pick.multiplier === 3) {
                        captain[key].points = captain[key].points + innerExplain[key].points;
                        captain[key].value = captain[key].value + innerExplain[key].value;
                      }
                    });
                  });
                });
              }

            }

            if (pick.position <= 11 && pick.stats.minutes > 0) {
              setProp('times_played', true);
              Object.keys(pick.stats).forEach((key) => {
                setProp(key);
              });

              if (pick.explain.length > 0) {
                pick.explain.forEach((pickExplain) => {
                  pickExplain.forEach((innerExplain) => {
                    Object.keys(innerExplain).forEach((key) => {
                      explain[key].points = explain[key].points + innerExplain[key].points;
                      explain[key].value = explain[key].value + innerExplain[key].value;
                    });
                  });
                });
              }

            } else if (pick.stats.minutes > 0) {
              setProp('times_benched', true);
              setProp('total_bench_points', false, 'total_points');
            } else {
              setProp('times_absent', true);
            }
          });

          const averages = {
            average_played: playerStats.total_points / playerStats.times_played || 0,
            average_benched: playerStats.total_bench_points / playerStats.times_benched || 0,
            average_captained: playerStats.total_captain_points / playerStats.times_captained || 0,
          };
          const stats = { ...playerStats, ...averages };
          return {
            element: pickRoot.element,
            element_type: pickRoot.element_type,
            team_code: pickRoot.team_code,
            stats,
            explain,
            captain: playerStats.times_captained > 0 ? captain : {},
          };

        });

        resolve(_.toArray(players));

      });
    });
  });
}

/**
 * Returns transfer history of an entry
 * @param entryId The id of entry
 */
export async function getTransferHistory(entryId: number): Promise<EntryTransferHistory[]> {
  const data = await dataService.fetchEntryTransfers(entryId);
  return data.history;
}

/**
 * Get stats for teams, including overall and player contributions.
 * @param entryId The id of entry
 */
/*
export async function getTeamStats(entryId: number): Promise<EntryClub[]> {

  const seasonPicks = await getSeasonPicks(entryId);

  const teams = _.toArray(_.groupBy(seasonPicks, (player) => {
    return player.team_code;
  })).map((picks) => {

    const totalPoints = _.reduce(picks, (sum, n) => {

      return sum + n.stats.total_points;
    }, 0);

    return {
      team_code: picks[0].team_code,
      total_points: totalPoints,
      players_selected: picks.length,
      picks,
    };
  });

  return teams;

}
*/
