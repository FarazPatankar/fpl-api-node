import * as async from 'async';
import * as _ from 'lodash';

import * as dataService from '../data/data.service';
import { EntryPick } from '../interfaces';

export function getEventPicks(entryId: number, event: number): Promise<EntryPick[]> {

  return new Promise((resolve, reject) => {

    Promise.all([
      dataService.fetchEventByNumber(event),
      dataService.fetchEntryPicksByGameweek(entryId, event),
      dataService.fetchGameData(),
    ]).then((result) => {

      const eventElements = result[0].elements;
      const picksRoot = result[1];
      const elements = _.keyBy(result[2].elements, 'id');
      const picks = picksRoot.picks;

      const captain = picks.find((pickx) => {
         return pickx.is_captain === true;
        });

     // console.log(captain.stats.total_points);

      const pickDataArray: EntryPick[] = [];

      async.each(picks, (pick, nextPicks) => {

        const element = elements[pick.element];
        const explain = eventElements[pick.element].explain;
        const stats = eventElements[pick.element].stats;

        const item: EntryPick = {
          ...pick,
          element_type: element.element_type,
          team_code: element.team_code,
          explain,
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
