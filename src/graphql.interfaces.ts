/**
 * This file represents our graphQl types as typescript definitions
 */

import {
  AutomaticSub, Chip, Element, ElementType, Entry, EntryTransfersRootObject,
  EventRootObject, Leagues, Pick, PicksRootObject, Season, Stats, Team,
} from './api.interfaces';

export interface Query {
  /**
   * (entryId: Int)
   */
  manager: ManagerRootObject;
  /**
   * (entryId: Int)
   */
  picks: PicksRootObject;
}

export interface ManagerRootObject {
  chips: Chip[];
  entry: Entry;
  leagues: Leagues;
  season: Season[];
  history: History[];
}

export interface PicksRootObject {
  active_chip: string;
  automatic_subs: AutomaticSub[];
  event: Event;
  picks: [Pick];
}
