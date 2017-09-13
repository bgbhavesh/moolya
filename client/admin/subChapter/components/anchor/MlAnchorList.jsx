/**
 * Created by vishwadeep on 12/9/17.
 */
import React from 'react';
import {render} from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');

export default class MlAnchorList extends React.Component {
  constructor(props){
    super(props)
    return this
  }
  componentDidMount() {
    $(function () {
      $('.float-label').jvFloat();
    });
    $('.switch input').change(function () {
      if ($(this).is(':checked')) {
        $(this).parent('.switch').addClass('on');
      } else {
        $(this).parent('.switch').removeClass('on');
      }
    });

    var mySwiper = new Swiper('.blocks_in_form', {
      speed: 400,
      spaceBetween: 25,
      slidesPerView: 2,
      pagination: '.swiper-pagination',
      paginationClickable: true
    });
  }

  render() {
    return (
      <div>
        <div className="col-lx-6 col-sm-6 col-md-6 nopadding-left">
          <div className="row">
            {/*<h3>Users List</h3>*/}
            <div className="left_wrap left_user_blocks">

              <ScrollArea
                speed={0.8}
                className="left_wrap"
              >
                <div className="col-md-4 col-sm-6">
                  <div className="list_block provider_block">
                    <div className="provider_mask"><img src="/images/funder_bg.png"/>
                      <span className="ml ml-plus "></span>
                    </div>
                    <h3>Add New</h3>
                  </div>
                </div>

                <div className="col-md-4 col-sm-6">
                  <div className="list_block provider_block">
                    <div className="cluster_status active_cl"></div>
                    <div className="provider_mask"><img src="/images/funder_bg.png"/> <img className="user_pic"
                                                                                           src="/images/p_1.jpg"/></div>
                    <h3>User Name1</h3>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6">
                  <div className="list_block provider_block">
                    <div className="cluster_status active_cl"></div>
                    <div className="provider_mask"><img src="/images/funder_bg.png"/> <img className="user_pic"
                                                                                           src="/images/p_2.jpg"/></div>
                    <h3>User Name2</h3>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6">
                  <div className="list_block provider_block">
                    <div className="cluster_status active_cl"></div>
                    <div className="provider_mask"><img src="/images/funder_bg.png"/> <img className="user_pic"
                                                                                           src="/images/p_3.jpg"/></div>
                    <h3>User Name3</h3>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6">
                  <div className="list_block provider_block">
                    <div className="cluster_status active_cl"></div>
                    <div className="provider_mask"><img src="/images/funder_bg.png"/> <img className="user_pic"
                                                                                           src="/images/p_4.jpg"/></div>
                    <h3>User Name4</h3>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6">
                  <div className="list_block provider_block">
                    <div className="cluster_status active_cl"></div>
                    <div className="provider_mask"><img src="/images/funder_bg.png"/> <img className="user_pic"
                                                                                           src="/images/p_5.jpg"/></div>
                    <h3>User Name5</h3>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6">
                  <div className="list_block provider_block">
                    <div className="cluster_status active_cl"></div>
                    <div className="provider_mask"><img src="/images/funder_bg.png"/> <img className="user_pic"
                                                                                           src="/images/p_6.jpg"/></div>
                    <h3>user Name6</h3>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6">
                  <div className="list_block provider_block">
                    <div className="cluster_status active_cl"></div>
                    <div className="provider_mask"><img src="/images/funder_bg.png"/> <img className="user_pic"
                                                                                           src="/images/p_7.jpg"/></div>
                    <h3>User Name7</h3>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>

        <div className="col-lx-6 col-sm-6 col-md-6 nopadding-right">

          {/*<h3>User Details</h3>*/}
          <div className="left_wrap">
            <ScrollArea
              speed={0.8}
              className="left_wrap"
            >
              <form>
                <div className="form-group">
                  <div className="fileUpload mlUpload_btn">
                    <span>Upload Pic</span>
                    <input type="file" className="upload"/>
                  </div>
                  <div className="previewImg ProfileImg">
                    <img src="/images/ideator_01.png"/>
                  </div>
                </div>
                <br className="brclear"/>
                <div className="form-group">
                  <input type="text" placeholder="First Name" className="form-control float-label" id="fname"
                         defaultValue="Lorem Ipsum"/>

                </div>
                <div>
                  <div className="form-group">
                    <input type="text" id="AssignedAs" placeholder="Middle Name" className="form-control float-label"/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Last Name" className="form-control float-label" id="dName"/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Display Name" className="form-control float-label" id="uName"/>
                  </div>
                  <div className="form-group">
                    <textarea placeholder="About" className="form-control float-label"></textarea>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Contact Number" className="form-control float-label" id="uName"/>
                    <FontAwesome name='lock' className="input_icon"/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Email Id" className="form-control float-label" id="uName"/>
                    <FontAwesome name='lock' className="input_icon"/>
                  </div>

                  <div className="panel panel-default new_profile_tabs">
                    <div className="panel-heading">
                      Email ID
                    </div>
                    <div className="panel-body">


                      <div className="ml_tabs">
                        <ul className="nav nav-pills">
                          <li className="active">
                            <a href="#3a" data-toggle="tab">Home&nbsp;<b><FontAwesome name='minus-square'/></b></a>
                          </li>
                          <li>
                            <a href="#4a" data-toggle="tab">Office&nbsp;<b><FontAwesome name='minus-square'/></b></a>
                          </li>
                          <li>
                            <a href="#" className="add-contact"><FontAwesome name='plus-square'/> Add Email</a>
                          </li>
                        </ul>

                        <div className="tab-content clearfix">
                          <div className="tab-pane active" id="1a">
                            <div className="form-group">
                              <select className="form-control">
                                <option>Select type</option>
                                <option>test</option>
                              </select>
                            </div>
                            <div className="form-group">
                              <input type="text" placeholder="Enter URL" className="form-control float-label" id=""/>
                            </div>
                          </div>
                          <div className="tab-pane" id="2a">
                            <div className="form-group">
                              <select className="form-control">
                                <option>Email Id Type</option>
                                <option>test</option>
                              </select>
                            </div>
                            <div className="form-group">
                              <input type="text" placeholder="Email Id" className="form-control float-label" id=""/>
                            </div>
                            <div className="ml_btn">
                              <a href="#" className="save_btn">Save</a>
                              <a href="#" className="cancel_btn">Cancel</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <br className="brclear"/>
                <div className="form-group switch_wrap inline_switch">
                  <label className="">Status</label>
                  <label className="switch">
                    <input type="checkbox"/>
                    <div className="slider"></div>
                  </label>
                </div>
              </form>
            </ScrollArea>
          </div>
        </div>
      </div>
    )
  }
};
