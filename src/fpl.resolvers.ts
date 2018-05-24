
import * as interfaces from './api.interfaces';
import * as dataService from './data/data.service';

import { entry } from './index';

export const fplResolvers = {
  total_players(obj, args, context) {
    return dataService.fetchGameData().then((data) => {
      return data['total-players'];
    });
  },
  elements(obj, args, context) {
    return dataService.fetchGameData().then((data) => {
      return data.elements;
    });
  },
  teams(obj, args, context) {
    return dataService.fetchGameData().then((data) => {
      return data.teams;
    });
  },

};
