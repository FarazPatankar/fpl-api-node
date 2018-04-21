/**
 * This is a quick and dirty script in order to get some auto generated wiki docs up.
 */

import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as _ from 'lodash';
import * as path from 'path';
import Ast, { InterfaceDeclaration, SourceFile } from 'ts-simple-ast';

const ast = new Ast();

Handlebars.registerHelper('getModulePageName', (name, options) => {
  return getModulePageName(name);
});

function getModulePageName(name) {
  return `API-[${name}]`;
}

ast.addSourceFilesFromTsConfig('tsconfig.json');

// get reference to files
const entriesFile = ast.getSourceFile('src/api/api.entry.ts');
const leaguesFile = ast.getSourceFile('src/api/api.league.ts');
const gameFile = ast.getSourceFile('src/api/api.game.ts');

// get data for templates
const baseUrl = 'https://github.com/tgreyjs/fpl-api-node/wiki';
const interfaces: any = [];
const modules = [];
const entriesData = getData(entriesFile, 'entry');
const leaguesData = getData(leaguesFile, 'league');
const gameData = getData(gameFile, 'fpl');

// set up context
modules.push(entriesData);
modules.push(leaguesData);
modules.push(gameData);

// sort interfaces
interfaces.sort(sortByName);

// write pages
writePage('HOME', { baseUrl }, 'home.hbs');
writeApis();
writePage('Error-Codes', {}, 'error-codes.hbs');
writePage('Interfaces', interfaces, 'interfaces.hbs');
writePage('_Sidebar', { modules, interfaces, baseUrl }, 'sidebar.hbs');

/**
 * Returns data for a template
 * @param file
 * @param module
 */
function getData(file: SourceFile, module) {

  const methods: any = [];

  // loop over each methods
  file.getFunctions().forEach((fn) => {

    // method name
    const name = fn.getName();

    // method params
    const params = fn.getParameters().map((param) => {

      return {
        name: param.getName(),
        type: param.getType().getText(),
      };

    });

    // method comment
    const comment = fn.getJsDocs()[0].getComment();

    // return type
    const returnType = fn.getReturnType().getText();

    // get the interface of the return type (with this we can populate data types)
    const returnInterfaceName = returnType.substring(returnType.indexOf('<') + 1, returnType.indexOf('>'));
    const interfaceFile = `src/interfaces.ts`;
    let matchedInterface = getInterface(interfaceFile, returnInterfaceName.replace('[]', ''));
    if (!matchedInterface) {
      matchedInterface = getInterface(interfaceFile, returnInterfaceName.replace('[]', ''));
    }

    let displayedReturnType;

    if (matchedInterface) {
      const isArray = returnInterfaceName.includes('[]');
      displayedReturnType = `&lt;[${matchedInterface.getName()}](${baseUrl}/interfaces#${getTypeAnchorName(matchedInterface)})`
        + (isArray ? '[]' : '') + '&gt;';
      setDataType(matchedInterface, 'src/interfaces.ts');
    } else {
      displayedReturnType = `&lt;${returnInterfaceName}&gt;`;
    }

    const isObject = matchedInterface ? true : false;
    const hasParams = params.length > 0;

    // push method to array
    methods.push({
      comment,
      displayedReturnType,
      hasParams,
      isObject,
      name,
      module,
      params,
      returnAnchor: returnInterfaceName.replace('[]', ''),
      returnInterfaceName,
      returnType,
    });
  });

  methods.sort(sortByName);

  return { module, methods };

}

function writeApis() {
  modules.forEach((module) => {
    const moduleName = module.module;
    writePage(getModulePageName(moduleName), { module: moduleName, methods: module.methods }, 'api.hbs');
  });
}

function writePage(name, methods, templateName) {
  const filename = path.join(__dirname, `../out/${name}.md`);
  const source = fs.readFileSync(path.join(__dirname, 'templates', templateName)).toString();
  const template = Handlebars.compile(source);
  const result = template(methods);
  console.log(`Wrote ${filename}`);
  fs.writeFileSync(filename, result, 'UTF-8');
}

function setDataType(matchedInterface: InterfaceDeclaration, filename, inttype?) {

  const data: any = [];

  // iterate over interface properties

  matchedInterface.getProperties().forEach((prop) => {

    // set param type definition and description
    const typeDef = prop.getName();

    // set property type as a string
    const propType = prop.getType().getText();

    if (propType.includes('any')) {
      return;
    }

    // set property type label
    const propLabel = propType;

    // if type is an object change label

    const isArray = propType.includes('[]');
    let displayType = '```' + propLabel + '```';

    // first determine if the object is an available interface
    const typeInterface = getInterface(filename, propType.replace('[]', ''));
    if (typeInterface) {
      setDataType(typeInterface, filename, typeDef);
      displayType = getDisplayType(typeInterface) + (isArray ? '[]' : '');
    }

    const isOptional = prop.hasQuestionToken();

    // set the element
    data.push({ displayType, name: typeDef, isOptional });

  });

  const inArray = interfaces.find((dataType) => {
    return dataType.name === matchedInterface.getName();
  });

  if (!inArray) {
    interfaces.push({
      anchorName: getTypeAnchorName(matchedInterface),
      data,
      name: matchedInterface.getName(),
    });
  }

}

function getDisplayType(typeInterface) {
  return `[${typeInterface.getName()}](#${getTypeAnchorName(typeInterface)})`;
}

function getTypeAnchorName(matchedInterface) {
  return `type_${matchedInterface.getName().replace('[]', '')}`;
}

function sortByName(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

/**
 * Returns interface declaration
 * @param interfacePath
 * @param namedInterface
 */
function getInterface(interfacePath, namedInterface) {
  const interfaceFile = ast.getSourceFile(interfacePath);
  if (interfaceFile) {
    return interfaceFile.getInterface(namedInterface);
  }
  return;
}
