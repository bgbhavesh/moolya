/**
 * Created by venkatasrinag on 17/1/17.
 */

import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';

import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
import bodyParser from 'body-parser';
import express from 'express';
import getContext from './mlAuthContext'
import MlResolver from './mlAdminResolverDef';
import MlSchemaDef from './mlAdminSchemaDef';
import _ from 'lodash';
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
    path: '/graphql',
    configServer: graphQLServer => {},
    graphiql: Meteor.isDevelopment,
    graphiqlPath: '/graphiql',
    assignUsersPath: '/assignusers',
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


  export const createApolloServer = (customOptions = {}, customConfig = {}) =>{
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
      graphQLServer.use(config.path, bodyParser.json(), graphqlExpress(async (req) => {
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

      if(config.assignUsersPath){
          graphQLServer.post('assignusers', multipartMiddleware, Meteor.bindEnvironment(function (req, res) {
              var context = {};
              context = getContext({req});
              context.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
              if(req && req.body && req.body.data)
              {
                  let data = JSON.parse(req.body.data)
                  let userId = data.userId;
                  let roles  = data && data.userRoles;
                  // let file  = req.files
                  let levelCode = ""
                  if(roles)
                  {
                      let hierarchy = "";
                      roles.map(function (role)
                      {
                          if(role.clusterId != "" && role.chapterId != "" && role.subChapterId != "" && role.communityId != ""){
                              levelCode = "COMMUNITY"
                          }
                          else if(role.clusterId != "" && role.chapterId != "" && role.subChapterId != "" ){
                              levelCode = "SUBCHAPTER"
                              role.communityId = "all"
                          }
                          else if(role.clusterId != "" && role.chapterId != "" ){
                              levelCode = "CHAPTER"
                              role.subChapterId = "all"
                              role.communityId = "all"
                          }
                          else if(role.clusterId != ""){
                              levelCode = "CLUSTER"
                              role.chapterId = "all"
                              role.subChapterId = "all"
                              role.communityId = "all"
                          }

                          hierarchy = MlHierarchy.findOne({code:levelCode})
                          role.hierarchyLevel = hierarchy.level;
                          role.hierarchyCode  = hierarchy.code;
                      })
                  }
                  let userProfile = {
                      clusterId: data.clusterId,
                      userroles:  roles,
                      isDefault: false
                  }
                  let response = MlResolver.MlMutationResolver['addUserProfile'](null, {userId:userId, userProfile:userProfile}, context, null)
                  res.send(true)
              }
          }))
      }
      WebApp.connectHandlers.use(Meteor.bindEnvironment(graphQLServer));
}
createApolloServer(defaultGraphQLOptions, defaultServerConfig);
