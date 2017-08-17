
import * as dataService from './data-service';
import * as types from './types';

/**
 * ********
 * Entries
 * *******
 */

/**
 * Returns entry summary
 * @param entryId The unique id of entry
 */
export function getEntry(entryId: number): Promise<types.Entry> {
  return new Promise((resolve, reject) => {
    dataService.getEntryHistory(entryId).then((data) => {
      resolve(data.entry);
    });
  });
}

/**
 * Returns event details for an entry
 * @param entryId
 * @param eventNumber
 */
export function getEntryEvent(entryId: number, eventNumber: number): Promise<types.EntryEvent> {
  return new Promise((resolve, reject) => {
    dataService.getEntryEvent(entryId, eventNumber).then((data) => {
      resolve(data.entry_history);
    });
  });
}

/**
 * Returns picks for a specified event
 * @param entryId
 * @param eventNumber
 */
export function getEntryPicksForEvent(entryId: number, eventNumber: number): Promise<types.EntryPick[]> {
  return new Promise((resolve, reject) => {
    dataService.getEntryEvent(entryId, eventNumber).then((data) => {
      resolve(data.picks);
    });
  });
}

/**
 * Returns transfer history of an entry
 * @param entryId
 */
export function getEntryTransferHistory(entryId: number): Promise<types.EntryTransferHistory[]> {
  return new Promise((resolve, reject) => {
    dataService.getEntryTransfers(entryId).then((data) => {
      resolve(data.history);
    });
  });
}

/**
 * ********
 * Elements
 * *******
 */

/**
 * Geta all elements
 */
export function getElements(): Promise<types.Element[]> {
  return new Promise((resolve, reject) => {
    dataService.getElements().then((data) => {
      resolve(data);
    });
  });
}

/**
 * Returns a specific element
 */
export function getElement(elementId: number): Promise<types.Element> {
  return new Promise((resolve, reject) => {
    getElements().then((elements) => {
      const match = elements.find((element) => {
        return element.id === elementId;
      });
      resolve(match);
    });
  });
}

/**
 * ********
 * Elements
 * *******
 */

/**
 * Geta all events
 */
export function getEvents(): Promise<types.Event[]> {
  return new Promise((resolve, reject) => {
    dataService.getEvents().then((data) => {
      resolve(data);
    });
  });
}

/**
 * Returns a specific event
 * @param eventNumber
 */
export function getEvent(eventNumber: number): Promise<types.Event> {
  return new Promise((resolve, reject) => {
    dataService.getEvents().then((events) => {
      const match = events.find((event) => {
        return event.id === eventNumber;
      });
      resolve(match);
    });
  });
}

/**
 * ********
 * Teams
 * *******
 */

/**
 * Geta all events
 */
export function getTeams(): Promise<types.Team[]> {
  return new Promise((resolve, reject) => {
    dataService.getTeams().then((data) => {
      resolve(data);
    });
  });
}

/**
 * Returns a specific event
 * @param teamId
 */
export function getTeam(teamId: number): Promise<types.Team> {
  return new Promise((resolve, reject) => {
    dataService.getTeams().then((teams) => {
      const match = teams.find((team) => {
        return team.id === teamId;
      });
      resolve(match);
    });
  });
}

/**
 * ********
 * Utils
 * *******
 */

/**
 * Returns the total number of entries
 */
export function getTotalNumberOfEntries(): Promise<number> {
  return new Promise((resolve, reject) => {
    dataService.getBootstrapData().then((data) => {
      resolve(data['total-players']);
    });
  });
}
