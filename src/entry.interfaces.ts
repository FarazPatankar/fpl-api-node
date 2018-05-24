export interface EntryBase {
  chips: Chip[];
  entry: Entry;
  leagues: EntryLeagues;
  season: EntrySeason[];
  history: EntryEvent[];
  transfers: EntryTransfers;
  /**
   * (number: Int)
   */
  picks: EntryPicksRoot;
}

export interface EntryTransfers {
  wildcards: EntryWildcard[];
  history: EntryTransferHistory[];
}

export interface EntryEvent {
  id: number;
  movement: string;
  points: number;
  total_points: number;
  rank: number;
  rank_sort: number;
  overall_rank: number;
  targets: any;
  event_transfers: number;
  event_transfers_cost: number;
  value: number;
  points_on_bench: number;
  bank: number;
  entry: number;
  event: number;
}

export interface Entry {
  id: number;
  player_first_name: string;
  player_last_name: string;
  player_region_id: number;
  player_region_name: string;
  player_region_short_iso: string;
  summary_overall_points: number;
  summary_overall_rank: number;
  summary_event_points: number;
  summary_event_rank: number;
  joined_seconds: number;
  current_event: number;
  total_transfers: number;
  total_loans: number;
  total_loans_active: number;
  transfers_or_loans: string;
  joined_time: Date;
  name: string;
  bank: number;
  value: number;
  kit: string;
  event_transfers: number;
  event_transfers_cost: number;
  extra_free_transfers: number;
  strategy: any;
  favourite_team: any;
  started_event: number;
  player: number;
}

export interface EntryLeagues {
  cup: EntryLeague[];
  h2h: EntryLeague[];
  classic: EntryLeague[];
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

export interface Chip {
  played_time_formatted: string;
  status: string;
  name: string;
  time: Date;
  chip: number;
  entry: number;
  event: number;
}
export interface EntrySeason {
  id: number;
  season_name: string;
  total_points: number;
  rank: number;
  season: number;
  player: number;
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

export interface EntryTransferHistory {
  id: number;
  time_formatted: string;
  time: Date;
  element_in_cost: number;
  element_out_cost: number;
  element_in: number;
  element_out: number;
  entry: number;
  event: number;
}

export interface EntryPicksRoot {
  active_chip: string;
  automatic_subs: EntryAutomaticSub[];
  entry_history: EntryEvent;
  picks: EntryPick[];
}

export interface EntryAutomaticSub {
  id: number;
  element_in: number;
  element_out: number;
  entry: number;
  event: number;
}

export interface EntryPick {
  element: number;
  position: number;
  is_captain: boolean;
  multiplier: number;
  is_vice_captain: boolean;
}

export interface EntryPickStats {
  yellow_cards: number;
  own_goals: number;
  creativity: number;
  goals_conceded: number;
  bonus: number;
  red_cards: number;
  saves: number;
  influence: number;
  bps: number;
  clean_sheets: number;
  assists: number;
  ict_index: number;
  goals_scored: number;
  threat: number;
  penalties_missed: number;
  total_points: number;
  penalties_saved: number;
  in_dreamteam: boolean;
  minutes: number;
}
