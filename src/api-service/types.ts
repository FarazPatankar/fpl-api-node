
export interface EntrySummary {
  /**
   * Unique entry id
   */
  id: number;
  /**
   * The name of the FPL managed team
   */
  name: string;
  /**
   * Managers first name
   */
  managerFirstName: string;
  managerLastName: string;
  regionName: string;
  regionIso: string;
  overallPoints: number;
  overallRank: number;
  gameweekPoints: number;
  gameweekRank: number;
  totalTransfers: number;
  moneyInBank: number;
  teamValue: number;
  gameweekTransfers: number;
  gameweekTransfersCost: number;
}

export interface EntryPick {
  /**
   * Players unique id
   */
  id: number;
  /**
   * Players name
   */
  name: string;
  /**
   * Player type id
   */
  type: number;
  timesBenched: number;
  timesCaptained: number;
  timesPlayed: number;
  timesInDreamteam: number;
  totalMinutes: number;
  totalPoints: number;
  totalCaptainPoints: number;
  totalAssists: number;
  totalBonus: number;
  totalCleanSheets: number;
  totalGoalsConceded: number;
  totalGoalsScored: number;
  totalOwnGoals: number;
  totalPenaltiesMissed: number;
  totalPenaltiesSaved: number;
  totalYellowCards: number;
  totalRedCards: number;
  totalSaves: number;
}

export interface EntryStats {
  averageScore: number;
  highestGameweekRank: number;
  highestGameweekScore: number;
  lowestGameweekRank: number;
  lowestGameweekScore: number;
  overallPoints: number;
  overallRank: number;
  rankPercentile: string;
  totalAssists: number;
  totalBonus: number;
  totalCleanSheets: number;
  totalGoals: number;
  totalRedCards: number;
  totalYellowCards: number;
}

export interface PlayerStats {
  assists: number;
  bonus: number;
  bps: number;
  cleanSheets: number;
  creativity: number;
  goalsConceded: number;
  goalsScored: number;
  ictIndex: number;
  inDreamteam: boolean;
  influence: number;
  minutes: number;
  ownGoals: number;
  penaltiesMissed: number;
  penaltiesSaved: number;
  redCards: number;
  saves: number;
  threat: number;
  totalPoints: number;
  yellowCards: number;
}
