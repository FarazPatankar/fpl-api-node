
import * as _ from 'lodash';

import { cache } from '../cache/cache.service';
import {
  Element,
  ElementType,
  EventElements,
  Gameweek,
  Team,
} from '../data/data.interfaces';
import * as dataService from '../data/data.service';

export class Utils {

  /**
   * Returns a collection of all elements.
   */
  public static async getElements(): Promise<Element[]> {
    const data = await dataService.fetchElements();
    return data;
  }

  /**
   * Returns all element data for a specified event
   * @param gameweek The event number
   */
  public static async getPlayersByGameweek(gameweek: number): Promise<EventElements> {
    const data = await dataService.fetchEventByNumber(gameweek);
    return data.elements;
  }

  /**
   * Returns a collection of all element types in the game
   */
  public static async getPlayerTypes(): Promise<ElementType[]> {
    const data = await dataService.getBootstrapData();
    return data.element_types;
  }

  /**
   * Returns a collection of all events
   */
  public static async getGameweeks(): Promise<Gameweek[]> {
    const data = await dataService.getBootstrapData();
    return data.events;
  }

  /**
   * Returns a collection of all teams
   */
  public static async getTeams(): Promise<Team[]> {
    const data = await dataService.getBootstrapData();
    return data.teams;
  }

  /**
   * Returns the total number of entries
   */
  public static async getTotalNumberOfEntries(): Promise<number> {
    const data = await dataService.getBootstrapData();
    return data['total-players'];
  }

  /**
   * Returns the current event number
   */
  public static async getCurrentEventNumber(): Promise<number> {
    const data = await dataService.getBootstrapData();
    return data['current-event'];
  }

}
