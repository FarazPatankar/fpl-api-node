
import * as dataService from './data-service';
import * as types from './types';

// *************
// Entry methods
// *************

/**
 * Returns entry summary / details.
 * @param entryId The unique id of entry
 */
export function findEntry(entryId: number): Promise<types.Entry> {
  return new Promise((resolve, reject) => {
    dataService.getEntryHistory(entryId).then((data) => {
      resolve(data.entry);
    }).catch((e) => {
      reject(e);
    });
  });
}

/**
 * Returns a collection of completed or ongoing events
 * @param entryId
 */
export function findEntryEvents(entryId: number): Promise<types.EntryEvent[]> {
  return new Promise((resolve, reject) => {
    dataService.getEntryHistory(entryId).then((data) => {
      resolve(data.history);
    }).catch((e) => {
      reject(e);
    });
  });
}

/**
 * Returns chip details of a specified entry
 * @param entryId
 * @param eventNumber
 */
export function findEntryChips(entryId: number): Promise<types.EntryChip[]> {
  return new Promise((resolve, reject) => {
    dataService.getEntryHistory(entryId).then((data) => {
      resolve(data.chips);
    }).catch((e) => {
      reject(e);
    });
  });
}

/**
 * Returns a details of a specified event
 * @param entryId
 * @param eventNumber
 */
export function findEntryEvent(entryId: number, eventNumber: number): Promise<types.EntryEvent> {
  return new Promise((resolve, reject) => {
    dataService.getEntryEventPicks(entryId, eventNumber).then((data) => {
      resolve(data.entry_history);
    }).catch((e) => {
      reject(e);
    });
  });
}

/**
 * Returns a collection of picks for a specified event
 * @param entryId
 * @param event
 */
export function findEntryPicksByEvent(entryId: number, event: number): Promise<types.EntryPick[]> {
  return new Promise((resolve, reject) => {
    dataService.getEntryEventPicks(entryId, event).then((data) => {
      resolve(data.picks);
    }).catch((e) => {
      reject(e);
    });
  });
}

/**
 * Returns transfer history of an entry
 * @param entryId
 */
export function findEntryTransferHistory(entryId: number): Promise<types.EntryTransferHistory[]> {
  return new Promise((resolve, reject) => {
    dataService.getEntryTransfers(entryId).then((data) => {
      resolve(data.history);
    }).catch((e) => {
      reject(e);
    });
  });
}

/**
 * Returns all element data for a specified event
 * @param event
 */
export function findElementsByEvent(event: number): Promise<types.EventElements> {
  return new Promise((resolve, reject) => {
    dataService.getLiveEvent(event).then((data) => {
      resolve(data.elements);
    }).catch((e) => {
      reject(e);
    });
  });
}

// *************
// League methods
// *************

/**
 * Returns specified league details
 * @param leagueId
 */
export function findLeague(leagueId: number): Promise<types.League> {
  return new Promise((resolve, reject) => {
    dataService.getClassicLeagueStandings(leagueId).then((data) => {
      resolve(data.league);
    }).catch((e) => {
      reject(e);
    });
  });
}

/**
 * Returns specified league standings (top 50)
 * @param leagueId
 */
export function findLeagueStandings(leagueId: number): Promise<types.LeagueResult[]> {
  return new Promise((resolve, reject) => {
    dataService.getClassicLeagueStandings(leagueId).then((data) => {
      resolve(data.standings.results);
    }).catch((e) => {
      reject(e);
    });
  });
}

// *************
// Other
// *************

/**
 * Returns a collection of all elements.
 */
export function getElements(): Promise<types.Element[]> {
  return new Promise((resolve, reject) => {
    dataService.getBootstrapData().then((data) => {
      resolve(data.elements);
    }).catch((e) => {
      reject(e);
    });
  });
}

/**
 * Returns a collection of all element types in the game
 */
export function getElementTypes(): Promise<types.ElementType[]> {
  return new Promise((resolve, reject) => {
    dataService.getBootstrapData().then((data) => {
      resolve(data.element_types);
    }).catch((e) => {
      reject(e);
    });
  });
}

/**
 * Returns a collection of all events
 */
export function getEvents(): Promise<types.Event[]> {
  return new Promise((resolve, reject) => {
    dataService.getBootstrapData().then((data) => {
      resolve(data.events);
    }).catch((e) => {
      reject(e);
    });
  });
}

/**
 * Returns a collection of all teams
 */
export function getTeams(): Promise<types.Team[]> {
  return new Promise((resolve, reject) => {
    dataService.getBootstrapData().then((data) => {
      resolve(data.teams);
    }).catch((e) => {
      reject(e);
    });
  });
}

/**
 * Returns the total number of entries
 */
export function getGameData(): Promise<types.GameData> {
  return new Promise((resolve, reject) => {
    dataService.getBootstrapData().then((data) => {
      resolve({
        current_event: data['current-event'],
        last_entry_event: data['last-entry-event'],
        next_event: data['next-event'],
        total_players: data['total-players'],
      });
    }).catch((e) => {
      reject(e);
    });
  });
}
