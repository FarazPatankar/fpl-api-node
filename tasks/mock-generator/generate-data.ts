import axios from 'axios';
import * as _ from 'lodash';

import * as mockUtils from '../../test/test.utils';
import { writeMock } from './helpers';

const entryId = 545548;
const currentGameweek = 32;
const paths = [
  '/bootstrap-static',
  '/elements',
  '/entry/545548',
  '/entry/545548/history',
  '/entry/545548/transfers',
  '/leagues-classic-standings/313?page=1',
  '/leagues-classic-standings/313?page=2',
];

_.times(currentGameweek, (i) => {
  paths.push(`/entry/${entryId}/event/${i + 1}/picks`);
  paths.push(`/event/${i + 1}/live`);
});

const baseDir = __dirname + `/../../test/mocks/data`;

axios.defaults.baseURL = 'https://fantasy.premierleague.com/drf';

paths.forEach((path) => {
  axios.get(path).then((response) => {
    const outFile = mockUtils.getFileNameFromUrl(path);
    writeMock(baseDir, mockUtils.getFileNameFromUrl(path), response.data);
  });
});
