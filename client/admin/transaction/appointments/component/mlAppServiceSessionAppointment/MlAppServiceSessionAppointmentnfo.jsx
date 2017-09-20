import React, { Component } from 'react';
import ScrollArea from 'react-scrollbar'

export default class SessionAppointmentInfo extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="step_form_wrap step5">
        <ScrollArea speed={0.8} className="step_form_wrap" smoothScrolling={true} default={true} >
          <div className="col-md-6 nopadding-left">
            <div className="form_bg">
              <div className="form-group switch_wrap inline_switch">
                <label>Canclation is applicable</label>
                <label className="switch">
                  <input type="checkbox" />
                  <div className="slider"></div>
                </label>
              </div>
              <div className="clearfix" />
              <br />
              <div className="form-group switch_wrap inline_switch">
                <label>Is reschedule allowable</label>
                <label className="switch">
                  <input type="checkbox" />
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
                  <input type="checkbox" />
                  <div className="slider"></div>
                </label>
              </div>
              <div className="clearfix" />
              <br />
              <div className="form-group switch_wrap inline_switch">
                <label>How many times</label>
                <label className="switch">
                  <input type="checkbox" />
                  <div className="slider"></div>
                </label>
              </div>
            </div>
          </div>
          <div className="col-md-6 nopadding-left">
            <div className="panel panel-default uploaded_files">
              <div className="panel-heading">
                <div className="input_types"><input id="chapter_admin_check" type="checkbox" name="checkbox" value="1" /><label htmlFor="chapter_admin_check"><span></span>Document 1</label></div>
                <div className="pull-right block_action">
                  <div className="fileUpload upload_file_mask">
                    <a href="javascript:void(0);"><span className="ml ml-upload"></span>
                      <input type="file" className="upload_file upload" name="file_source" /></a>
                  </div>
                </div>
                <div className="pull-right block_action">
                  <span className="single_icon ml ml-information information"></span>
                </div>
              </div>
              <div className="panel-body uploaded_files_swiper">
                <ul className="swiper-wrapper">
                  <li className="doc_card" data-toggle="tooltip" data-placement="bottom" title="File name"><img src="/images/sub_default.jpg" /></li>
                </ul>
                <p className="show-information" style={{ 'display': 'none' }}>text</p>
              </div>
            </div>
          </div>
          <div className="col-md-6  nopadding-right">
            <div className="panel panel-default uploaded_files">
              <div className="panel-heading">
                <div className="input_types"><input id="chapter_admin_check" type="checkbox" name="checkbox" value="1" /><label htmlFor="chapter_admin_check"><span></span>Document 2</label></div>
                <div className="pull-right block_action">
                  <div className="fileUpload upload_file_mask">
                    <a href="javascript:void(0);"><span className="ml ml-upload"></span>
                      <input type="file" className="upload_file upload" name="file_source" /></a>
                  </div>
                </div>
                <div className="pull-right block_action">
                  <span className="single_icon ml ml-information information"></span>
                </div>
              </div>
              <div className="panel-body uploaded_files_swiper">
                <ul className="swiper-wrapper">
                  <li className="doc_card" data-toggle="tooltip" data-placement="bottom" title="File name"><img src="/images/sub_default.jpg" /></li>
                </ul>
                <p className="show-information" style={{ 'display': 'none' }}>text</p>
              </div>
            </div>
          </div>

        </ScrollArea>
      </div>
    );
  }
}