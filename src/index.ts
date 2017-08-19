
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
    }).catch((e) => {
      reject(e);
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
    }).catch((e) => {
      reject(e);
    });
  });
}

/**
 * Returns a collection of completed gameweeks
 * @param entryId
 * @param gameweek
 */
export function findEntryGameweeks(entryId: number): Promise<types.EntryGameweek[]> {
  return new Promise((resolve, reject) => {
    dataService.getEntryHistory(entryId).then((data) => {
      resolve(data.history);
    }).catch((e) => {
      reject(e);
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
    }).catch((e) => {
      reject(e);
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
    }).catch((e) => {
      reject(e);
    });
  });
}

// *************
// Player methods
// *************

/**
 * Returns a collection of all players.
 */
export function findAllPlayers(): Promise<types.Player[]> {
  return new Promise((resolve, reject) => {
    dataService.getBootstrapData().then((data) => {
      resolve(data.elements);
    }).catch((e) => {
      reject(e);
    });
  });
}

/**
 * Returns stats for a specified player.
 */
export function findPlayer(playerId: number): Promise<types.Player> {
  return new Promise((resolve, reject) => {
    findAllPlayers().then((elements) => {
      const match = elements.find((element) => {
        return element.id === playerId;
      });
      resolve(match);
    }).catch((e) => {
      reject(e);
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
    }).catch((e) => {
      reject(e);
    });
  });
}

// *************
// Gameweek methods
// *************

/**
 * Returns a collection of all gameweeks
 */
export function findAllGameweeks(): Promise<types.Gameweek[]> {
  return new Promise((resolve, reject) => {
    dataService.getBootstrapData().then((data) => {
      resolve(data.events);
    }).catch((e) => {
      reject(e);
    });
  });
}

/**
 * Returns a specific gameweek
 * @param gameweek
 */
export function findGameweek(gameweek: number): Promise<types.Gameweek> {
  return new Promise((resolve, reject) => {
    findAllGameweeks().then((events) => {
      const match = events.find((event) => {
        return event.id === gameweek;
      });
      resolve(match);
    }).catch((e) => {
      reject(e);
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
    }).catch((e) => {
      reject(e);
    });
  });
}

// *************
// Team methods
// *************

/**
 * Returns a collection of all teams
 */
export function findAllTeams(): Promise<types.Team[]> {
  return new Promise((resolve, reject) => {
    dataService.getBootstrapData().then((data) => {
      resolve(data.teams);
    }).catch((e) => {
      reject(e);
    });
  });
}

/**
 * Returns a specified team
 * @param teamId
 */
export function findTeam(teamId: number): Promise<types.Team> {
  return new Promise((resolve, reject) => {
    findAllTeams().then((teams) => {
      const match = teams.find((team) => {
        return team.id === teamId;
      });
      resolve(match);
    }).catch((e) => {
      reject(e);
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
    }).catch((e) => {
      reject(e);
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
    }).catch((e) => {
      reject(e);
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
    }).catch((e) => {
      reject(e);
    });
  });
}

/**
 * Returns a specified player type
 */
export function getPlayerType(typeId: number): Promise<types.PlayerType> {
  return new Promise((resolve, reject) => {
    dataService.getElementTypes().then((data) => {
      const match = data.find((playerType) => {
        return playerType.id === typeId;
      });
      resolve(match);
    }).catch((e) => {
      reject(e);
    });
  });
}
