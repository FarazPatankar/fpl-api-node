import Ast, { InterfaceDeclaration, SourceFile } from 'ts-simple-ast';

import * as testUtils from '../../test/test.utils';

const ast = new Ast();

ast.addSourceFilesFromTsConfig('tsconfig.json');

const graphQlType = '';
const graphFile = ast.getSourceFile('src/graphql.interfaces.ts');
const apiInterfacesFile = ast.getSourceFile('src/api.interfaces.ts');

export function addType(name, types) {
  getTypeDef(name, types);
  return name;
}

export function getTypeDefs() {
  const types: any = {};
  let typesString = '';
  types.Query = getTypeDef('Query', types);
  Object.keys(types).forEach((key) => {
    typesString = typesString + types[key];
  });
  return typesString;
}

export function getTypes(types) {

  // const types: any = {};
  let typesString = '';
  // types.ManagerRootObject = getTypeDef('ManagerRootObject', apiInterfacesFile, types);
  // types.PicksRootObject = getTypeDef('PicksRootObject', apiInterfacesFile, types);
  // types.FplRoot = getTypeDef('FplRootObject', rootFile, types);
  Object.keys(types).forEach((key) => {
    typesString = typesString + types[key];
  });
  return typesString;
}

function getInterface(interfaceName) {
  let interfaceFile = graphFile;
  let interfaceObject = interfaceFile.getInterface(interfaceName);
  if (!interfaceObject) {
    interfaceFile = apiInterfacesFile;
    interfaceObject = interfaceFile.getInterface(interfaceName);
  }
  return interfaceObject;
}

export function getTypeDef(interfaceName, types) {

  const interfaceObject = getInterface(interfaceName);

  let innerGraphQlType = `\n\ntype ${interfaceName} {\n`;

  interfaceObject.getProperties().forEach((prop) => {
    const typeName = prop.getType().getText().replace('[]', '');
    const typeIsArray = prop.getType().getText().includes('[]');
    const propInterface = getInterface(typeName);
    const params = prop.getJsDocs()[0];
    const paramsString = params ? params.getComment() : '';

    let propName = prop.getName();
    propName = propName.replace(/'/g, '').replace(/-/g, '_');

    innerGraphQlType = innerGraphQlType + `${propName}${paramsString}: ${getProperty(propInterface, prop, typeIsArray, types)},\n`;
  });

  innerGraphQlType = innerGraphQlType + '}';

  return innerGraphQlType;

}

function getProperty(propInterface, prop, typeIsArray, types) {
  return propInterface ? getGraphQLInterfaceType(propInterface, typeIsArray, types) : getGraphQLType(prop.getType().getText());
}

function getGraphQLInterfaceType(propInterface, typeIsArray,  types) {
  const interfaceName = propInterface.getName();
  if (types[interfaceName] === undefined) {
    types[interfaceName] = getTypeDef(propInterface.getName(), types);
  }
  let propName = propInterface.getName();
  if (typeIsArray) {
    propName = `[${propName}]`;
  }
  return propName;
}

function getGraphQLType(tsType) {

  let type = '';

  switch (tsType) {
    case 'string':
      type = 'String';
      break;
    case 'number':
      type = 'Int';
      break;
    default:
      type = 'String';
  }

  return type;

}
