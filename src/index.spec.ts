import { equal } from 'assert';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { expect } from 'chai';
import * as fs from 'fs';
import * as jsonfile from 'jsonfile';
import * as _ from 'lodash';
import 'mocha';
import * as sinon from 'sinon';

import * as dataService from '../src/data.service';
import { Errors } from '../src/errors.enum';
import * as fplapi from '../src/index';
import { getFileNameFromUrl, writeMock } from '../tasks/mock-generator/helpers';

const normalAxios = axios.create();

const mockDir = __dirname + `/../mocks/methods`;

function readRawMock(name) {
  const dir = __dirname + `/../mocks/raw`;
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
    fplapi.findEntry(entryId).then((data) => {
      // writeMock(mockDir, 'findEntry', data);
      expect(data).to.deep.equal(readMethodMock('findEntry'));
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should findEntryEvents()', (done) => {
    fplapi.findEntryEvents(entryId).then((data) => {
      // writeMock(mockDir, 'findEntryEvents', data);
      expect(data).to.deep.equal(readMethodMock('findEntryEvents'));
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should findEntryChips()', (done) => {
    fplapi.findEntryChips(entryId).then((data) => {
      // writeMock(mockDir, 'findEntryChips', data);
      expect(data).to.deep.equal(readMethodMock('findEntryChips'));
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should findEntryEvent()', (done) => {
    fplapi.findEntryEvent(entryId, 1).then((data) => {
      // writeMock(mockDir, 'findEntryEvent', data);
      expect(data).to.deep.equal(readMethodMock('findEntryEvent'));
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should findEntryPicksByEvent()', (done) => {
    fplapi.findEntryPicksByEvent(entryId, 1).then((data) => {
      // writeMock(mockDir, 'findEntryPicksByEvent', data);
      expect(data).to.deep.equal(readMethodMock('findEntryPicksByEvent'));
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should findEntryTransferHistory', (done) => {
    fplapi.findEntryTransferHistory(entryId).then((data) => {
      // writeMock(mockDir, 'findEntryTransferHistory', data);
      expect(data).to.deep.equal(readMethodMock('findEntryTransferHistory'));
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should findEntryPicks()', (done) => {
    fplapi.findEntryPicks(entryId).then((data) => {
      // writeMock(mockDir, 'findEntryPicks', data);
      expect(data).to.deep.equal(readMethodMock('findEntryPicks'));
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should findEntryStats()', (done) => {
    fplapi.findEntryStats(entryId).then((data) => {
      writeMock(mockDir, 'findEntryStats', data);
      // expect(data).to.deep.equal(readMethodMock('findEntryStats'));
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

});

// Elements

describe('Elements data:', () => {

  it('should getElements()', (done) => {
    fplapi.getElements().then((data) => {
      // writeMock(mockDir, 'getElements', data);
      expect(data).to.deep.equal(readMethodMock('getElements'));
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should findElementsByEvent()', (done) => {
    fplapi.findElementsByEvent(1).then((data) => {
      // writeMock(mockDir, 'findElementsByEvent', data);
      expect(data).to.deep.equal(readMethodMock('findElementsByEvent'));
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

});

// Events

describe('Event data:', () => {

  it('should getEvents()', (done) => {
    fplapi.getEvents().then((data) => {
      writeMock(mockDir, 'getEvents', data);
      // expect(data).to.deep.equal(readMethodMock('getEvents'));
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

});

// Teams

describe('Team data:', () => {
  it('should getTeams()', (done) => {
    fplapi.getTeams().then((data) => {
      // writeMock(mockDir, 'getTeams', data);
      expect(data).to.deep.equal(readMethodMock('getTeams'));
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

});

// Leagues

describe('Leagues:', () => {

  it('should findLeague', (done) => {
    fplapi.findLeague(313).then((data) => {
      // writeMock(mockDir, 'findLeague', data);
      expect(data).to.deep.equal(readMethodMock('findLeague'));
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should findLeagueStandings()', (done) => {
    fplapi.findLeagueStandings(313).then((data) => {
      // writeMock(mockDir, 'findLeagueStandings-1', data);
      expect(data).to.deep.equal(readMethodMock('findLeagueStandings-1'));
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should findLeagueStandings() page 2', (done) => {
    fplapi.findLeagueStandings(313, 2).then((data) => {
      // writeMock(mockDir, 'findLeagueStandings-2', data);
      expect(data).to.deep.equal(readMethodMock('findLeagueStandings-2'));
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

});

// Utils

describe('General data:', () => {

  it('should getElementTypes()', (done) => {
    fplapi.getElementTypes().then((data) => {
      // writeMock(mockDir, 'getElementTypes', data);
      expect(data).to.deep.equal(readMethodMock('getElementTypes'));
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should getTotalNumberOfEntries()', (done) => {
    fplapi.getTotalNumberOfEntries().then((data) => {
      // writeMock(mockDir, 'getTotalNumberOfEntries', data);
      expect(data).to.deep.equal(readMethodMock('getTotalNumberOfEntries'));
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should getCurrentEventNumber()', (done) => {
    fplapi.getCurrentEventNumber().then((data) => {
      // writeMock(mockDir, 'getCurrentEventNumber', data);
      expect(data).to.deep.equal(readMethodMock('getCurrentEventNumber'));
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

});

describe('should handle errors: ', () => {

  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(dataService.cache, 'get').returns(null);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should throw error with correct message when game is updating', (done) => {
    dataService.fetch('/updating').then((data) => {
      done(new Error('An error was expected'));
    }).catch((e) => {
      if (e === Errors.GAME_UPDATING) {
        done();
      } else {
        done(new Error());
      }
    });
  });

  it('should throw error with correct message when endpoint not found', (done) => {
    dataService.fetch('/error').then((data) => {
      done(new Error('An error was expected'));
    }).catch((e) => {
      if (e === Errors.NOT_FOUND) {
        done();
      } else {
        done(new Error());
      }
    });
  });

  it('should catch error on findEntry()', (done) => {
    catchError(fplapi.findEntry(0), done);
  });

  it('should catch error on findEntryEvents()', (done) => {
    catchError(fplapi.findEntryEvents(0), done);
  });

  it('should catch error on findEntryChips()', (done) => {
    catchError(fplapi.findEntryChips(0), done);
  });

  it('should catch error on findEntryEvent()', (done) => {
    catchError(fplapi.findEntryEvent(0, 0), done);
  });

  it('should catch error on findEntryPicksByEvent()', (done) => {
    catchError(fplapi.findEntryPicksByEvent(0, 0), done);
  });

  it('should catch error on findEntryEvent()', (done) => {
    catchError(fplapi.findEntryTransferHistory(0), done);
  });

  it('should catch error on getEvents()', (done) => {
    catchError(fplapi.findEntryEvent(0, 0), done);
  });

  it('should catch error on findElementsByEvent()', (done) => {
    catchError(fplapi.findElementsByEvent(0), done);
  });

  it('should catch error on findLeague()', (done) => {
    catchError(fplapi.findLeague(0), done);
  });

  it('should catch error on findLeagueStandings()', (done) => {
    catchError(fplapi.findLeagueStandings(0), done);
  });

  it('should catch error on getElements()', (done) => {
    sandbox.stub(axios, 'get').returns(Promise.reject('error'));
    catchError(fplapi.getElements(), done);
  });

  it('should catch error on getEvents()', (done) => {
    sandbox.stub(axios, 'get').returns(Promise.reject('error'));
    catchError(fplapi.getEvents(), done);
  });

  it('should catch error on getTeams()', (done) => {
    sandbox.stub(axios, 'get').returns(Promise.reject('error'));
    catchError(fplapi.getTeams(), done);
  });

  it('should catch error on getElementTypes()', (done) => {
    sandbox.stub(axios, 'get').returns(Promise.reject('error'));
    catchError(fplapi.getElementTypes(), done);
  });

  it('should catch error on getTotalNumberOfEntries()', (done) => {
    sandbox.stub(axios, 'get').returns(Promise.reject('error'));
    catchError(fplapi.getTotalNumberOfEntries(), done);
  });

  it('should catch error on getCurrentEventNumber()', (done) => {
    sandbox.stub(axios, 'get').returns(Promise.reject('error'));
    catchError(fplapi.getCurrentEventNumber(), done);
  });

});

// helper methods

function catchError(p, done) {
  p.then((data) => {
    done(new Error('An error was expected'));
  }).catch((e) => {
    done();
  });
}
