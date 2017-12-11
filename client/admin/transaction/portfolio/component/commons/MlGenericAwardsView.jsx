/**
 * Created by vishwadeep on 11/9/17.
 */

import React from 'react';
import {render} from 'react-dom';
import ScrollArea from "react-scrollbar";
import MlLoader from '../../../../../commons/components/loader/loader'
import {initalizeFloatLabel} from '../../../../../commons/utils/formElemUtil'
import generateAbsolutePath from '../../../../../../lib/mlGenerateAbsolutePath';


var FontAwesome = require('react-fontawesome');

export default class MlGenericAwardsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCurDetail: {},
      clusterId:''
    }
    this.handleChange = this.handleChange.bind(this);
    this.showDetails.bind(this)
    return this
  }

  // componentWillMount(){
  //   const resp = this.fetchClusterId();
  //   return resp
  // }

  componentDidUpdate(){
    initalizeFloatLabel();
    var WinWidth = $(window).width();
    var WinHeight = $(window).height();
    var className = this.props.isAdmin ? "admin_header" : "app_header"
    $('.tab_wrap_scroll').height(WinHeight-($('.'+className).outerHeight(true)+220));
    if(WinWidth > 768){
      $(".tab_wrap_scroll").mCustomScrollbar({theme:"minimal-dark"});
    }
    $('.main_wrap_scroll').height(WinHeight-($('.'+className).outerHeight(true)+220));
    if(WinWidth > 768){
      $(".main_wrap_scroll").mCustomScrollbar({theme:"minimal-dark"});}
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
    let data = this.props.awardsList;
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
    const showLoader = _this.state.loading;
    var arrayList = _this.props.awardsList ? _this.props.awardsList : []
    return (
      <div>
        {showLoader === true ? ( <MlLoader/>) : (
          <div className="col-md-12">
            <div className="requested_input main_wrap_scroll" id="show">
              
                <div className="col-lg-12 nopadding">
                  <div className="row">
                    {arrayList && arrayList.map(function (details, idx) {
                      return (
                        <div className="col-lg-2 col-md-4 col-sm-4" onClick={_this.showDetails.bind(_this, idx)}
                             key={idx}>
                          <div className="list_block notrans funding_list">
                            <div>
                              <img src={details.logo ? generateAbsolutePath(details.logo.fileUrl) : "/images/def_profile.png"}/>
                              <h3>{details.awardName?details.awardName:""}</h3>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
            </div>

            <div className="sub_wrap_scroll" id="details-div" style={{'display': 'none'}}>

              <div className="top_block_scroller" id="forcecentered">
                <ul>
                  {arrayList && arrayList.map(function (details, idx) {
                    return (
                      <li key={idx} onClick={_this.viewDetails.bind(_this, idx)}>
                        <div className="team-block" name="funding_01">
                          <img src={details.logo ? generateAbsolutePath(details.logo.fileUrl) : "/images/def_profile.png"} className="team_img"/>
                          <h3>
                            {details.awardName?details.awardName:""} <br />
                          </h3>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>

              <div className="main_wrap_scroll">
               <div className="col-lg-12">
                    <div className="row">
                      <div className="investement-view-content">
                        <div className="panel panel-default panel-form-view">
                          <div className="panel-body">
                            <textarea name="awardsDescription" placeholder="About" className="form-control float-label" value={this.state.viewCurDetail.awardsDescription?this.state.viewCurDetail.awardsDescription: ''} />
                            <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isDescriptionPrivate" defaultValue={this.state.viewCurDetail.isDescriptionPrivate}/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}
