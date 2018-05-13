// public

export interface EntryOverview {
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

export interface EntryChip {
  played_time_formatted: string;
  status: string;
  name: string;
  time: Date;
  chip: number;
  entry: number;
  event: number;
}

export interface EntryClub {
  team_code: number;
  total_points: number;
  players_selected: number;
  picks: EntryPick[];
}

export interface EntryGameweek {
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

export interface EntryPick {
  element: number;
  element_type: number;
  position?: number;
  is_captain?: boolean;
  multiplier?: number;
  is_vice_captain?: boolean;
  stats: EntryPickStats;
  explain?: any;
  team_code: number;
  event: number;
}

export interface EntryPickExplain {
  [key: string]: Array<{
    points: number;
    name: string;
    value: number;
  }>;
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

  average_played?: number;
  average_benched?: number;
  average_captained?: number;
  times_played?: number;
  times_captained?: number;
  times_benched?: number;
  times_absent?: number;
  times_in_dreamteam?: number;
  total_captain_points?: number;
  total_bench_points?: number;
}

export interface EntrySeasonStats {
  highest_gameweek_rank: number;
  lowest_gameweek_rank: number;
  highest_overall_rank: number;
  lowest_overall_rank: number;
  highest_gameweek_score: number;
  lowest_gameweek_score: number;
  average_score: number;
  total_transfer_cost: number;
  transfer_hits: number;

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

export interface FplSummary {
  total_players: number;
  current_event: number;
  last_entry_event: number;
  next_event: number;
}

export interface FplPlayer {
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

export interface FplPlayerType {
  id: number;
  singular_name: string;
  singular_name_short: string;
  plural_name: string;
  plural_name_short: string;
}

export interface FplTeam {
  id: number;
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

export interface FplGameweek {
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

export interface League {
  new_entries: LeagueStandings;
  league: LeagueOverview;
  standings: LeagueStandings;
  update_status: number;
}

export interface LeagueOverview {
  id: number;
  leagueban_set: any[];
  name: string;
  short_name: string;
  created: Date;
  closed: boolean;
  forum_disabled: boolean;
  make_code_public: boolean;
  rank: any;
  size: any;
  league_type: string;
  _scoring: string;
  reprocess_standings: boolean;
  admin_entry: any;
  start_event: number;
}

export interface LeagueStandings {
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

// private
export interface GameData {
  phases: Phase[];
  elements: FplPlayer[];
  'total-players': number;
  'current-event': number;
  'next-event': number;
  'last-entry-event': number;
  teams: FplTeam[];
  element_types: FplPlayerType[];
  events: FplGameweek[];
  stats: {
    headings: Array<{
      field: string;
      label: string;
      category: string;
      abbr: string;
    }>,
  };
}

export interface FplStatHeadings {
  field: string;
  label: string;
}

export interface EntryRoot {
  chips: EntryChip[];
  entry: EntryOverview;
  leagues: EntryLeagues;
  season: EntrySeason[];
  history: EntryGameweek[];
}

export interface EntryPicksRoot {
  active_chip: string;
  automatic_subs: EntryAutomaticSub[];
  entry_history: EntryGameweek;
  event: FplGameweek;
  picks: EntryPick[];
}

export interface Phase {
  id: number;
  name: string;
  start_event: number;
  stop_event: number;
}

export interface League {
  new_entries: LeagueStandings;
  league: LeagueOverview;
  standings: LeagueStandings;
  update_status: number;
}
/*
export interface EntryGameweekPick {
  element: number;
  position: number;
  is_captain: boolean;
  is_vice_captain: boolean;
  multiplier: number;
}*/

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
  entry: EntryOverview;
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
  [key: number]: EventElement;
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
    [key: string]: EntryPickExplain;
  }>;
  stats: PlayerStats;
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
