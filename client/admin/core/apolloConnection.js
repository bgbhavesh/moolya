import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import {ApolloClient,createNetworkInterface, createBatchingNetworkInterface} from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

const defaultNetworkInterfaceConfig = {
    uri:  Meteor.absoluteUrl('moolyaAdmin'),
    opts: {credentials: 'same-origin'},
    useMeteorAccounts: true,
    batchingInterface: false
};

const createMeteorNetworkInterface = (customNetworkInterfaceConfig = {}) => {
  const config = {
    ...defaultNetworkInterfaceConfig,
    ...customNetworkInterfaceConfig,
  };
  const useBatchingInterface = config.batchingInterface && typeof config.batchInterval === 'number';
  const interfaceToUse = useBatchingInterface ? createBatchingNetworkInterface : createNetworkInterface;
  const interfaceArgument = {
    uri: config.uri,
    opts: config.opts,
  }
  const networkInterface = interfaceToUse(interfaceArgument);
  if (config.useMeteorAccounts) {
    const { loginToken } = config;

    if (Meteor.isClient && loginToken) {
      console.error('[Meteor Apollo Integration] The current user is not handled with your GraphQL requests: you are trying to pass a login token to an Apollo Client instance defined client-side. This is only allowed during server-side rendering, please check your implementation.');
    } else {
      networkInterface.use([{
        applyMiddleware(request, next) {
          const localStorageLoginToken = Meteor.isClient && Accounts._storedLoginToken();
          const currentUserToken = localStorageLoginToken || loginToken;
          if (!currentUserToken) {
            next();
          }
          if (!request.options.headers) {
            request.options.headers = new Headers();

          }
          request.options.headers['meteor-login-token'] = currentUserToken;
          request.options.headers['cookie'] = document.cookie;
          next();
        }
      }]);

      networkInterface.useAfter([{
        applyAfterware({ response }, next) {
          if (response.status === 401) {
            logout();
          }

          const clonedResponse = response.clone();

          clonedResponse.json().then(data => {
            const { errors = [] } = data;
            if(data && data.unAuthorized){
                FlowRouter.go('/unauthorize')
            }
            else if(data && data.invalidToken){
              FlowRouter.go('/login')
            }
            else
              next();
          });
        }
      }]);
    }
  }
  return networkInterface;
};

const defaultClientConfig =
{
    networkInterface: createMeteorNetworkInterface(),
    //ssrMode: Meteor.isServer,
    dataIdFromObject: r =>r.id
};

const networkInterface = defaultClientConfig.networkInterface;
const dataIdFromObject = defaultClientConfig.dataIdFromObject;

export const client = new ApolloClient({networkInterface, dataIdFromObject});
/*
const networkInterace=createNetworkInterface(Meteor.settings.public.graphUrl);
export const client = newap ApolloClient({networkInterace,dataIdFromObject:r=>r.id});

    networkInterface.use([{
      applyMiddleware(req, next) {
        if (!req.options.headers) {
          req.options.headers = {};  // Create the header object if needed.
        }

        // get the authentication token from local storage if it exists
        const token = localStorage.getItem('Meteor.loginToken');
        req.options.headers.authorization = token ? token : null;
        next();
      }
    }]);

        networkInterface.useAfter([{
     applyAfterware({ response }, next) {

     setTimeout(function () {
     console.log(response)
     }, 1000)
     if (response.status === 401) {
     logout();
     }
     next();
     }
     }]);*/


