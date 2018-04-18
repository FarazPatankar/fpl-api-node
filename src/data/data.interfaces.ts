import * as entryInterfaces from '../api/entries/entries.interfaces';
import * as gameInterfaces from '../api/game/game.interfaces';
import * as leagueInterfaces from '../api/leagues/leagues.interfaces';

export interface BootstrappedData {
  phases: Phase[];
  elements: gameInterfaces.Player[];
  'total-players': number;
  'current-event': number;
  'next-event': number;
  'last-entry-event': number;
  teams: gameInterfaces.Team[];
  element_types: gameInterfaces.PlayerType[];
  events: gameInterfaces.Event[];
}

export interface EntryRoot {
  chips: entryInterfaces.Chip[];
  entry: entryInterfaces.Manager;
  leagues: EntryLeagues;
  season: EntrySeason[];
  history: entryInterfaces.Gameweek[];
}

export interface EntryPicksRoot {
  active_chip: string;
  automatic_subs: EntryAutomaticSub[];
  entry_history: entryInterfaces.Gameweek;
  event: gameInterfaces.Event;
  picks: Pick[];
}

export interface Phase {
  id: number;
  name: string;
  start_event: number;
  stop_event: number;
}

export interface ClassicLeague {
  new_entries: leagueInterfaces.ClassicLeagueStandings;
  league: leagueInterfaces.ClassicLeagueDetails;
  standings: leagueInterfaces.ClassicLeagueStandings;
  update_status: number;
}

export interface Pick {
  element: number;
  position: number;
  is_captain: boolean;
  is_vice_captain: boolean;
  multiplier: number;
}

export interface EntryState {
  event: number;
  sub_state: string;
  event_day: number;
  deadline_time: Date;
  deadline_time_formatted: string;
}

export interface EntryAutomaticSub {
  id: number;
  element_in: number;
  element_out: number;
  entry: number;
  event: number;
}

export interface EntryLeague {
  id: number;
  entry_rank: number;
  entry_last_rank: number;
  entry_movement: string;
  entry_change?: any;
  entry_can_leave: boolean;
  entry_can_admin: boolean;
  entry_can_invite: boolean;
  entry_can_forum: boolean;
  entry_code: string;
  name: string;
  short_name: string;
  created: Date;
  closed: boolean;
  forum_disabled: boolean;
  make_code_public: boolean;
  rank?: any;
  size?: any;
  league_type: string;
  _scoring: string;
  reprocess_standings: boolean;
  admin_entry?: number;
  start_event: number;
}

export interface EntryLeagues {
  cup: EntryLeague[];
  h2h: EntryLeague[];
  classic: EntryLeague[];
}

export interface EntrySeason {
  id: number;
  season_name: string;
  total_points: number;
  rank: number;
  season: number;
  player: number;
}

export interface EntryTransfers {
  wildcards: EntryWildcard[];
  entry: entryInterfaces.Manager;
  leagues: EntryLeagues;
  history: entryInterfaces.TransferHistory[];
}

export interface EntryWildcard {
  played_time_formatted: string;
  status: string;
  name: string;
  time: Date;
  chip: number;
  entry: number;
  event: number;
}

export interface Fixture {
  id: number;
  kickoff_time_formatted: string;
  started: boolean;
  event_day: number;
  deadline_time: Date;
  deadline_time_formatted: string;
  stats: FixtureStats;
  code: number;
  kickoff_time: Date;
  team_h_score: number;
  team_a_score: number;
  finished: boolean;
  minutes: number;
  provisional_start_time: boolean;
  finished_provisional: boolean;
  event: number;
  team_a: number;
  team_h: number;
}

export interface FixtureStats {
  goals_scored: FixtureStatHomeAndAway;
  assists: FixtureStatHomeAndAway;
  own_goals: FixtureStatHomeAndAway;
  penalties_saved: FixtureStatHomeAndAway;
  penalties_missed: FixtureStatHomeAndAway;
  yellow_cards: FixtureStatHomeAndAway;
  red_cards: FixtureStatHomeAndAway;
  saves: FixtureStatHomeAndAway;
  bonus: FixtureStatHomeAndAway;
  bps: FixtureStatHomeAndAway;
}

export interface FixtureStatHomeAndAway {
  a: FixtureStatValue[];
  h: FixtureStatValue[];
}

export interface FixtureStatValue {
  value: number;
  element: number;
}

export interface LiveEvent {
  fixtures: Fixture[];
  elements: EventElements;
}

export interface EventElements {
  [key: number]: {
    stats: gameInterfaces.PlayerStats;
  };
}

export interface EventPointSource {
  [key: string]: {
    points: number;
    name: string;
    value: number;
  };
}

export interface EventElement {
  explain: Array<{
    [key: string]: {
      points: number;
      name: string;
      value: number;
    };
  }>;
  stats: gameInterfaces.PlayerStats;
}

export interface Formations {
  '1-5-2-3': number[][];
  '1-5-3-2': number[][];
  '1-3-5-2': number[][];
  '1-2-5-3': number[][];
  '1-4-5-1': number[][];
  '1-5-4-1': number[][];
  '1-4-3-3': number[][];
  '1-3-4-3': number[][];
  '1-4-4-2': number[][];
}
