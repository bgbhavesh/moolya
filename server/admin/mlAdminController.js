/**
 * Created by venkatasrinag on 17/1/17.
 */
import { Meteor } from 'meteor/meteor';
import cors from 'cors';
import proxyMiddleware from 'http-proxy-middleware';
import MlResolver from '../mlAdminResolverDef';
import MlSchemaDef from '../mlAdminSchemaDef';

var express = require('express');
var {apolloExpress, graphiqlExpress} = require('apollo-server')
var bodyParser = require('body-parser')
const { makeExecutableSchema } = require('graphql-tools');

var app = express().use('*',cors());

const executableSchema = makeExecutableSchema({
  typeDefs: MlSchemaDef,
  resolvers: {Query: MlResolver}
});


app.use('/graphql', bodyParser.json(), apolloExpress({
  schema: executableSchema,
  graphiql: true,
}));

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

WebApp.rawConnectHandlers.use(proxyMiddleware(`http://localhost:8090/graphql`));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}))
