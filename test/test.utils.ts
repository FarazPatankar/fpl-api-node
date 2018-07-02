
import MockAdapter from 'axios-mock-adapter';
import * as jsonfile from 'jsonfile';
import Ast from 'ts-simple-ast';

const ast = new Ast();

ast.addSourceFilesFromTsConfig('tsconfig.json');

const mockDir = __dirname + `/fixtures/methods`;

export function readRawMock(name) {
  const dir = __dirname + `/fixtures/data`;
  console.log('HELLOI');
  return jsonfile.readFileSync(`${dir}/${name}.json`);
}

export function getFileNameFromUrl(url) {
  return url.replace(/(^\w+:|^)\/\//, '').split('/').join('_');
}

export function readMethodMock(folder, name) {
  return jsonfile.readFileSync(`${mockDir}/${folder}/${name}.json`);
}

export function setMock(axios) {

  const mock = new MockAdapter(axios);
  /// entry/544548/history
  mock
    .onGet('/bootstrap-static').reply(200, readRawMock('_bootstrap-static'))
    .onGet('/entry/545548/history').reply(200, readRawMock('_entry_545548_history'))
    .onGet(/\/entry\/545548\/event\/\d+\/picks/).reply((config) => {
      const file = config.url ? config.url.split('/').join('_') : {};
      console.log(file);
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
    .onGet('/updating').reply(200, '<html><body><p>The game is being updated.</p></body></html>')
    .onGet('/error').reply(200, '<html><p>Page not found</p></html>');

}

function getMethods(sourceFileName) {

  const sourceFile = ast.getSourceFile(sourceFileName);

  return sourceFile.getFunctions();
}

export function doEntryMethods(callback) {

  const methods = getMethods('src/api/api.entry.ts');

  const entryId = 545548;

  methods.forEach((method) => {

    const params = method.getParameters().map((param) => {

      if (param.getName() === 'entryId') {
        return entryId;
      }
      if (param.getName() === 'gameweek') {
        return 1;
      }
    });

    callback(method, params);

  });

}

export function doUtilsMethods(callback) {

  const methods = getMethods('src/api/api.game.ts');

  methods.forEach((method) => {

    const params = method.getParameters().map((param) => {
      if (param.getName() === 'gameweek') {
        return 1;
      }
    });

    callback(method, params);

  });

}

export function doLeagueMethods(callback) {

  const methods = getMethods('src/api/api.league.ts');

  methods.forEach((method) => {

    const params = method.getParameters().map((param) => {
      if (param.getName() === 'leagueId') {
        return 313;
      }
    });

    callback(method, params);

  });

}
