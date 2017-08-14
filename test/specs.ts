import 'mocha';

import * as fplapi from '../src/index';

describe('should return correct Entry data', () => {

  const entryId = 545548;

  it('should return entry summary', (done) => {
    fplapi.entries.getSummary(entryId).then((data) => {
      console.log('summary', data);
      done();
    });

  });

  it('should return entry stats', (done) => {

    fplapi.entries.getStats(entryId).then((data) => {
      console.log('stats', data);
      done();
    });

  });

  it('should return entry picks', (done) => {

        fplapi.entries.getPicks(entryId).then((data) => {
          console.log('pick 1', data[0]);
          done();
        });

      });

  it('should return entry pick', (done) => {

    fplapi.entries.getPick(entryId, 38).then((data) => {
      console.log('pick', data);
      done();
    });

  });

});
