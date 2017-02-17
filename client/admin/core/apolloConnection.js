import React, { Component } from 'react'

import {ApolloClient,createNetworkInterface} from 'apollo-client';
import { ApolloProvider } from 'react-apollo';


const networkInterface = createNetworkInterface(Meteor.settings.public.graphqlUrl);

export const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: r => r.id,
});

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

    /*     networkInterface.useAfter([{
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
