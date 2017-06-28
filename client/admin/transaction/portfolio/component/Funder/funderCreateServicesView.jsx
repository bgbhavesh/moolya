import React, {Component} from "react";
import {render} from "react-dom";

export default class FunderCreateServicesView extends Component {
  componentDidMount() {
    var WinWidth = $(window).width();
    var WinHeight = $(window).height();
    $(function () {
      $('.float-label').jvFloat();
    });

    $('.switch input').change(function () {
      if ($(this).parent().hasClass('nocolor-switch')) {

        if ($(this).is(':checked')) {
          $('.state_label:nth-of-type(1)').removeClass('acLabel');
          $('.state_label:nth-of-type(2)').addClass('acLabel');
        } else {
          $('.state_label:nth-of-type(2)').removeClass('acLabel');
          $('.state_label:nth-of-type(1)').addClass('acLabel');
        }
      } else {
        if ($(this).is(':checked')) {
          $(this).parent('.switch').addClass('on');
        } else {
          $(this).parent('.switch').removeClass('on');
        }
      }
    });

    $('.tab_wrap_scroll').height(WinHeight - ($('.app_header').outerHeight(true) + 120));
    if (WinWidth > 768) {
      $(".tab_wrap_scroll").mCustomScrollbar({theme: "minimal-dark"});
    }
  }

  render() {
    return (
      <div>
        <h2>About Us</h2>
        <div className="tab_wrap_scroll">
          <div className="col-md-6 nopadding-left">
            <div className="form_bg">
              <form>
                <div className="form-group switch_wrap switch_names">
                  <span className="state_label">Online</span><label className="switch nocolor-switch">
                  <input type="checkbox" defaultChecked/>
                  <div className="slider"></div>
                </label>
                  <span className="state_label acLabel">Offline</span>
                </div>
                <div className="clearfix"/>
                <div className="form-group">
                  <textarea className="form-control float-label" placeholder="About"></textarea>
                </div>
                <div className="form-group">
                  <label>Required number of Sessions <input className="form-control inline_input medium_in"/> </label>
                </div>
                <div className="form-group">
                  <label>Required &nbsp; <input type="text" className="form-control inline_input"/> Hours <input
                    type="text" className="form-control inline_input"/> Mins </label>
                </div>
                <div className="form-group">
                  <textarea className="form-control float-label" placeholder="Experted input"></textarea>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-6 nopadding-right">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <select className="form-control float-label" placeholder="Experted input">
                    <option>software</option>
                  </select>
                </div>
                <div className="form-group">
                  <select className="form-control float-label" placeholder="Conversation type">
                    <option>Video</option>
                  </select>
                </div>
                <div className="form-group">
                  <select className="form-control float-label" placeholder="Frequency">
                    <option>Video</option>
                  </select>
                </div>
                <div className="form-group">
                  <textarea className="form-control float-label" placeholder="Experted Output"></textarea>
                </div>
                <div className="clearfix"/>
                <div className="panel panel-default step5">
                  <div className="panel-heading">Attachments if any ?

                    <div className="pull-right block_action">
                      <div className="fileUpload upload_file_mask">
                        &nbsp;&nbsp;<a href="#"><span className="ml ml-plus"></span></a>
                      </div>
                    </div>
                    <div className="pull-right" style={{'marginTop': '-15px'}}>
                      <select className="form-control" placeholder="Document name">
                        <option>Company Registration</option>
                      </select>
                    </div>
                  </div>
                  <div className="panel-body nopadding">
                    <div className="upload-file-wrap">
                      <input type="file" name="fileinput[]" id="fileinput" className="inputfile inputfile-upload"
                             data-multiple-caption="{count} files selected" accept="image/*" onchange="loadFile(event)"
                             multiple/>
                      <label for="fileinput">
                        <figure>
                          <i className="fa fa-upload" aria-hidden="true"></i>
                        </figure>
                      </label>
                    </div>
                    <div className="upload-image"><img id="output"/></div>
                    <div className="upload-image"></div>
                    <div className="upload-image"></div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
};
