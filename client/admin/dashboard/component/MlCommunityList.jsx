import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import dashboardRoutes from '../actions/routesActionHandler';
var FontAwesome = require('react-fontawesome');
import _ from 'lodash';
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
    $(".community_icons a").click(function(){
      $('.community_icons a').removeClass('active_community');
      $(this).addClass('active_community');
      var value = $(this).attr('data-filter');
      if(value == "all") {
        $('.filter-block').show('1000');
      }
      else {
        $(".filter-block").not('.'+value).hide('3000');
        $('.filter-block').filter('.'+value).show('3000');
      }
    });
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

    const list=  data.map((prop) =>
      <div className="col-lg-2 col-md-4 col-sm-4" key={prop._id}>
        <div className="list_block">
          <div className={`cluster_status ${prop.profile.isActive?"active":"inactive"}_cl `}><FontAwesome name={prop.profile.isActive?"check":"times"}/></div>
          {/*<div className={`cluster_status ${prop.statusField|| ""}_cl `}></div>*/}
          <a href={dashboardRoutes.backendUserDetailRoute(clusterId,chapterId,subChapterId,prop._id)}> <div className={"hex_outer"}><img src={prop.countryFlag}/></div></a>
          <h3>{prop.profile.InternalUprofile.moolyaProfile.displayName}</h3>
        </div>
      </div>
  );
    return (
      <div>
          <div className="community_icons">
            <a data-toggle="tooltip" title="All" data-placement="bottom" className="active_community" data-filter="all">
              <span className="ml ml-select-all" onClick={this.onStatusChange.bind(this, "All")}></span>{/*<FontAwesome className="ml" name='th'/>*/}
            </a>
            <a data-toggle="tooltip" title="Ideators" data-placement="bottom" className="" data-filter="ideator">
              <span className="ml ml-ideator" onClick={this.onStatusChange.bind(this, "Ideators")}></span>
            </a>
            <a data-toggle="tooltip" title="Funders" data-placement="bottom" data-filter="funder">
              <span className="ml ml-funder" onClick={this.onStatusChange.bind(this, "Funders")}></span>
            </a>
            <a data-toggle="tooltip" title="Start Ups" data-placement="bottom" data-filter="startup">
              <span className="ml ml-startup" onClick={this.onStatusChange.bind(this, "StartUps")}></span>
            </a>
            <a data-toggle="tooltip" title="Providers" data-placement="bottom" data-filter="provider">
              <span className="ml ml-users" onClick={this.onStatusChange.bind(this, "Providers")}></span>
            </a>
            <a data-toggle="tooltip" title="Browsers" data-placement="bottom" data-filter="browser">
              <span className="ml ml-browser" onClick={this.onStatusChange.bind(this, "Browsers")}></span>
            </a>
            <a data-toggle="tooltip" title="Company" data-placement="bottom" data-filter="company">
              <span className="ml ml-company" onClick={this.onStatusChange.bind(this, "Company")}></span>
            </a>
            <a data-toggle="tooltip" title="Institutions" data-placement="bottom" data-filter="company">
              <span className="ml ml-institutions" onClick={this.onStatusChange.bind(this, "Institutions")}></span>
            </a>
            <a data-toggle="tooltip" title="Backend Users" data-placement="bottom" data-filter="internalUser">
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

