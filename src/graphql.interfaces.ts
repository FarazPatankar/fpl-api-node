import {
  AutomaticSub, Chip, Element, ElementType, Entry, EntryTransfersRootObject,
  EventRootObject, Leagues, Pick, PicksRootObject, Season, Stats, Team,
} from './api.interfaces';

export interface FplRootObject {
  elements: Element[];
  current_event: number;
  total_players: number;
  teams: Team[];
  element_types: ElementType[];
  events: Event[];
}

export interface EntryRootObject {
  chips: Chip[];
  entry: Entry;
  leagues: Leagues;
  season: Season[];
  history: History[];
  transfers: EntryTransfersRootObject;
  picks: PicksRootObject[];
}

export interface EntryPicksRootObject {
  chips: Chip[];
  entry: Entry;
  leagues: Leagues;
  season: Season[];
  history: History[];
  transfers: EntryTransfersRootObject;
  picks: PicksRootObject[];
}
