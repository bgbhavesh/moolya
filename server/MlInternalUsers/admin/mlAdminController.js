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
var bodyParser = require('body-parser')
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

// app.post('/login', function(req, res)
// {
//     utils.authenticate(req.body.username, req.body.password, function(err, doc){
//         if(err || doc == null)
//             res.json({ success: false, message: 'Authentication failed' });
//         else{
//             var token = jwt.sign(doc, globals.secret);
//             res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, x-access-token");
//             res.json({success: true,token: token,userInfo: doc});
//         }
//     })
// });


app.listen(8090);
console.log('Running a GraphQL API server at localhost:8090/graphql');
// This binds the specified paths to the Express server running Apollo + GraphiQL
WebApp.connectHandlers.use(Meteor.bindEnvironment(app));

WebApp.rawConnectHandlers.use(proxyMiddleware(`http://localhost:8090/graphql`));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}))
