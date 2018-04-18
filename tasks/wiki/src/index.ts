import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as _ from 'lodash';
import * as path from 'path';
import Ast, { SourceFile } from 'ts-simple-ast';

const ast = new Ast();

ast.addSourceFilesFromTsConfig('tsconfig.json');

// get reference to files

const entriesFile = ast.getSourceFile('src/api/api.entries.ts');

const interfaces: any = [];
const modules = [];

// get data for templates

const entriesData = getData(entriesFile, 'entries');

modules.push(entriesData);
interfaces.sort(sortByName);
console.log({ modules, interfaces });

// write pages
writePage('HOME', {}, 'home.hbs');
writePage('API', { modules, interfaces }, 'api.hbs');
writePage('_Sidebar', entriesData, 'sidebar.hbs');

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
      displayedReturnType = '&lt;[' + matchedInterface.getName()
        + '](#' + getTypeAnchorName(matchedInterface) + ')'
        + (isArray ? '[]' : '') + '&gt;';
      setDataType(interfaces, matchedInterface, 'src/interfaces.ts');
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
  // interfaces.sort(sortByName);
  interfaces.push(interfaces);
  methods.sort(sortByName);

  return { module, methods };

}

function writePage(name, methods, templateName) {
  const source = fs.readFileSync(path.join(__dirname, templateName)).toString();
  const template = Handlebars.compile(source);
  const result = template(methods);
  fs.writeFileSync(path.join(__dirname, `../../../../wiki-test.wiki/${name}.md`), result, 'UTF-8');
}

function setDataType(dataTypes, matchedInterface: any, filename, inttype?) {

  const data: any = [];

  // need to refactor hardcoded interface name
  if (matchedInterface.getName() === 'EventElements') {
    // set the element
    const typeInterface = getInterface(filename, 'EventElement');
    setDataType(dataTypes, typeInterface, filename, 'EventElement');
    data.push({ displayType: getDisplayType(typeInterface), name: '[key: number]' });
  } else {

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
        setDataType(dataTypes, typeInterface, filename, typeDef);
        displayType = getDisplayType(typeInterface) + (isArray ? '[]' : '');
      }

      // set the element
      data.push({ displayType, name: typeDef });

    });

  }

  const inArray = dataTypes.find((dataType) => {
    return dataType.name === matchedInterface.getName();
  });

  if (!inArray) {
    dataTypes.push({
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
