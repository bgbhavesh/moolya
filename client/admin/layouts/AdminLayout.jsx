import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {client} from '../core/apolloConnection';
import {ApolloProvider} from 'react-apollo';
import MlAdminApp from '../core/components/MlAdminApp';
export default class AdminLayout extends Component {
  constructor(props,context){
    super(props,context);
  }
  render(){
    return (
      //To Provide the Apollo Context
      //To Provide Context for Theme,Language and Menu/Role

      <ApolloProvider client={client}>
        <div className="moolya_admin">
          <MlAdminApp {...this.props}/>
        </div>
      </ApolloProvider>
    )
  }
}
