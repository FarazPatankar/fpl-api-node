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
import { Utils } from '../utils/utils.class';

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

describe('Utils data:', () => {

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

  it('should getElements()', (done) => {
    Utils.getAllPlayers().then((data) => {
      // writeMock(mockDir, 'getElements', data);
      expect(data).to.deep.equal(readMethodMock('getElements'));
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

  it('should findElementsByEvent()', (done) => {
    Utils.getPlayersByEvent(1).then((data) => {
      // writeMock(mockDir, 'findElementsByEvent', data);
      expect(data).to.deep.equal(readMethodMock('findElementsByEvent'));
      done();
    }).catch((e) => {
      done(new Error(e));
    });
  });

});
