import React from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
var FontAwesome = require('react-fontawesome');


export default class MlAppTaskSession extends React.Component {
  componentDidMount() {
    var mySwiper = new Swiper('.blocks_in_form', {
      speed: 400,
      spaceBetween: 20,
      slidesPerView: 5,
      pagination: '.swiper-pagination',
      paginationClickable: true
    });
    $('.float-label').jvFloat();
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight - (310 + $('.admin_header').outerHeight(true)));
  }

  render() {
    return (
      <div className="step_form_wrap step1">
        <ScrollArea speed={0.8} className="step_form_wrap" smoothScrolling={true} default={true}>
          <div className="form_bg">
            <div className="panel panel-default">
              <div className="panel-heading">
                <div className="col-md-3 nopadding-left">Section 1</div>
                <div className="col-md-3">
                  <div style={{'marginTop': '-4px'}}>
                    <label>Duration: &nbsp; <input type="text" className="form-control inline_input"/> Hours <input
                      type="text" className="form-control inline_input"/> Mins </label>
                  </div>
                </div>
                <div className="col-md-3">
                  <div style={{'marginTop': '-12px'}}>
                    <select className="form-control">
                      <option>Equity of subdivisions</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-3"></div>
                &nbsp;
                <span className="see-more pull-right"><a href=""><FontAwesome name='plus'/></a></span>
              </div>
              <div className="panel-body">
                <div className="swiper-container blocks_in_form">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
                      <div className="list_block notrans funding_list">
                        <div>
                          <p className="online">Online</p>
                          <span>Duration: <FontAwesome name='pencil'/></span><br />
                          <div className="form-group">
                            <label><input type="text" className="form-control inline_input"/> Hours <input type="text"
                                                                                                           className="form-control inline_input"/>
                              Mins </label>
                          </div>

                        </div>
                        <h3>Activity name 1</h3>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="list_block notrans funding_list">
                        <div>
                          <p className="offline">Offline</p>
                          <span>Duration: <FontAwesome name='pencil'/></span><br />
                          <div className="form-group">
                            <label><input type="text" className="form-control inline_input"/> Hours <input type="text"
                                                                                                           className="form-control inline_input"/>
                              Mins </label>
                          </div>

                        </div>
                        <h3>Activity name 1</h3>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="list_block notrans funding_list">
                        <div>
                          <p className="online">Online</p>
                          <span>Duration: <FontAwesome name='pencil'/></span><br />
                          <div className="form-group">
                            <label><input type="text" className="form-control inline_input"/> Hours <input type="text"
                                                                                                           className="form-control inline_input"/>
                              Mins </label>
                          </div>

                        </div>
                        <h3>Activity name 1</h3>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="list_block notrans funding_list">
                        <div>
                          <p className="offline">Offline</p>
                          <span>Duration: <FontAwesome name='pencil'/></span><br />
                          <div className="form-group">
                            <label><input type="text" className="form-control inline_input"/> Hours <input type="text"
                                                                                                           className="form-control inline_input"/>
                              Mins </label>
                          </div>

                        </div>
                        <h3>Activity name 1</h3>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="list_block notrans funding_list">
                        <div>
                          <p className="online">Online</p>
                          <span>Duration: <FontAwesome name='pencil'/></span><br />
                          <div className="form-group">
                            <label><input type="text" className="form-control inline_input"/> Hours <input type="text"
                                                                                                           className="form-control inline_input"/>
                              Mins </label>
                          </div>

                        </div>
                        <h3>Activity name 1</h3>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="list_block notrans funding_list">
                        <div>
                          <p className="offline">Offline</p>
                          <span>Duration: <FontAwesome name='pencil'/></span><br />
                          <div className="form-group">
                            <label><input type="text" className="form-control inline_input"/> Hours <input type="text"
                                                                                                           className="form-control inline_input"/>
                              Mins </label>
                          </div>

                        </div>
                        <h3>Activity name 1</h3>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="list_block notrans funding_list">
                        <div>
                          <p className="offline">Offline</p>
                          <span>Duration: <FontAwesome name='pencil'/></span><br />
                          <div className="form-group">
                            <label><input type="text" className="form-control inline_input"/> Hours <input type="text"
                                                                                                           className="form-control inline_input"/>
                              Mins </label>
                          </div>

                        </div>
                        <h3>Activity name 1</h3>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="list_block notrans funding_list">
                        <div>
                          <p className="online">Online</p>
                          <span>Duration: <FontAwesome name='pencil'/></span><br />
                          <div className="form-group">
                            <label><input type="text" className="form-control inline_input"/> Hours <input type="text"
                                                                                                           className="form-control inline_input"/>
                              Mins </label>
                          </div>

                        </div>
                        <h3>Activity name 1</h3>
                      </div>
                    </div>
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
