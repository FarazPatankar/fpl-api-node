
import * as dataService from '../data.service';

import {
  Element,
  ElementType,
  EventElements,

} from '../interfaces';

export class Utils {

  /**
   * Returns a collection of all elements.
   */
  public static async getAllPlayers(): Promise<Element[]> {
    const data = await dataService.getBootstrapData();
    return data.elements;
  }

  /**
   * Returns all element data for a specified event
   * @param event The event number
   */
  public static async getPlayersByEvent(event: number): Promise<EventElements> {
    const data = await dataService.findLiveEvent(event);
    return data.elements;
  }

  /**
   * Returns a collection of all element types in the game
   */
  public static async getPlayerTypes(): Promise<ElementType[]> {
    const data = await dataService.getBootstrapData();
    return data.element_types;
  }

}
