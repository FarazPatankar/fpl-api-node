import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as _ from 'lodash';
import * as path from 'path';
import Ast from 'ts-simple-ast';

const ast = new Ast();

// get reference to files
const indexFile = ast.getOrAddSourceFileFromFilePath('./src/index.ts');

// get data for templates
const indexData = getData(indexFile, 'entry');

// write pages
writePage('API', indexData, 'template.hbs');
writePage('_Sidebar', indexData, 'sidebar.hbs');

/**
 * Returns data for a template
 * @param file
 * @param ns
 */
function getData(file, ns) {

  const dataTypes: any = [];
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
    const comment = fn.getDocumentationComment();

    // return type
    const returnType = fn.getReturnType().getText();

    // get the interface of the return type (with this we can populate data types)
    const returnInterfaceName = returnType.substring(returnType.indexOf('<') + 1, returnType.indexOf('>'));
    const matchedInterface = getInterface('./src/types.ts', returnInterfaceName.replace('[]', ''));

    let displayedReturnType;

    if (matchedInterface) {
      const isArray = returnInterfaceName.includes('[]');
      displayedReturnType = '&lt;[' + matchedInterface.getName()
        + '](#' + getTypeAnchorName(matchedInterface) + ')'
        + (isArray ? '[]' : '') + '&gt;';
      setDataType(dataTypes, matchedInterface, './src/types.ts');
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
      ns,
      params,
      returnAnchor: returnInterfaceName.replace('[]', ''),
      returnInterfaceName,
      returnType,
    });
  });

  dataTypes.sort(sortByName);
  return { methods, dataTypes };
}

function writePage(name, methods, templateName) {
  const source = fs.readFileSync(path.join(__dirname, templateName)).toString();
  const template = Handlebars.compile(source);
  const result = template(methods);
  fs.writeFileSync(path.join(__dirname, `../out/${name}.md`), result, 'UTF-8');
}

function setDataType(dataTypes, matchedInterface: any, filename, inttype?) {

  const data: any = [];

  // iterate over interface properties
  matchedInterface.getProperties().forEach((prop) => {

    // try {

    // set param type definition and description
    const typeDef = prop.getName();

    // set description
    const description = prop.getDocumentationComment() || _.startCase(prop.getName());

    // set property type as a string
    const propType = prop.getType().getText();

    if (propType.includes('any')) {
      return;
    }

    // set property type label
    const propLabel = propType;

    // if type is an object change label

    // const isArray = propType.includes('[]');
    // propLabel = 'Object' + (isArray ? '[]' : '');

    let displayType = '```' + propLabel + '```';

    // first determine if the object is an available interface
    const typeInterface = getInterface(filename, propType.replace('[]', ''));
    if (typeInterface) {
      setDataType(dataTypes, typeInterface, filename, typeDef);
      displayType = `[${_.startCase(typeInterface.getName())}](#${getTypeAnchorName(typeInterface)})`;
    }

    // set the element
    data.push({ displayType, name: typeDef, description });

  });

  const inArray = dataTypes.find((dataType) => {
    return dataType.name === matchedInterface.getName();
  });

  if (!inArray) {
    dataTypes.push({
      anchorName: getTypeAnchorName(matchedInterface),
      data,
      displayName: _.startCase(matchedInterface.getName()),
      name: matchedInterface.getName(),
    });
  }

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
  const interfaceFile = ast.getOrAddSourceFileFromFilePath(interfacePath);
  return interfaceFile.getInterface(namedInterface);
}
