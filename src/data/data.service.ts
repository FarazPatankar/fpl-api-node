import axios from 'axios';
import * as _ from 'lodash';
import { cache, stdCacheTTL } from '../cache/cache.service';
import * as interfaces from './data.interfaces';
import { Errors } from './errors.enum';

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

export function fetchEntryRoot(entryId: number): Promise<interfaces.EntryRoot> {
  return fetch(`/entry/${entryId}/history`);
}

export function fetchEntryPicksByGameweek(entryId: number, eventNumber: number): Promise<interfaces.EntryPicksRoot> {
  return fetchEvent(`/entry/${entryId}/event/${eventNumber}/picks`, eventNumber);
}

export function fetchEntryTransfers(entryId: number): Promise<interfaces.EntryTransfers> {
  return fetch(`/entry/${entryId}/transfers`);
}

export function fetchElements(): Promise<interfaces.Element[]> {
  return fetch(`/elements`);
}

export function fetchElement(elementId): Promise<interfaces.Element> {
  const cacheKey = `/elements/${elementId}`;
  return new Promise((resolve: any, reject) => {
    const cacheValue = cache.get(cacheKey);
    if (cacheValue) {
      resolve(cacheValue);
    } else {
      fetchElements().then((elements) => {
        const matchedElement = elements.find((element) => {
          return element.id === elementId;
        });
        resolve(matchedElement);
      });
    }
  });
}

export function fetchEventByNumber(eventNumber: number): Promise<interfaces.LiveEvent> {
  return fetchEvent(`/event/${eventNumber}/live`, eventNumber);
}

export function fetchLeagueStandings(leagueId: number, pageNumber = 1): Promise<interfaces.LeagueRoot> {
  return fetch(`/leagues-classic-standings/${leagueId}?page=${pageNumber}`, false, {
    params: {
      'ls-page': pageNumber,
    },
  });
}

export function getBootstrapData(): Promise<interfaces.BootstrappedData> {
  return fetch('/bootstrap-static');
}

/**
 * Fetch event related request (if event has passed we can cache it forever)
 * @param path
 * @param eventNumber
 */
function fetchEvent(path: string, eventNumber: number): Promise<any> {
  return new Promise((resolve, reject) => {
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
            reject(Errors.GAME_UPDATING);
          } else {
            reject(Errors.NOT_FOUND);
          }
        }
      }).catch(() => {
        console.log(path);
        reject(Errors.NO_RESPONSE);
      });
    }
  });
}
