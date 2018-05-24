
import * as async from 'async';
import * as interfaces from './api.interfaces';
import * as dataService from './data/data.service';

import { entry } from './index';

export const entryResolvers = {

  entry(obj, args, context) {
    return dataService.fetchEntryRoot(obj).then((data) => {
      return data.entry;
    });
  },

  history(obj, args, context) {
    return dataService.fetchEntryRoot(obj).then((data) => {
      return data.history;
    });
  },

  chips(obj, args, context) {
    return dataService.fetchEntryRoot(obj).then((data) => {
      return data.chips;
    });
  },

  leagues(obj, args, context) {
    return dataService.fetchEntryRoot(obj).then((data) => {
      return data.leagues;
    });
  },

  season(obj, args, context) {
    return dataService.fetchEntryRoot(obj).then((data) => {
      return data.season;
    });
  },

  transfers(obj, args, context) {
    return dataService.fetchEntryTransfers(obj).then((data) => {
      return data;
    });
  },

  picks(obj, args, context) {

    return new Promise((resolve, reject) => {

      dataService.fetchEntryRoot(obj).then((data) => {

        const picksArray = [];

        async.each(data.history, (gameweek, nextGameweek) => {

          dataService.fetchEntryPicksByGameweek(obj, gameweek.event).then((picks) => {
            picksArray.push(picks);
            nextGameweek();
          });

        }, (err) => {
          if (err) {
            reject();

          } else {
            resolve(picksArray);
          }

        });

      });

    });

  },
};
