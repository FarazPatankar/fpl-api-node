import * as async from 'async';
import * as _ from 'lodash';
import * as dataService from '../data-service';
import * as dataTypes from '../data-service/types';
import * as apiTypes from './entries.types';

import { fromCache } from '../utils/cache-manager';

export function getSummary(entryId): Promise<apiTypes.EntrySummary> {
  return fromCache(`entry-summary-${entryId}`, () => {
    return new Promise((resolve: any, reject: any) => {
      dataService.getEntry(entryId).then((data) => {
        resolve(toSummary(data));
      });
    });
  });
}

export function getStats(entryId): Promise<apiTypes.EntryStats> {
  return fromCache(`entry-stats-${entryId}`, () => {
    return new Promise((resolve: any, reject: any) => {
      Promise.all([dataService.getEntry(entryId), getPicks(entryId)]).then((data) => {
        resolve(toStats(data[0], data[1]));
      });
    });
  });
}

export function getPicks(entryId): Promise<apiTypes.EntryPick[]> {
  return fromCache(`entry-picks-${entryId}`, () => {
    return new Promise((resolve: any, reject: any) => {
      dataService.getEntry(entryId).then((data) => {
        toPicks(data).then((picks) => {
          resolve(picks);
        });
      });
    });
  });
}

export function getPick(entryId, pickId): Promise<apiTypes.EntryPick> {
  return new Promise((resolve: any, reject: any) => {
    getPicks(entryId).then((picks) => {
      resolve(_.find(picks, { id: parseInt(pickId, 10) }));
    });
  });
}

function toSummary(data: dataTypes.Entry): apiTypes.EntrySummary {
  const entry = data.entry;
  return {
    id: entry.id,
    gameweekPoints: entry.summary_event_points,
    gameweekRank: entry.summary_event_rank,
    gameweekTransfers: entry.event_transfers,
    gameweekTransfersCost: entry.event_transfers_cost,
    managerFirstName: entry.player_first_name,
    managerLastName: entry.player_last_name,
    moneyInBank: entry.bank,
    name: entry.name,
    overallPoints: entry.summary_overall_points,
    overallRank: entry.summary_overall_rank,
    regionIso: entry.player_region_short_iso,
    regionName: entry.player_region_name,
    teamValue: entry.value,
    totalTransfers: entry.total_transfers,
  };
}

function toStats(teamData: dataTypes.Entry, picks): Promise<apiTypes.EntryStats> {

  return new Promise((resolve, reject) => {

    dataService.getTotalPlayers().then((totalPlayers) => {

      // ranks
      const overallRank = teamData.entry.summary_overall_rank;
      let highestGameweekRank = totalPlayers;
      let lowestGameweekRank = 0;
      const rankPercentile = (100 - (((overallRank - 1) / totalPlayers) * 100)).toFixed(2);

      // scores
      const overallPoints = teamData.entry.summary_overall_points;
      let highestGameweekScore = 0;
      let lowestGameweekScore = 200;
      let averageScore = 0;

      teamData.history.forEach((event) => {

        // ranks
        const rank = event.rank;
        if (rank && rank > lowestGameweekRank) {
          lowestGameweekRank = rank;
        }
        if (rank && rank < highestGameweekRank) {
          highestGameweekRank = rank;
        }

        // scores
        const score = event.points - event.event_transfers_cost;

        if (score < lowestGameweekScore) {
          lowestGameweekScore = score;
        }

        if (score > highestGameweekScore) {
          highestGameweekScore = score;
        }

      });

      averageScore = overallPoints / teamData.entry.current_event;

      // picks
      let totalGoals = 0;
      let totalAssists = 0;
      let totalBonus = 0;
      let totalYellowCards = 0;
      let totalRedCards = 0;
      let totalCleanSheets = 0;
      picks.forEach((player: apiTypes.EntryPick) => {
        totalGoals = totalGoals + (player.totalGoalsScored > 0 ? player.totalGoalsScored : 0);
        totalAssists = totalAssists + (player.totalAssists > 0 ? player.totalAssists : 0);
        totalBonus = totalBonus + (player.totalBonus > 0 ? player.totalBonus : 0);
        totalYellowCards = totalYellowCards + (player.totalYellowCards > 0 ? player.totalYellowCards : 0);
        totalRedCards = totalRedCards + (player.totalRedCards > 0 ? player.totalRedCards : 0);
        if (player.type === 1 || player.type === 2) {
          totalCleanSheets = totalCleanSheets + (player.totalCleanSheets > 0 ? player.totalCleanSheets : 0);
        }
      });

      const stats = {
        averageScore,
        highestGameweekRank,
        highestGameweekScore,
        lowestGameweekRank,
        lowestGameweekScore,
        overallPoints,
        overallRank,
        rankPercentile,
        totalAssists,
        totalBonus,
        totalCleanSheets,
        totalGoals,
        totalRedCards,
        totalYellowCards,
      };
      resolve(stats);
    });
  });
}

