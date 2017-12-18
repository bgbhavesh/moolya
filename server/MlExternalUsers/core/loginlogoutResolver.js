/* eslint-disable */
import {Accounts} from 'meteor/accounts-base';
//import bcrypt from 'bcrypt';
import {Meteor} from 'meteor/meteor';
import {Random} from 'meteor/random';
import _ from 'lodash';
import  {MongoClient} from 'mongodb';
import {mlDBController} from '../../commons/mlDBController';
import generateToken from '../tokenUtils/generateToken';
import MlResolver from '../../commons/mlResolverDef';
import { StringConstants } from './errorConstants';
var SHA256 = Package.sha.SHA256;
var NpmModuleBcrypt = Package['npm-bcrypt'].NpmModuleBcrypt;
var bcrypt = NpmModuleBcrypt;



let getConnection= function (connection) {
  return _.extend({
    id: Random.id(),
    close () {
      // nothing to close here
    }
  },connection);
}
// let user = Meteor.users.findOne({'username': 'qatest-2@raksan.in'});
// console.log('user',user)
// //to validate password 
function validatePassword(userPassword, password) {
  return bcrypt.compareSync(SHA256(password), userPassword);
}

let callMethod=function (passedContext, name, ...args) {
  const handler = Meteor.default_server.method_handlers[name]
  if (!handler) {
    throw new Meteor.Error(404, `Method '${name}' not found`)
  }

  const connection =  getConnection({clientAddress:context.ip,httpHeaders:{'user-agent':context.browser,'host':context.url}})
  const context = {
    connection,
    ...passedContext
  }

  return handler.call(context, ...args)
}

MlResolver.MlLoginResolver['login'] = async (obj,{username,password}, context, info) => {
  let user;
  
  
  try {
    let user = Meteor.users.findOne({'username': username});
    console.log(user.services.password.bcrypt)
    console.log("###########",user)
    if (user) {
      const verifyPassword = validatePassword(user.services.password.bcrypt, password);
        console.log("###########",verifyPassword)

      if (verifyPassword) {
        const token = await generateToken({ username: username}, '24h');
        
        return { success: true, token:token, message: StringConstants.loginSuccessful };
     
      }
      }
    //   }else
    //   return { success: false, message: StringConstants.invalidCredentials };
    // }else
    // return { success: false, message: StringConstants.invalidCredentials };
  } catch (e) {
    return { success: false, message: e };
  }

}

MlResolver.MlMutationResolver['logout'] = (obj, {token}, context, info) => {
  console.log("########",obj)
  if (token && context.userId) {
    const hashedToken = Accounts._hashLoginToken(token);
    Accounts.destroyToken(context.userId, hashedToken);
  }else{
    return { success: false ,code:400,result:''};
  }
  const connection = getConnection({clientAddress:context.ip,httpHeaders:{'user-agent':context.browser,'host':context.url}});
  Accounts._successfulLogout(connection, context.userId);
  return { success: true ,code:200,result:''};
}
