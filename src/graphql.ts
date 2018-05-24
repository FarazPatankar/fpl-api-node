const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

import { importSchema } from 'graphql-import';

import {entryResolvers} from './entry.resolvers';
import { entry } from './index';

import * as async from 'async';
import { ConstructorTypeNode } from 'ts-simple-ast';
import * as testUtils from '../test/test.utils';

testUtils.setMock();
import * as dataService from './data/data.service';
import { fplResolvers } from './fpl.resolvers';
const typeDefs = importSchema('./graphql/schema.graphql');

// The resolvers
const resolvers = {
  Query:
    {
      manager(obj, args, context) {
        return dataService.fetchEntryRoot(args.entryId).then((data) => {
          return data;
        });
      },

      picks(obj, args, context) {

        return new Promise((resolve, reject) => {

          dataService.fetchEntryRoot(args.entryId).then((data) => {

            const picksArray = [];

            async.each(data.history, (gameweek, nextGameweek) => {

              dataService.fetchEntryPicksByGameweek(args.entryId, gameweek.event).then((picks) => {
                picksArray.push(picks);
                nextGameweek();
              });

            }, (err) => {
              if (err) {
                reject();

              } else {
                console.log(picksArray);
                resolve(picksArray);
              }

            });

          });

        });

      },

     // fpl(obj, args, context) {
       // return args;
      // },
    },
  // EntryRootObject: entryResolvers,
 // FplRootObject: fplResolvers,

};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Initialize the app
const app = express();

// Cors for development
app.use(cors());

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(3000, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!');
});
