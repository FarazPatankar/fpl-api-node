import { ElementStats } from './interfaces.fpl';

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
