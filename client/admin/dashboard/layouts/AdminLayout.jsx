import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {client} from '../../../commons/containers/adminLayout/apolloConnection';
import {ApolloProvider} from 'react-apollo';
import  MlAdminHeader from '../../../commons/components/header/MlAdminHeader'
import MlAdminLeftNav from '../../../commons/components/leftNavbar/MlAdminLeftNav'
import MoolyaAdminLayoutContainer from '../../../commons/containers/adminLayout/AdminLayoutContainer';
import MlAppContextProvider from './MlAppContextProvider';
import MlAdminApp from './MlAdminApp';
export default class AdminLayout extends Component {
  constructor(props,context){
    super(props,context);
  }
  render(){
    return (
      //To Provide the Apollo Context
      //To Provide Context for Theme,Language and Menu/Role

      <ApolloProvider client={client}>
      <div>
        <div className="moolya_admin">
          <MlAdminApp {...this.props}/>
        </div>
      </div>
      </ApolloProvider>
    )
  }
}
