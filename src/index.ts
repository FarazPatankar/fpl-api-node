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
export async function findEntry(entryId: number): Promise<Entry> {
  const data = await dataService.findEntryRoot(entryId);
  return data.entry;
}

/**
 * Returns a collection of completed or ongoing events
 * @param entryId The id of entry
 */
export async function findEntryEvents(entryId: number): Promise<EntryEvent[]> {
  const data = await dataService.findEntryRoot(entryId);
  return data.history;
}

/**
 * Returns chip details of a specified entry
 * @param entryId The id of entry
 * @param eventNumber The event number
 */
export async function findEntryChips(entryId: number): Promise<EntryChip[]> {
  const data = await dataService.findEntryRoot(entryId);
  return data.chips;
}

/**
 * Returns a details of a specified event
 * @param entryId The id of entry
 * @param eventNumber The event number
 */
export async function findEntryEvent(entryId: number, eventNumber: number): Promise<EntryEvent> {
  const data = await dataService.findEntryEventPicksRoot(entryId, eventNumber);
  return data.entry_history;
}

/**
 * Returns a collection of picks for a specified event
 * @param entryId The id of entry
 * @param event The event number
 */
export async function findEntryPicksByEvent(entryId: number, event: number): Promise<EntryPick[]> {
  const data = await dataService.findEntryEventPicksRoot(entryId, event);
  return data.picks;
}

/**
 * Returns transfer history of an entry
 * @param entryId The id of entry
 */
export async function findEntryTransferHistory(entryId: number): Promise<EntryTransferHistory[]> {
  const data = await dataService.findEntryTransfers(entryId);
  return data.history;
}

/**
 * Returns all element data for a specified event
 * @param event The event number
 */
export async function findElementsByEvent(event: number): Promise<EventElements> {
  const data = await dataService.findLiveEvent(event);
  return data.elements;
}

// *************
// League methods
// *************

/**
 * Returns specified details of a classic league
 * @param leagueId The id of the league
 */
export async function findLeague(leagueId: number): Promise<League> {
  const data = await dataService.findLeagueRoot(leagueId);
  return data.league;
}

/**
 * Returns specified standings of a classic league
 * @param leagueId The id of the league
 * @param pageNumber The page number of the standings (50 results per page)
 */
export async function findLeagueStandings(leagueId: number, pageNumber = 1): Promise<LeagueStandings> {
  const data = await dataService.findLeagueRoot(leagueId, pageNumber);
  return data.standings;
}

// *************
// Other
// *************

/**
 * Returns a collection of all elements.
 */
export async function getElements(): Promise<Element[]> {
  const data = await dataService.getBootstrapData();
  return data.elements;
}

/**
 * Returns a collection of all element types in the game
 */
export async function getElementTypes(): Promise<ElementType[]> {
  const data = await dataService.getBootstrapData();
  return data.element_types;
}

/**
 * Returns a collection of all events
 */
export async function getEvents(): Promise<Event[]> {
  const data = await dataService.getBootstrapData();
  return data.events;
}

/**
 * Returns a collection of all teams
 */
export async function getTeams(): Promise<Team[]> {
  const data = await dataService.getBootstrapData();
  return data.teams;
}

/**
 * Returns the total number of entries
 */
export async function getTotalNumberOfEntries(): Promise<number> {
  const data = await dataService.getBootstrapData();
  return data['total-players'];
}

/**
 * Returns the current event number
 */
export async function getCurrentEventNumber(): Promise<number> {
  const data = await dataService.getBootstrapData();
  return data['current-event'];
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
