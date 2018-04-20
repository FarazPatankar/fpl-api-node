import * as async from 'async';
import * as _ from 'lodash';

import * as dataService from '../data/data.service';
import { EntryPick } from '../interfaces';

export function getPicks(entryId: number, event: number): Promise<EntryPick[]> {

  return new Promise((resolve, reject) => {

    Promise.all([
      dataService.fetchEventByNumber(event),
      dataService.fetchEntryPicksByGameweek(entryId, event),
    ]).then((result) => {

      const eventElements = result[0].elements;

      const picksRoot = result[1];

      const picks = picksRoot.picks;

      const pickDataArray: EntryPick[] = [];

      async.each(picks, (pick, nextPicks) => {

        const stats = eventElements[pick.element].stats;
        const item: EntryPick = {
          ...pick,
          stats,
        };

        pickDataArray.push(item);

        nextPicks();

      }, () => {
        resolve(pickDataArray);
      });

    });

  });

}
