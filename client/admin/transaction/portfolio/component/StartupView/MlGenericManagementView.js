/**
 * Created by vishwadeep on 11/9/17.
 */

import React from 'react';
import {render} from 'react-dom';
import ScrollArea from "react-scrollbar";
import {find} from "lodash"
import MlLoader from '../../../../../commons/components/loader/loader'
import {initalizeFloatLabel} from '../../../../../commons/utils/formElemUtil'
var FontAwesome = require('react-fontawesome');

export default class MlGenericManagementView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCurDetail: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.showDetails.bind(this)
    return this
  }

  componentDidUpdate(){
    initalizeFloatLabel();
    var WinWidth = $(window).width();
    var WinHeight = $(window).height();
    var className = this.props.isAdmin ? "admin_header" : "app_header"
    $('.tab_wrap_scroll').height(WinHeight-($('.'+className).outerHeight(true)+120));
    if(WinWidth > 768){
      $(".tab_wrap_scroll").mCustomScrollbar({theme:"minimal-dark"});
    }
  }

  showDetails(id) {
    $("#details-div").show();
    var $frame = $('#forcecentered');
    var $wrap = $frame.parent();

    // Call Sly on frame
    $frame.sly({
      horizontal: 1,
      itemNav: 'forceCentered',
      smart: 1,
      activateOn: 'click',
      mouseDragging: 1,
      touchDragging: 1,
      releaseSwing: 1,
      startAt: 0,
      scrollBar: $wrap.find('.scrollbar'),
      scrollBy: 1,
      speed: 300,
      elasticBounds: 1,
      easing: 'easeOutExpo',
      dragHandle: 1,
      dynamicHandle: 1,
      clickBar: 1,

    });
    $("#show").hide();
    this.viewDetails(id)
  }

  viewDetails(id, e) {
    let data = this.props.data;
    var getData = data[id]
    this.setState({viewCurDetail: getData});
    $('.investement-view-content .funding-investers').slideUp();
    $('#funding_show').slideDown()

    _.each(getData.privateFields, function (pf) {
      $("#" + pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
    })
  }

  handleChange() {
    //this handler prevents the waring in the console
  }

  render() {
    var _this = this
    console.log('selected : ', _this.state.viewCurDetail)
    const showLoader = _this.state.loading;
    var arrayList = _this.props.data ? _this.props.data : []
    return (
      <div>
        {showLoader === true ? ( <MlLoader/>) : (
          <div className="col-md-12">
            <div className="requested_input" id="show">
              <ScrollArea
                speed={0.8}
                className="main_wrap_scroll"
                smoothScrolling={true}
                default={true}
              >
                <div className="col-lg-12 nopadding">
                  <div className="row">
                    {arrayList && arrayList.map(function (details, idx) {
                      return (
                        <div className="col-lg-2 col-md-4 col-sm-4" onClick={_this.showDetails.bind(_this, idx)}
                             key={idx}>
                          <div className="list_block notrans funding_list">
                            <div>
                              <p>{details.firstName}</p>
                              <h3>{details.designation}</h3>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </ScrollArea>
            </div>

            <div className="sub_wrap_scroll" id="details-div" style={{'display': 'none'}}>

              <div className="top_block_scroller" id="forcecentered">
                <ul>
                  {arrayList && arrayList.map(function (details, idx) {
                    return (
                      <li key={idx} onClick={_this.viewDetails.bind(_this, idx)}>
                        <div className="team-block" name="funding_01">
                          <img src="/images/p_20.jpg" className="team_img"/>
                          <h3>
                            {details.firstName} <br /><b>{details.designation}</b>
                          </h3>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>

              {/*centered data*/}
              <div className="main_wrap_scroll">
                <ScrollArea
                  speed={0.8}
                  className="main_wrap_scroll"
                  smoothScrolling={true}
                  default={true}
                >
                  <div className="col-lg-12" id="psContent">
                    <div className="row">
                      <div className="investement-view-content">
                        <div className="funding-investers" id="funding_show">
                          <div className="col-md-6 nopadding-left">
                            <div className="form_bg">
                              <form>
                                <div className="form-group">
                                  <input type="text" placeholder="Title"
                                         className="form-control float-label"
                                         value={this.state.viewCurDetail.title ? this.state.viewCurDetail.title : ''}
                                         onChange={_this.handleChange}/>
                                  <FontAwesome name='unlock' className="password_icon"/>
                                </div>

                                <div className="form-group">
                                  <input type="text" placeholder="First name"
                                         value={this.state.viewCurDetail.firstName ? this.state.viewCurDetail.firstName : ''}
                                         className="form-control float-label" onChange={_this.handleChange}/>
                                  <FontAwesome name='unlock' className="password_icon"/>
                                </div>

                                <div className="form-group">
                                  <input type="text" placeholder="Middle name"
                                         value={this.state.viewCurDetail.title ? this.state.viewCurDetail.title : ''}
                                         onChange={_this.handleChange}
                                         className="form-control float-label"/>
                                  <FontAwesome name='unlock' className="password_icon"/>
                                </div>

                                <div className="form-group">
                                  <input type="text" placeholder="Last Name"
                                         value={this.state.viewCurDetail.title ? this.state.viewCurDetail.title : ''}
                                         onChange={_this.handleChange}
                                         className="form-control float-label"/>
                                  <FontAwesome name='unlock' className="password_icon"/>
                                </div>

                                <div className="form-group">
                                  <input type="text" placeholder="Gender"
                                         value={this.state.viewCurDetail.gender ? this.state.viewCurDetail.gender : ""}
                                         onChange={_this.handleChange}
                                         className="form-control float-label"/>
                                  <FontAwesome name='unlock' className="password_icon"/>
                                </div>

                                <div className="form-group">
                                  <input type="text" placeholder="Designation"
                                         value={this.state.viewCurDetail.designation ? this.state.viewCurDetail.designation : ''}
                                         onChange={_this.handleChange}
                                         className="form-control float-label"/>
                                  <FontAwesome name='unlock' className="password_icon"/>
                                </div>

                                <div className="form-group">
                                  <input type="text" placeholder="Years of Experience"
                                         value={this.state.viewCurDetail.yearsOfExperience ? this.state.viewCurDetail.yearsOfExperience : ''}
                                         onChange={_this.handleChange}
                                         className="form-control float-label"/>
                                  <FontAwesome name='unlock' className="password_icon"/>
                                </div>

                                <div className="form-group">
                                  <input type="text" placeholder="Joining Date to this company"
                                         value={this.state.viewCurDetail.joiningDate ? this.state.viewCurDetail.joiningDate : ''}
                                         onChange={_this.handleChange}
                                         className="form-control float-label"/>
                                  <FontAwesome name='lock' className="password_icon"/>
                                </div>

                                <div className="form-group">
                                  <input type="text" placeholder="Joining date of first job"
                                         value={this.state.viewCurDetail.firstJobJoiningDate ? this.state.viewCurDetail.firstJobJoiningDate : ''}
                                         onChange={_this.handleChange}
                                         className="form-control float-label"/>
                                  <FontAwesome name='unlock' className="password_icon"/>
                                </div>
                              </form>
                            </div>
                          </div>
                          <div className="col-md-6 nopadding-right">
                            <div className="form_bg">
                              <form>
                                <div className="form-group">
                                  <div className="previewImg ProfileImg">
                                    <img src="/images/ideator_01.png"/>
                                  </div>
                                </div>
                                <br className="brclear"/>

                                <div className="form-group">
                                  <input type="text" placeholder="Qualification"
                                         value={this.state.viewCurDetail.qualification ? this.state.viewCurDetail.qualification : ''}
                                         onChange={_this.handleChange}
                                         className="form-control float-label"/>
                                  <FontAwesome name='lock' className="password_icon"/>
                                </div>

                                <div className="form-group">
                                  <input type="text" placeholder="Certification"
                                         value={this.state.viewCurDetail.certification ? this.state.viewCurDetail.certification : ''}
                                         onChange={_this.handleChange}
                                         className="form-control float-label"/>
                                  <FontAwesome name='lock' className="password_icon"/>
                                </div>

                                <div className="form-group">
                                  <input type="text" placeholder="University"
                                         value={this.state.viewCurDetail.universities ? this.state.viewCurDetail.universities : ''}
                                         onChange={_this.handleChange}
                                         className="form-control float-label"/>
                                  <FontAwesome name='lock' className="password_icon"/>
                                </div>

                                <div className="form-group">
                                  <input type="text" placeholder="Awards" className="form-control float-label"
                                         value={this.state.viewCurDetail.awards ? this.state.viewCurDetail.awards : ''}
                                         onChange={_this.handleChange}/>
                                  <FontAwesome name='lock' className="password_icon"/>
                                </div>

                                <div className="form-group">
                                  <input type="text" placeholder="LinkedIn"
                                         value={this.state.viewCurDetail.linkedInUrl ? this.state.viewCurDetail.linkedInUrl : ''}
                                         onChange={_this.handleChange}
                                         className="form-control float-label"/>
                                  <FontAwesome name='lock' className="password_icon"/>
                                </div>

                                <div className="form-group">
                                  <input type="text" placeholder="About" className="form-control float-label"
                                         value={this.state.viewCurDetail.managmentAbout ? this.state.viewCurDetail.managmentAbout : ''}
                                         onChange={_this.handleChange}/>
                                  <FontAwesome name='lock' className="password_icon"/>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                        <div className="clearfix"></div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}
