import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
import ScrollArea from 'react-scrollbar';
import gql from 'graphql-tag'
import Ideator from './Ideator'
import Institution from './Institution'
import ServiceProvider from './ServiceProvider'
import Funder from './Funder'
import Startup from './Startup'
import Company from './Company'
import {initalizeFloatLabel} from '../../../utils/formElemUtil';

export default class Step2 extends React.Component{
  constructor(props){
    super(props);
    this.state={

    };
    return this;
  }

  componentDidMount()
  {
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(160+$('.admin_header').outerHeight(true)));
    initalizeFloatLabel();
  }
  //Service Providers
  //Companies
  //Startups
  //Funders
  render(){
    let that=this;
    return (
      <div className="step_form_wrap step2">
      <ScrollArea speed={0.8} className="step_form_wrap"smoothScrolling={true} default={true} >
        {this.props.community=='Ideators'?<Ideator registrationId={that.props.registrationId} registrationDetails={this.props.registrationDetails}/>:<div></div>}
        {this.props.community=='Institutions'?<Institution registrationId={that.props.registrationId} registrationDetails={this.props.registrationDetails}/>:<div></div>}
        {this.props.community=='Funders'?<Funder registrationId={that.props.registrationId} registrationDetails={this.props.registrationDetails}/>:<div></div>}
        {this.props.community=='Service Providers'?<ServiceProvider registrationId={that.props.registrationId} registrationDetails={this.props.registrationDetails}/>:<div></div>}
        {this.props.community=='Startups'?<Startup registrationId={that.props.registrationId} registrationDetails={this.props.registrationDetails}/>:<div></div>}
        {this.props.community=='Companies'?<Company registrationId={that.props.registrationId} registrationDetails={this.props.registrationDetails}/>:<div></div>}
    </ScrollArea>
      </div>
    )
  }
};
