import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

export default class Step6 extends React.Component{
componentDidMount()
  { 
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(160+$('.admin_header').outerHeight(true)));
  }
  render(){
    return (
      <div className="step_form_wrap step5">
      
      Step 5
    
    
     
      </div>      
    )
  }
};