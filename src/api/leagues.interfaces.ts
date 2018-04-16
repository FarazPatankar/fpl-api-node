/**
 * @module leagues
 */

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
