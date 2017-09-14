/**
 * Created by vishwadeep on 12/9/17.
 */

import React from 'react';
import {render} from 'react-dom';
import ScrollArea from 'react-scrollbar';

export default class MlAnchorContact extends React.Component {
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
  }

  sendDataToParent(data) {
    this.props.getContactDetails(data)
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
                    <div className="provider_mask"><img src="/images/funder_bg.png"/> <span
                      className="ml ml-plus "></span></div>
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
                  <select placeholder="Contact person role" className="form-control float-label">
                    <option>Role one</option>
                    <option>Role Two</option>
                  </select>
                </div>
                <div className="form-group">
                  <select placeholder="Address Type" className="form-control float-label">
                    <option>Type one</option>
                    <option>Type Two</option>
                  </select>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Contact Number" className="form-control float-label"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Email Id" className="form-control float-label"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Flat/House/floor/Building No" className="form-control float-label"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Colony/Street/Locality " className="form-control float-label"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Landmark" className="form-control float-label"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Area" className="form-control float-label"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Town ,city" className="form-control float-label"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="State" className="form-control float-label"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Country" className="form-control float-label"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Pincode" className="form-control float-label"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Lattitude" className="form-control float-label"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Longitude" className="form-control float-label"/>
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
