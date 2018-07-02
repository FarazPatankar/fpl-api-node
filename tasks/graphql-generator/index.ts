// The GraphQL schema in string form

import * as  fs from 'fs-extra';
import * as path from 'path';
import * as testUtils from '../../test/test.utils';
import { addType, getTypeDefs, getTypes } from './helpers';

const file = path.join(__dirname, '/../../', 'graphql/schema.graphql');
const resolversFile = path.join(__dirname, '/../../', 'graphql/resolvers.js');

// const types = [];

const typeDefs = getTypeDefs();

// const typeDefs

/*
const typeDefs = `
type Query {
    manager(entryId: ID!): ManagerRootObject,
    picks(entryId: ID!): [PicksRootObject]
}

type ManagerRootObject {
    chips: [${addType('Chip', types)}],
    entry: ${addType('Entry', types)},
    leagues: ${addType('Leagues', types)},
    season: [${addType('Season', types)}],
    history: [${addType('History', types)}],
}

type PicksRootObject {
    active_chip: string,
    automatic_subs: ${addType('AutomaticSub', types)},
    event: Event,
    picks: [Pick];
  }

${getTypes(types)}
`;
*/
fs.outputFileSync(file, typeDefs);
