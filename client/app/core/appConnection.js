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
    const { loginToken } = config;

    if (Meteor.isClient && loginToken) {
      console.error('[Meteor Apollo Integration] The current user is not handled with your GraphQL requests: you are trying to pass a login token to an Apollo Client instance defined client-side. This is only allowed during server-side rendering, please check your implementation.');
      return httpLink
    } else {
      const localStorageLoginToken = Meteor.isClient && Accounts._storedLoginToken();
      const currentUserToken = localStorageLoginToken || loginToken;
      const middlewareLink = setContext(() => ({
        headers: {
          authorization: localStorage.getItem('token') || null,
          'meteor-login-token': currentUserToken,
          cookie : document.cookie,
        }
      }))
      const link = middlewareLink.concat(httpLink);
      const errorLink = onError(({ networkError, graphQLErrors }) => {
        if (networkError.statusCode === 401) {
          logout();
        }
      })
      const linkE = errorLink.concat(link);
      // const addLink = new ApolloLink((operation, forward) => {
      //   return forward(operation).map((response) => {
      //     console.log(response)
      //     const clonedResponse = response.clone();
      //     return clonedResponse.json()

      //   })
      // });
      // const linkA = addLink.concat(linkE);
      return linkE;

    }
  } else {
    return httpLink
  }
};

const defaultClientConfig =
  {
    link: createMeteorNetworkInterface(),
    //ssrMode: Meteor.isServer,
    cache: new InMemoryCache(),
    dataIdFromObject: r =>r.id
  };

const networkInterface = defaultClientConfig.link;
const dataIdFromObject = defaultClientConfig.dataIdFromObject;

// export const client = new ApolloClient(defaultClientConfig);
export const client = new ApolloClient({
  link: createHttpLink({ uri: Meteor.absoluteUrl('moolyaAdmin') }),
  cache: new InMemoryCache(),
});
