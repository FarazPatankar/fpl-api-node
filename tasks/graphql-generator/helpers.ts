import Ast, { InterfaceDeclaration, SourceFile } from 'ts-simple-ast';

import * as testUtils from '../../test/test.utils';

const ast = new Ast();

ast.addSourceFilesFromTsConfig('tsconfig.json');

const graphQlType = '';
const rootFile = ast.getSourceFile('src/graphql.interfaces.ts');
const apiInterfacesFile = ast.getSourceFile('src/api.interfaces.ts');

export function getTypes() {

  const types: any = {};
  let typesString = '';
  types.ManagerRootObject = getTypeDef('ManagerRootObject', apiInterfacesFile, types);
  types.PicksRootObject = getTypeDef('PicksRootObject', apiInterfacesFile, types);
  // types.FplRoot = getTypeDef('FplRootObject', rootFile, types);
  Object.keys(types).forEach((key) => {
    typesString = typesString + types[key];
  });
  return typesString;
}

export function getTypeDef(interfaceName, interfaceFile, types) {

  const interfaceObject = interfaceFile.getInterface(interfaceName);

  let innerGraphQlType = `\n\ntype ${interfaceName} {\n`;

  interfaceObject.getProperties().forEach((prop) => {
    const typeName = prop.getType().getText().replace('[]', '');
    const typeIsArray = prop.getType().getText().includes('[]');
    const propInterface = apiInterfacesFile.getInterface(typeName);
    const params = prop.getJsDocs()[0];
    const paramsString = params ? params.getComment() : '';

    let propName = prop.getName();
    propName = propName.replace(/'/g, '').replace(/-/g, '_');

    innerGraphQlType = innerGraphQlType + `${propName}${paramsString}: ${getProperty(propInterface, prop, typeIsArray, interfaceFile, types)},\n`;
  });

  innerGraphQlType = innerGraphQlType + '}';

  return innerGraphQlType;

}

function getProperty(propInterface, prop, typeIsArray, interfaceFile, types) {
  return propInterface ? getGraphQLInterfaceType(propInterface, typeIsArray, interfaceFile, types) : getGraphQLType(prop.getType().getText());
}

function getGraphQLInterfaceType(propInterface, typeIsArray, interfaceFile, types) {
  const interfaceName = propInterface.getName();
  if (types[interfaceName] === undefined) {
    types[interfaceName] = getTypeDef(propInterface.getName(), apiInterfacesFile, types);
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
