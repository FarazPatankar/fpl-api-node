
// entry interfaces

export interface EntryRoot {
  chips: EntryChip[];
  entry: EntryDetails;
  leagues: EntryLeagues;
  season: EntrySeason[];
  history: EntryEvent[];
}

export interface EntryPicksRoot {
  active_chip: string;
  automatic_subs: EntryAutomaticSub[];
  entry_history: EntryEvent;
  event: Event;
  picks: Pick[];
}

export interface EntryDetails {
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
  deleted: boolean;
  email: boolean;
  joined_time: Date;
  name: string;
  bank: number;
  value: number;
  kit: string;
  event_transfers: number;
  event_transfers_cost: number;
  extra_free_transfers: number;
  strategy?: any;
  favourite_team?: any;
  started_event: number;
  player: number;
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

export interface EntryChip {
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

export interface EntryEvent {
  id: number;
  movement: string;
  points: number;
  total_points: number;
  rank?: number;
  rank_sort?: number;
  overall_rank: number;
  targets?: any;
  event_transfers: number;
  event_transfers_cost: number;
  value: number;
  points_on_bench: number;
  bank: number;
  entry: number;
  event: number;
}

export interface EntryTransfers {
  wildcards: EntryWildcard[];
  entry: EntryDetails;
  leagues: EntryLeagues;
  history: EntryTransferHistory[];
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

/**
 * Custom interfaces
 */
export interface PickStatsHolder extends ElementStats {
  element: number;
  is_captain: boolean;
  is_sub: boolean;
}

export interface PlayerResult {
  yellow_cards: number;
  own_goals: number;
  goals_conceded: number;
  bonus: number;
  red_cards: number;
  saves: number;
  influence: number;
  bps: number;
  clean_sheets: number;
  assists: number;
  goals_scored: number;
  penalties_missed: number;
  total_points: number;
  penalties_saved: number;
  minutes: number;
  times_played: number;
  times_captained: number;
  times_benched: number;
  times_absent: number;
  total_captain_points: number;
  total_bench_points: number;
}

export interface EntryPick {
  id: number;
  name: string;
  type: number;
  stats: EntryPickStats;
}

export interface EntryPickStats extends PlayerResult {
  times_captained: number;
  total_captain_points: number;
  times_played: number;
  times_benched: number;
  total_bench_points: number;
  average_played: number;
  average_benched: number;
  average_captained: number;
}

export interface EntryStats {
  overall_rank: number;
  highest_gameweek_rank: number;
  lowest_gameweek_rank: number;
  overall_points: number;
  highest_score: number;
  lowest_score: number;
  average_score: number;
  total_transfer_cost: number;
  money_in_bank: number;
  total_value: number;
}

export interface ElementStats {
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

export interface EventElements {
  [key: number]: {
    stats: ElementStats;
  };
}
