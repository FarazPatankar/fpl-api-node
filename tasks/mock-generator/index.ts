import * as _ from 'lodash';
import { generate, getFileNameFromUrl, writeMock } from './helpers';

const entryId = 545548;
const currentGameweek = 31;
const paths = [
  '/bootstrap-static',
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

const baseDir = __dirname + `/../../mocks/raw`;

generate('https://fantasy.premierleague.com/drf', baseDir, paths);
