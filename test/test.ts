
import axios from 'axios';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { cache } from '../src/cache/cache.service';
import { ErrorCode } from '../src/data/data.errors';
import * as dataService from '../src/data/data.service';
import {entry, fpl, league } from '../src/index';
import * as testUtils from './test.utils';

testUtils.setMock();

describe('entries module', () => {
  testUtils.doEntryMethods((method, params) => {
    doSpec(entry, method, params, 'entries');
  });
});

describe('leagues module', () => {
  testUtils.doLeagueMethods((method, params) => {
    doSpec(league, method, params, 'leagues');
  });
});

describe('game module', () => {
  testUtils.doUtilsMethods((method, params) => {
    doSpec(fpl, method, params, 'game');
  });
});

describe('should handle errors: ', () => {

  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(cache, 'get').returns(null);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should throw error with correct message when game is updating', (done) => {
    dataService.fetch('/updating').then((data) => {
      done(new Error('An error was expected'));
    }).catch((e) => {
      if (e.code === ErrorCode.GAMEUPDATING) {
        done();
      } else {
        done(new Error(`Incorrect error: ${e}`));
      }
    });
  });

  it('should throw error with correct message when endpoint not found', (done) => {
    dataService.fetch('/error').then((data) => {
      done(new Error('An error was expected'));
    }).catch((e) => {
      if (e.code === ErrorCode.NOTFOUND) {
        done();
      } else {
        done(new Error(`Incorrect error: ${e}`));
      }
    });
  });

  it('should throw error with correct message when no response from FPL', (done) => {
    sandbox.stub(axios, 'get').rejects('goodbye');
    dataService.fetch('/elements').then((data) => {
      done(new Error('An error was expected'));
    }).catch((e) => {
      if (e.code === ErrorCode.NORESPONSE) {
        done();
      } else {
        done(new Error(`Incorrect error: ${e}`));
      }
    });
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

function doSpec(module, method, params, mockFolder) {
  it(`should ${method.getName()}()`, (done) => {
    module[method.getName()](...params).then((data) => {
      const expectedData = testUtils.readMethodMock(mockFolder, method.getName());
      expect(expectedData).to.eql(data);
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });
}
