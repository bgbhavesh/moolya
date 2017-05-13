/**
 * Created by vishwadeep on 12/5/17.
 */

import React from "react";
import {render} from "react-dom";
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
var options = [
  {value: 'Type of Funding', label: 'Type of Funding'},
  {value: '2', label: '2'}
];
function logChange(val) {
  console.log("Selected: " + val);
}


export default class MlAppNewSpokePerson extends React.Component {
  componentDidMount() {
    var mySwiper = new Swiper('.blocks_in_form', {
      speed: 400,
      spaceBetween: 20,
      slidesPerView: 3,
      pagination: '.swiper-pagination',
      paginationClickable: true
    });
    var $frame = $('#forcecentered');
    var $wrap = $frame.parent();
  }

  render() {
    return (
      <div className="col-lg-12">
        <div className="row">
          <div className="investement-view-content">
            <div className="col-md-6">
              <div className="form_bg">
                <form>
                  <div className="panel panel-default">
                    <div className="panel-heading"> Subscription: Bespoke Office</div>

                    <div className="panel-body">

                      <div className="form_bg">
                        <form>

                          <div className="form-group">
                            <input type="text" placeholder="Total Number of Users"
                                   className="form-control float-label" id="cluster_name"/>
                          </div>

                          <div className="form-group">
                            <input type="text" placeholder="Principal Users" className="form-control float-label"
                                   id="cluster_name"/>
                          </div>
                          <div className="form-group">
                            <input type="text" placeholder="Team Members" className="form-control float-label"
                                   id="cluster_name"/>
                          </div>
                          <div className="form-group switch_wrap switch_names">

                            <span className="state_label acLabel">All Communities</span><label className="switch">
                            <input type="checkbox"/>
                            <div className="slider"></div>
                          </label>
                            <span className="state_label">Specific</span>
                          </div>
                        </form>
                      </div>

                    </div>
                  </div>

                  <div className="panel panel-default mart20">
                    <div className="panel-heading"> User Type</div>

                    <div className="panel-body">
                      <div className="swiper-container blocks_in_form">
                        <div className="swiper-wrapper">
                          <div className="swiper-slide">
                            <div className="team-block marb0">
                              <span className="ml ml-moolya-symbol"></span>
                              <h3>
                                Office Barer
                              </h3>
                            </div>
                            <div className="form-group mart20">
                              <input type="text" placeholder="Enter Total Numbers"
                                     className="form-control float-label" id="cluster_name"/>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="team-block marb0">
                              <span className="ml ml-moolya-symbol"></span>
                              <h3>
                                Service Provider
                              </h3>
                            </div>
                            <div className="form-group mart20">
                              <input type="text" placeholder="Enter Total Numbers"
                                     className="form-control float-label" id="cluster_name"/>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="team-block marb0">
                              <span className="ml ml-moolya-symbol"></span>
                              <h3>
                                Office Barer
                              </h3>
                            </div>
                            <div className="form-group mart20">
                              <input type="text" placeholder="Enter Total Numbers"
                                     className="form-control float-label" id="cluster_name"/>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="team-block marb0">
                              <span className="ml ml-moolya-symbol"></span>
                              <h3>
                                Service Provider
                              </h3>
                            </div>
                            <div className="form-group mart20">
                              <input type="text" placeholder="Enter Total Numbers"
                                     className="form-control float-label" id="cluster_name"/>
                            </div>
                          </div>
                        </div>
                      </div>


                    </div>
                  </div>
                  <div className="clearfix"></div>
                  <div className="form-group">
                    <textarea rows="4" placeholder="About" className="form-control float-label" id=""></textarea>

                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form_bg">
                <form>
                  <div className="form-group">
                    <input type="text" placeholder="Branch Type" className="form-control float-label"
                           id="cluster_name"/>
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Office Location" className="form-control float-label"
                           id="cluster_name"/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Street No/Locality" className="form-control float-label"
                           id="cluster_name"/>
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Landmark" className="form-control float-label"
                           id="cluster_name"/>
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Area" className="form-control float-label" id="cluster_name"/>
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Town/City" className="form-control float-label"
                           id="cluster_name"/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="State" className="form-control float-label" id="cluster_name"/>
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Country" className="form-control float-label"
                           id="cluster_name"/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Zip Code" className="form-control float-label"
                           id="cluster_name"/>
                  </div>
                  <div className="form-group">
                    <a href="#" className="mlUpload_btn">Submit</a> <a href="#" className="mlUpload_btn">Cancel</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};
