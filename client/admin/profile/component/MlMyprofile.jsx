import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import ScrollArea from 'react-scrollbar'


export default class MlMyProfile extends React.Component{
  componentDidMount()
  {
    $(function() {
      $('.float-label').jvFloat();
    });
    $('.switch input').change(function() {
      if ($(this).is(':checked')) {
        $(this).parent('.switch').addClass('on');
      }else{
        $(this).parent('.switch').removeClass('on');
      }
    });
    $("#informationb").click(function(){
      $(".hide_div").hide();
      $("#information_div").show();
    });
    $("#contactb").click(function(){
      $(".hide_div").hide();
      $("#contact_div").show();
    });
    $("#locationb").click(function(){
      $(".hide_div").hide();
      $("#location_div").show();
    });

    var swiper = new Swiper('.profile_container', {
      pagination: '.swiper-pagination',
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      initialSlide:1,
      slidesPerView: 'auto',
      coverflow: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows : true
      }
    });
  }
  render(){
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>My Profile</h2>
          <div className="col-md-10 nopadding">
            <div id="information_div" className="hide_div">
              <div className="col-md-6 nopadding-left">
                <div className="form_bg">
                  <form>
                    <div className="form-group">
                      <input type="text" placeholder="First Name" className="form-control float-label" id=""/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Middle Name" className="form-control float-label" id=""/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Last Name" className="form-control float-label" id=""/>
                    </div>
                    <div className="form-group">
                      <div className="fileUpload mlUpload_btn">
                        <span>Profile Pic</span>
                        <input type="file" className="upload" />
                      </div>
                      <div className="previewImg ProfileImg">
                        <img src="/images/def_profile.png"/>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form_bg">
                  <form>
                    <div className="form-group">
                      <input type="text" placeholder="User Name" className="form-control float-label" id=""/>
                    </div>
                    <div className="form-group">
                      <input type="password" placeholder="Password" className="form-control float-label" id=""/>
                      <FontAwesome name='eye' className="password_icon"/>
                    </div>
                    <div className="form-group">
                      <input type="password" placeholder="Confirm Password" className="form-control float-label" id=""/>
                      <FontAwesome name='eye' className="password_icon"/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Date Picker" className="form-control float-label" id=""/>
                      <FontAwesome name='calendar' className="password_icon"/>
                    </div>
                    <div className="form-group">
                      <div className="input_types">
                        <label>Gender : </label>
                      </div>
                      <div className="input_types">
                        <input id="radio1" type="radio" name="radio" value="1"/><label htmlFor="radio1"><span><span></span></span>Male</label>
                      </div>
                      <div className="input_types">
                        <input id="radio2" type="radio" name="radio" value="2"/><label htmlFor="radio2"><span><span></span></span>Female</label>
                      </div>
                      <div className="input_types">
                        <input id="radio3" type="radio" name="radio" value="2"/><label htmlFor="radio3"><span><span></span></span>Others</label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div id="location_div" className="hide_div">
              {/*
               <div className="col-md-6">
               <div className="row">
               <div className="col-md-2">
               <div className="form-group">
               <img src="../images/documents_icon.png"/>
               </div>
               </div>
               <div className="col-md-10">
               <div className="form-group">
               <input type="text" placeholder="Rupee" className="form-control float-label" id=""/>
               </div>
               </div>
               </div>
               <div className="row">
               <div className="col-md-2">
               <div className="form-group">
               <img src="../images/documents_icon.png"/>
               </div>
               </div>
               <div className="col-md-10">
               <div className="form-group">
               <input type="text" placeholder="US Metric" className="form-control float-label" id=""/>
               </div>
               </div>
               </div>
               </div>
               <div className="col-md-6">
               <div className="row">
               <div className="col-md-2">
               <div className="form-group">
               <img src="../images/documents_icon.png"/>
               </div>
               </div>
               <div className="col-md-10">
               <div className="form-group">
               <input type="text" placeholder="English" className="form-control float-label" id=""/>
               </div>
               </div>
               </div>
               <div className="row">
               <div className="col-md-2">
               <div className="form-group">
               <img src="../images/documents_icon.png"/>
               </div>
               </div>
               <div className="col-md-10">
               <div className="form-group">
               <input type="text" placeholder="IST" className="form-control float-label" id=""/>
               </div>
               </div>
               </div>
               </div>
               */}
              <div className="swiper-container profile_container">
                <div className="swiper-wrapper">
                  <div className="swiper-slide profile_accounts">

                    <img src="../images/india.png" /><br />Hyderabad
                    <h2>Finance / Accounts</h2>
                    <h3>Manager</h3>

                  </div>
                  <div className="swiper-slide profile_accounts">

                    <img src="../images/india.png" /><br />Hyderabad
                    <h2>Finance / Accounts</h2>
                    <h3>Manager</h3>

                  </div>
                  <div className="swiper-slide profile_accounts">

                    <img src="../images/india.png" /><br />Hyderabad
                    <h2>Finance / Accounts</h2>
                    <h3>Manager</h3>

                  </div>
                  <div className="swiper-slide profile_accounts">

                    <img src="../images/india.png" /><br />Hyderabad
                    <h2>Finance / Accounts</h2>
                    <h3>Manager</h3>

                  </div>
                  <div className="swiper-slide profile_accounts">

                    <img src="../images/india.png" /><br />Hyderabad
                    <h2>Finance / Accounts</h2>
                    <h3>Manager</h3>

                  </div>

                </div>
                <div className="swiper-pagination"></div>
              </div>
              <div className="col-md-5">
                <div className="form-group">
                  <input type="text" placeholder="Cluster" className="form-control float-label" id="" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Wing" className="form-control float-label" id="" />
                </div>
              </div>
              <div className="col-md-5">
                <div className="form-group">
                  <input type="text" placeholder="Chapter" className="form-control float-label" id="" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Sub Wing" className="form-control float-label" id="" />
                </div>
              </div>
              <div className="col-md-2"></div>
              <div className="col-md-12">
                <div className="form-group">
                  <input type="text" placeholder="Role" className="form-control float-label" id="" />
                </div>
              </div>
            </div>
            <div id="contact_div" className="hide_div">


              <div className="col-md-6 nopadding-left">

                <div className="panel panel-default profile_tabs">
                  <div className="panel-heading">
                    <h3 className="panel-title">Contact Number</h3>
                  </div>
                  <div className="panel-body">

                    <div className="form_emails_left">
                      <ul>
                        <li><a href="#">Work</a></li>
                        <li><a href="#">Office</a></li>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">New</a></li>
                      </ul>
                    </div>
                    <div className="form_emails_right">
                      <div className="form-group">
                        <select className="form-control float-label">
                          <option>Number Type</option>
                          <option>test</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Country Code" className="form-control float-label" id="" />
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Enter Number" className="form-control float-label" id="" />
                      </div>
                    </div>

                  </div>
                </div>

                <div className="col-md-12 nopadding">
                  <div className="panel panel-default profile_tabs">
                    <div className="panel-heading">
                      <h3 className="panel-title">Email Id</h3>
                    </div>
                    <div className="panel-body">

                      <div className="form_emails_left">
                        <ul>
                          <li><a href="#">Work</a></li>
                          <li><a href="#">Office</a></li>
                          <li><a href="#">Home</a></li>
                          <li><a href="#">New</a></li>
                        </ul>
                      </div>
                      <div className="form_emails_right">
                        <div className="form-group">
                          <select className="form-control float-label">
                            <option>Email Id Type</option>
                            <option>test</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <input type="text" placeholder="Email Id" className="form-control float-label" id="" />
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
              <div className="col-md-6">
                <div className="panel panel-default profile_tabs">
                  <div className="panel-heading">
                    <h3 className="panel-title">Address</h3>
                  </div>
                  <div className="panel-body">
                    <div className="form_emails_left">
                      <ul>
                        <li><a href="#">Work</a></li>
                        <li><a href="#">Office</a></li>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">New</a></li>
                      </ul>
                    </div>
                    <div className="form_emails_right">
                      <ScrollArea
                        speed={0.8}
                        className="form_emails_right_scroll"
                        smoothScrolling={true}
                      >
                        <div className="form-group">
                          <select className="form-control float-label">
                            <option>Address Type</option>
                            <option>test</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <input type="text" placeholder="Name" className="form-control float-label" id="" />
                        </div>
                        <div className="form-group">
                          <input type="text" placeholder="Phone Number" className="form-control float-label" id="" />
                        </div>
                        <div className="form-group">
                          <input type="text" placeholder="Flat/House/Floor/Bulding No" className="form-control float-label" id="" />
                        </div>
                        <div className="form-group">
                          <input type="text" placeholder="Colony/Street/Locality" className="form-control float-label" id="" />
                        </div>
                        <div className="form-group">
                          <input type="text" placeholder="Landmark" className="form-control float-label" id="" />
                        </div>
                        <div className="form-group">
                          <input type="text" placeholder="Area" className="form-control float-label" id="" />
                        </div>
                        <div className="form-group">
                          <input type="text" placeholder="Town/City" className="form-control float-label" id="" />
                        </div>
                        <div className="form-group">
                          <input type="text" placeholder="State" className="form-control float-label" id="" />
                        </div>
                      </ScrollArea>
                    </div>
                  </div>
                </div>



              </div>
            </div>
          </div>
          <div className="col-md-2 nopadding">
            <div className="myprofile_left">
              <a href="" className="hex_btn hex_btn_in" id="informationb">
                <FontAwesome name='info'/>
              </a>
              <a href="" className="hex_btn hex_btn_in" id="contactb">
                <FontAwesome name='sort-desc' className=""/>
              </a>
              <a href="" className="hex_btn hex_btn_in" id="locationb">
                <FontAwesome name='eye'/>
              </a>
            </div>
          </div>
          <span></span>
          <div className="bottom_actions_block">
            <div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/edit_icon.png"/> </a></div>
            <div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/act_add_icon.png"/> </a></div>
            <div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/act_logout_icon.png"/> </a></div>
            <div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/act_progress_icon.png"/> </a></div>
            <div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/act_select_icon.png"/> </a></div>
          </div>
        </div>
      </div>
    )
  }
};
