import axios from 'axios';
import * as _ from 'lodash';
import { fromCache } from '../utils/cache-manager';
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
 * https://fantasy.premierleague.com/drf/game-settings
 * https://fantasy.premierleague.com/drf/event/${eventNumber}/live
 * https://fantasy.premierleague.com/drf/leagues-classic-standings/${id}
 */

/**
 * All static game data:
 * A promise that if fulfilled returns an object
 * mapped to https://fantasy.premierleague.com/drf/bootstrap-static
 * @returns {Promise}
 */
export function getBootstrapData(): Promise<types.BootstrappedData> {
  return getData('/bootstrap-static');
}

/**
 * Entry History:
 * A promise that if fulfilled returns an object
 * mapped to https://fantasy.premierleague.com/drf/entry/${id}/history
 * @param entryId Entry id
 * @returns {Promise}
 */
export function getEntry(entryId: number): Promise<types.Entry> {
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
export function getEntryEvent(entryId: number, eventNumber: number): Promise<types.EntryEvent> {
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
 * Teams (Premier Leaugue clubs):
 * A promise that if fulfilled returns an object
 * mapped to https://fantasy.premierleague.com/drf/teams
 * @returns {Promise}
 */
export function getTeams(): Promise<types.TeamData[]> {
  return getData('/teams');
}

/**
 * Elements (players):
 * A promise that if fulfilled returns an object
 * mapped to https://fantasy.premierleague.com/drf/elements
 * @returns {Promise}
 */
export function getElements(): Promise<types.Element[]> {
  return new Promise((resolve, reject) => {
    getBootstrapData().then((data) => {
      resolve(data.elements);
    });
  });
}

export function getElementById(id: number): Promise<types.Element> {
  return new Promise((resolve, reject) => {
    getElements().then((elements) => {
      const element = _.find(elements, { id });
      resolve(element);
    });
  });
}

export function getTotalPlayers(): Promise<number> {
  return new Promise((resolve, reject) => {
    getBootstrapData().then((data) => {
      resolve(data['total-players']);
    });
  });
}

/**
 * Element types: A promise that if fulfilled returns an object
 * mapped to https://fantasy.premierleague.com/drf/elements-types
 * @returns {Promise}
 */
export function getElementTypes(): Promise<types.ElementType[]> {
  return getData('/element-types');
}

/**
 * Game settings:
 * A promise that if fulfilled returns an object
 * mapped to https://fantasy.premierleague.com/drf/game-settings
 * @returns {Promise}
 */
export function getGameSettings(): Promise<types.GameSettings> {
  return getData('game-settings');
}

/**
 * Event /gameweek details:
 * A promise that if fulfilled returns an object
 * mapped to https://fantasy.premierleague.com/drf/event/${eventNumber}/live
 * @returns {Promise}
 */
export function getEvent(eventNumber: number): Promise<types.Event> {
  return getData(`/event/${eventNumber}/live`);
}

/**
 * Classic league standings:
 * A promise that if fulfilled returns an object
 * mapped to https://fantasy.premierleague.com/drf/leagues-classic-standings/${id}
 * @param leagueId League id
 * @returns {Promise}
 */
export function getClassicLeagueStandings(leagueId: number): Promise<types.League> {
  return getData(`/leagues-classic-standings/${leagueId}`);
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
