// The GraphQL schema in string form

import * as  fs from 'fs-extra';
import * as path from 'path';
import * as testUtils from '../../test/test.utils';
import { getTypeDef, getTypes } from './helpers';

const file = path.join(__dirname, '/../../', 'graphql/schema.graphql');
const resolversFile = path.join(__dirname, '/../../', 'graphql/resolvers.js');

const typeDefs = `type Query {manager(entryId: ID!): ManagerRootObject, picks(entryId: ID!): [PicksRootObject] }

${getTypes()}
`;

fs.outputFileSync(file, typeDefs);
