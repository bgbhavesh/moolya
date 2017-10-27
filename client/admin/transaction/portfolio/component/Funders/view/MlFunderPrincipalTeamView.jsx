import React from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
import MlLoader from "../../../../../../commons/components/loader/loader";
import {fetchfunderPortfolioPrincipal, fetchfunderPortfolioTeam} from "../../../actions/findPortfolioFunderDetails";
import NoData from '../../../../../../commons/components/noData/noData';
import {initalizeFloatLabel } from "../../../../../utils/formElemUtil";
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');

import generateAbsolutePath from '../../../../../../../lib/mlGenerateAbsolutePath';

var options = [
  {value: 'Type of Funding', label: 'Type of Funding'},
  {value: '2', label: '2'}
];
function logChange(val) {
  console.log("Selected: " + val);
}


export default class MlFunderPrincipalTeamView extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: false,
      data: {},
      funderTeam: [],
      popoverOpenP: false,
      popoverOpenT: false,
      selectedIndex: -1,
      funderPrincipalList: [],
      funderTeamList: [],
      selectedVal: null,
      selectedObject: "default",
      selectedTab:'principal'
    }
    this.fetchPrincipalDetails.bind(this);
    this.fetchTeamDetails.bind(this);
    return this;
  }
  componentWillMount() {
    this.fetchPrincipalDetails();
    this.fetchTeamDetails()
  }
  componentDidMount() {
    var WinWidth = $(window).width();
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
    $("#create_client").popover({
      'title' : 'Add New Member',
      'html' : true,
      'placement' : 'right',
      'container' : '.admin_main_wrap',
      'content' : $(".ml_create_client").html()
    });
    $("#team-list").popover({
      'title' : 'Add New Member',
      'html' : true,
      'placement' : 'right',
      'container' : '.admin_main_wrap',
      'content' : $(".team-list-main").html()
    });

    // if(WinWidth > 768){
    //   $(".medium-popover").mCustomScrollbar({theme:"minimal-dark"});
    // }

  }
  componentDidUpdate(){
    var className = this.props.isAdmin ? "admin_header" : "app_header"
    $('.two').click(function(){
      $('#details-div').show();
      $('.top-content').hide();
      var $frame = $('#forcecentered');
      var $wrap  = $frame.parent();

      // Call Sly on frame
      $frame.sly({
        horizontal: 1,
        itemNav: 'forceCentered',
        smart: 1,
        activateOn: 'click',
        mouseDragging: 1,
        touchDragging: 1,
        releaseSwing: 1,
        startAt:0,
        scrollBar: $wrap.find('.scrollbar'),
        scrollBy: 1,
        speed: 300,
        elasticBounds: 1,
        easing: 'easeOutExpo',
        dragHandle: 1,
        dynamicHandle: 1,
        clickBar: 1,

      });
    });

    $('.one').click(function(){
      $('#details-div2').show();
      $('.top-content2').hide();
      var $frame = $('#forcecentered2');
      var $wrap  = $frame.parent();

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
    });

    var WinHeight = $(window).height();
    $('.main_wrap_scroll ').height(WinHeight-($('.' + className).outerHeight(true) + 120));

    initalizeFloatLabel();

  }


  async fetchPrincipalDetails() {
    let that = this;
    let portfolioDetailsId = that.props.portfolioDetailsId;
    const response = await fetchfunderPortfolioPrincipal(portfolioDetailsId);
    if (response) {
      this.setState({loading: false, funderPrincipalList: response, PIndex:0});
    }

  }
  async fetchTeamDetails() {
    let that = this;
    let portfolioDetailsId = that.props.portfolioDetailsId;
    const response = await fetchfunderPortfolioTeam(portfolioDetailsId);
    if (response) {
      this.setState({loading: false, funderTeamList: response, TIndex:0});
    }
  }
  onSelectPrincipal(index, e){
    _.each(this.state.funderPrincipalList[index], function (value, field) {
      if (typeof (field) == 'string')
        $("#"+field).removeClass('fa-lock').addClass('un_lock fa-unlock')
    })
    this.setState({PIndex:index})

    _.each(this.state.funderPrincipalList[index].privateFields, function (pf) {
      $("#"+pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
    })
  }
  onSelectTeam(index, e){
    _.each(this.state.funderTeamList[index], function (value, field) {
      if (typeof (field) == 'string')
        $("#team"+field).removeClass('fa-lock').addClass('un_lock fa-unlock')
    })
    this.setState({TIndex:index})

    _.each(this.state.funderTeamList[index].privateFields, function (pf) {
      $("#team"+pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
    })
  }
  render() {
    let that = this;
    const showLoader = that.state.loading;
    let PIndex = that.state.PIndex
    let selectedPrincipal = that.state.funderPrincipalList[PIndex] || {};
    let TIndex = that.state.TIndex
    let selectedTeam = that.state.funderTeamList[TIndex] || {};
    if(_.isEmpty(selectedPrincipal) && _.isEmpty(selectedTeam)){
      return (
        showLoader === true ? (<MlLoader/>) :
          <div className="portfolio-main-wrap">
            <NoData tabName={this.props.tabName} />
          </div>
      )
    } else {
      return (
        <div>
          {showLoader === true ? (<MlLoader/>) : (
            <div className="main_wrap_scroll">
              <ScrollArea speed={0.8} className="main_wrap_scroll" smoothScrolling={true} default={true}>

              <div className="col-lg-6 col-md-6 col-sm-12 library-wrap nopadding-left">
                <div className="panel panel-default">
                  <div className="panel-heading"> Principal </div>
                  <div className="panel-body">
                    <div className="col-lg-12 top-content ideators_list">
                      <div className="row">
                        {that.state.funderPrincipalList.map(function (principal, idx) {
                          return (
                            <div className="col-lg-4 col-md-4 col-sm-4" key={idx}>
                              <div onClick={that.onSelectPrincipal.bind(that, idx)}>
                                <div className="ideators_list_block two">
                                  <div>
                                  <FontAwesome className='pull-left' name='trash-o'/>
                                  <FontAwesome className='pull-right' name='lock'/></div>
                                  <img src={principal.logo ? generateAbsolutePath(principal.logo.fileUrl) : "/images/def_profile.png"} className="c_image"/>
                                  <div className="block_footer nopadding"><p>{principal.firstName?principal.firstName:"" + " " + principal.lastName?principal.lastName:""}</p><p
                                    className="small">{principal.designation}</p></div>
                                  {/*<div className="ml_icon_btn">*/}
                                  {/*<a href="" className="save_btn"><FontAwesome name='facebook'/></a>*/}
                                  {/*<a href="" className="save_btn"><FontAwesome name='twitter'/></a>*/}
                                  {/*<a href="" className="save_btn"><FontAwesome name='linkedin'/></a>*/}
                                  {/*</div>*/}
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    <div id="details-div" className="border_top" style={{'display': 'none'}}>
                      <div className="col-lg-12 nopadding">
                          <div className="top_block_scroller" id="forcecentered">
                            <ul>
                              {that.state.funderPrincipalList.map(function (principal, idx) {
                                return (
                                  <li key={idx} onClick={that.onSelectPrincipal.bind(that, idx)}>
                                    <div className="team-block">
                                      <img src={principal.logo ? generateAbsolutePath(principal.logo.fileUrl) : "/images/def_profile.png"}
                                           className="team_img"/>
                                      <h3>
                                        {principal.firstName?principal.firstName:"" + " " + principal.lastName?principal.lastName:""}<br /><b>{principal.designation}</b>
                                      </h3>
                                    </div>
                                  </li>
                                )
                              })}
                            </ul>
                          </div>
                        <div>

                            <div className="details-panel">
                              <div className="row">
                                <div className="col-lg-4 col-md-4 col-sm-4">
                                  <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div>
                                      <div className="list_block notrans funding_list">
                                        <FontAwesome name='lock'/>
                                        <div className="cluster_status inactive_cl"><FontAwesome name='trash-o'/></div>
                                        <img src={selectedPrincipal.logo ? generateAbsolutePath(selectedPrincipal.logo.fileUrl) : "/images/def_profile.png"}/>
                                        <div><p>{selectedPrincipal.firstName?selectedPrincipal.firstName:"" + " " + selectedPrincipal.lastName?selectedPrincipal.lastName:""}</p><p
                                          className="small">{selectedPrincipal.designation}</p></div>
                                        {/*<div className="ml_icon_btn">*/}
                                        {/*<a href="" className="save_btn"><FontAwesome name='facebook'/></a>*/}
                                        {/*<a href="" className="save_btn"><FontAwesome name='twitter'/></a>*/}
                                        {/*<a href="" className="save_btn"><FontAwesome name='linkedin'/></a>*/}
                                        {/*</div>*/}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-8 col-md-8 col-sm-8">
                                  <div className="form_bg col-md-12">
                                    <form>

                                      <div className="form-group">
                                        <input type="text" placeholder="Name" className="form-control float-label"
                                               id="cluster_name"
                                               value={selectedPrincipal.firstName?selectedPrincipal.firstName:"" + " " + selectedPrincipal.lastName?selectedPrincipal.lastName:""}
                                               disabled='disabled'/>
                                        <FontAwesome name='unlock' className="input_icon un_lock" id="isFirstNamePrivate"/>
                                      </div>
                                      <div className="form-group">
                                        <input type="text" placeholder="Company" className="form-control float-label"
                                               id="cluster_name"
                                               value={selectedPrincipal.principalcompanyName ? selectedPrincipal.principalcompanyName : ""}
                                               disabled='disabled'/>
                                        <FontAwesome name='unlock' className="input_icon un_lock" id="isCompanyNamePrivate"/>
                                      </div>
                                      <div className="form-group">
                                        <input type="text" placeholder="Year of Experience"
                                               className="form-control float-label" id="cluster_name"
                                               value={selectedPrincipal.yearsOfExperience ? selectedPrincipal.yearsOfExperience : ""}
                                               disabled='disabled'/>
                                        <FontAwesome name='unlock' className="input_icon un_lock" id="isYearsOfExperiencePrivate"/>
                                      </div>

                                    </form>

                                    <form>

                                      <div className="form-group">
                                        <input type="text" placeholder="Disignation"
                                               className="form-control float-label" id="cluster_name"
                                               value={selectedPrincipal.designation ? selectedPrincipal.designation : ""}
                                               disabled='disabled'/>
                                        <FontAwesome name='unlock' className="input_icon un_lock" id="isDesignationPrivate"/>
                                      </div>

                                      <div className="form-group">
                                        <input type="text" placeholder="Duration" className="form-control float-label"
                                               id="cluster_name"
                                               value={selectedPrincipal.duration ? selectedPrincipal.duration : ""}
                                               disabled='disabled'/>
                                        <FontAwesome name='unlock' className="input_icon un_lock" id="isDurationPrivate"/>
                                      </div>
                                      <div className="form-group">
                                        <input type="text" placeholder="Qualification"
                                               className="form-control float-label" id="cluster_name"
                                               value={selectedPrincipal.qualification ? selectedPrincipal.qualification : ""}
                                               disabled='disabled'/>
                                        <FontAwesome name='unlock' className="input_icon un_lock" id="isQualificationPrivate"/>
                                      </div>


                                    </form>

                                    <form>

                                      <div className="form-group">
                                        <input type="text" placeholder="About" className="form-control float-label"
                                               id="cluster_name"
                                               value={selectedPrincipal.aboutPrincipal ? selectedPrincipal.aboutPrincipal : ""}
                                               disabled='disabled'/>
                                        <FontAwesome name='unlock' className="input_icon un_lock" id="isAboutPrincipalPrivate"/>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 library-wrap nopadding-right">
                <div className="panel panel-default">
                  <div className="panel-heading"> Team </div>
                  <div className="panel-body">
                    <div className="col-lg-12 top-content2 ideators_list">
                      <div className="row">
                        {that.state.funderTeamList.map(function (team, idx) {
                          return (
                            <div className="col-lg-4 col-md-4 col-sm-4" key={idx}>
                              <div onClick={that.onSelectTeam.bind(that, idx)}>
                                <div className="ideators_list_block one">
                                  <div>
                                    <FontAwesome className='pull-left' name='trash-o'/>
                                    <FontAwesome className='pull-right' name='lock'/>
                                  </div>
                                  <img className="c_image" src={team.logo ? generateAbsolutePath(team.logo.fileUrl) : "/images/def_profile.png"}/>
                                  <div className="block_footer nopadding"><p>{team.firstName?team.firstName:"" + " " + team.lastName?team.lastName:""}</p>
                                    <p className="small">{team.designation}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    <div id="details-div2" className="border_top" style={{'display': 'none'}}>
                      <div className="col-lg-12 nopadding">
                          <div className="top_block_scroller" id="forcecentered2">
                            <ul>
                              {that.state.funderTeamList.map(function (team, idx) {
                                return (
                                  <li onClick={that.onSelectTeam.bind(that, idx)} key={idx}>
                                    <div className="team-block">
                                      <img src={team.logo ? generateAbsolutePath(team.logo.fileUrl) : "/images/def_profile.png"}
                                           className="team_img"/>
                                      <h3>
                                        {team.firstName?team.firstName:"" + " " + team.lastName?team.lastName:""}<br /><b>{team.designation}Founder</b>
                                      </h3>
                                    </div>
                                  </li>
                                )
                              })}
                            </ul>
                          </div>
                        <div>

                            <div className="details-panel">
                              <div className="row">
                                <div className="col-lg-4 col-md-4 col-sm-4">
                                  <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div>
                                      <div className="list_block notrans funding_list">
                                        <FontAwesome name='lock'/>
                                        <div className="cluster_status inactive_cl"><FontAwesome name='trash-o'/></div>
                                        <img src={selectedTeam.logo ? generateAbsolutePath(selectedTeam.logo.fileUrl) : "/images/def_profile.png"}/>
                                        <div>
                                          <p>{selectedTeam.firstName?selectedTeam.firstName:"" + " " + selectedTeam.lastName?selectedTeam.lastName:""}</p>
                                          <p className="small">{selectedTeam.designation}</p>
                                        </div>
                                        {/*<div className="ml_icon_btn">*/}
                                        {/*<div className="ml_icon_btn">*/}
                                        {/*<a href="" className="save_btn"><FontAwesome name='facebook'/></a>*/}
                                        {/*<a href="" className="save_btn"><FontAwesome name='twitter'/></a>*/}
                                        {/*<a href="" className="save_btn"><FontAwesome name='linkedin'/></a>*/}
                                        {/*</div>*/}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-8 col-md-8 col-sm-8">
                                  <div className="form_bg col-md-12">
                                    <form>
                                      <div className="form-group">
                                        <input type="text" placeholder="Name" className="form-control float-label"
                                               id="cluster_name"
                                               value={selectedTeam.firstName?selectedTeam.firstName:"" + " " + selectedTeam.lastName?selectedTeam.lastName:""}
                                               disabled='disabled'/>
                                        <FontAwesome name='unlock' className="input_icon un_lock" id="teamisFirstNamePrivate"/>
                                      </div>

                                      <div className="form-group">
                                        <input type="text" placeholder="Company" className="form-control float-label"
                                               id="cluster_name"
                                               value={selectedTeam.teamcompanyName ? selectedTeam.teamcompanyName : ""}
                                               disabled='disabled'/>
                                        <FontAwesome name='unlock' className="input_icon un_lock" id="teamisCompanyNamePrivate"/>
                                      </div>
                                      <div className="form-group">
                                        <input type="text" placeholder="Year of Experience"
                                               className="form-control float-label" id="cluster_name"
                                               value={selectedTeam.yearsOfExperience ? selectedTeam.yearsOfExperience : ""}
                                               disabled='disabled'/>
                                        <FontAwesome name='unlock' className="input_icon un_lock" id="teamisYearsOfExperiencePrivate"/>
                                      </div>

                                      <div className="form-group">
                                        <input type="text" placeholder="Designation"
                                               className="form-control float-label" id="cluster_name"
                                               value={selectedTeam.designation ? selectedTeam.designation : ""}
                                               disabled='disabled'/>
                                        <FontAwesome name='unlock' className="input_icon un_lock" id="teamisDesignationPrivate"/>
                                      </div>

                                      <div className="form-group">
                                        <input type="text" placeholder="Duration" className="form-control float-label"
                                               id="cluster_name"
                                               value={selectedTeam.duration ? selectedTeam.duration : ""}
                                               disabled='disabled'/>
                                        <FontAwesome name='unlock' className="input_icon un_lock" id="teamisDurationPrivate"/>
                                      </div>
                                      <div className="form-group">
                                        <input type="text" placeholder="Qualification"
                                               className="form-control float-label" id="cluster_name"
                                               value={selectedTeam.qualification ? selectedTeam.qualification : ""}
                                               disabled='disabled'/>
                                        <FontAwesome name='unlock' className="input_icon un_lock" id="teamisQualificationPrivate"/>
                                      </div>

                                      <div className="form-group">
                                        <input type="text" placeholder="About" className="form-control float-label"
                                               id="cluster_name"
                                               value={selectedTeam.aboutTeam ? selectedTeam.aboutTeam : ""}
                                               disabled='disabled'/>
                                        <FontAwesome name='unlock' className="input_icon un_lock" id="teamisAboutTeamPrivate"/>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </ScrollArea>



              <div style={{'display': 'none'}} className="ml_create_client">
                <div className="medium-popover">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <div className="fileUpload mlUpload_btn">
                          <span>Upload Pic</span>
                          <input type="file" className="upload"/>
                        </div>
                        <div className="previewImg ProfileImg">
                          <img src="/images/ideator_01.png"/>
                        </div>
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Title" className="form-control float-label"/>
                        <FontAwesome name='unlock' className="input_icon"/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="First Name" className="form-control float-label"/>
                        <FontAwesome name='unlock' className="input_icon"/>
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Last Name" className="form-control float-label"/>
                        <FontAwesome name='unlock' className="input_icon"/>
                      </div>
                      <div className="form-group">
                        <Select
                          name="form-field-name"
                          options={options}
                          value='Company Name'
                          onChange={logChange}
                        />
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Duration" className="form-control float-label"/>
                        <FontAwesome name='unlock' className="input_icon"/>
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Years of Experience" className="form-control float-label"/>
                        <FontAwesome name='unlock' className="input_icon"/>
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Qualification" className="form-control float-label"/>
                        <FontAwesome name='unlock' className="input_icon"/>
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="About" className="form-control float-label"/>
                        <FontAwesome name='unlock' className="input_icon"/>
                      </div>
                      <div className="ml_btn" style={{'textAlign': 'center'}}>
                        <a href="" className="save_btn">Save</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{'display': 'none'}} className="team-list-main">
                <div className="medium-popover">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <div className="fileUpload mlUpload_btn">
                          <span>Upload Pic</span>
                          <input type="file" className="upload"/>
                        </div>
                        <div className="previewImg ProfileImg">
                          <img src="/images/def_profile.png"/>
                        </div>
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Title" className="form-control float-label"/>
                        <FontAwesome name='unlock' className="input_icon"/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="First Name" className="form-control float-label"/>
                        <FontAwesome name='unlock' className="input_icon"/>
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Last Name" className="form-control float-label"/>
                        <FontAwesome name='unlock' className="input_icon"/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Designation" className="form-control float-label"/>
                        <FontAwesome name='unlock' className="input_icon"/>
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Company Name" className="form-control float-label"/>
                        <FontAwesome name='unlock' className="input_icon"/>
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Duration" className="form-control float-label"/>
                        <FontAwesome name='unlock' className="input_icon"/>
                      </div>

                      <div className="ml_btn" style={{'textAlign': 'center'}}>
                        <a href="" className="save_btn">Save</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>)}
        </div>
      )
    }
  }
};
