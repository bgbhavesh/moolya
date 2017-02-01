import React, { Component } from 'react'
import AdminLayoutContainer from './AdminLayoutContainer'

import {ApolloClient,createNetworkInterface} from 'apollo-client';
import { ApolloProvider } from 'react-apollo';


export default  class AdminLayoutConnection extends React.Component {

  constructor(...args) {
    super(...args);

  }

  render() {
    return (
      <AdminLayoutContainer/>
    );
  }
}
