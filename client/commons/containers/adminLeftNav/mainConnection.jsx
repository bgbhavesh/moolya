import React, { Component } from 'react'
import LeftNavContainer from './LeftNavContainer'

import {ApolloClient,createNetworkInterface} from 'apollo-client';
import { ApolloProvider } from 'react-apollo';


export default  class LeftNavConnection extends React.Component {

    constructor(...args) {
        super(...args);

        const networkInterface = createNetworkInterface('http://localhost:8090/graphql');
        this.client = new ApolloClient({
            networkInterface,
            dataIdFromObject: r => r.id,
        });
    }
    render() {
        return (
            <ApolloProvider client={this.client}>
                <LeftNavContainer/>
            </ApolloProvider>
        );
    }
}
