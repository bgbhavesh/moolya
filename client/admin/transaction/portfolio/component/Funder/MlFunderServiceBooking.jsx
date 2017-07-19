import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
// import InlineCalender from '../../../../app/views/inlineCalender';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
// import StepZilla from '../../../../common/components/stepzilla/StepZilla';
// import Step1 from '../../../../app/views/myprofile/funderProfile/MyAppointment/service';
// import Step2 from './secondSetp'
;
export default class FunderAboutView extends React.Component{
  componentDidMount()
  {
    var WinWidth = $(window).width();
    var WinHeight = $(window).height();
    $(function() {
      $('.float-label').jvFloat();
    });

    $('.switch input').change(function() {
      if($(this).parent().hasClass('nocolor-switch')){

        if ($(this).is(':checked')) {
          $('.state_label:nth-of-type(1)').removeClass('acLabel');
          $('.state_label:nth-of-type(2)').addClass('acLabel');
        }else{
          $('.state_label:nth-of-type(2)').removeClass('acLabel');
          $('.state_label:nth-of-type(1)').addClass('acLabel');
        }
      }else{
        if ($(this).is(':checked')) {
          $(this).parent('.switch').addClass('on');
        }else{
          $(this).parent('.switch').removeClass('on');
        }
      }
    });

      $('.tab_wrap_scroll').height(WinHeight-($('.app_header').outerHeight(true)+120));
    if(WinWidth > 768){
      $(".tab_wrap_scroll").mCustomScrollbar({theme:"minimal-dark"});
    }
  }
  render(){

    // const steps =
    //   [
    //     {name: 'Step1', component: <Step1 />},
    //     {name: 'Step2', component: <Step2 />}
    //   ]

    return (
      <div>
        <div className="col-md-6 nopadding-left">
          <div className="left_wrap">
            <ScrollArea
              speed={0.8}
              className="left_wrap"
              smoothScrolling={true}
              default={true}
            >
              <div className="form_bg">
                <form>
                  <div className="panel panel-default uploaded_files">
                    <div className="panel-heading">
                      Order Summary
                    </div>
                  </div>
                  <div className="col-md-3 nopadding-right">
                    <div className="ml_btn" style={{'textAlign': 'left'}}>
                      <a href="#" className="save_btn"><FontAwesome name='pencil'/> &nbsp; Change</a>
                    </div>
                  </div>
                  <div className="clearfix" />
                  <br />
                  <div className="panel panel-default uploaded_files">
                    <div className="panel-heading">
                      <label>Service Name : Premium vacation service &nbsp;<span className="ml ml-information"></span></label><br />
                      <label>Validity : 1Month till 17/08/2017 11:59:26 [IST]</label>
                    </div>
                  </div>


                  <br />
                  <div className="panel panel-default uploaded_files">
                    <div className="panel-heading">
                      Introduction Task
                      <div className="pull-right block_action">
                        <div className="fileUpload upload_file_mask">
                          <a href="javascript:void(0);"><span className="ml ml-upload"></span>
                            <input type="file" className="upload_file upload" name="file_source" /></a>
                        </div>
                      </div>

                    </div>
                    <div className="panel-body uploaded_files_swiper">
                      <ul className="swiper-wrapper">
                        <li className="doc_card" data-toggle="tooltip" data-placement="bottom" title="File name"><img src="/images/sub_default.jpg"/></li>
                      </ul>
                      <p className="show-information" style={{'display':'none'}}>text</p>
                    </div>
                  </div>
                  <div className="panel panel-default uploaded_files">
                    <div className="panel-heading">
                      Company Registration Task
                      <div className="pull-right block_action">
                        <div className="fileUpload upload_file_mask">
                          <a href="javascript:void(0);"><span className="ml ml-upload"></span>
                            <input type="file" className="upload_file upload" name="file_source" /></a>
                        </div>
                      </div>

                    </div>
                    <div className="panel-body uploaded_files_swiper">
                      <ul className="swiper-wrapper">
                        <li className="doc_card" data-toggle="tooltip" data-placement="bottom" title="File name"><img src="/images/sub_default.jpg"/></li>
                      </ul>
                      <p className="show-information" style={{'display':'none'}}>text</p>
                    </div>
                  </div>
                  <table className="table">
                    <thead>
                    <tr>
                      <th>
                        Cost
                      </th>
                    </tr>
                    </thead>
                    <tbody>

                    <tr>
                      <td>Actual Amount</td>
                      <td>: 5,000 INR</td>
                    </tr>
                    <tr>
                      <td>Offer Amount</td>
                      <td>: 500 INR</td>
                    </tr>
                    <tr>
                      <td>Tax</td>
                      <td>: 200 INR</td>
                    </tr>
                    <tr>
                      <td>Total Amount</td>
                      <td>: 5,700 INR</td>
                    </tr>
                    <tr>
                      <td>&nbsp;</td>
                      <td>
                        <div className="ml_btn" style={{'textAlign': 'left'}}>
                          <a href="#" className="save_btn">Book</a>
                          <a href="#" className="cancel_btn">Cancel</a>
                        </div>
                      </td>
                    </tr>

                    </tbody>
                  </table>

                </form>
              </div>
            </ScrollArea>
          </div>
        </div>
        <div className="col-md-6 nopadding-right">
          <div className="left_wrap">
            <ScrollArea
              speed={0.8}
              className="left_wrap"
              smoothScrolling={true}
              default={true}
            >
              <div className="form_bg">
                <form>
                  <div className="panel panel-default uploaded_files">
                    <div className="panel-heading">
                      Payment Mode
                    </div>

                  </div>
                  <h1>
                    Payment Gateway Here
                    <div className="ml_btn" style={{'textAlign':'center'}}><div className="save_btn">Proceed</div> <div className="cancel_btn">Cancel</div> </div>
                  </h1>
                </form>
              </div>
            </ScrollArea>
          </div>
        </div>

      </div>
    )
  }
};
