/**
 * Created by venkatasrinag on 17/1/17.
 */
import { Meteor } from 'meteor/meteor';
import cors from 'cors';
import proxyMiddleware from 'http-proxy-middleware';
import MlResolver from './mlAdminResolverDef';
import MlSchemaDef from './mlAdminSchemaDef';
import { graphqlExpress } from 'graphql-server-express';
import getContext from './mlAuthContext'
import './mlAuthoverrideDDP'
import _ from 'lodash';

var express = require('express');
var {apolloExpress, graphiqlExpress} = require('apollo-server')
var bodyParser  = require('body-parser')
var multipart 	= require('connect-multiparty');
var fs 			    = require('fs');

var multipartMiddleware = multipart();

const { makeExecutableSchema } = require('graphql-tools');

var app = express().use('*',cors());


const resolvers=_.extend({Query: MlResolver.MlQueryResolver,Mutation:MlResolver.MlMutationResolver},MlResolver.MlUnionResolver);
//console.log(resolvers);
const executableSchema = makeExecutableSchema({
  typeDefs: MlSchemaDef['schema'],
  resolvers: resolvers
});

const expressServer = graphqlExpress((req) => {
  var context = {};
  context = getContext({req});
  context.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  return {
    schema: executableSchema,
    graphiql: true,
    context:context
  }
})

app.use('/graphql', bodyParser.json(), Meteor.bindEnvironment(expressServer));

app.listen(Meteor.settings.public.graphqlPort);
console.log('Running a GraphQL API server at localhost:8090/graphql');
// This binds the specified paths to the Express server running Apollo + GraphiQL
WebApp.connectHandlers.use(Meteor.bindEnvironment(app));

WebApp.rawConnectHandlers.use(proxyMiddleware(Meteor.settings.private.graphql_proxy_url));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}))

app.post('/assignusers', multipartMiddleware, function (req, res)
{
    var context = {};
    context = getContext({req});
    context.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if(req && req.body && req.body.hierarchyLevel == "CLUSTER"){
    }
    else if(req && req.body && req.body.hierarchyLevel == "CHAPTER"){
    }
    else if(req && req.body && req.body.hierarchyLevel == "SUBCHAPTER"){
    }
    else if(req && req.body && req.body.hierarchyLevel == "COMMUNITY"){
    }

    res.send(true)
})
