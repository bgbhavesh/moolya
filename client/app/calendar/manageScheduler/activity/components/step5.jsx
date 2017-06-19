import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import ScrollArea from 'react-scrollbar';


export default class Step1 extends React.Component{
  componentDidMount()
  {
    var mySwiper = new Swiper('.blocks_in_form', {
      speed: 400,
      spaceBetween:20,
      slidesPerView:5,
      pagination: '.swiper-pagination',
      paginationClickable: true
    });
    $('.float-label').jvFloat();
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(310+$('.admin_header').outerHeight(true)));
  }
  render(){
    return (
      <div className="step_form_wrap step1">
        <ScrollArea speed={0.8} className="step_form_wrap"smoothScrolling={true} default={true} >
          <div className="form_bg">
            1
          </div>
        </ScrollArea>
      </div>
    )
  }
};
