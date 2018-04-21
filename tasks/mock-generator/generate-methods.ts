
/**
 * This is a quick and dirty script to generate some responses.
 */

import * as path from 'path';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Ast from 'ts-simple-ast';

import * as testUtils from '../../test/test.utils';
import { writeMock } from './helpers';

import { entry, fpl, league } from '../../src/index';

const ast = new Ast();

ast.addSourceFilesFromTsConfig('tsconfig.json');

testUtils.setMock();

const baseDir = path.join(__dirname, '/../../', 'test/fixtures/methods');

const entryMockDir = `${baseDir}/entries`;
const utilsMockDir = `${baseDir}/game`;
const leagueMockDir = `${baseDir}/leagues`;

function generateEntryMocks() {
  testUtils.doEntryMethods((method, params) => {
    entry[method.getName()](...params).then((data) => {
      writeMock(entryMockDir, method.getName(), data);
    }).catch((e) => {
      console.log('entry:', method.getName(), e);
    });
  });
}

function generateUtilsMocks() {
  testUtils.doUtilsMethods((method, params) => {
    fpl[method.getName()](...params).then((data) => {
      writeMock(utilsMockDir, method.getName(), data);
    }).catch((e) => {
      console.log('game:', method.getName(), e);
    });
  });
}

function generateLeagueMocks() {
  testUtils.doLeagueMethods((method, params) => {
    league[method.getName()](...params).then((data) => {
      writeMock(leagueMockDir, method.getName(), data);
    }).catch((e) => {
      console.log('league:', method.getName(), e);
    });
  });
}

generateEntryMocks();
generateUtilsMocks();
generateLeagueMocks();
