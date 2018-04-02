
import * as path from 'path';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as rimraf from 'rimraf';
import Ast from 'ts-simple-ast';

import { writeMock } from './helpers';

import * as testUtils from '../../test/test.utils';

import { entries, game, leagues } from '../../src/index';

const ast = new Ast();

ast.addSourceFilesFromTsConfig('tsconfig.json');

testUtils.setMock();

const baseDir = path.join(__dirname, '/../../', 'test/fixtures/methods');

const entryMockDir = `${baseDir}/entries`;
const utilsMockDir = `${baseDir}/game`;
const leagueMockDir = `${baseDir}/leagues`;

function generateEntryMocks() {
  testUtils.doEntryMethods((method, params) => {
    entries[method.getName()](...params).then((data) => {
      writeMock(entryMockDir, method.getName(), data);
    }).catch((e) => {
      console.log('entries:', method.getName(), e);
    });
  });
}

function generateUtilsMocks() {
  testUtils.doUtilsMethods((method, params) => {
    game[method.getName()](...params).then((data) => {
      writeMock(utilsMockDir, method.getName(), data);
    }).catch((e) => {
      console.log('game:', method.getName(), e);
    });
  });
}

function generateLeagueMocks() {
  testUtils.doLeagueMethods((method, params) => {
    leagues[method.getName()](...params).then((data) => {
      writeMock(leagueMockDir, method.getName(), data);
    }).catch((e) => {
      console.log('leagues:', method.getName(), e);
    });
  });
}

rimraf(entryMockDir, generateEntryMocks);
rimraf(utilsMockDir, generateUtilsMocks);
rimraf(leagueMockDir, generateLeagueMocks);
