/**
 * @module leagues
 */

import * as dataService from '../data/data.service';
import { League, LeagueStandings } from '../interfaces';

/**
 * Returns specified details of a classic league
 * @param leagueId The id of the league
 */
export async function getLeague(leagueId: number): Promise<League> {
  const data = await dataService.fetchLeagueStandings(leagueId);
  return data;
}

/**
 * Returns specified standings of a classic league
 * @param leagueId The id of the league
 * @param pageNumber The page number of the standings (50 results per page)
 */
export async function getLeagueStandings(leagueId: number, pageNumber = 1): Promise<LeagueStandings> {
  const data = await dataService.fetchLeagueStandings(leagueId, pageNumber);
  return data.standings;
}
