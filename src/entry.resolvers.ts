
import * as async from 'async';
import * as interfaces from './api.interfaces';
import * as dataService from './data/data.service';

export const entryResolvers = {

  entry(obj, args, context) {
    console.log('ID 1', obj);
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

};
