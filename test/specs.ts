import { expect } from 'chai';
import 'mocha';
import * as fplapi from '../src/index';

describe('should return correct Entry data', () => {

  const entryId = 545548;

  it('should return entry', (done) => {
    fplapi.findEntry(entryId).then((data) => {
      expect(data.player_first_name).to.equal('Tom');
      expect(data.player_last_name).to.equal('Grey');
      done();
    });
  });

  it('should return entry gameweek', (done) => {
    fplapi.findEntryGameweek(entryId, 1).then((data) => {
      expect(data.entry).to.equal(entryId);
      expect(data.total_points).to.equal(69);
      done();
    });
  });

  it('should return entry picks', (done) => {
    fplapi.findEntryPicksByGameweek(entryId, 1).then((data) => {
      expect(data[0].element).to.equal(421);
      done();
    });
  });

  it('should return entry transfer history', (done) => {
    fplapi.findEntryTransferHistory(entryId).then((data) => {
      console.log(data);
      done();
    });
  });

});
