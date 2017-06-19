import React from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
var FontAwesome = require('react-fontawesome');

export default class MlAppTaskStep4 extends React.Component {
  componentDidMount() {
    $('.float-label').jvFloat();
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight - (310 + $('.admin_header').outerHeight(true)));
  }

  render() {
    return (
      <div className="step_form_wrap step1">
        <ScrollArea speed={0.8} className="step_form_wrap" smoothScrolling={true} default={true}>
          <div className="centered_form">
            <form>
              <div className="form-group">
                <label>Enter payable amount Rs. <input className="form-control inline_input medium_in"/> </label>
              </div>
              <div className="form-group switch_wrap switch_names inline_switch">
                <label>Is Eligible for discount</label>
                <span className="state_label">Yes</span><label className="switch nocolor-switch">
                <input type="checkbox" defaultChecked/>
                <div className="slider"></div>
              </label>
                <span className="state_label acLabel">No</span>
              </div>
              <br className="brclear"/>
              <div className="form-group">
                <div className="input_types">
                  <input id="radio1" type="radio" name="radio1" value="1"/><label
                  htmlFor="radio1"><span><span></span></span>Amount Rs <input
                  className="form-control inline_input"/></label>
                </div>
                <div className="input_types">
                  <input id="radio2" type="radio" name="radio1" value="2"/><label
                  htmlFor="radio2"><span><span></span></span>Percentage <input className="form-control inline_input"/> %
                </label>
                </div>
                <br className="brclear"/>
              </div>
              <div className="form-group">
                <div className="input_types">
                  <input id="radio1" type="radio" name="radio2" value="1"/><label
                  htmlFor="radio1"><span><span></span></span>Tax Inclusive</label>
                </div>
                <div className="input_types">
                  <input id="radio2" type="radio" name="radio2" value="2"/><label
                  htmlFor="radio2"><span><span></span></span>Tax Exclusive </label>
                </div>
                <br className="brclear"/>
              </div>
              <div className="form-group switch_wrap switch_names inline_switch">
                <label>Is Applicable for PROMOCODE</label>
                <span className="state_label">Yes</span><label className="switch nocolor-switch">
                <input type="checkbox" defaultChecked/>
                <div className="slider"></div>
              </label>
                <span className="state_label acLabel">No</span>
              </div>
              <div className="form-group">
                <label>Enter facilitation charges &nbsp; &nbsp; &nbsp; &nbsp; </label>
                <div className="input_types">
                  <input id="radio1" type="radio" name="radio1" value="1"/><label
                  htmlFor="radio1"><span><span></span></span>Amount Rs <input
                  className="form-control inline_input"/></label>
                </div>
                <div className="input_types">
                  <input id="radio2" type="radio" name="radio1" value="2"/><label
                  htmlFor="radio2"><span><span></span></span>Percentage <input className="form-control inline_input"/> %
                </label>
                </div>
                <br className="brclear"/>
              </div>
              <div className="form-group">
                <label>Derived amount Rs. <input className="form-control inline_input medium_in" readOnly="readOnly"/>
                </label>
              </div>
            </form>
          </div>
        </ScrollArea>
      </div>
    )
  }
};
