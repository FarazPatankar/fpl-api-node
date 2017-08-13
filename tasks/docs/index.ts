import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as _ from 'lodash';
import * as path from 'path';
import Ast, { InterfaceDeclaration } from 'ts-simple-ast';

const ast = new Ast();

Handlebars.registerHelper('ifTabActive', function (title, name, options) {
    if (title === name) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

const files = [
    {
        name: 'Entries',
        id: 'entries',
        file: ast.getOrAddSourceFileFromFilePath('./src/entries.ts'),
    }];

const source = fs.readFileSync(path.join(__dirname, 'template.hbs')).toString();

const modules = files.map((file) => {
    const title = file.name;
    const id = file.id;

    const methods = file.file.getFunctions().map((fn) => {
        if (fn.isNamedExport()) {
            const name = fn.getName();

            const params = fn.getParameters().map((param) => {
                return {
                    name: param.getName(),
                    type: param.getType().getText(), description: ''
                };
            });
            const comment = fn.getDocumentationComment();
            const returnType = fn.getReturnType().getText();
            const returnInterfaceName = returnType.substring(returnType.indexOf('<') + 1, returnType.indexOf('>'));
            const matchedInterface = getInterface('./src/api-service/types.ts', returnInterfaceName);

            const returnData = matchedInterface ?
                setInterfaceElements(matchedInterface, './src/api-service/types.ts') : null;

            return {
                comment, name, params, returnData,
            };
        }
    });
    return { id, title, methods, files };

});

console.log(modules);
const template = Handlebars.compile(source);
const result = template(modules);
fs.writeFileSync(`./docs/api.html`, result, 'UTF-8');
console.log(result);

function setInterfaceElements(matchedInterface: any, filename, inttype?) {
    console.log(matchedInterface.getName());
    const newElements: any = [];
    // if this is an extended interface
    extendInterface(matchedInterface, filename, inttype);

    // iterate over interface properties
    matchedInterface.getProperties().forEach((prop) => {

        // set param type definition and description
        const typeDef = inttype ? `${inttype}.${prop.getName()}` : prop.getName();
        const descriptionPrefix = inttype ? `${inttype} > ` : '';
        const description = descriptionPrefix + (prop.getDocumentationComment() || _.startCase(prop.getName()));

        // set property type as a string
        const propType = prop.getType().getText();

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

    });

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
