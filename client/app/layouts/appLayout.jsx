import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {appClient} from '../core/appConnection';
import {ApolloProvider} from 'react-apollo';
import MetaTags from 'react-meta-tags';

import MlAppLayout from '../core/components/MlAppComponent'

export default class AppLayout extends Component{
    constructor(props,AppLayoutcontext){
        super(props, AppLayoutcontext);
    }

    render(){
        return(
            <div>
                <MetaTags>
                    <title> {'moolya'}</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                </MetaTags>
                <ApolloProvider client={appClient}>
                    <div className="moolya_app">
                        <MlAppLayout {...this.props}/>
                    </div>
                </ApolloProvider>
            </div>
        )
    }
}
