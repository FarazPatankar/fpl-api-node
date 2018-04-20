/**
 * @module game
 */

import * as _ from 'lodash';

import * as dataService from '../data/data.service';
import { FplGameweek, FplPlayer, FplPlayerType, FplSummary, FplTeam, PlayerStatsMap } from '../interfaces';

/**
 * Returns the total number of entries
 */
export async function getSummary(): Promise<FplSummary> {
  const data = await dataService.fetchGameData();
  const summary = {
    total_players: data['total-players'],
    current_event: data['current-event'],
    last_entry_event: data['last-entry-event'],
    next_event: data['next-event'],
  };
  return summary;
}

/**
 * Returns a collection of all players.
 */
export async function getPlayers(): Promise<FplPlayer[]> {
  const data = await dataService.fetchGameData();
  return data.elements;
}

/**
 * Returns a collection of all player types in the game
 */
export async function getPlayerTypes(): Promise<FplPlayerType[]> {
  const data = await dataService.fetchGameData();
  return data.element_types;
}

/**
 * Returns a collection of all gameweeks
 */
export async function getGameweeks(): Promise<FplGameweek[]> {
  const data = await dataService.fetchGameData();
  return data.events;
}

/**
 * Returns a collection of all teams
 */
export async function getTeams(): Promise<FplTeam[]> {
  const data = await dataService.fetchGameData();
  return data.teams;
}
