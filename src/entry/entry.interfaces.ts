/**
 * @module Entry
 */

import { Pick } from '../data/data.interfaces';
import { PlayerStats } from '../utils/utils.interfaces';

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

export interface Stats {
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

export interface Details {
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
