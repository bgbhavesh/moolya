import React, { Component } from 'react'
import AdminLayoutContainer from './AdminLayoutContainer'
import MoolyaClusterContainer from '../../../admin/cluster/containers/ClusterContainer'
import {ApolloClient,createNetworkInterface} from 'apollo-client';
import { ApolloProvider } from 'react-apollo';


const networkInterface = createNetworkInterface('http://localhost:8090/graphql');

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

export const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: r => r.id,
});

export default  class AdminLayoutConnection extends React.Component {

    constructor(...args) {
        super(...args);


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
    }
    render() {
        return (
            <ApolloProvider client={client}>
         {/*   <AdminLayoutContainer/>*/}
               <MoolyaClusterContainer/>
            </ApolloProvider>
        );
    }
}
