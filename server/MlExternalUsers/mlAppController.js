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
import _ from 'lodash';
import mlConversationsRepo from '../commons/Conversations/mlConversationsRepo'

import getContext from '../commons/mlAuthContext'
import MlResolver from '../commons/mlResolverDef';
import MlSchemaDef from '../commons/mlSchemaDef';
import MlRespPayload from '../commons/mlPayload';
import mlserviceCardHandler from '../MlExternalUsers/userSubscriptions/serviceCardHandler'

let cors = require('cors');
let multipart 	= require('connect-multiparty'),
    fs 			    = require('fs'),
    multipartMiddleware = multipart();

const resolvers=_.extend({Query: MlResolver.MlQueryResolver,Mutation:MlResolver.MlMutationResolver},MlResolver.MlUnionResolver,MlResolver.MlScalarResolver);
const typeDefs = MlSchemaDef['schema']
const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// default server configuration object
const defaultServerConfig = {
  path: '/moolya',
  configServer: graphQLServer => {},
  graphiql: Meteor.isDevelopment,
  graphiqlPath: '/graphiqlApp',
  conversationPath: '/conversationlogin',
  paymentReturnUrlPath:'/moolyaPaymentStatus',
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
    graphQLServer.use(config.path, bodyParser.json(), graphqlExpress(async (req, res) =>
    {
        try {
            const customOptionsObject = typeof customOptions === 'function' ? customOptions(req) : customOptions;
            const options = {
               ...executableSchema,
               ...defaultGraphQLOptions,
               ...customOptionsObject,
            };
            context = getContext({req});
            if(!context||!context.userId){
              res.json({unAuthorized:true,message:"Invalid Token"})
              return;
            }

            let ret = mlserviceCardHandler.validateResource(req.body.query, context, req.body.variables);
            if(!ret.success){
                var response = new MlRespPayload().errorPayload(ret.msg, 400);
                res.json({data:{data:response}})
                return
            }
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

    // return url for payment gateway, Need to send transcation type on payment
    if(config.paymentReturnUrlPath){
        graphQLServer.options(config.paymentReturnUrlPath, cors());
        graphQLServer.post(config.paymentReturnUrlPath, bodyParser.json(), Meteor.bindEnvironment(function (req, res){
          if(req){
            let data = req.body;
            let apiKey = req.header("apiKey");
            // console.log(data);
            if(apiKey&&apiKey==="741432fd-8c10-404b-b65c-a4c4e9928d32"){
              console.log(data);
              let response = MlResolver.MlMutationResolver['updatePayment'](null, data, context, null);
              res.send(response);
            }else{
              let code = 401;
              let result = {message:"The request did not have valid authorization credentials"}
              let response = new MlRespPayload().errorPayload(result, code);
              console.log(response);
              res.send(response);
            }
          }else {
            res.send(new MlRespPayload().errorPayload("Request Payload not provided", 400));
          }
        }))
    }

    if(config.conversationPath){
      graphQLServer.options(config.conversationPath, cors());
      graphQLServer.post(config.conversationPath, bodyParser.json(), Meteor.bindEnvironment(function (req, res){
        var context = getContext({req});
        mlConversationsRepo.login(context, function (ret) {
          res.send(ret)
        });

      }))
    }
    WebApp.connectHandlers.use(Meteor.bindEnvironment(graphQLServer));
}
createApolloServer(defaultGraphQLOptions, defaultServerConfig);
