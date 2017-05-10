/**
 * Created by viswadeep on 10/5/17.
 */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');

export default class MlAppProfileList extends React.Component{
  componentDidMount()
  {
    $('.pie-passion').pieChart({
      barColor: '#ef4647',
      trackColor: '#192430',
      lineCap: 'round',
      lineWidth: 4,
      onStep: function (from, to, percent) {
        $(this.element).find('.pie-value').text(Math.round(percent) + '%');
      }
    });
    $('.pie-rating').pieChart({
      barColor: '#ffe144',
      trackColor: '#192430',
      lineCap: 'round',
      lineWidth: 4,
      onStep: function (from, to, percent) {
        $(this.element).find('.pie-value').text(Math.round(percent) + '%');
      }
    });
    $('.pie-like').pieChart({
      barColor: '#B9C5CC',
      trackColor: '#192430',
      lineCap: 'round',
      lineWidth: 4,
      onStep: function (from, to, percent) {
        $(this.element).find('.pie-value').text(Math.round(percent) + '%');
      }
    });
  }
  render(){
    return (
      <div className="app_main_wrap">
        <div className="col-md-12 mart20">
          <div className="ml_app_tabs myList">
            <ul className="nav nav-pills">
              <li className="active"><a href="#my_connections" data-toggle="tab"><span className="ml ml-connect"></span>My Connections</a></li>
              <li><a href="#my_favourites" data-toggle="tab"><span className="ml ml-favourite"></span>My Favourites</a></li>
              <li><a href="#my_wishlist" data-toggle="tab"><span className="ml ml-wishlist"></span>My Wishlist</a></li>
              <li><a href="#my_followers" data-toggle="tab"><span className="ml ml-connect"></span>My Followers</a></li>
              <li><a href="#my_followings" data-toggle="tab"><span className="ml ml-connect"></span>My Followings</a></li>
            </ul>
            <div className="tab-content clearfix">
              <div className="tab-pane active" id="my_connections">
                <div className="row">
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="company_block">
                      <div className="premium"><span>premium</span></div>
                      <div className="company_header">
                        <img src="/images/pramathi.png" />
                      </div>
                      <h3>Pramati Technologies, Hyderabad</h3>
                      <div className="row nomargin">
                        <div className="col-md-4 col-sm-4 col-lg-4 text-center">
                          <div className="pie-title-center pie-passion" data-percent="90"> <span className="pie-value"></span> </div>
                          Passion
                        </div>
                        <div className="col-md-4 col-sm-4 col-lg-4 text-center">
                          <div className="pie-title-center pie-rating" data-percent="25"> <span className="pie-value"></span> </div>
                          Rating
                        </div>
                        <div className="col-md-4 col-sm-4 col-lg-4 text-center">
                          <div className="pie-title-center pie-like" data-percent="40"> <span className="pie-value"></span> </div>
                          Likes
                        </div>
                      </div>
                      <div className="row nomargin footer">
                        <div className="col-md-4 col-sm-4 col-lg-4 text-center">
                          <span>25%</span><br />
                          Favorites
                        </div>
                        <div className="col-md-4 col-sm-4 col-lg-4 text-center center">
                          <span>25%</span><br />
                          Projects
                        </div>
                        <div className="col-md-4 col-sm-4 col-lg-4 text-center">
                          <span>25%</span><br />
                          Connect
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="list_block ideator_block">
                      <div className="cluster_status active_cl"><FontAwesome name='check'/></div>
                      <div className="ideator_mask">
                        <img src="/images/p_9.jpg" />
                      </div>
                      <h3>Mukhil <br />
                        UAE</h3>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="list_block provider_block">
                      <div className="cluster_status inactive_cl"><FontAwesome name='times'/></div>
                      <div className="cluster_flag" style={{backgroundImage:'url(/images/india.png)'}}></div>
                      <div className="provider_mask">
                        <img src="/images/funder_bg.png" />
                        <img className="user_pic" src="/images/p_11.jpg" />
                      </div>
                      <h3>Harisha Madam <br />
                        India</h3>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="list_block provider_block">
                      <div className="cluster_status active_cl"><FontAwesome name='check'/></div>
                      <div className="provider_mask">
                        <img src="/images/provider_bg.png" />
                        <img className="user_pic" src="/images/p_10.jpg" />
                      </div>
                      <h3>Pavan Kumar <br />
                        USA</h3>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="list_block provider_block">
                      <div className="cluster_status inactive_cl"><FontAwesome name='times'/></div>
                      <div className="cluster_flag" style={{backgroundImage:'url(/images/india.png)'}}></div>
                      <div className="provider_mask">
                        <img src="/images/funder_bg.png" />
                        <img className="user_pic" src="/images/p_13.jpg" />
                      </div>
                      <h3>Sameeran <br />
                        India</h3>
                    </div>
                  </div><div className="col-lg-3 col-md-4 col-sm-6">
                  <div className="list_block provider_block">
                    <div className="cluster_status inactive_cl"><FontAwesome name='times'/></div>
                    <div className="cluster_flag" style={{backgroundImage:'url(/images/india.png)'}}></div>
                    <div className="provider_mask">
                      <img src="/images/funder_bg.png" />
                      <img className="user_pic" src="/images/p_21.jpg" />
                    </div>
                    <h3>Syamal Jaddu <br />
                      India</h3>
                  </div>
                </div>
                </div>
              </div>
              <div className="tab-pane" id="my_favourites">

                <img src="/images/send_invite.png" />
              </div>
              <div className="tab-pane" id="my_wishlist">

                <div className="row">

                  <div className="col-md-4 col-sm-4 col-lg-3">
                    <a href="/app/startupDetails1">
                      <div className="company_block">
                        <div className="regular"><span>Starter</span></div>
                        <div className="company_header">
                          <img src="/images/startup_02.png" />
                        </div>
                        <h3>Zomato<br/><span>New Delhi</span></h3>
                        <div className="row nomargin">
                          <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                            <div className="pie-title-center pie-passion" data-percent="80"> <span className="pie-value"></span> </div>
                            Passion
                          </div>
                          <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                            <div className="pie-title-center pie-rating" data-percent="70"> <span className="pie-value"></span> </div>
                            Rating
                          </div>
                          <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                            <div className="pie-title-center pie-like" data-percent="82"> <span className="pie-value"></span> </div>
                            Likes
                          </div>
                        </div>
                        <div className="row nomargin footer">
                          <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                            <span>75%</span><br />
                            Favourites
                          </div>
                          <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                            <span>54%</span><br />
                            Projects
                          </div>
                          <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                            <span>82%</span><br />
                            Connect
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>

                  <div className="col-md-4 col-sm-4 col-lg-3">
                    <a href="/app/startupDetails">
                      <div className="company_block">
                        <div className="premium"><span>premium</span></div>
                        <div className="company_header">
                          <img src="/images/startup_01.png" />
                        </div>
                        <h3>Haptik<br/><span>Mumbai</span></h3>
                        <div className="row nomargin">
                          <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                            <div className="pie-title-center pie-passion" data-percent="80"> <span className="pie-value"></span> </div>
                            Passion
                          </div>
                          <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                            <div className="pie-title-center pie-rating" data-percent="50"> <span className="pie-value"></span> </div>
                            Rating
                          </div>
                          <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                            <div className="pie-title-center pie-like" data-percent="56"> <span className="pie-value"></span> </div>
                            Likes
                          </div>
                        </div>
                        <div className="row nomargin footer">
                          <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                            <span>75%</span><br />
                            Favourites
                          </div>
                          <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                            <span>45%</span><br />
                            Projects
                          </div>
                          <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                            <span>60%</span><br />
                            Connect
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="col-md-4 col-sm-4 col-lg-3">
                    <a href="/app/startupDetails2">
                      <div className="company_block">
                        <div className="premium"><span>premium</span></div>
                        <div className="company_header">
                          <img src="/images/startup_05.png" />
                        </div>
                        <h3>Mobikwik<br/><span>Bangalore</span></h3>
                        <div className="row nomargin">
                          <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                            <div className="pie-title-center pie-passion" data-percent="90"> <span className="pie-value"></span> </div>
                            Passion
                          </div>
                          <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                            <div className="pie-title-center pie-rating" data-percent="55"> <span className="pie-value"></span> </div>
                            Rating
                          </div>
                          <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                            <div className="pie-title-center pie-like" data-percent="70"> <span className="pie-value"></span> </div>
                            Likes
                          </div>
                        </div>
                        <div className="row nomargin footer">
                          <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                            <span>75%</span><br />
                            Favourites
                          </div>
                          <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                            <span>63%</span><br />
                            Projects
                          </div>
                          <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                            <span>75%</span><br />
                            Connect
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="col-md-4 col-sm-4 col-lg-3">
                    <a href="/app/startupDetails3">
                      <div className="company_block">
                        <div className="regular"><span>starter</span></div>
                        <div className="company_header">
                          <img src="/images/startup_06.png" />
                        </div>
                        <h3>Coupon India<br/><span>Mumbai</span></h3>
                        <div className="row nomargin">
                          <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                            <div className="pie-title-center pie-passion" data-percent="85"> <span className="pie-value"></span> </div>
                            Passion
                          </div>
                          <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                            <div className="pie-title-center pie-rating" data-percent="76"> <span className="pie-value"></span> </div>
                            Rating
                          </div>
                          <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                            <div className="pie-title-center pie-like" data-percent="68"> <span className="pie-value"></span> </div>
                            Likes
                          </div>
                        </div>
                        <div className="row nomargin footer">
                          <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                            <span>52%</span><br />
                            Favourites
                          </div>
                          <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                            <span>45%</span><br />
                            Projects
                          </div>
                          <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center nopadding">
                            <span>56%</span><br />
                            Connect
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>

              </div>
              <div className="tab-pane" id="my_followers">
                <div className="row">

                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="list_block ideator_block">
                      <div className="cluster_status active_cl"><FontAwesome name='check'/></div>
                      <div className="ideator_mask">
                        <img src="/images/p_3.jpg" />
                      </div>
                      <h3>Srinag <br />
                        UAE</h3>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="list_block provider_block">
                      <div className="cluster_status inactive_cl"><FontAwesome name='times'/></div>
                      <div className="cluster_flag" style={{backgroundImage:'url(/images/india.png)'}}></div>
                      <div className="provider_mask">
                        <img src="/images/funder_bg.png" />
                        <img className="user_pic" src="/images/p_14.jpg" />
                      </div>
                      <h3>Shikha Maheshwari <br />
                        India</h3>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="list_block provider_block">
                      <div className="cluster_status active_cl"><FontAwesome name='check'/></div>
                      <div className="provider_mask">
                        <img src="/images/provider_bg.png" />
                        <img className="user_pic" src="/images/p_6.jpg" />
                      </div>
                      <h3>Shankara Narayanan<br />
                        USA</h3>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="list_block provider_block">
                      <div className="cluster_status inactive_cl"><FontAwesome name='times'/></div>
                      <div className="cluster_flag" style={{backgroundImage:'url(/images/india.png)'}}></div>
                      <div className="provider_mask">
                        <img src="/images/funder_bg.png" />
                        <img className="user_pic" src="/images/p_1.jpg" />
                      </div>
                      <h3>Usha Nirmala <br />
                        India</h3>
                    </div>
                  </div>
                </div>

              </div>
              <div className="tab-pane" id="my_followings">
                <div className="row">

                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="list_block ideator_block">
                      <div className="cluster_status active_cl"><FontAwesome name='check'/></div>
                      <div className="ideator_mask">
                        <img src="/images/p_2.jpg" />
                      </div>
                      <h3>Sirisha <br />
                        UAE</h3>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="list_block provider_block">
                      <div className="cluster_status inactive_cl"><FontAwesome name='times'/></div>
                      <div className="cluster_flag" style={{backgroundImage:'url(/images/india.png)'}}></div>
                      <div className="provider_mask">
                        <img src="/images/funder_bg.png" />
                        <img className="user_pic" src="/images/p_4.jpg" />
                      </div>
                      <h3>Shakshi Simha <br />
                        India</h3>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="list_block provider_block">
                      <div className="cluster_status active_cl"><FontAwesome name='check'/></div>
                      <div className="provider_mask">
                        <img src="/images/provider_bg.png" />
                        <img className="user_pic" src="/images/p_5.jpg" />
                      </div>
                      <h3>Shiva Kumar<br />
                        USA</h3>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="list_block provider_block">
                      <div className="cluster_status inactive_cl"><FontAwesome name='times'/></div>
                      <div className="cluster_flag" style={{backgroundImage:'url(/images/india.png)'}}></div>
                      <div className="provider_mask">
                        <img src="/images/funder_bg.png" />
                        <img className="user_pic" src="/images/p_12.jpg" />
                      </div>
                      <h3>Balakrishna <br />
                        India</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};
