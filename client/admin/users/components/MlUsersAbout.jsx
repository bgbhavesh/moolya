/**
 * Created by vishwadeep on 26/7/17.
 */
import React, {Component} from "react";
import ScrollArea from "react-scrollbar";

export default class MlUsersAbout extends Component {
  componentWillMount() {
    console.log(this.props)
    //handler to get the details on based on portfolioId
  }

  componentDidMount() {
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
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
        <h2>About</h2>
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

                  <div className="form-group">
                    <input type="text" placeholder="Moolya Id" name="moolyaId"
                           className="form-control float-label"
                           disabled="disabled"/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Title" name="Title"
                           className="form-control float-label" disabled="disabled"/>
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="First Name" name="firstName"
                           className="form-control float-label" disabled="disabled"/>
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Last Name" name="lastName"
                           className="form-control float-label"
                           disabled="disabled"/>
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Display Name" name="displayName"
                           className="form-control float-label"
                           disabled="disabled"/>
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Username" name="username"
                           className="form-control float-label"
                           disabled="disabled"/>
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Password" name="password"
                           className="form-control float-label"
                           disabled="disabled"/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Date of Birth" name="dob"
                           className="form-control float-label"
                           disabled="disabled"/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Gender" name="gender"
                           className="form-control float-label"
                           disabled="disabled"/>
                  </div>


                  <div className="form-group">
                    <input type="text" placeholder="Profession" name="gender"
                           className="form-control float-label"
                           disabled="disabled"/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Employer Status" name="gender"
                           className="form-control float-label"
                           disabled="disabled"/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Employer Name" name="gender"
                           className="form-control float-label"
                           disabled="disabled"/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Employer URL" name="gender"
                           className="form-control float-label"
                           disabled="disabled"/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Employment Date" name="gender"
                           className="form-control float-label"
                           disabled="disabled"/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Years of Experience" name="gender"
                           className="form-control float-label"
                           disabled="disabled"/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Profession Tag" name="gender"
                           className="form-control float-label"
                           disabled="disabled"/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Identity" name="gender"
                           className="form-control float-label"
                           disabled="disabled"/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="User Type" name="gender"
                           className="form-control float-label"
                           disabled="disabled"/>
                  </div>
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

                  <div className="form-group steps_pic_upload">
                    <div className="previewImg ProfileImg">
                      <img src={"/images/ideator_01.png"}/>
                    </div>
                  </div>
                  <br className="brclear"/>

                  <div className="form-group">
                    <input type="text" placeholder="Your Country" ref="country"
                           className="form-control float-label" disabled="disabled"/>
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Your City" ref="profession" className="form-control float-label"
                           disabled="disabled"/>
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Email Id" ref="employerName"
                           className="form-control float-label"
                           disabled="disabled"/>
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Phone Number" ref="phonenumber"
                           className="form-control float-label"
                           disabled="disabled"/>
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Subscription Type" name="subscriptionType"
                           className="form-control float-label"
                           disabled="disabled"/>
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Do you want to associate" name="emailId"
                           className="form-control float-label" disabled="disabled"/>
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Citizenship" name="emailId"
                           className="form-control float-label" disabled="disabled"/>
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Qualification" name="qualification"
                           className="form-control float-label" disabled="disabled"/>
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Operation Area" name="qualification"
                           className="form-control float-label" disabled="disabled"/>
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Chapter" name="qualification"
                           className="form-control float-label" disabled="disabled"/>
                  </div>

                  <div className="swiper-container blocks_in_form">
                    <div className="swiper-wrapper">
                      <div className="form_inner_block swiper-slide">
                        <div className="form-group">
                          <input type="text" placeholder="Community" name="qualification"
                                 className="form-control float-label" disabled="disabled"/>
                        </div>
                        <div className="form-group left_al">
                          <input type="text" placeholder="Identity" className="form-control float-label"/>
                        </div>
                        <div className="form-group right_al">
                          <input type="text" placeholder="Type" className="form-control float-label"/>
                        </div>
                        <div className="form-group left_al">
                          <input type="text" placeholder="Cluster" className="form-control float-label"/>
                        </div>
                        <div className="form-group right_al">
                          <input type="text" placeholder="Chapter" className="form-control float-label"/>
                        </div>
                        <div className="form-group left_al">
                          <input type="text" placeholder="Sub-Chapter" className="form-control float-label"/>
                        </div>
                        <div className="form-group right_al">
                          <input type="text" placeholder="Subscription Type" className="form-control float-label"/>
                        </div>
                        <div className="form-group switch_wrap">
                          <label>Status : </label>
                          <label className="switch">
                            <input type="checkbox"/>
                            <div className="slider"></div>
                          </label>
                        </div>

                        <br className="brclear"/>
                      </div>
                    </div>
                    <br className="brclear"/>
                    <div className="swiper-pagination"></div>
                  </div>
                  <div className="form-group switch_wrap inline_switch">
                    <label className="">Overall Deactivate User</label>
                    <label className="switch">
                      <input type="checkbox" ref="isActive" />
                      <div className="slider"></div>
                    </label>
                  </div>
                  <div className="form-group switch_wrap">
                    <label>Show On Map</label>
                    <label className="switch">
                      <input type="checkbox"/>
                      <div className="slider"></div>
                    </label>
                  </div>
                </form>
              </div>
            </ScrollArea>
          </div>
        </div>
        </div>
      </div>
    )
  }
}
