import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
import ScrollArea from 'react-scrollbar';
import gql from 'graphql-tag'
import Ideator from './Ideator'
import Institution from './Institution'

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
  }

  render(){
    let that=this;
    return (
      <div className="step_form_wrap step2">
      <ScrollArea speed={0.8} className="step_form_wrap"smoothScrolling={true} default={true} >
        {this.props.community=='ideator'?<Ideator/>:<div></div>}
        {this.props.community=='institution'?<Institution/>:<div></div>}
    </ScrollArea>
      </div>
    )
  }
};
