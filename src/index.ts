import * as dataService from './data.service';
import {
  Element,
  ElementType,
  Entry,
  EntryChip,
  EntryEvent,
  EntryPick,
  EntryTransferHistory,
  Event,
  EventElements,
  League,
  LeagueStandings,
  Team,
} from './interfaces';

// *************
// Entry methods
// *************

/**
 * Returns entry summary / details.
 * @param entryId The id of entry
 */
export function findEntry(entryId: number): Promise<Entry> {
  return dataService.fetchEntryRoot(entryId).map((data) => data.entry).toPromise();
}

/**
 * Returns a collection of completed or ongoing events
 * @param entryId The id of entry
 */
export function findEntryEvents(entryId: number): Promise<EntryEvent[]> {
  return dataService.fetchEntryRoot(entryId).map((data) => data.history).toPromise();
}

/**
 * Returns chip details of a specified entry
 * @param entryId The id of entry
 * @param eventNumber The event number
 */
export function findEntryChips(entryId: number): Promise<EntryChip[]> {
  return dataService.fetchEntryRoot(entryId).map((data) => data.chips).toPromise();
}

/**
 * Returns a details of a specified event
 * @param entryId The id of entry
 * @param eventNumber The event number
 */
export function findEntryEvent(entryId: number, eventNumber: number): Promise<EntryEvent> {
  return dataService.fetchEntryEventPicksRoot(entryId, eventNumber).map((data) => data.entry_history).toPromise();
}

/**
 * Returns a collection of picks for a specified event
 * @param entryId The id of entry
 * @param event The event number
 */
export function findEntryPicksByEvent(entryId: number, event: number): Promise<EntryPick[]> {
  return dataService.fetchEntryEventPicksRoot(entryId, event).map((data) => data.picks).toPromise();
}

/**
 * Returns transfer history of an entry
 * @param entryId The id of entry
 */
export function findEntryTransferHistory(entryId: number): Promise<EntryTransferHistory[]> {
  return dataService.fetchEntryTransfers(entryId).map((data) => data.history).toPromise();
}

/**
 * Returns all element data for a specified event
 * @param event The event number
 */
export function findElementsByEvent(event: number): Promise<EventElements> {
  return dataService.fetchLiveEvent(event).map((data) => data.elements).toPromise();
}

// *************
// League methods
// *************

/**
 * Returns specified details of a classic league
 * @param leagueId The id of the league
 */
export function findLeague(leagueId: number): Promise<League> {
  return dataService.fetchLeagueRoot(leagueId).map((data) => data.league).toPromise();
}

/**
 * Returns specified standings of a classic league
 * @param leagueId The id of the league
 * @param pageNumber The page number of the standings (50 results per page)
 */
export function findLeagueStandings(leagueId: number, pageNumber = 1): Promise<LeagueStandings> {
  return dataService.fetchLeagueRoot(leagueId, pageNumber).map((data) => data.standings).toPromise();
}

// *************
// Other
// *************

/**
 * Returns a collection of all elements.
 */
export function getElements(): Promise<Element[]> {
  return dataService.getBootstrapData().map((data) => data.elements).toPromise();
}

/**
 * Returns a collection of all element types in the game
 */
export function getElementTypes(): Promise<ElementType[]> {
  return dataService.getBootstrapData().map((data) => data.element_types).toPromise();
}

/**
 * Returns a collection of all events
 */
export function getEvents(): Promise<Event[]> {
  return dataService.getBootstrapData().map((data) => data.events).toPromise();
}

/**
 * Returns a collection of all teams
 */
export function getTeams(): Promise<Team[]> {
  return dataService.getBootstrapData().map((data) => data.teams).toPromise();
}

/**
 * Returns the total number of entries
 */
export function getTotalNumberOfEntries(): Promise<number> {
  return dataService.getBootstrapData().map((data) => data['total-players']).toPromise();
}

/**
 * Returns the current event number
 */
export function getCurrentEventNumber(): Promise<number> {
  return dataService.getBootstrapData().map((data) => data['current-event']).toPromise();
}

// export interfaces
export {
  ElementType,
  Entry,
  EntryChip,
  EntryEvent,
  EntryPick,
  EntryTransferHistory,
  EventElements,
  League,
  LeagueStandings,
  Team,
};
