/**
 * Created by Mukhil on 19/6/17.
 */
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import ScrollArea from 'react-scrollbar';


export default class MlAppServiceStep2 extends React.Component{
  componentDidMount()
  {
    var mySwiper = new Swiper('.manage_tasks', {
      speed: 400,
      spaceBetween:20,
      slidesPerView:'auto',
      pagination: '.swiper-pagination',
      paginationClickable: true
    });
    $('.float-label').jvFloat();
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(290+$('.admin_header').outerHeight(true)));
  }
  render(){
    return (
      <div className="step_form_wrap step1">
        <ScrollArea speed={0.8} className="step_form_wrap"smoothScrolling={true} default={true} >
          <br/>
          <div className="panel panel-default new_profile_tabs">
            <div className="panel-heading">
              Add the tasks to the services created
            </div>
            <div className="panel-body">
              <div className="ml_tabs ml_tabs_large">
                <ul  className="nav nav-pills">
                  <li className="active">
                    <a href="#newTask" data-toggle="tab" className="add-contact"><FontAwesome name='plus-square'/> Add new task</a>
                  </li>
                  <li >
                    <a  href="#2a" data-toggle="tab"><FontAwesome name='minus-square'/> Valuation</a>
                  </li>
                </ul>

                <div className="tab-content clearfix">

                  <div className="tab-pane active" id="newTask">
                    <div className="col-md-6 nopadding-left">
                      <form>
                        <div className="form-group">
                          <select className="form-control"><option>Select task</option></select>
                        </div>
                        <div className="form-group">
                          <label>Total number of Sessions Rs. <input className="form-control inline_input"/> </label>
                        </div>
                        <div className="form-group">
                          <label>Duration: &nbsp; <input type="text" className="form-control inline_input"/> Hours <input type="text" className="form-control inline_input"/> Mins </label>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-6 nopadding-right">
                      <form>
                        <div className="form-group">
                          <input type="text" className="form-control" placeholder="Display Name"/>
                        </div>
                        <div className="form-group">
                          <span className="placeHolder active">Frequency</span>
                          <select className="form-control"><option>Weekly</option></select>
                        </div>
                        <div className="form-group switch_wrap inline_switch">
                          <label>Status</label>
                          <label className="switch">
                            <input type="checkbox" />
                            <div className="slider"></div>
                          </label>
                        </div>

                      </form>
                    </div>
                    <br className="brclear"/>
                    <div className="panel panel-info">
                      <div className="panel-heading">
                        <div className="col-md-2 nopadding-left">Session 1</div>
                        <div className="col-md-4">
                          <div  style={{'marginTop':'-4px'}}>
                            <label>Duration: &nbsp; <input type="text" className="form-control inline_input"/> Hours <input type="text" className="form-control inline_input"/> Mins </label>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div style={{'marginTop':'-12px'}}>
                            <select className="form-control"><option>Choose Activity</option></select>
                          </div>
                        </div>
                        <div className="col-md-3"></div>
                        &nbsp;
                        <span className="see-more pull-right"><a href=""><FontAwesome name='plus'/></a></span>
                      </div>
                      <div className="panel-body">
                        <div className="swiper-container manage_tasks">
                          <div className="swiper-wrapper">
                            <div className="swiper-slide funding_list list_block notrans">
                              <p className="online">Online</p>
                              <span>Duration: <FontAwesome name='pencil'/></span><br />
                              <div className="form-group">
                                <label><input type="text" className="form-control inline_input"/> Hours <input type="text" className="form-control inline_input"/> Mins </label>
                              </div>
                              <h3>Activity name 1</h3>
                            </div>
                            <div className="swiper-slide funding_list list_block notrans">
                              <p className="online">Online</p>
                              <span>Duration: <FontAwesome name='pencil'/></span><br />
                              <div className="form-group">
                                <label><input type="text" className="form-control inline_input"/> Hours <input type="text" className="form-control inline_input"/> Mins </label>
                              </div>
                              <h3>Activity name 1</h3>
                            </div>
                            <div className="swiper-slide funding_list list_block notrans">
                              <p className="online">Online</p>
                              <span>Duration: <FontAwesome name='pencil'/></span><br />
                              <div className="form-group">
                                <label><input type="text" className="form-control inline_input"/> Hours <input type="text" className="form-control inline_input"/> Mins </label>
                              </div>
                              <h3>Activity name 1</h3>
                            </div>
                            <div className="swiper-slide funding_list list_block notrans">
                              <p className="online">Online</p>
                              <span>Duration: <FontAwesome name='pencil'/></span><br />
                              <div className="form-group">
                                <label><input type="text" className="form-control inline_input"/> Hours <input type="text" className="form-control inline_input"/> Mins </label>
                              </div>
                              <h3>Activity name 1</h3>
                            </div>
                            <div className="swiper-slide funding_list list_block notrans">
                              <p className="offline">Offline</p>
                              <span>Duration: <FontAwesome name='pencil'/></span><br />
                              <div className="form-group">
                                <label><input type="text" className="form-control inline_input"/> Hours <input type="text" className="form-control inline_input"/> Mins </label>
                              </div>
                              <h3>Activity name 1</h3>
                            </div>
                            <div className="swiper-slide funding_list list_block notrans">
                              <p className="online">Online</p>
                              <span>Duration: <FontAwesome name='pencil'/></span><br />
                              <div className="form-group">
                                <label><input type="text" className="form-control inline_input"/> Hours <input type="text" className="form-control inline_input"/> Mins </label>
                              </div>
                              <h3>Activity name 1</h3>
                            </div>

                          </div>
                        </div>


                      </div>
                    </div>
                    <div className="ml_icon_btn">
                      <a href="#" className="save_btn"><span className="ml ml-save"></span></a>
                      <a href="#" className="cancel_btn"><span className="ml ml-delete"></span></a>
                    </div>
                  </div>
                  <div className="tab-pane" id="2a">
                    2
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
