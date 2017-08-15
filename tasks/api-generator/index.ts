import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as _ from 'lodash';
import * as path from 'path';
import Ast, { InterfaceDeclaration } from 'ts-simple-ast';

const ast = new Ast();

Handlebars.registerHelper('ifTabActive', function(title, name, options) {
    if (title === name) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

const file = ast.getOrAddSourceFileFromFilePath('./src/index.ts');

const dataTypes: any = [];

const methods = file.getFunctions().map((fn) => {
    if (fn.isNamedExport()) {
        const name = fn.getName();

        const params = fn.getParameters().map((param) => {
            return {
                name: param.getName(),
                type: param.getType().getText(), description: '',
            };
        });
        const comment = fn.getDocumentationComment();

        const returnType = fn.getReturnType().getText();
        const returnInterfaceName = returnType.substring(returnType.indexOf('<') + 1, returnType.indexOf('>'));
        const matchedInterface = getInterface('./src/types.ts', returnInterfaceName.replace('[]', ''));

        if (matchedInterface) {
            setInterfaceElements(matchedInterface, './src/types.ts');
        }

        const isObject = matchedInterface ? true : false;

        return {
            comment, name, params, returnInterfaceName, isObject,
            returnType, returnAnchor: returnInterfaceName.replace('[]', ''),
        };
    }
});

const source = fs.readFileSync(path.join(__dirname, 'template.hbs')).toString();
const template = Handlebars.compile(source);

function compare(a, b) {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
}

dataTypes.sort(compare);

const result = template({ methods, dataTypes });
fs.writeFileSync(`API.md`, result, 'UTF-8');

function setInterfaceElements(matchedInterface: any, filename, inttype?) {

    const newElements: any = [];
    // if this is an extended interface
    extendInterface(matchedInterface, filename, inttype);

    // iterate over interface properties
    matchedInterface.getProperties().forEach((prop) => {

        try {

            // set param type definition and description
            const typeDef = prop.getName();

            const description = prop.getDocumentationComment() || _.startCase(prop.getName());

            // set property type as a string
            const propType = prop.getType().getText();

            // console.log(propType, propType.includes('any'));
            if (propType.includes('any')) {
                return;
            }

            // set property type label
            const propLabel = propType;

            // if type is an object change label

            const isArray = propType.includes('[]');
            // propLabel = 'Object' + (isArray ? '[]' : '');

            // set the element
            newElements.push({ type: propLabel, name: typeDef, description });

            // first determine if the object is an available interface
            const typeInterface = getInterface(filename, propType.replace('[]', ''));
            if (typeInterface) {
                setInterfaceElements(typeInterface, filename, typeDef);
            }
        } catch (e) { console.log(e); }

    });

    const inArray = dataTypes.find((dataType) => {
        return dataType.name === matchedInterface.getName();
    });

    if (!inArray) {
        dataTypes.push({
            name: matchedInterface.getName(),
            data: newElements,
            anchor: matchedInterface.getName().replace('[]', ''),
        });
    }
    return newElements;

}

function getInterface(interfacePath, namedInterface) {
    const interfaceFile = ast.getOrAddSourceFileFromFilePath(interfacePath);
    return interfaceFile.getInterface(namedInterface);
}

function extendInterface(matchedInterface: any, interfacePath, inttype?) {
    const extendedInterface = matchedInterface.getExtends()[0];
    if (extendedInterface) {
        const extendedInterfaceName = matchedInterface.getExtends()[0].compilerNode.expression.getText();
        const matchedExtendedInterface = getInterface(interfacePath, extendedInterfaceName);
        extendInterface(matchedExtendedInterface, interfacePath);
        setInterfaceElements(matchedExtendedInterface, interfacePath, inttype);
    }
}
