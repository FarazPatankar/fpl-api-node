import axios from 'axios';
import * as _ from 'lodash';

import * as interfaces from '../api.interfaces';
import { cache, stdCacheTTL } from '../cache/cache.service';
import * as entryInterfaces from '../entry.interfaces';
import * as fplInterfaces from '../fpl.interfaces';

import { CustomError, ErrorCode, ErrorMessage } from './data.errors';

/**
 * Hooks into available fpl endpoints.
 * The Available end-points are:
 * https://fantasy.premierleague.com/drf/bootstrap-static
 * https://fantasy.premierleague.com/drf/entry/${id}
 * https://fantasy.premierleague.com/drf/entry/${id}/history
 * https://fantasy.premierleague.com/drf/entry/${id}/event/{$event}/picks
 * https://fantasy.premierleague.com/drf/entry/${id}/transfers
 * https://fantasy.premierleague.com/drf/teams
 * https://fantasy.premierleague.com/drf/elements
 * https://fantasy.premierleague.com/drf/events
 * https://fantasy.premierleague.com/drf/game-settings
 * https://fantasy.premierleague.com/drf/event/${event}/live
 * https://fantasy.premierleague.com/drf/leagues-classic-standings/${id}
 */

// set axios defaults
axios.defaults.baseURL = 'https://fantasy.premierleague.com/drf';

export function fetchGameData(): Promise<interfaces.FplRootObject> {
  return fetch('/bootstrap-static');
}

export function fetchEntryRoot(entryId: number): Promise<interfaces.ManagerRootObject> {
  return fetch(`/entry/${entryId}/history`);
}

export function fetchEntryPicksByGameweek(entryId: number, eventNumber: number): Promise<interfaces.PicksRootObject> {
  return fetchEvent(`/entry/${entryId}/event/${eventNumber}/picks`, eventNumber);
}

export function fetchEntryTransfers(entryId: number): Promise<interfaces.EntryTransfersRootObject> {
  return fetch(`/entry/${entryId}/transfers`);
}

export function fetchEventByNumber(eventNumber: number): Promise<interfaces.EventRootObject> {
  return fetchEvent(`/event/${eventNumber}/live`, eventNumber);
}

export function fetchLeagueStandings(leagueId: number, pageNumber = 1): Promise<interfaces.LeagueRootObject> {
  return fetch(`/leagues-classic-standings/${leagueId}?page=${pageNumber}`, false, {
    params: {
      'ls-page': pageNumber,
    },
  });
}

/**
 * Fetch event related request (if event has passed we can cache it forever)
 */
function fetchEvent(path: string, eventNumber: number): Promise<any> {
  return new Promise((resolve, reject) => {
    const cacheValue = cache.get(path);
    if (cacheValue) {
      resolve(cacheValue);
    } else {
      return fetchGameData().then((data) => {
        const currentEvent = data['current-event'];
        resolve(fetch(path, eventNumber < currentEvent));
      });
    }
  });
}

/**
 * Fetch generic request
 */
export function fetch(path: string, cacheForever = false, config = {}): Promise<any> {
  return new Promise((resolve, reject) => {
    const cacheValue = cache.get(path);
    if (cacheValue) {
      resolve(cacheValue);
    } else {
      axios.get(path, config).then((response) => {
        const data = response.data;
        if (_.isObject(data)) {
          cache.set(path, data, cacheForever ? 0 : stdCacheTTL);
          resolve(data);
        } else {
          if (data.includes('The game is being updated')) {
            reject(new CustomError(ErrorMessage.GAMEUPDATING, ErrorCode.GAMEUPDATING));
          } else {
            reject(new CustomError(ErrorMessage.NOTFOUND, ErrorCode.NOTFOUND));
          }
        }
      }).catch(() => {
        reject(new CustomError(ErrorMessage.NORESPONSE, ErrorCode.NORESPONSE));
      });
    }
  });
}
