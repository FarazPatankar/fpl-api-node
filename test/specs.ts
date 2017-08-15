import { expect } from 'chai';
import 'mocha';
import * as fplapi from '../src/index';

describe('should return correct Entry data', () => {

  const entryId = 545548;

  it('should return entry', (done) => {
    fplapi.getEntry(entryId).then((data) => {
      expect(data.player_first_name).to.equal('Tom');
      expect(data.player_last_name).to.equal('Grey');
      done();
    });
  });

});
