import * as dataService from '../data.service';

import {
  Element,
  ElementType,
  EntryChip,
  EntryDetails,
  EntryEvent,
  EntryPick,
  EntryPickStats,
  EntryStats,
  EntryTransferHistory,
  Event,
  EventElements,
  League,
  LeagueStandings,
  Pick,
  PickStatsHolder,
  PlayerResult,
  Team,
} from '../interfaces';

export class Entry {

  /**
   * Returns entry summary / details.
   * @param entryId The id of entry
   */
  public static async getDetails(id: number): Promise<EntryDetails> {
    const data = await dataService.findEntryRoot(id);
    return data.entry;
  }

  /**
   * Returns a collection of completed or ongoing events
   * @param entryId The id of entry
   */
  public static async getEvents(id: number): Promise<EntryEvent[]> {
    const data = await dataService.findEntryRoot(id);
    return data.history;
  }

  /**
   * Returns chip details of a specified entry
   * @param entryId The id of entry
   * @param eventNumber The event number
   */
  public static async getChips(id: number): Promise<EntryChip[]> {
    const data = await dataService.findEntryRoot(id);
    return data.chips;
  }

  /**
   * Returns a details of a specified event
   * @param entryId The id of entry
   * @param eventNumber The event number
   */
  public static async getEvent(id: number, eventNumber: number): Promise<EntryEvent> {
    const data = await dataService.findEntryEventPicksRoot(id, eventNumber);
    return data.entry_history;
  }
}
