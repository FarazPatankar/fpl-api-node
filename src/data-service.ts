import axios from 'axios';
import { fromCache } from './cache-manager';
import * as types from './types';

// set axios defaults
axios.defaults.baseURL = 'https://fantasy.premierleague.com/drf';

/**
 * The Available end-points are:
 * https://fantasy.premierleague.com/drf/bootstrap-static
 * https://fantasy.premierleague.com/drf/entry/${id}
 * https://fantasy.premierleague.com/drf/entry/${id}/history
 * https://fantasy.premierleague.com/drf/entry/${id}/event/{$eventNumber}/picks
 * https://fantasy.premierleague.com/drf/entry/${id}/transfers
 * https://fantasy.premierleague.com/drf/teams
 * https://fantasy.premierleague.com/drf/elements
 * https://fantasy.premierleague.com/drf/elements-types
 * https://fantasy.premierleague.com/drf/events
 * https://fantasy.premierleague.com/drf/game-settings
 * https://fantasy.premierleague.com/drf/event/${eventNumber}/live
 * https://fantasy.premierleague.com/drf/leagues-classic-standings/${id}
 */

/**
 * Entry History:
 * @param entryId Entry id
 * @returns {Promise}
 */
export function getEntryHistory(entryId: number): Promise<types.EntryRoot> {
  return getData(`/entry/${entryId}/history`);
}

/**
 * Entry Picks:
 * @param entryId
 * @param eventNumber
 */
export function getEntryEventPicks(entryId: number, eventNumber: number): Promise<types.EntryPicksRoot> {
  return getData(`entry/${entryId}/event/${eventNumber}/picks`);
}

/**
 * Entry transfers:
 * @param entryId Entry id
 * @returns {Promise}
 */
export function getEntryTransfers(entryId: number): Promise<types.EntryTransfers> {
  return getData(`/entry/${entryId}/transfers`);
}

/**
 * Event /gameweek details:
 * @returns {Promise}
 */
export function getEventLive(eventNumber: number): Promise<types.LiveGameweek> {
  return getData(`/event/${eventNumber}/live`);
}

/**
 * Classic league standings:
 * @param leagueId League id
 * @returns {Promise}
 */
export function getClassicLeagueStandings(leagueId: number): Promise<types.LeagueRoot> {
  return getData(`/leagues-classic-standings/${leagueId}`);
}

/**
 * All static game data:
 * @returns {Promise}
 */
export function getBootstrapData(): Promise<types.BootstrappedData> {
  return getData('/bootstrap-static');
}

/**
 * Returns a promise that if fulfilled returns json object mapped to the given request
 * @param path The path of the rest web api request
 * @returns {Promise}
 * @private
 */
function getData(path: string) {
  return fromCache(path, () => {
    return axios.get(path).then((response) => {
      return response.data;
    }).catch(() => {
      throw new Error('fpl-api-node: Request error');
    });
  });
}
