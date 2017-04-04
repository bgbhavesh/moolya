import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import ScrollArea from 'react-scrollbar'

export default class Step3 extends React.Component{
  componentDidMount()
  {
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(160+$('.admin_header').outerHeight(true)));

    $("input[type='checkbox']").change(function() {
      $(this).parents(".form-group").toggleClass("bar_check");
    });

    var mySwiper = new Swiper('.swiper-menu', {
      speed: 400,
      spaceBetween: 100,
      slidesPerView:'auto',
      spaceBetween:30,
    });

  }
  render(){
    return (
      <div className="step_form_wrap step3">
        <ScrollArea speed={0.8} className="step_form_wrap" smoothScrolling={true} default={true} >
          <div className="col-lg-3 nopadding-left">

          </div>

          <div className="col-lg-6 nopadding-left">

            <br className="brclear"/>
            <div className="form-group bar_uncheck">
              <div className="input_types"><input id="chapter_admin_check1" type="checkbox" name="checkbox" value="1" /><label htmlFor="chapter_admin_check1"><span></span>Having Promocode ?</label></div>
            </div>
            <div className="form-group bar_uncheck">
              <div className="input_types"><input id="chapter_admin_check2" type="checkbox" name="checkbox" value="1" /><label htmlFor="chapter_admin_check2"><span></span>Please Choose the payment method</label></div>
            </div>
            <div className="form-group bar_uncheck">
              <div className="input_types"><input id="chapter_admin_check3" type="checkbox" name="checkbox" value="1" /><label htmlFor="chapter_admin_check3"><span></span>Share the payment link</label></div>
            </div>

          </div>


          <div className="col-lg-3 nopadding-right">

          </div>

        </ScrollArea>
      </div>
    )
  }
};
