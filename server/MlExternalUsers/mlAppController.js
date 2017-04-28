/**
 * Created by venkatsrinag on 28/4/17.
 */
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
import bodyParser from 'body-parser';
import express from 'express';

import getContext from '../commons/mlAuthContext'
import MlResolver from '../commons/mlResolverDef';
import MlSchemaDef from '../commons/mlSchemaDef';
import _ from 'lodash';
let cors = require('cors');
let multipart 	= require('connect-multiparty'),
    fs 			    = require('fs'),
    multipartMiddleware = multipart();

const resolvers=_.extend({Query: MlResolver.MlQueryResolver,Mutation:MlResolver.MlMutationResolver},MlResolver.MlUnionResolver);
const typeDefs = MlSchemaDef['schema']
const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// default server configuration object
const defaultServerConfig = {
  path: '/a' +
  'pp',
  configServer: graphQLServer => {},
  graphiql: Meteor.isDevelopment,
  graphiqlPath: '/graphiql',
  graphiqlOptions : {
    passHeader : "'meteor-login-token': localStorage['Meteor.loginToken']"
  },
};

// default graphql options to enhance the graphQLExpress server
const defaultGraphQLOptions = {
  context: {},
  formatError: e => ({
    message: e.message,
    locations: e.locations,
    path: e.path
  }),
  debug: Meteor.isDevelopment,
};


export const createApolloServer = (customOptions = {}, customConfig = {}) =>
{
    const config = {
      ...defaultServerConfig,
      ...customConfig,
    };

    if (customConfig.graphiqlOptions) {
        config.graphiqlOptions = {
          ...defaultServerConfig.graphiqlOptions,
          ...customConfig.graphiqlOptions
        }
    }
    const graphQLServer = express();
    config.configServer(graphQLServer)
    graphQLServer.use(config.path, bodyParser.json(), graphqlExpress(async (req) =>
    {
        try {
            const customOptionsObject = typeof customOptions === 'function' ? customOptions(req) : customOptions;
            const options = {
               ...executableSchema,
               ...defaultGraphQLOptions,
               ...customOptionsObject,
            };
            context = getContext({req});
            return {
                schema  : executableSchema,
                context : context
            }
        }catch (error){
            console.error('[Meteor Apollo Integration] Something bad happened when handling a request on the GraphQL server. Your GraphQL server is not working as expected:', error);
            return defaultGraphQLOptions;
        }
    }));

    if (config.graphiql){
        graphQLServer.use(config.graphiqlPath, graphiqlExpress({
            ...config.graphiqlOptions,
            endpointURL: config.path,
        }));
    }
    WebApp.connectHandlers.use(Meteor.bindEnvironment(graphQLServer));
}
createApolloServer(defaultGraphQLOptions, defaultServerConfig);
