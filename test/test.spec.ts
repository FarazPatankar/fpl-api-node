import { equal } from 'assert';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import Ast from 'ts-simple-ast';

import * as dataService from '../src/data/data.service';
import * as mockUtils from './test.utils';

import { Entry, Game, League } from '../src/index';

mockUtils.setMock();

describe('Entry', () => {
  mockUtils.doEntryMethods((method, params) => {
    doSpec(Entry, method, params, 'entry');
  });
});

describe('League', () => {
  mockUtils.doLeagueMethods((method, params) => {
    doSpec(League, method, params, 'league');
  });
});

describe('Game', () => {
  mockUtils.doUtilsMethods((method, params) => {
    doSpec(Game, method, params, 'game');
  });
});

function doSpec(specClass: Entry | Game | League, method, params, mockFolder) {
  it(`should ${method.getName()}()`, (done) => {
    specClass[method.getName()](...params).then((data) => {
      expect(data).to.deep.equal(mockUtils.readMethodMock(mockFolder, method.getName()));
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });
}
