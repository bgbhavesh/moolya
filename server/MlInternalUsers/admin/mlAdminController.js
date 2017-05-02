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

import getContext from '../../commons/mlAuthContext'
import MlResolver from '../../commons/mlResolverDef';
import MlSchemaDef from '../../commons/mlSchemaDef';
import _ from 'lodash';
import ImageUploader from '../../commons/mlImageUploader';
import MlRespPayload from '../../commons/mlPayload';
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
  path: '/graphql',
  configServer: graphQLServer => {},
  graphiql: Meteor.isDevelopment,
  graphiqlPath: '/graphiql',
  assignUsersPath: '/adminMultipartFormData',
  registrationPath: '/registration',
  registrationAPIPath:'/registrations',
  countries:'/countries',
  cities:'/cities',
  communities:'/communities',
  couponValidate:'/coupons',
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
 // console.log("graphQLServer :"+graphQLServer);
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

  if(config.assignUsersPath){
    graphQLServer.post(config.assignUsersPath, multipartMiddleware, Meteor.bindEnvironment(function (req, res)
    {
      var context = {};
      context = getContext({req});
      context.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      if(req && req.body && req.body.data)
      {
        let data = JSON.parse(req.body.data)
        let moduleName = data && data.moduleName
        let response;
        let file  = req.files.file;
        if(file){
            mlS3Client.uploadFile(file, "moolya-users", "moolya-admin-users/")
        }
        switch (moduleName){
            case "USERS":{
              response = MlResolver.MlMutationResolver['assignUsers'](null, {userId:data.userId, user:data.user, moduleName:data.moduleName, actionName:data.actionName}, context, null);
            }
            break;
            case "COMMUNITY":{
              response = MlResolver.MlMutationResolver['updateCommunityDef'](null, {communityId:data.communityId, community:data.community, clusters:data.clusters, chapters:data.chapters, subchapters:data.subchapters}, context, null);
            }
            break;
            case "PROFILE":{
              response = MlResolver.MlMutationResolver['updateProfile'](null, {userId:data.userId, userProfile:data.userProfile, moduleName:data.moduleName, actionName:data.actionName}, context, null);
              //console.log(response)
            }
            break;
        }
        res.send(response);
      }
    }))
  }

  if(config.registrationPath){
    graphQLServer.use(config.registrationPath,multipartMiddleware,Meteor.bindEnvironment((req,res) => {
      var context = {};
      context = getContext({req});
      context.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      if(req && req.body && req.body.data){
        let data = JSON.parse(req.body.data)
        let moduleName = data && data.moduleName;
        let documentId = data && data.documentId;
        let docTypeId = data && data.docTypeId
        let response;
        let file  = req.files.file;

        if(file){
          let imageUploaderPromise=null;
          let imageUploadCallback=null;
          switch (moduleName){
              case "REGISTRATION":{
                imageUploaderPromise=new ImageUploader().uploadFile(file, "moolya-users", "registrationDocuments/");
                imageUploadCallback=Meteor.bindEnvironment(function(resp) {
                  let registrationDocumentUploadReq={registrationId:data.registrationId,docUrl: resp,document: file,documentId:documentId,docTypeId:docTypeId,moduleName: data.moduleName,actionName: data.actionName};
                  MlResolver.MlMutationResolver['updateRegistrationUploadedDocumentUrl'](null,registrationDocumentUploadReq, context, null);
                });
                break;
              }
              case "PORTFOLIO":{
                  if(data.portfolioDetailsId){
                      let portfolio = {};
                      imageUploaderPromise=new ImageUploader().uploadFile(file, "moolya-users", "portfolioDocuments/");
                      imageUploadCallback=Meteor.bindEnvironment(function(resp) {
                          let details = MlPortfolioDetails.findOne({"_id":data.portfolioDetailsId});
                          if(details){
                              let clientPortfolio = data.portfolio;
                              for (key in clientPortfolio){
                                  let inner = clientPortfolio[key]
                                  if(typeof inner == 'object'){
                                      for (key1 in inner){
                                          let file = inner[key1]
                                          if(typeof file == 'object'){
                                            for (key2 in file){
                                              file[key2].fileUrl = resp;
                                            }
                                          }
                                      }
                                  }
                              }
                              console.log(clientPortfolio);
                              switch (details.communityType){
                                  case 'Ideators':
                                      portfolio = {portfolio:{ideatorPortfolio:clientPortfolio}, portfoliodetailsId:data.portfolioDetailsId}
                                  break;
                                  case 'Startups':
                                    portfolio = {portfolio:{startupPortfolio:clientPortfolio}, portfoliodetailsId:data.portfolioDetailsId}
                                  break;
                              }
                              MlResolver.MlMutationResolver['updatePortfolio'](null, portfolio, context, null)
                          }
                      });
                  }
              }
            break;
            case "PROFILE":{
              imageUploaderPromise=new ImageUploader().uploadFile(file, "moolya-users", "registrationDocuments/");
              imageUploadCallback=Meteor.bindEnvironment(function(resp) {
                // MlResolver.MlMutationResolver['createRegistration'](null, {userId:data.userId, userProfile:data.userProfile, moduleName:data.moduleName, actionName:data.actionName,userProfilePic:resp}, context, null);
                MlResolver.MlMutationResolver['uploadUserImage'](null, {userId:data.userId, moduleName:data.moduleName, actionName:data.actionName,userProfilePic:resp}, context, null);
              });
              break;
            }
          }

          if(imageUploaderPromise) {
              imageUploaderPromise.then(function (uploadResp) { //sucess
              let response = null;
              if (uploadResp) {
                   imageUploadCallback(uploadResp);
                let code = 200;
                response = JSON.stringify(new MlRespPayload().successPayload(uploadResp, code));
              }
              res.send(response);
            }, function (err) { //err
              let response = new MlRespPayload().errorPayload("Failed to Upload the resource", 404);
              res.send(response);
            });

          }
        }
      }
    }));
  }

  if(config.registrationAPIPath){
    graphQLServer.options('/registrations', cors());
    graphQLServer.post(config.registrationAPIPath, bodyParser.json(), Meteor.bindEnvironment(function (req, res)
    {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      console.log("registrationAPIPath ");
      var context = {};
      context = getContext({req});
      context.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      console.log(req.body);
      console.log("-----------");
      console.log(req.headers);
      console.log("-----------");
      console.log(req.body.data);
      console.log("-----------");
      if(req && req.body && req.body.data)
      {
        console.log("Processing started..!!");

        let data = req.body.data;
        let apiKey = req.header("apiKey");
        if(apiKey&&apiKey==="741432fd-8c10-404b-b65c-a4c4e9928d32"){
          if(data.email&&data.countryId&&data.registrationType){
            let response;
            if(data) {
              response = MlResolver.MlMutationResolver['createRegistrationAPI'](null, {registration: data}, context, null);
              console.log(response);
              res.send(response);
            }
          }else{
            let code = 400;
            let result = {message:"email,countyId,registrationType are mandatory fields"}
            let response = new MlRespPayload().errorPayload(result,code );
            console.log(response);
            res.send(response);
          }
        }else{
          let code = 401;
          let result = {message:"The request did not have valid authorization credentials"}
          let response = new MlRespPayload().errorPayload(result, code);
          console.log(response);
          res.send(response);
        }

      }else{
        console.log("Request Payload not provided");
        res.send(new MlRespPayload().errorPayload({message:"Request Payload not provided"}, 400));
      }
    }))
  }
 if(config.countries){
  graphQLServer.options('/countries', cors());
  graphQLServer.get(config.countries, bodyParser.json(), Meteor.bindEnvironment(function (req, res)
  {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var context = {};
    context = getContext({req});
    context.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(req.body);
    console.log("-----------");
    console.log(req.headers);
    console.log("-----------");
    console.log(req.body.data);
    console.log("-----------");
    if(req)
    {
      let data = req.body.data;
      let apiKey = req.header("apiKey");
      if(apiKey&&apiKey==="741432fd-8c10-404b-b65c-a4c4e9928d32"){
            let response;
            let countries = [];
            response = MlResolver.MlQueryResolver['fetchCountriesAPI'](null, null, context, null);
            if(response){
              response.map(function (country, key){
                let json={
                  id:country._id,
                  name:country.country
                }
                countries.push(json)
              })
            }
            console.log(countries);
            res.send(countries);

      }else{
        let code = 401;
        let result = {message:"The request did not have valid authorization credentials"}
        let response = new MlRespPayload().errorPayload(result, code);
        console.log(response);
        res.send(response);
      }
    }else{
      console.log("Request Payload not provided");
      res.send(new MlRespPayload().errorPayload({message:"Request Payload not provided"}, 400));
    }
  }))
}

  if(config.cities){
    console.log("Countries Invoked..!!");
    graphQLServer.options('/cities', cors());
    graphQLServer.post(config.cities, bodyParser.json(), Meteor.bindEnvironment(function (req, res)
    {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      var context = {};
      context = getContext({req});
      context.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      console.log(req.body);
      console.log("-----------");
      console.log(req.headers);
      console.log("-----------");
      console.log(req.body.data);
      console.log("-----------");
      if(req)
      {
        let data = req.body.data;
        let apiKey = req.header("apiKey");
        if(apiKey&&apiKey==="741432fd-8c10-404b-b65c-a4c4e9928d32"){
          let response;
          if(data) {
            let cities = [];
            response = MlResolver.MlQueryResolver['fetchCitiesPerCountryAPI'](null, {countryId:data.countryId}, context, null);
            if(response){
              response.map(function (city, key){
                    let json={
                      id:city._id,
                      name:city.name
                    }
                    let c = _.find(cities, {name:json.name});
                    if(c){
                      //do nothing
                    }else{
                      cities.push(json)
                    }
                })
            }
            console.log(cities);
            res.send(cities);
          }
        }else{
          let code = 401;
          let result = {message:"The request did not have valid authorization credentials"}
          let response = new MlRespPayload().errorPayload(result, code);
          console.log(response);
          res.send(response);
        }
      }else{
        console.log("Request Payload not provided");
        res.send(new MlRespPayload().errorPayload({message:"Request Payload not provided"}, 400));
      }
    }))
  }

  if(config.communities){
    graphQLServer.options('/communities', cors());
    graphQLServer.post(config.communities, bodyParser.json(), Meteor.bindEnvironment(function (req, res)
    {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      var context = {};
      context = getContext({req});
      context.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      console.log(req.body);
      console.log("-----------");
      console.log(req.headers);
      console.log("-----------");
      console.log(req.body.data);
      console.log("-----------");
      if(req)
      {
        let data = req.body.data;
        let apiKey = req.header("apiKey");
        if(apiKey&&apiKey==="741432fd-8c10-404b-b65c-a4c4e9928d32"){
          let response;
          if(data) {
            let communities = [];
            response = MlResolver.MlQueryResolver['fetchCommunityDefinitionAPI'](null, null, context, null);
            if(response){
              response.map(function (community, key){
                let json={
                  id:community.code,
                  name:community.name
                }
                communities.push(json)
              })
            }
            console.log(communities);
            res.send(communities);
          }
        }else{
          let code = 401;
          let result = {message:"The request did not have valid authorization credentials"}
          let response = new MlRespPayload().errorPayload(result, code);
          console.log(response);
          res.send(response);
        }
      }else{
        console.log("Request Payload not provided");
        res.send(new MlRespPayload().errorPayload({message:"Request Payload not provided"}, 400));
      }
    }))
  }

  if(config.couponValidate){
    graphQLServer.options('/coupons', cors());
    graphQLServer.post(config.couponValidate, bodyParser.json(), Meteor.bindEnvironment(function (req, res)
    {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      var context = {};
      context = getContext({req});
      context.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      console.log(req.body);
      console.log("-----------");
      console.log(req.headers);
      console.log("-----------");
      console.log(req.body.data);
      console.log("-----------");
      if(req)
      {
        console.log("coupon validation processing started..!!");
        let data = req.body.data;
        let apiKey = req.header("apiKey");
         if(apiKey&&apiKey==="741432fd-8c10-404b-b65c-a4c4e9928d32"){
          let resp;
          if(data) {
            resp = MlPromocodes.findOne({code:data.code});
            if(resp){
              let currentDate = new Date();
              if(resp.validityFrom <= currentDate && currentDate <= resp.validityTo){
                let code = 200;
                let result = {message:"valid promo applied"}
                let response = new MlRespPayload().successPayload(result, code);
                console.log(response);
                res.send(response);
              }else{
                let code = 401;
                let result = {message:"invalid promo code applied"}
                let response = new MlRespPayload().errorPayload(result, code);
                console.log(response);
                res.send(response);
              }
            }
            //res.send(cities);
          }
        }else{
          let code = 401;
          let result = {message:"The request did not have valid authorization credentials"}
          let response = new MlRespPayload().errorPayload(result, code);
          console.log(response);
          res.send(response);
        }
      }else{
        console.log("Request Payload not provided");
        res.send(new MlRespPayload().errorPayload({message:"Request Payload not provided"}, 400));
      }
    }))
  }

  WebApp.connectHandlers.use(Meteor.bindEnvironment(graphQLServer));
}
createApolloServer(defaultGraphQLOptions, defaultServerConfig);
