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
 * https://fantasy.premierleague.com/drf/entry/${id}/event/${eventNumber}
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
 * A promise that if fulfilled returns an object
 * mapped to https://fantasy.premierleague.com/drf/entry/${id}/history
 * @param entryId Entry id
 * @returns {Promise}
 */
export function getEntryHistory(entryId: number): Promise<types.EntryRoot> {
  return getData(`/entry/${entryId}/history`);
}

/**
 * Entry event:
 * Details of a particular event (or gameweek):
 * A promise that if fulfilled returns an object
 * mapped to https://fantasy.premierleague.com/drf/entry/${id}/event/${eventNumber}
 * @param entryId Entry id
 * @param eventNumber The event / gameweek number
 * @returns {Promise}
 */
export function getEntryEvent(entryId: number, eventNumber: number): Promise<types.EntryEventRoot> {
  return getData(`/entry/${entryId}/event/${eventNumber}`);
}

/**
 * Entry transfers:
 * A promise that if fulfilled returns an object
 * mapped to https://fantasy.premierleague.com/drf/entry/${id}/transfers
 * @param entryId Entry id
 * @returns {Promise}
 */
export function getEntryTransfers(entryId: number): Promise<types.EntryTransfers> {
  return getData(`/entry/${entryId}/transfers`);
}

/**
 * Element types: A promise that if fulfilled returns an object
 * mapped to https://fantasy.premierleague.com/drf/elements
 * @returns {Promise}
 */
export function getElements(): Promise<types.Player[]> {
  return getData('/elements');
}

/**
 * Element types: A promise that if fulfilled returns an object
 * mapped to https://fantasy.premierleague.com/drf/elements-types
 * @returns {Promise}
 */
export function getElementTypes(): Promise<types.PlayerType[]> {
  return getData('/element-types');
}

/**
 * Element types: A promise that if fulfilled returns an object
 * mapped to https://fantasy.premierleague.com/drf/events
 * @returns {Promise}
 */
export function getEvents(): Promise<types.Gameweek[]> {
  return getData('/events');
}

/**
 * Teams (Premier Leaugue clubs):
 * A promise that if fulfilled returns an object
 * mapped to https://fantasy.premierleague.com/drf/teams
 * @returns {Promise}
 */
export function getTeams(): Promise<types.Team[]> {
  return getData('/teams');
}

/**
 * Event /gameweek details:
 * A promise that if fulfilled returns an object
 * mapped to https://fantasy.premierleague.com/drf/event/${eventNumber}/live
 * @returns {Promise}
 */
export function getEventLive(eventNumber: number): Promise<types.LiveEvent> {
  return getData(`/event/${eventNumber}/live`);
}

/**
 * Classic league standings:
 * A promise that if fulfilled returns an object
 * mapped to https://fantasy.premierleague.com/drf/leagues-classic-standings/${id}
 * @param leagueId League id
 * @returns {Promise}
 */
export function getClassicLeagueStandings(leagueId: number): Promise<types.LeagueRoot> {
  return getData(`/leagues-classic-standings/${leagueId}`);
}

/**
 * All static game data:
 * A promise that if fulfilled returns an object mapped to https://fantasy.premierleague.com/drf/bootstrap-static
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
    }).catch((error) => {
      return error;
    });
  });
}
