
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
      returnResponse(data.entry, resolve, reject);
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
    dataService.getEntryEventPicks(entryId, gameweek).then((data) => {
      returnResponse(data.entry_history, resolve, reject);
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
      returnResponse(data.history, resolve, reject);
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
    dataService.getEntryEventPicks(entryId, gameweek).then((data) => {
      returnResponse(data.picks, resolve, reject);
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
      returnResponse(data.history, resolve, reject);
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
export function getAllPlayers(): Promise<types.Player[]> {
  return new Promise((resolve, reject) => {
    dataService.getBootstrapData().then((data) => {
      returnResponse(data.elements, resolve, reject);
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
    getAllPlayers().then((elements) => {
      const match = elements.find((element) => {
        return element.id === playerId;
      });
      if (match) {
        resolve(match);
      } else {
        reject('fpl-api-node: Player not found');
      }
    });
  });
}

/**
 * Returns a stats for a specified gameweek
 */
export function findPlayerStatsByGameweek(playerId: number, gameweek: number): Promise<types.PlayerStats> {
  return new Promise((resolve, reject) => {
    dataService.getEventLive(gameweek).then((data) => {
      returnResponse(data.elements[playerId].stats, resolve, reject);
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
export function getAllGameweeks(): Promise<types.Gameweek[]> {
  return new Promise((resolve, reject) => {
    dataService.getBootstrapData().then((data) => {
      returnResponse(data.events, resolve, reject);
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
    getAllGameweeks().then((events) => {
      const match = events.find((event) => {
        return event.id === gameweek;
      });
      if (match) {
        resolve(match);
      } else {
        reject('fpl-api-node: Gameweek not found');
      }
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
      returnResponse(playerStatsMap, resolve, reject);
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
export function getAllTeams(): Promise<types.Team[]> {
  return new Promise((resolve, reject) => {
    dataService.getBootstrapData().then((data) => {
      returnResponse(data.teams, resolve, reject);
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
    getAllTeams().then((teams) => {
      const match = teams.find((team) => {
        return team.id === teamId;
      });
      if (match) {
        resolve(match);
      } else {
        reject('fpl-api-node: Team not found');
      }
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
      returnResponse(data.league, resolve, reject);
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
      returnResponse(data.standings.results, resolve, reject);
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
      returnResponse(data['total-players'], resolve, reject);
    }).catch((e) => {
      reject(e);
    });
  });
}

/**
 * Returns a collection of all player types in the game
 */
export function getAllPlayerTypes(): Promise<types.PlayerType[]> {
  return new Promise((resolve, reject) => {
    dataService.getBootstrapData().then((data) => {
      returnResponse(data.element_types, resolve, reject);
    }).catch((e) => {
      reject(e);
    });
  });
}

/**
 * Returns a specified player type
 */
export function findPlayerType(typeId: number): Promise<types.PlayerType> {
  return new Promise((resolve, reject) => {
    getAllPlayerTypes().then((playerTypes) => {
      const match = playerTypes.find((playerType) => {
        return playerType.id === typeId;
      });
      if (match) {
        resolve(match);
      } else {
        reject('fpl-api-node: Player type not found');
      }
    });
  });
}

/**
 * Catch undefined responses
 * @param value
 * @param resolve
 * @param reject
 */
function returnResponse(value, resolve, reject) {
  if (value) {
    resolve(value);
  } else {
    reject('fpl-api-node: Data error');
  }
}
