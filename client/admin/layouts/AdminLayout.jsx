import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {client} from '../core/apolloConnection';
import {ApolloProvider} from 'react-apollo';
import MlAdminApp from '../core/components/MlAdminApp';
import MetaTags from 'react-meta-tags';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
export default class  AdminLayout extends Component {
  constructor(props,context){
    super(props,context);
  }

  componentDidMount(){

  }
  render(){
    return (
      //To Provide the Apollo Context
      //To Provide Context for Theme,Language and Menu/Role
     <div>
       <MetaTags>
          <title> {'moolya'}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
       </MetaTags>
        <ApolloProvider client={client}>
          <div className="moolya_admin">
            <MlAdminApp {...this.props}/>

            <ToastContainer hideProgressBar={true} />
          </div>
        </ApolloProvider>
     </div>
    )
  }
}
