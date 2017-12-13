/**
 * Created by venkatsrinag on 24/4/17.
 */
import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
const defaultNetworkInterfaceConfig = {
  uri: Meteor.absoluteUrl('moolya'),
  opts: {credentials: 'same-origin'},
  useMeteorAccounts: true,
  batchingInterface: false
};

const createMeteorNetworkInterface = (customNetworkInterfaceConfig = {}) => {
  const config = {
    ...defaultNetworkInterfaceConfig,
    ...customNetworkInterfaceConfig,
  };
  const interfaceArgument = {
    uri: config.uri,
    credentials: config.credentials,
  }
  httpLink = createHttpLink(interfaceArgument);

  if (config.useMeteorAccounts) {
    const loginToken= localStorage.getItem('token');
    
    if (Meteor.isClient && loginToken) {
      console.error('[Meteor Apollo Integration] The current user is not handled with your GraphQL requests: you are trying to pass a login token to an Apollo Client instance defined client-side. This is only allowed during server-side rendering, please check your implementation.');
      return httpLink
    } else {
      const localStorageLoginToken = Meteor.isClient && Accounts._storedLoginToken();
      const currentUserToken = localStorageLoginToken || loginToken;
      const MiddlewareLink = new ApolloLink((operation, forward) => {
        operation.setContext({
          headers: {
            cookie : document.cookie,            
            'meteor-login-token': RegExp("meteor_login_token[^;]+").exec(document.cookie)[0].toString().replace(/^[^=]+./,"") || currentUserToken,
          }
        });
        return forward(operation)
      })
      // logger
      const LoggerLink = new ApolloLink((operation, forward) => {
        if (process.env.NODE_ENV === 'development') console.log(`[GraphQL Logger] ${operation.operationName}`)
        return forward(operation).map(result => {
          if (process.env.NODE_ENV === 'development') console.log(
            `[GraphQL Logger] received result from ${operation.operationName}`,
          )
          return result
        })
      })
      // error - use your error lib here
      const ErrorLink = onError(({graphQLErrors, networkError}) => {
        if (graphQLErrors)
          graphQLErrors.map(({message, locations, path}) =>
            console.log(
              `[GraphQL Error] Message: ${message}, Location: ${locations}, Path: ${path}`),
          )
        if (networkError) {
          if (networkError.statusCode === 401) {
            logout();
          } console.log(`[Network error] ${networkError}`)
        }
      })
      const AddLink = new ApolloLink((operation, forward) => {
        return forward(operation).map((response) => {
          return response;          
        })
     
      });
      const link = ApolloLink.from([MiddlewareLink, LoggerLink, ErrorLink, AddLink, httpLink])
      return link;

    }
  } else {
    return httpLink
  }
};

const cache = new InMemoryCache({
  dataIdFromObject: r =>r.id,
  addTypename: true,
});
const defaultClientConfig =
{
    link: createMeteorNetworkInterface(),
    //ssrMode: Meteor.isServer,
    cache: cache,
};

const networkInterface = defaultClientConfig.link;
const dataIdFromObject = defaultClientConfig.dataIdFromObject;

export const appClient = new ApolloClient(defaultClientConfig);
