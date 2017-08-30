import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
// import dashboardRoutes from '../actions/routesActionHandler';
var FontAwesome = require('react-fontawesome');
import _ from 'lodash';
import {getAdminUserContext} from '../../../commons/getAdminUserContext'
export default class MlCommunityList extends Component {

  constructor(props){
    super(props);
    this.state={
      userType : "All",
      configState:{}
    }
    return this;
  }

  componentDidMount() {
    let loggedInUser = getAdminUserContext();
    if(loggedInUser.hierarchyLevel != 0) {
      $(".community_icons a").click(function () {
        $('.community_icons a').removeClass('active_community');
        $(this).addClass('active_community');
        var value = $(this).attr('data-filter');
        if (value == "all") {
          $('.filter-block').show('1000');
        }
        else {
          $(".filter-block").not('.' + value).hide('3000');
          $('.filter-block').filter('.' + value).show('3000');
        }
      });
    }
    if(loggedInUser.hierarchyLevel == 0){
      $('.community_icons a').removeClass('active_community');
      $('.'+communityCode).addClass('active_community');
    }
  }
  componentDidUpdate(){
    let loggedInUser = getAdminUserContext();
    if(loggedInUser.hierarchyLevel == 0){
      $('.community_icons a').removeClass('active_community');
      $('.'+communityCode).addClass('active_community');
    }
  }

  onStatusChange(userType,e) {

    if (userType) {
      let config = this.props.config;
      // config = _.omit(config, 'data')
      let options = {
          module: config.moduleName,
          queryProperty: {
            limit: config.perPageLimit,
            skip: 0,
            // loadMore:false
          },
      };
      if(config.sort) {
        options.queryProperty['sortBy'] = config.sortBy;
      }
      let hasQueryOptions = this.props.config&&this.props.config.queryOptions ? true : false;
      if (hasQueryOptions) {
        if (config && config.params) {
          let usertype = {userType: userType}
          _.extend(config.params, usertype)
        } else {
          let newParams = {params: {userType: userType}}
          data = _.omit(config, 'params')
          config = _.extend(data, newParams);
        }
      }

      let dynamicQueryOption = this.props.config&&this.props.config.buildQueryOptions ? this.props.config.buildQueryOptions(config) : {};
      options = _.extend(options,dynamicQueryOption);

      this.props.config.fetchMore(options, true);
    }
  }

  render(){
    let data= [];
    if(this.state.userType != "All"){
      data=this.state.data;
    } else {
      data=this.props.data;
    }
    let clusterId = this.props.config.params&&this.props.config.params.clusterId?this.props.config.params.clusterId:"";
    let chapterId = this.props.config.params&&this.props.config.params.chapterId?this.props.config.params.chapterId:"";
    let subChapterId = this.props.config.params&&this.props.config.params.subChapterId?this.props.config.params.subChapterId:"";

  //   const list=  data.map((prop, idx) =>
  //     <div className="col-lg-2 col-md-4 col-sm-4" key={idx}>
  //       <div className="list_block provider_block">
  //         <div className={`cluster_status ${prop.isActive?"active":"inactive"}_cl `}>{/*<FontAwesome name={prop.profile.isActive?"check":"times"}/>*/}</div>
  //         {/*<div className={`cluster_status ${prop.statusField|| ""}_cl `}></div>*/}
  //         {/*{prop.communityCode?<a></a>:<a href={dashboardRoutes.backendUserDetailRoute(clusterId,chapterId,subChapterId,prop._id)}> <div className={"hex_outer"}><img src={prop.countryFlag}/></div></a>}*/}
  //         <h3>{prop.name}<br />
  //           {prop.communityCode?prop.clusterName:prop.roleNames}
  //         </h3>
  //       </div>
  //     </div>
  // );

    const list=  data.map(function(prop, idx){

      if(prop.communityCode == "IDE")
        icon = "ideator"
      else if(prop.communityCode == "FUN")
        icon = "funder"
      else if(prop.communityCode == "STU")
        icon = "startup"
      else if(prop.communityCode == "CMP")
        icon = "company"
      else if(prop.communityCode == "SPS")
        icon = "users"
      else if(prop.communityCode == "INS")
        icon = "institutions"
      else if(prop.profile.isInternaluser)
        icon = "moolya-symbol"

      return (
        <div className="col-md-2 col-sx-3 col-sm-4 col-lg-2" key={idx}>

          <div className="ideators_list_block">
            <div className={`${prop.isActive?"active":"inactive"}`}><span>Active</span></div>
            <h3>{prop.name}</h3>
            {/*<span className={`ml2 ml-${icon}`}></span>*/}
            <img src={`${prop.profile&&prop.profile.profileImage?prop.profile.profileImage:"/images/ideator_01.png"}`} className="c_image"/>
            <div className="block_footer">
              <span>{prop.communityCode?prop.clusterName:prop.roleNames}</span>
            </div>
          </div>
        </div>
      )}
    )



    return (
      <div>
          <div className="community_icons fixed_icon">
            <a data-toggle="tooltip" title="All" data-placement="bottom" className="All active_community" data-filter="all">
              <span className="ml ml-browser br" onClick={this.onStatusChange.bind(this, "All")}></span>{/*<FontAwesome className="ml" name='th'/>*/}
            </a>
            <a data-toggle="tooltip" title="Ideators" data-placement="bottom" className="IDE" data-filter="ideator">
              <span className="ml ml-ideator id" onClick={this.onStatusChange.bind(this, "Ideators")}></span>
            </a>
            <a data-toggle="tooltip" title="Investors" data-placement="bottom" className="FUN" data-filter="funder">
              <span className="ml ml-funder fu" onClick={this.onStatusChange.bind(this, "Investors")}></span>
            </a>
            <a data-toggle="tooltip" title="Startups" data-placement="bottom" className="STU" data-filter="startup">
              <span className="ml ml-startup st" onClick={this.onStatusChange.bind(this, "Startups")}></span>
            </a>
            <a data-toggle="tooltip" title="Service Providers" data-placement="bottom" className="" data-filter="provider">
              <span className="ml ml-users pr" onClick={this.onStatusChange.bind(this, "Service Providers")}></span>
            </a>
            {/*<a data-toggle="tooltip" title="Browsers" data-placement="bottom" className="" data-filter="browser">*/}
              {/*<span className="ml ml-browser" onClick={this.onStatusChange.bind(this, "Browsers")}></span>*/}
            {/*</a>*/}
            <a data-toggle="tooltip" title="Companies" data-placement="bottom" className="" data-filter="company">
              <span className="ml ml-company co" onClick={this.onStatusChange.bind(this, "Companies")}></span>
            </a>
            <a data-toggle="tooltip" title="Institutions" data-placement="bottom" className="" data-filter="institution">
              <span className="ml ml-institutions in" onClick={this.onStatusChange.bind(this, "Institutions")}></span>
            </a>
          </div>
          <div className="row ideators_list">
            {list}
          </div>
      </div>
        );

  }

}

