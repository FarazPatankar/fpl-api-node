
export interface EntryChip {
  played_time_formatted: string;
  status: string;
  name: string;
  time: Date;
  chip: number;
  entry: number;
  event: number;
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

export interface EntryGameweek {
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

export interface EntryPick {
  id: number;
  name: string;
  type: number;
  stats: EntryPickStats;
}

export interface EntryPickStats extends PickOverallStats {
  times_captained: number;
  total_captain_points: number;
  times_played: number;
  times_benched: number;
  total_bench_points: number;
  average_played: number;
  average_benched: number;
  average_captained: number;
}

export interface PickOverallStats {
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

export interface PickStats extends PickEventStats {
  element: number;
  is_captain: boolean;
  is_sub: boolean;
}

export interface EntryPickTemp {
  id: number;
  name: string;
  type: number;
  stats: PickStats;
}

export interface SeasonPick {
  element: number;
  position: number;
  is_captain: boolean;
  is_vice_captain: boolean;
  multiplier: number;
  stats: PickEventStats;
}

export interface Pick {
  element: number;
  element_type: number;
  web_name: string;
  position: number;
  is_captain: boolean;
  is_vice_captain: boolean;
  multiplier: number;
  stats: PickEventStats;
}

export interface PickEventStats {
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
