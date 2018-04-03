import { equal } from 'assert';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import Ast from 'ts-simple-ast';

import * as dataService from '../src/data/data.service';
import * as mockUtils from './test.utils';

import { Entry, Utils } from '../src/index';

mockUtils.setMock();

describe('Entry', () => {
  mockUtils.doEntryMethods((method, params) => {
    doSpec(Entry, method, params, 'entry');
  });
});

describe('Utils', () => {
  mockUtils.doUtilsMethods((method, params) => {
    doSpec(Utils, method, params, 'utils');
  });
});

function doSpec(specClass: Entry | Utils, method, params, mockFolder) {
  it(`should ${method.getName()}()`, (done) => {
    specClass[method.getName()](...params).then((data) => {
      expect(data).to.deep.equal(mockUtils.readMethodMock(mockFolder, method.getName()));
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });
}