function toPicks(entry: dataTypes.Entry): Promise<apiTypes.EntryPick[]> {

  return new Promise((resolve, reject) => {

    dataService.getElements().then((elements) => {

      const picks = [] as any;

      if (entry.history.length === 0) {
        resolve([]);
      } else {

        async.each(entry.history, (event: dataTypes.EntryHistory, callback) => {

          dataService.getEntryEvent(entry.entry.id, event.event).then((result) => {
            picks.push(result.picks);
            callback();
          });

        }, (err) => {

          if (err) {
            reject(err);
          } else {

            const groupedPlayers = _.groupBy(_.flatten(picks), 'element');

            const players = _.toArray(_.mapValues(groupedPlayers, (value, playerKey) => {

              const player = _.reduce(value, (result, pick: dataTypes.EntryPick) => {

                if (pick.is_captain) {
                  result.timesCaptained = result.timesCaptained + 1;
                  result.totalCaptainPoints = result.totalCaptainPoints + pick.points;
                }

                if (!pick.is_sub && pick.stats.minutes > 0) {
                  if (pick.stats.in_dreamteam) {
                    result.timesInDreamteam = result.timesInDreamteam + 1;
                  }
                  result.timesPlayed = result.timesPlayed + 1;
                  result.totalPoints = result.totalPoints + pick.points;
                  result.totalMinutes = result.totalMinutes + pick.stats.minutes;
                  result.totalAssists = result.totalAssists + pick.stats.assists;
                  result.totalBonus = result.totalBonus + pick.stats.bonus;
                  result.totalCleanSheets = result.totalCleanSheets + pick.stats.clean_sheets;
                  result.totalGoalsConceded = result.totalGoalsConceded + pick.stats.goals_conceded;
                  result.totalGoalsScored = result.totalGoalsScored + pick.stats.goals_scored;
                  result.totalOwnGoals = result.totalOwnGoals + pick.stats.own_goals;
                  result.totalPenaltiesMissed = result.totalPenaltiesMissed + pick.stats.penalties_missed;
                  result.totalPenaltiesSaved = result.totalPenaltiesSaved + pick.stats.penalties_saved;
                  result.totalYellowCards = result.totalYellowCards + pick.stats.yellow_cards;
                  result.totalRedCards = result.totalRedCards + pick.stats.red_cards;
                  result.totalSaves = result.totalSaves + pick.stats.saves;

                } else {
                  result.timesBenched = result.timesBenched + 1;
                }
                return result;
              }, {
                  totalCaptainPoints: 0,
                  totalPoints: 0,
                  totalMinutes: 0,
                  timesBenched: 0,
                  timesCaptained: 0,
                  timesPlayed: 0,
                  timesInDreamteam: 0,
                  totalAssists: 0,
                  totalBonus: 0,
                  totalCleanSheets: 0,
                  totalGoalsConceded: 0,
                  totalGoalsScored: 0,
                  totalOwnGoals: 0,
                  totalPenaltiesMissed: 0,
                  totalPenaltiesSaved: 0,
                  totalYellowCards: 0,
                  totalRedCards: 0,
                  totalSaves: 0,
                });

              const element = _.find(elements, { id: parseInt(playerKey, 10) });

              let elementDetails = {};

              if (element) {
                elementDetails = {
                  id: element.id,
                  name: element.web_name,
                  type: element.element_type,
                };
              }

              return { ...player, ...elementDetails };

            }));
            resolve(players as apiTypes.EntryPick[]);
          }
        });
      }
    });

  });

}
