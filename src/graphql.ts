const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

import { importSchema } from 'graphql-import';

import { entry } from './index';

import * as async from 'async';

import * as dataService from './data/data.service';
import { entryResolvers } from './entry.resolvers';
import { fplResolvers } from './fpl.resolvers';
const typeDefs = importSchema('./graphql/schema.graphql');

// The resolvers
const resolvers = {
  Query:
    {
      manager(obj, args, context) {
        console.log(args);
        return args.entryId;
      },

      picks(obj, args, context) {
        console.log('picks', args);

        // return new Promise((resolve, reject) => {

        dataService.fetchEntryPicksByGameweek(args.entryId, 2).then((picks) => {
            const picksArray = [];
            picksArray.push(picks);
            return picksArray;
          });

       // });

        /*
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

        });*/

      },

     // fpl(obj, args, context) {
       // return args;
      // },
    },
  ManagerRootObject: entryResolvers,
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
