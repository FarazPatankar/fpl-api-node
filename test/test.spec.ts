import { equal } from 'assert';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import Ast from 'ts-simple-ast';

import * as dataService from '../src/data/data.service';
import * as testUtils from './test.utils';

import {entries, game, leagues } from '../src/index';

testUtils.setMock();

describe('entries module', () => {
  testUtils.doEntryMethods((method, params) => {
    doSpec(entries, method, params, 'entries');
  });
});

describe('leagues module', () => {
  testUtils.doLeagueMethods((method, params) => {
    doSpec(leagues, method, params, 'leagues');
  });
});

describe('game module', () => {
  testUtils.doUtilsMethods((method, params) => {
    doSpec(game, method, params, 'game');
  });
});

function doSpec(module, method, params, mockFolder) {
  it(`should ${method.getName()}()`, (done) => {
    module[method.getName()](...params).then((data) => {
      expect(data).to.deep.equal(testUtils.readMethodMock(mockFolder, method.getName()));
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });
}
