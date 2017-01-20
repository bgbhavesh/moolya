import React, { Component } from 'react'
import AdminLayoutContainer from './AdminLayoutContainer'

import {ApolloClient,createNetworkInterface} from 'apollo-client';
import { ApolloProvider } from 'react-apollo';


export default  class AdminLayoutConnection extends React.Component {

    constructor(...args) {
        super(...args);

        const networkInterface = createNetworkInterface('http://localhost:8090/graphql');
        this.client = new ApolloClient({
            networkInterface,
            dataIdFromObject: r => r.id,
        });

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
            <ApolloProvider client={this.client}>
                <AdminLayoutContainer/>
            </ApolloProvider>
        );
    }
}
