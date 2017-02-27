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

  // let ret = mlAuthorization.validteAuthorization(context.userId, req.body)
  // if(ret == false){
  //   return{success:false}
  // }

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

app.post('/assignusers', multipartMiddleware, Meteor.bindEnvironment(function (req, res)
{
    var context = {};
    context = getContext({req});
    context.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if(req && req.body && req.body.data){
        let data = JSON.parse(req.body.data)
        let userId = data.userId;
        let roles  = data && data.userRoles;
        // let file  = req.files
        let levelCode = ""
        if(roles){
            let hierarchy = "";
            roles.map(function (role) {
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
    // res.send(response)
}))
