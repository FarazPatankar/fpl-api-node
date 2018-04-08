/**
 * Methods relating to the leagues in general.
 *
 * __Usage:__
 *
 * ```js
 * fplapi.entries.getClassicLeague(leagueId).then((data) => console.log(data));
 * ```
 */
/**
 */

import _ from 'lodash';

import { cache } from '../cache/cache.service';

import * as dataService from '../data/data.service';
import { ClassicLeague, ClassicLeagueStandings } from '../types';

/**
 * Returns specified details of a classic league
 * @param leagueId The id of the league
 */
export async function getClassicLeague(leagueId: number): Promise<ClassicLeague> {
  const data = await dataService.fetchLeagueStandings(leagueId);
  return data;
}

/**
 * Returns specified standings of a classic league
 * @param leagueId The id of the league
 * @param pageNumber The page number of the standings (50 results per page)
 */
export async function getClassicLeagueStandings(leagueId: number, pageNumber = 1): Promise<ClassicLeagueStandings> {
  const data = await dataService.fetchLeagueStandings(leagueId, pageNumber);
  return data.standings;
}
