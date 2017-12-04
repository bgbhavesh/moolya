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
    uri:  Meteor.absoluteUrl('moolyaAdmin'),
    credentials: 'same-origin',
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
      const addLink = new ApolloLink((operation, forward) => {
        return forward(operation).map((response) => {
          console.log(response)
            const data = response;
            const { errors = [] } = response;
            if(data && data.unAuthorized){
                // toastr.error('Sorry! You do not have access permission for this option, if you think this is incorrect - please contact us at +91-4046725726 or your  Sub-Chapter admin ');
                // window.history.back()
                FlowRouter.go('/unauthorize')
            }
            else if(data && data.invalidToken){
              FlowRouter.go('/login')
            }
          return response;          
          // if (response.data.user.lastLoginDate) {
          //   response.data.user.lastLoginDate = new Date(response.data.user.lastLoginDate)
          // }
        })
        // return forward(operation).map((response) => {
        //   const clonedResponse = response.clone();

        //   return response.json().then(data => {
        //     const { errors = [] } = data;
        //     if(data && data.unAuthorized){
        //         // toastr.error('Sorry! You do not have access permission for this option, if you think this is incorrect - please contact us at +91-4046725726 or your  Sub-Chapter admin ');
        //         // window.history.back()
        //         FlowRouter.go('/unauthorize')
        //     }
        //     else if(data && data.invalidToken){
        //       FlowRouter.go('/login')
        //     }
        //   });

        // })
      });
      const linkA = addLink.concat(link);
      return link;

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

// export const client = new ApolloClient({
//   link: createHttpLink({ uri: Meteor.absoluteUrl('moolyaAdmin') }),
//   cache: new InMemoryCache(),
// });
export const client = new ApolloClient(defaultClientConfig);
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


