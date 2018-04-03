import { equal } from 'assert';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { expect } from 'chai';
import * as fs from 'fs';
import * as jsonfile from 'jsonfile';
import * as _ from 'lodash';
import 'mocha';
import * as sinon from 'sinon';

import * as dataService from '../data.service';

import { getFileNameFromUrl, writeMock } from '../../tasks/mock-generator/helpers';
import { Entry } from './entry.class';

const normalAxios = axios.create();

const mockDir = __dirname + `/../../mocks/methods`;

function readRawMock(name) {
  const dir = __dirname + `/../../mocks/raw`;
  return jsonfile.readFileSync(`${dir}/${name}.json`);
}

function readMethodMock(name) {
  return jsonfile.readFileSync(`${mockDir}/${name}.json`);
}

const mock = new MockAdapter(axios);

describe('Entry data:', () => {

  const entryId = 545548;

  mock
    .onGet('/bootstrap-static').reply(200, readRawMock('_bootstrap-static'))
    .onGet('/entry/545548/history').reply(200, readRawMock('_entry_545548_history'))
    .onGet(/\/entry\/545548\/event\/\d+\/picks/).reply((config) => {
      const file = config.url ? config.url.split('/').join('_') : {};
      return [200, readRawMock(file)];
    })
    .onGet(/\/event\/\d+\/live/).reply((config) => {
      const file = config.url ? config.url.split('/').join('_') : {};
      return [200, readRawMock(file)];
    })
    .onGet(/\/leagues-classic-standings\/\d+\?page=\d+/).reply((config) => {
      const file = config.url ? config.url.split('/').join('_') : {};
      return [200, readRawMock(file)];
    })
    .onGet('/entry/545548/transfers').reply(200, readRawMock('_entry_545548_transfers'))
    .onGet('/updating').reply(200, '<html><p>The game is being updated.</p></html>')
    .onGet('/error').reply(200, '<html></html>');

  it('should findEntry()', (done) => {
    Entry.getDetails(entryId).then((data) => {
      // writeMock(mockDir, 'findEntry', data);
      expect(data).to.deep.equal(readMethodMock('findEntry'));
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should findEntryEvents()', (done) => {
    Entry.getEvents(entryId).then((data) => {
      // writeMock(mockDir, 'findEntryEvents', data);
      expect(data).to.deep.equal(readMethodMock('findEntryEvents'));
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should findEntryChips()', (done) => {
    Entry.getChips(entryId).then((data) => {
      // writeMock(mockDir, 'findEntryChips', data);
      expect(data).to.deep.equal(readMethodMock('findEntryChips'));
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should findEntryEvent()', (done) => {
    Entry.getEvent(entryId, 1).then((data) => {
      // writeMock(mockDir, 'findEntryEvent', data);
      expect(data).to.deep.equal(readMethodMock('findEntryEvent'));
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should findEntryPicksByEvent()', (done) => {
    Entry.getPicksByEvent(entryId, 1).then((data) => {
      // writeMock(mockDir, 'findEntryPicksByEvent', data);
      expect(data).to.deep.equal(readMethodMock('findEntryPicksByEvent'));
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should findEntryTransferHistory', (done) => {
    Entry.getTransferHistory(entryId).then((data) => {
      // writeMock(mockDir, 'findEntryTransferHistory', data);
      expect(data).to.deep.equal(readMethodMock('findEntryTransferHistory'));
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should findEntryPicks()', (done) => {
    Entry.getPicks(entryId).then((data) => {
      // writeMock(mockDir, 'findEntryPicks', data);
      expect(data).to.deep.equal(readMethodMock('findEntryPicks'));
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should findEntryStats()', (done) => {
    Entry.getStats(entryId).then((data) => {
      writeMock(mockDir, 'findEntryStats', data);
      // expect(data).to.deep.equal(readMethodMock('findEntryStats'));
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

});
