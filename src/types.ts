
export interface TransferHistory {
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

export interface ManagerStats {
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

export interface ManagerDetails {
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

export interface Chip {
  played_time_formatted: string;
  status: string;
  name: string;
  time: Date;
  chip: number;
  entry: number;
  event: number;
}

export interface Gameweek {
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
  picks: GameweekPick[];
}

export interface GameweekPick {
  element: number;
  position: number;
  is_captain: boolean;
  is_vice_captain: boolean;
  multiplier: number;
  stats: PlayerStats;
}

export interface SeasonPick {
  element: number;
  stats: SeasonPickStats;
}

export interface SeasonPickStats extends PlayerStats {
  average_played: number;
  average_benched: number;
  average_captained: number;
  times_played: number;
  times_captained: number;
  times_benched: number;
  times_absent: number;
  times_in_dreamteam: number;
  total_captain_points: number;
  total_bench_points: number;
}

export interface ClassicLeague {
  new_entries: ClassicLeagueStandings;
  league: ClassicLeagueDetails;
  standings: ClassicLeagueStandings;
  update_status: number;
}

export interface ClassicLeagueDetails {
  id: number;
  leagueban_set: any[];
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
  admin_entry?: any;
  start_event: number;
}

export interface ClassicLeagueStandings {
  has_next: boolean;
  number: number;
  results: LeagueResult[];
}

export interface LeagueResult {
  id: number;
  entry_name: string;
  event_total: number;
  player_name: string;
  movement: string;
  own_entry: boolean;
  rank: number;
  last_rank: number;
  rank_sort: number;
  total: number;
  entry: number;
  league: number;
  start_event: number;
  stop_event: number;
}

export interface GameSummary {
  total_players: number;
  current_event: number;
  last_entry_event: number;
  next_event: number;
}

export interface PlayerStats {
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

export interface PlayerStatsMap {
  [key: number]: PlayerStats;
}

export interface Player {
  id: number;
  photo: string;
  web_name: string;
  team_code: number;
  status: string;
  code: number;
  first_name: string;
  second_name: string;
  squad_number?: number;
  news: string;
  now_cost: number;
  chance_of_playing_this_round?: number;
  chance_of_playing_next_round?: number;
  value_form: string;
  value_season: string;
  cost_change_start: number;
  cost_change_event: number;
  cost_change_start_fall: number;
  cost_change_event_fall: number;
  in_dreamteam: boolean;
  dreamteam_count: number;
  selected_by_percent: string;
  form: string;
  transfers_out: number;
  transfers_in: number;
  transfers_out_event: number;
  transfers_in_event: number;
  loans_in: number;
  loans_out: number;
  loaned_in: number;
  loaned_out: number;
  total_points: number;
  event_points: number;
  points_per_game: string;
  ep_this: string;
  ep_next: string;
  special: boolean;
  minutes: number;
  goals_scored: number;
  assists: number;
  clean_sheets: number;
  goals_conceded: number;
  own_goals: number;
  penalties_saved: number;
  penalties_missed: number;
  yellow_cards: number;
  red_cards: number;
  saves: number;
  bonus: number;
  bps: number;
  influence: string;
  creativity: string;
  threat: string;
  ict_index: string;
  ea_index: number;
  element_type: number;
  team: number;
}

export interface Team {
  id: number;
  current_event_fixture: TeamFixture[];
  next_event_fixture: TeamFixture[];
  name: string;
  code: number;
  short_name: string;
  unavailable: boolean;
  strength: number;
  position: number;
  played: number;
  win: number;
  loss: number;
  draw: number;
  points: number;
  form?: any;
  link_url: string;
  strength_overall_home: number;
  strength_overall_away: number;
  strength_attack_home: number;
  strength_attack_away: number;
  strength_defence_home: number;
  strength_defence_away: number;
  team_division: number;
}

export interface TeamFixture {
  is_home: boolean;
  month: number;
  event_day: number;
  id: number;
  day: number;
  opponent: number;
}

export interface PlayerType {
  id: number;
  singular_name: string;
  singular_name_short: string;
  plural_name: string;
  plural_name_short: string;
}
