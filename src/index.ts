import * as dataService from './data-service';
import * as types from './types';

// *************
// Entry methods
// *************

/**
 * Returns entry summary / details.
 * @param entryId The unique id of entry
 */
export async function findEntry(entryId: number): Promise<types.Entry> {
  const data = await dataService.getEntryHistory(entryId);
  return data.entry;
}

/**
 * Returns a collection of completed or ongoing events
 * @param entryId
 */
export async function findEntryEvents(entryId: number): Promise<types.EntryEvent[]> {
  const data = await dataService.getEntryHistory(entryId);
  return data.history;
}

/**
 * Returns chip details of a specified entry
 * @param entryId
 * @param eventNumber
 */
export async function findEntryChips(entryId: number): Promise<types.EntryChip[]> {
  const data = await dataService.getEntryHistory(entryId);
  return data.chips;
}

/**
 * Returns a details of a specified event
 * @param entryId
 * @param eventNumber
 */
export async function findEntryEvent(entryId: number, eventNumber: number): Promise<types.EntryEvent> {
  const data = await dataService.getEntryEventPicks(entryId, eventNumber);
  return data.entry_history;
}

/**
 * Returns a collection of picks for a specified event
 * @param entryId
 * @param event
 */
export async function findEntryPicksByEvent(entryId: number, event: number): Promise<types.EntryPick[]> {
  const data = await dataService.getEntryEventPicks(entryId, event);
  return data.picks;
}

/**
 * Returns transfer history of an entry
 * @param entryId
 */
export async function findEntryTransferHistory(entryId: number): Promise<types.EntryTransferHistory[]> {
  const data = await dataService.getEntryTransfers(entryId);
  return data.history;
}

/**
 * Returns all element data for a specified event
 * @param event
 */
export async function findElementsByEvent(event: number): Promise<types.EventElements> {
  const data = await dataService.getLiveEvent(event);
  return data.elements;
}

// *************
// League methods
// *************

/**
 * Returns specified league details
 * @param leagueId
 */
export async function findLeague(leagueId: number): Promise<types.League> {
  const data = await dataService.getClassicLeagueStandings(leagueId);
  return data.league;
}

/**
 * Returns specified league standings (top 50)
 * @param leagueId
 */
export async function findLeagueStandings(leagueId: number): Promise<types.LeagueResult[]> {
  const data = await dataService.getClassicLeagueStandings(leagueId);
  return data.standings.results;
}

// *************
// Other
// *************

/**
 * Returns a collection of all elements.
 */
export async function getElements(): Promise<types.Element[]> {
  const data = await dataService.getBootstrapData();
  return data.elements;
}

/**
 * Returns a collection of all element types in the game
 */
export async function getElementTypes(): Promise<types.ElementType[]> {
  const data = await dataService.getBootstrapData();
  return data.element_types;
}

/**
 * Returns a collection of all events
 */
export async function getEvents(): Promise<types.Event[]> {
  const data = await dataService.getBootstrapData();
  return data.events;
}

/**
 * Returns a collection of all teams
 */
export async function getTeams(): Promise<types.Team[]> {
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
