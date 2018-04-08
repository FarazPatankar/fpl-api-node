import axios from 'axios';
import * as rimraf from 'rimraf';
import Ast from 'ts-simple-ast';

import * as path from 'path';
import { writeMock } from './helpers';

import * as mockUtils from '../../test/test.utils';

import { Entry } from '../../src/entry/entry.class';
import { Game } from '../../src/game/game.class';
import { League } from '../../src/api/league';

const ast = new Ast();

ast.addSourceFilesFromTsConfig('tsconfig.json');

mockUtils.setMock();

const baseDir = path.join(__dirname, '/../../', 'test/mocks/methods');

const entryMockDir = `${baseDir}/entry`;
const utilsMockDir = `${baseDir}/game`;
const leagueMockDir = `${baseDir}/league`;

function generateEntryMocks() {
  mockUtils.doEntryMethods((method, params) => {
    Entry[method.getName()](...params).then((data) => {
      writeMock(entryMockDir, method.getName(), data);
    }).catch((e) => {
      console.log('Entry', method.getName(), e);
    });
  });
}

function generateUtilsMocks() {
  mockUtils.doUtilsMethods((method, params) => {
    Game[method.getName()](...params).then((data) => {
      writeMock(utilsMockDir, method.getName(), data);
    }).catch((e) => {
      console.log('Game', method.getName(), e);
    });
  });
}

function generateLeagueMocks() {
  mockUtils.doLeagueMethods((method, params) => {
    League[method.getName()](...params).then((data) => {
      writeMock(leagueMockDir, method.getName(), data);
    }).catch((e) => {
      console.log('League', method.getName(), e);
    });
  });
}

rimraf(entryMockDir, generateEntryMocks);
rimraf(utilsMockDir, generateUtilsMocks);
rimraf(leagueMockDir, generateLeagueMocks);
