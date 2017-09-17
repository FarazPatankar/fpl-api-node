import axios from 'axios';
import * as NodeCache from 'node-cache';
import * as Errors from './errors';
import * as types from './types';

/**
 * Hooks into available fpl endpoints.
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

// set axios defaults
axios.defaults.baseURL = 'https://fantasy.premierleague.com/drf';

// standard cache timeout (30 mins)
const stdCacheTTL = 1800;

// reference to cache object
export const cache = new NodeCache();

export function getEntryHistory(entryId: number): Promise<types.EntryRoot> {
  return fetch(`/entry/${entryId}/history`);
}

export function getEntryEventPicks(entryId: number, eventNumber: number): Promise<types.EntryPicksRoot> {
  return fetchEvent(`entry/${entryId}/event/${eventNumber}/picks`, eventNumber);
}

export function getEntryTransfers(entryId: number): Promise<types.EntryTransfers> {
  return fetch(`/entry/${entryId}/transfers`);
}

export function getLiveEvent(eventNumber: number): Promise<types.LiveEvent> {
  return fetchEvent(`/event/${eventNumber}/live`, eventNumber);
}

export function getClassicLeagueStandings(leagueId: number): Promise<types.LeagueRoot> {
  return fetch(`/leagues-classic-standings/${leagueId}`);
}

export function getBootstrapData(): Promise<types.BootstrappedData> {
  return fetch('/bootstrap-static');
}

/**
 * Fetch event related request (if event has passed we can cache it forever)
 * @param path
 * @param eventNumber
 */
function fetchEvent(path: string, eventNumber: number): Promise<any> {
  return new Promise((resolve: any, reject: any) => {
    const cacheValue = cache.get(path);
    if (cacheValue) {
      resolve(cacheValue);
    } else {
      return getBootstrapData().then((data) => {
        const currentEvent = data['current-event'];
        resolve(fetch(path, eventNumber < currentEvent));
      });
    }
  });
}

/**
 * Fetch generic request
 * @param path
 * @param ttl
 */
export function fetch(path: string, cacheForever = false): Promise<any> {
  return new Promise((resolve: any, reject: any) => {
    const cacheValue = cache.get(path);
    if (cacheValue) {
      resolve(cacheValue);
    } else {
      axios.get(path).then((response) => {
        const data = response.data;
        if (Object.keys(data).length > 0 && data.constructor === Object) {
          cache.set(path, data, cacheForever ? 0 : stdCacheTTL);
          resolve(data);
        } else {
          if (data.includes('The game is being updated')) {
            reject(new Errors.GameUpdatingError());
          } else {
            reject(new Errors.NotFoundError());
          }
        }
      }).catch(() => {
        reject(new Errors.NoResponseError());
      });
    }
  });
}
