/**
 * @module game
 */

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

export interface GameSummary {
  total_players: number;
  current_event: number;
  last_entry_event: number;
  next_event: number;
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
  squad_number: number;
  news: string;
  now_cost: number;
  chance_of_playing_this_round: number;
  chance_of_playing_next_round: number;
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

export interface PlayerType {
  id: number;
  singular_name: string;
  singular_name_short: string;
  plural_name: string;
  plural_name_short: string;
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
  form: any;
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
