
import * as dataService from './data-service';
import * as types from './types';

/**
 * Returns an entry
 * @param entryId
 */
export function getEntry(entryId: number): Promise<types.Entry> {
  return new Promise((resolve, reject) => {
    dataService.getEntryHistory(entryId).then((data) => {
      resolve(data.entry);
    });
  });
}

/**
 * Returns entry event data
 * @param entryId
 * @param eventNumber
 */
export function getEntryEventHistory(entryId: number, eventNumber: number): Promise<types.EntryEventHistory> {
  return new Promise((resolve, reject) => {
    dataService.getEntryEvent(entryId, eventNumber).then((data) => {
      resolve(data.entry_history);
    });
  });
}

/**
 * Returns pick for a particular event
 * @param entryId
 * @param eventNumber
 */
export function getEntryEventPicks(entryId: number, eventNumber: number): Promise<types.EntryPick[]> {
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
 * Returns the total number of entries
 */
export function getTotalNumberOfEntries(): Promise<number> {
  return new Promise((resolve, reject) => {
    dataService.getBootstrapData().then((data) => {
      resolve(data['total-players']);
    });
  });
}

/**
 * Geta all elements
 */
export function getElements(): Promise<types.Element[]> {
  return new Promise((resolve, reject) => {
    dataService.getBootstrapData().then((data) => {
      resolve(data.elements);
    });
  });
}

/**
 * Returns a specific element
 */
export function getElement(id: number): Promise<types.Element> {
  return new Promise((resolve, reject) => {
    getElements().then((elements) => {
      const matchedElement = elements.find((element) => {
        return element.id === id;
      });
      resolve(matchedElement);
    });
  });
}
