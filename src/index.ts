
import * as dataService from './data-service';
import * as types from './types';

// *************
// Entry methods
// *************

/**
 * Returns entry summary.
 * @param entryId The unique id of entry
 */
export function findEntry(entryId: number): Promise<types.Entry> {
  return new Promise((resolve, reject) => {
    dataService.getEntryHistory(entryId).then((data) => {
      resolve(data.entry);
    });
  });
}

/**
 * Returns a details of a specified gameweek
 * @param entryId
 * @param gameweek
 */
export function findEntryGameweek(entryId: number, gameweek: number): Promise<types.EntryGameweek> {
  return new Promise((resolve, reject) => {
    dataService.getEntryEvent(entryId, gameweek).then((data) => {
      resolve(data.entry_history);
    });
  });
}

/**
 * Returns a collection of picks for a specified gameweek
 * @param entryId
 * @param gameweek
 */
export function findEntryPicksByGameweek(entryId: number, gameweek: number): Promise<types.EntryPick[]> {
  return new Promise((resolve, reject) => {
    dataService.getEntryEvent(entryId, gameweek).then((data) => {
      resolve(data.picks);
    });
  });
}

/**
 * Returns transfer history of an entry
 * @param entryId
 */
export function findEntryTransferHistory(entryId: number): Promise<types.EntryTransferHistory[]> {
  return new Promise((resolve, reject) => {
    dataService.getEntryTransfers(entryId).then((data) => {
      resolve(data.history);
    });
  });
}

// *************
// Player methods
// *************

/**
 * Returns a collection of all players.
 */
export function findPlayers(): Promise<types.Player[]> {
  return new Promise((resolve, reject) => {
    dataService.getBootstrapData().then((data) => {
      resolve(data.elements);
    });
  });
}

/**
 * Returns stats for a specified player.
 */
export function findPlayer(playerId: number): Promise<types.Player> {
  return new Promise((resolve, reject) => {
    findPlayers().then((elements) => {
      const match = elements.find((element) => {
        return element.id === playerId;
      });
      resolve(match);
    });
  });
}

/**
 * Returns a stats for a specified gameweek
 */
export function findPlayerStatsByGameweek(playerId: number, gameweek: number): Promise<types.PlayerStats> {
  return new Promise((resolve, reject) => {
    dataService.getEventLive(gameweek).then((data) => {
      resolve(data.elements[playerId].stats);
    });
  });
}

// *************
// Gameweek methods
// *************

/**
 * Returns a collection of all gameweeks
 */
export function findGameweeks(): Promise<types.Gameweek[]> {
  return new Promise((resolve, reject) => {
    dataService.getBootstrapData().then((data) => {
      resolve(data.events);
    });
  });
}

/**
 * Returns a specific gameweek
 * @param gameweek
 */
export function findGameweek(gameweek: number): Promise<types.Gameweek> {
  return new Promise((resolve, reject) => {
    findGameweeks().then((events) => {
      const match = events.find((event) => {
        return event.id === gameweek;
      });
      resolve(match);
    });
  });
}

/**
 * Returns a specific gameweek
 * @param gameweek
 */
export function findGameweekPlayerStats(gameweek: number): Promise<types.PlayerStatsMap> {
  return new Promise((resolve, reject) => {
    dataService.getEventLive(gameweek).then((data) => {
      const playerStatsMap = Object.keys(data.elements).map((key) => {
        return data.elements[key].stats;
      });
      resolve(playerStatsMap);
    });
  });
}

// *************
// Team methods
// *************

/**
 * Returns a collection of all teams
 */
export function findTeams(): Promise<types.Team[]> {
  return new Promise((resolve, reject) => {
    dataService.getBootstrapData().then((data) => {
      resolve(data.teams);
    });
  });
}

/**
 * Returns a specified team
 * @param teamId
 */
export function findTeam(teamId: number): Promise<types.Team> {
  return new Promise((resolve, reject) => {
    findTeams().then((teams) => {
      const match = teams.find((team) => {
        return team.id === teamId;
      });
      resolve(match);
    });
  });
}

// *************
// League methods
// *************

/**
 * Returns specified league details
 * @param leagueId
 */
export function findLeague(leagueId: number): Promise<types.League> {
  return new Promise((resolve, reject) => {
    dataService.getClassicLeagueStandings(leagueId).then((data) => {
      resolve(data.league);
    });
  });
}

/**
 * Returns specified league standings (top 50)
 * @param leagueId
 */
export function findLeagueResults(leagueId: number): Promise<types.LeagueResult[]> {
  return new Promise((resolve, reject) => {
    dataService.getClassicLeagueStandings(leagueId).then((data) => {
      resolve(data.standings.results);
    });
  });
}

// *************
// Utils methods
// *************

/**
 * Returns the total number of entries
 */
export function getTotalNumberOfEntries(): Promise<number> {
  return new Promise((resolve, reject) => {
    dataService.getBootstrapData().then((data) => {
      resolve(data['total-players']);
    });
  });
}

/**
 * Returns collection of player types
 */
export function getPlayerTypes(): Promise<types.PlayerType[]> {
  return new Promise((resolve, reject) => {
    dataService.getBootstrapData().then((data) => {
      resolve(data.element_types);
    });
  });
}

/**
 * Returns a specified player type
 */
export function getPlayerType(typeId: number): Promise<types.PlayerType> {
  return new Promise((resolve, reject) => {
    getPlayerTypes().then((playerTypes) => {
      const match = playerTypes.find((playerType) => {
        return playerType.id === typeId;
      });
      resolve(match);
    });
  });
}
