/* eslint-disable */

import gql from 'graphql-tag';
import {client} from '../../admin/core/apolloConnection';

export function loginActionHandler(username, password) {
  const loginGraphqlAction = client.mutate({
    mutation: gql `
    mutation ($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        success,
        token,
        message
      }
    }
    `,
    variables: {
      username:username,
      password:password
    }
  })
  return loginGraphqlAction
  // const { success, token, message } = loginGraphqlAction.data.login;
  // return new Promise((resolve,reject)=>{
  //   if(success){
  //     resolve(token)
  //   }else{
  //     reject(message)
  //   }
  // }); 
  
}        