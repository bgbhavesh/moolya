import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import dashboardRoutes from '../actions/routesActionHandler';
var FontAwesome = require('react-fontawesome');
import _ from 'lodash';
import {getAdminUserContext} from '../../../commons/getAdminUserContext'
import {fetchCommunityUsersHandler} from '../actions/fetchCommunityUsersActions'
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
    // const data = this.state.data;
    if (userType) {
      //this.setState({userType: userType});
      console.log(this.props);
      let variables={};
      let hasQueryOptions = this.props.config&&this.props.config.queryOptions ? true : false;
      if (hasQueryOptions) {
        let config = this.props.config
        if(config && config.params){
          let usertype={userType:userType}
          _.extend(config.params,usertype)
        }else{
          let newParams = {params:{userType:userType}}
          data = _.omit(config, 'params')
          config=_.extend(data,newParams);
        }
        let dynamicQueryOption = this.props.config&&this.props.config.buildQueryOptions ? this.props.config.buildQueryOptions(config) : {};
        variables = _.extend(variables,dynamicQueryOption);

      }
      this.props.config.fetchMore(variables);

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

    const list=  data.map((prop, idx) =>
      <div className="col-lg-2 col-md-4 col-sm-4" key={idx}>
        <div className="list_block provider_block">
          <div className={`cluster_status ${prop.profile.isActive?"active":"inactive"}_cl `}>{/*<FontAwesome name={prop.profile.isActive?"check":"times"}/>*/}</div>
          {/*<div className={`cluster_status ${prop.statusField|| ""}_cl `}></div>*/}
          {prop.communityCode?<a></a>:<a href={dashboardRoutes.backendUserDetailRoute(clusterId,chapterId,subChapterId,prop._id)}> <div className={"hex_outer"}><img src={prop.countryFlag}/></div></a>}
          <h3>{prop.name}<br />
            {prop.communityCode?prop.clusterName:prop.roleNames}
          </h3>
        </div>
      </div>
  );
    return (
      <div>
          <div className="community_icons fixed_icon">
            <a data-toggle="tooltip" title="All" data-placement="bottom" className="All active_community" data-filter="all">
              <span className="ml ml-browser" onClick={this.onStatusChange.bind(this, "All")}></span>{/*<FontAwesome className="ml" name='th'/>*/}
            </a>
            <a data-toggle="tooltip" title="Ideators" data-placement="bottom" className="IDE" data-filter="ideator">
              <span className="ml ml-ideator" onClick={this.onStatusChange.bind(this, "Ideators")}></span>
            </a>
            <a data-toggle="tooltip" title="Investors" data-placement="bottom" className="FUN" data-filter="funder">
              <span className="ml ml-funder" onClick={this.onStatusChange.bind(this, "Investors")}></span>
            </a>
            <a data-toggle="tooltip" title="Start Ups" data-placement="bottom" className="STU" data-filter="startup">
              <span className="ml ml-startup" onClick={this.onStatusChange.bind(this, "Startups")}></span>
            </a>
            <a data-toggle="tooltip" title="Service Providers" data-placement="bottom" className="" data-filter="provider">
              <span className="ml ml-users" onClick={this.onStatusChange.bind(this, "Service Providers")}></span>
            </a>
            {/*<a data-toggle="tooltip" title="Browsers" data-placement="bottom" className="" data-filter="browser">*/}
              {/*<span className="ml ml-browser" onClick={this.onStatusChange.bind(this, "Browsers")}></span>*/}
            {/*</a>*/}
            <a data-toggle="tooltip" title="Companies" data-placement="bottom" className="" data-filter="company">
              <span className="ml ml-company" onClick={this.onStatusChange.bind(this, "Companies")}></span>
            </a>
            <a data-toggle="tooltip" title="Institutions" data-placement="bottom" className="" data-filter="institution">
              <span className="ml ml-institutions" onClick={this.onStatusChange.bind(this, "Institutions")}></span>
            </a>
            <a data-toggle="tooltip" title="Backend Users" data-placement="bottom" className="" data-filter="internalUser">
              <span className="ml ml-moolya-symbol" onClick={this.onStatusChange.bind(this, "BackendUsers")}></span>
            </a>
          </div>
          <div className="row">
            {list}
          </div>
      </div>
        );

  }

}

