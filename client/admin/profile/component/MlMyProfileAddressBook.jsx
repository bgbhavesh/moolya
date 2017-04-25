import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import ScrollArea from 'react-scrollbar'
import ContactDetails from '../../transaction/requested/component/contactDetails';
import findRegistrationActionHandler from '../../transaction/requested/actions/findRegistration'

export default class MyProfileAddressBook extends React.Component{
  constructor(props){
    super(props);
    // this. state = {
    //   registrationDetails: {}
    // }
    // this.findRegistration.bind(this);
    // this.findRegistrationActionHandler.bind(this);
  }
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


    $('.myprofile_left a').click(function(){
      $('.myprofile_left a').removeClass("active");
      $(this).addClass("active");
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
  async getValue() {
    let userType = Meteor.userId();
    let response = await findBackendUserActionHandler(userType);
    console.log(response);
    this.setState({loading:false ,firstName : response.profile.InternalUprofile.moolyaProfile.firstName,
      middleName:response.profile.InternalUprofile.moolyaProfile.middleName,
      lastName: response.profile.InternalUprofile.moolyaProfile.lastName,
      userName: response.profile.InternalUprofile.moolyaProfile.displayName,
      uploadedProfilePic:response.profile.profileImage
    });
  }

  componentWillMount(){
    const resp=this.getValue();
    return resp;
  }

  // async componentWillMount() {
  //   const resp=await this.findRegistration();
  //   return resp;
  // }
  //
  // async findRegistration() {
  //   let userId = Meteor.userId();
  //   const response = await findRegistrationActionHandler(userId);
  //   this.setState({loading: false, registrationDetails: response.registrationInfo.contactInfo});
  //   console.log(response);
  //   return response;
  // }

  render(){
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>My Profile Address Book</h2>
          <div className="main_wrap_scroll">
            <ScrollArea
              speed={0.8}
              className="main_wrap_scroll"
              smoothScrolling={true}
              default={true}
            >
              <div className="row">

                <div className="col-lg-6">
                  <div className="panel panel-default new_profile_tabs">
                    <div className="panel-heading"> Contact Number </div>
                    <ContactDetails />
                  </div>


                  <div className="panel panel-default new_profile_tabs">
                    <div className="panel-heading">
                      Email ID
                    </div>
                    <div className="panel-body">


                      <div className="ml_tabs">
                        <ul  className="nav nav-pills">
                          <li className="active">
                            <a  href="#3a" data-toggle="tab">Home&nbsp;<b><FontAwesome name='minus-square'/></b></a>
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
                                <option>Email Id Type</option>
                                <option>test</option>
                              </select>
                            </div>
                            <div className="form-group">
                              <input type="text" placeholder="Email Id" className="form-control float-label" id="" />
                            </div>
                            <div className="ml_icon_btn">
                              <a href="#" id="save_contact" className="save_btn"><span className="ml ml-save"></span></a>
                              <a href="#" id="cancel_contact" className="cancel_btn"><span className="ml ml-delete"></span></a> </div>

                          </div>
                          <div className="tab-pane" id="2a">
                            <div className="form-group">
                              <select className="form-control">
                                <option>Email Id Type</option>
                                <option>test</option>
                              </select>
                            </div>
                            <div className="form-group">
                              <input type="text" placeholder="Email Id" className="form-control float-label" id="" />
                            </div>
                            <div className="ml_icon_btn">
                              <a href="#" id="save_contact" className="save_btn"><span className="ml ml-save"></span></a>
                              <a href="#" id="cancel_contact" className="cancel_btn"><span className="ml ml-delete"></span></a> </div>

                          </div>


                        </div>

                      </div>
                    </div>
                  </div>
                </div>


                <div className="col-lg-6">
                  <div className="panel panel-default new_profile_tabs">
                    <div className="panel-heading">
                      Address
                    </div>
                    <div className="panel-body">


                      <div className="ml_tabs">
                        <ul  className="nav nav-pills">
                          <li className="active">
                            <a  href="#5a" data-toggle="tab">Home&nbsp;<b><FontAwesome name='minus-square'/></b></a>
                          </li>
                          <li>
                            <a href="#6a" data-toggle="tab">Office&nbsp;<b><FontAwesome name='minus-square'/></b></a>
                          </li>
                          <li>
                            <a href="#" className="add-contact"><FontAwesome name='plus-square'/> Add Address</a>
                          </li>
                        </ul>

                        <div className="tab-content clearfix">
                          <div className="tab-pane active" id="1a">
                            <div className="form-group">
                              <select className="form-control">
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
                              <input type="text" placeholder="Colony/Street/Loculaty" className="form-control float-label" id="" />
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
                            <div className="ml_icon_btn">
                              <a href="#" id="save_contact" className="save_btn"><span className="ml ml-save"></span></a>
                              <a href="#" id="cancel_contact" className="cancel_btn"><span className="ml ml-delete"></span></a> </div>

                          </div>
                          <div className="tab-pane" id="2a">
                            <div className="form-group">
                              <select className="form-control">
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
                              <input type="text" placeholder="Colony/Street/Loculaty" className="form-control float-label" id="" />
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
                            <div className="ml_icon_btn">
                              <a href="#" id="save_contact" className="save_btn"><span className="ml ml-save"></span></a>
                              <a href="#" id="cancel_contact" className="cancel_btn"><span className="ml ml-delete"></span></a> </div>

                          </div>


                        </div>

                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </ScrollArea>
          </div>



        </div>
        {/*<span className="actions_switch"></span>*/}
        {/*<div className="bottom_actions_block">*/}
          {/*<div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/edit_icon.png"/> </a></div>*/}
          {/*<div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/act_add_icon.png"/> </a></div>*/}
          {/*<div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/act_logout_icon.png"/> </a></div>*/}
          {/*<div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/act_progress_icon.png"/> </a></div>*/}
          {/*<div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/act_select_icon.png"/> </a></div>*/}
        {/*</div>*/}
      </div>
    )
  }
};
