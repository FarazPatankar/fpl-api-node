
export interface Phase {
  id: number;
  name: string;
  start_event: number;
  stop_event: number;
}

export interface Element {
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
  news_added?: Date;
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

export interface Heading {
  category?: any;
  field: string;
  abbr?: any;
  label: string;
}

export interface Stats {
  headings: Heading[];
  categories?: any;
}

export interface Game {
  scoring_ea_index: number;
  league_prefix_public: string;
  bps_tackles: number;
  league_h2h_tiebreak: string;
  scoring_long_play: number;
  bps_recoveries_limit: number;
  facebook_app_id: string;
  bps_tackled: number;
  bps_errors_leading_to_goal: number;
  bps_yellow_cards: number;
  ui_el_hide_currency_qi: boolean;
  scoring_bonus: number;
  transfers_cost: number;
  default_formation: number[][];
  bps_long_play: number;
  bps_long_play_limit: number;
  scoring_assists: number;
  scoring_long_play_limit: number;
  fifa_league_id: number;
  league_size_classic_max: number;
  scoring_red_cards: number;
  scoring_creativity: number;
  game_timezone: string;
  static_game_url: string;
  currency_symbol: string;
  bps_target_missed: number;
  bps_penalties_saved: number;
  support_email_address: string;
  cup_start_event_id: number;
  scoring_penalties_saved: number;
  scoring_threat: number;
  scoring_saves: number;
  league_join_private_max: number;
  scoring_short_play: number;
  sys_use_event_live_api: boolean;
  scoring_concede_limit: number;
  bps_key_passes: number;
  bps_clearances_blocks_interceptions: number;
  bps_pass_percentage_90: number;
  bps_big_chances_missed: number;
  league_max_ko_rounds_h2h: number;
  bps_open_play_crosses: number;
  league_points_h2h_win: number;
  bps_saves: number;
  bps_cbi_limit: number;
  league_size_h2h_max: number;
  sys_vice_captain_enabled: boolean;
  squad_squadplay: number;
  bps_fouls: number;
  squad_squadsize: number;
  ui_selection_short_team_names: boolean;
  transfers_sell_on_fee: number;
  transfers_type: string;
  scoring_ict_index: number;
  bps_pass_percentage_80: number;
  bps_own_goals: number;
  scoring_yellow_cards: number;
  bps_pass_percentage_70: number;
  ui_show_home_away: boolean;
  ui_el_hide_currency_sy: boolean;
  bps_assists: number;
  squad_team_limit: number;
  league_points_h2h_draw: number;
  transfers_limit: number;
  bps_dribbles: number;
  bps_offside: number;
  sys_cdn_cache_enabled: boolean;
  currency_multiplier: number;
  bps_red_cards: number;
  bps_winning_goals: number;
  league_join_public_max: number;
  league_points_h2h_lose: number;
  currency_decimal_places: number;
  bps_errors_leading_to_goal_attempt: number;
  ui_selection_price_gap: number;
  bps_big_chances_created: number;
  ui_selection_player_limit: number;
  bps_attempted_passes_limit: number;
  scoring_penalties_missed: number;
  photo_base_url: string;
  scoring_bps: number;
  scoring_influence: number;
  bps_penalties_conceded: number;
  scoring_own_goals: number;
  squad_total_spend: number;
  bps_short_play: number;
  ui_element_wrap: number;
  bps_recoveries: number;
  bps_penalties_missed: number;
  scoring_saves_limit: number;
}

export interface GameSettings {
  game: Game;
  element_type: ElementType;
}

export interface CurrentEventFixture {
  is_home: boolean;
  day: number;
  event_day: number;
  month: number;
  id: number;
  opponent: number;
}

export interface Team {
  id: number;
  current_event_fixture: CurrentEventFixture[];
  next_event_fixture: any[];
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

export interface ElementType {
  id: number;
  singular_name: string;
  singular_name_short: string;
  plural_name: string;
  plural_name_short: string;
}

export interface StatsOption {
  name: string;
  key: string;
}

export interface Event {
  id: number;
  name: string;
  deadline_time: Date;
  average_entry_score: number;
  finished: boolean;
  data_checked: boolean;
  highest_scoring_entry: number;
  deadline_time_epoch: number;
  deadline_time_game_offset: number;
  deadline_time_formatted: string;
  highest_score: number;
  is_previous: boolean;
  is_current: boolean;
  is_next: boolean;
}

export interface FplRoot {
  phases: Phase[];
  elements: Element[];
  stats: Stats;
  'current-event': number;
  'total-players': number;
  teams: Team[];
  element_types: ElementType[];
  events: Event[];
  'next-event': number;
}
