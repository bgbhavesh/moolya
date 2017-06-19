import React from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
var FontAwesome = require('react-fontawesome');


export default class MlAppTaskStep3 extends React.Component {
  componentDidMount() {
    $('.float-label').jvFloat();
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight - (310 + $('.admin_header').outerHeight(true)));
  }

  render() {
    return (
      <div className="step_form_wrap step1">
        <ScrollArea speed={0.8} className="step_form_wrap" smoothScrolling={true} default={true}>
          <div className="col-md-6 nopadding-left">
            <div className="form_bg">
              <div className="form-group switch_wrap inline_switch">
                <label>Canclation is applicable</label>
                <label className="switch">
                  <input type="checkbox"/>
                  <div className="slider"></div>
                </label>
              </div>
              <div className="clearfix"/>
              <br />
              <div className="form-group switch_wrap inline_switch">
                <label>Is reschedule allowable</label>
                <label className="switch">
                  <input type="checkbox"/>
                  <div className="slider"></div>
                </label>
              </div>
            </div>
          </div>
          <div className="col-md-6 nopadding-right">
            <div className="form_bg">
              <div className="form-group switch_wrap inline_switch">
                <label>Refund of amount</label>
                <label className="switch">
                  <input type="checkbox"/>
                  <div className="slider"></div>
                </label>
              </div>
              <div className="clearfix"/>
              <br />
              <div className="form-group switch_wrap inline_switch">
                <label>How many times</label>
                <label className="switch">
                  <input type="checkbox"/>
                  <div className="slider"></div>
                </label>
              </div>
            </div>
          </div>
          <div className="col-md-6 nopadding-left">
            <div className="panel panel-default">
              <div className="panel-heading">
                Attachment
                <span className="see-more pull-right"><a href=""><FontAwesome name='minus'/></a></span>
              </div>
              <div className="panel-body">

                <div className="form-group">
                  <input type="text" placeholder="Document name" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <textarea placeholder="Info" className="form-control float-label"></textarea>
                </div>
                <div className="form-group">
                  <div className="input_types">
                    <div className="input_types"><input id="checkbox1" type="checkbox" name="checkbox" value="1"/><label
                      htmlFor="checkbox1"><span></span>Is mandatory ?</label></div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div className="col-md-6  nopadding-right">
            <div className="panel panel-default">
              <div className="panel-heading">
                Attachments
                <span className="see-more pull-right"><a href=""><FontAwesome name='minus'/></a></span>
              </div>
              <div className="panel-body">

                <div className="form-group">
                  <input type="text" placeholder="Document name" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <textarea placeholder="Info" className="form-control float-label"></textarea>
                </div>
                <div className="form-group">
                  <div className="input_types">
                    <div className="input_types"><input id="checkbox1" type="checkbox" name="checkbox" value="1"/><label
                      htmlFor="checkbox1"><span></span>Is mandatory ?</label></div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </ScrollArea>
      </div>
    )
  }
};
