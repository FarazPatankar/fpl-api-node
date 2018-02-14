import axios from 'axios';
import * as NodeCache from 'node-cache';
import * as Rx from 'rxjs';

import { Errors } from './errors.enum';
import { BootstrappedData, EntryPicksRoot, EntryRoot, EntryTransfers, LeagueRoot, LiveEvent } from './interfaces';

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

// standard cache timeout (1 hour)

const stdCacheTTL = 1800;

// reference to cache object

export const cache = new NodeCache();

// lookup methods

export function fetchEntryRoot(entryId: number): Rx.Observable<EntryRoot> {
  return http<EntryRoot>(`/entry/${entryId}/history`);
}

export function fetchEntryEventPicksRoot(entryId: number, eventNumber: number): Rx.Observable<EntryPicksRoot> {
  return httpOfEvent<EntryPicksRoot>(`entry/${entryId}/event/${eventNumber}/picks`, eventNumber);
}

export function fetchEntryTransfers(entryId: number): Rx.Observable<EntryTransfers> {
  return http(`/entry/${entryId}/transfers`);
}

export function fetchLiveEvent(eventNumber: number): Rx.Observable<LiveEvent> {
  return httpOfEvent(`/event/${eventNumber}/live`, eventNumber);
}

export function fetchLeagueRoot(leagueId: number, pageNumber = 1): Rx.Observable<LeagueRoot> {
  return http(`/leagues-classic-standings/${leagueId}?page=${pageNumber}`, false, {
    params: {
      'ls-page': pageNumber,
    },
  });
}

export function getBootstrapData(): Rx.Observable<BootstrappedData> {
  return http('/bootstrap-static');
}

/**
 * Fetch event related request (if event has passed we can cache it forever)
 * @param path
 * @param eventNumber
 */
function httpOfEvent<T>(path: string, eventNumber: number): Rx.Observable<T> {
  const cacheValue = cache.get(path) as T;
  if (cacheValue) {
    return Rx.Observable.of(cacheValue);
  } else {
    return getBootstrapData().mergeMap((data) => {
      const currentEvent = data['current-event'];
      return http<T>(path, eventNumber < currentEvent);
    });
  }
}

/**
 * Fetch generic request
 * If cache value exists - return it, otherwise make a http request
 * @param path
 * @param ttl
 */
export function http<T>(path: string, cacheForever = false, config = {}): Rx.Observable<T> {
  const cacheValue = cache.get(path) as T;
  if (cacheValue) {
    return Rx.Observable.of(cacheValue);
  } else {
    return Rx.Observable.fromPromise(axios.get(path, config).then((response) => {
      const data = response.data;
      if (Object.keys(data).length > 0 && data.constructor === Object) {
        cache.set(path, data, cacheForever ? 0 : stdCacheTTL);
        return data;
      } else {
        if (data.includes('The game is being updated')) {
          throw new Error(Errors.GAME_UPDATING);
        } else {
          throw new Error(Errors.NOT_FOUND);
        }
      }
    }).catch((error: Error) => {
      throw new Error(error.message);
    }));
  }
}
