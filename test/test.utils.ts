import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as jsonfile from 'jsonfile';
import Ast from 'ts-simple-ast';

const ast = new Ast();

ast.addSourceFilesFromTsConfig('tsconfig.json');

const mockDir = __dirname + `/mocks/methods`;

export function readRawMock(name) {
  const dir = __dirname + `/mocks/data`;
  return jsonfile.readFileSync(`${dir}/${name}.json`);
}

export function getFileNameFromUrl(url) {
  return url.replace(/(^\w+:|^)\/\//, '').split('/').join('_');
}

export function readMethodMock(folder, name) {
  return jsonfile.readFileSync(`${mockDir}/${folder}/${name}.json`);
}

export function setMock() {

  const mock = new MockAdapter(axios);

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

}

function getMethods(sourceFileName, className) {

  const sourceFile = ast.getSourceFile(sourceFileName);

  const specClass = sourceFile.getClass(className);

  const methods = specClass.getStaticMethods().filter((method) => {
    return method.getName() !== 'getPicks';
  });

  return methods;
}

export function doEntryMethods(callback) {

  const methods = getMethods('src/entry/entry.class.ts', 'Entry');

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

  const sourceFile = ast.getSourceFile('src/utils/utils.class.ts');

  const specClass = sourceFile.getClass('Utils');

  const methods = specClass.getStaticMethods();

  methods.forEach((method) => {

    const params = method.getParameters().map((param) => {
      if (param.getName() === 'gameweek') {
        return 1;
      }
    });

    callback(method, params);

  });

}
