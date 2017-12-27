import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import dashboardRoutes from '../actions/routesActionHandler';
var FontAwesome = require('react-fontawesome');
import _ from 'lodash';
import {getAdminUserContext} from '../../../commons/getAdminUserContext'
import generateAbsolutePath from '../../../../lib/mlGenerateAbsolutePath';
import {fetchCommunityUsersHandler} from '../actions/fetchCommunityUsersActions'
import ScrollArea from 'react-scrollbar'
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
    var icon = "";
    var type = ""
    const list=  data.map(function(prop, idx){

     if(prop.communityCode == "IDE"){
       icon = "ideator"; type = "ideator"
     }
     else if(prop.communityCode == "FUN"){
       icon = "funder"; type = "funder"
     }
     else if(prop.communityCode == "STU"){
       icon = "startup"; type = "startup"
     }
     else if(prop.communityCode == "CMP"){
       icon = "company"; type = "company"
     }
     else if(prop.communityCode == "SPS"){
       icon = "users"; type = "serviceProviders"
     }
     else if(prop.communityCode == "INS"){
       icon = "institutions"; type = "institutions"
     }
     else if(prop.profile.isInternaluser){
       icon = "moolya-symbol"
     }


      return (
        <div className="col-md-2 col-sx-3 col-sm-4 col-lg-2" key={idx}>

          <div className="ideators_list_block">
            <a href={prop.profile.isInternaluser?dashboardRoutes.backendUserDetailRoute(clusterId,chapterId,subChapterId, prop._id):dashboardRoutes.externalUserRoute(clusterId,chapterId,subChapterId, type, prop.portfolioId)}>
            <div className={`${prop.profile.isActive?"active":"inactive"}`}><span>{`${prop.profile.isActive?"active":"inactive"}`}</span></div>
            <h3>{prop.name}</h3>
            {/*<span className={`ml2 ml-${icon}`}></span>*/}
            <img src={`${prop.profile&&prop.profile.profileImage?generateAbsolutePath(prop.profile.profileImage):"/images/ideator_01.png"}`} className="c_image"/>
            <div className="block_footer">
              <span>{prop.communityCode?prop.clusterName:prop.roleNames}</span>
            </div>
            </a>
          </div>
      </div>
      )}
  );
    return (
      <div>
          <div className="community_icons fixed_icon">
            <a data-toggle="tooltip" title="All" data-placement="bottom" className="All active_community" data-filter="all">
              <span className="ml ml-browser br" onClick={this.onStatusChange.bind(this, "All")}></span>{/*<FontAwesome className="ml" name='th'/>*/}
            </a>
            <a data-toggle="tooltip" title="Ideators" data-placement="bottom" className="IDE" data-filter="ideator">
              <span className="ml my-ml-Ideator id" onClick={this.onStatusChange.bind(this, "Ideators")}></span>
            </a>
            <a data-toggle="tooltip" title="Investors" data-placement="bottom" className="FUN" data-filter="funder">
              <span className="ml my-ml-Investors fu" onClick={this.onStatusChange.bind(this, "Investors")}></span>
            </a>
            <a data-toggle="tooltip" title="Startups" data-placement="bottom" className="STU" data-filter="startup">
              <span className="ml my-ml-Startups st" onClick={this.onStatusChange.bind(this, "Startups")}></span>
            </a>
            <a data-toggle="tooltip" title="Service Providers" data-placement="bottom" className="" data-filter="provider">
              <span className="ml my-ml-Service-Providers pr" onClick={this.onStatusChange.bind(this, "Service Providers")}></span>
            </a>
            {/*<a data-toggle="tooltip" title="Browsers" data-placement="bottom" className="" data-filter="browser">*/}
              {/*<span className="ml ml-browser" onClick={this.onStatusChange.bind(this, "Browsers")}></span>*/}
            {/*</a>*/}
            <a data-toggle="tooltip" title="Companies" data-placement="bottom" className="" data-filter="company">
              <span className="ml my-ml-Company co" onClick={this.onStatusChange.bind(this, "Companies")}></span>
            </a>
            <a data-toggle="tooltip" title="Institutions" data-placement="bottom" className="" data-filter="institution">
              <span className="ml my-ml-Institutions in" onClick={this.onStatusChange.bind(this, "Institutions")}></span>
            </a>
            <a data-toggle="tooltip" title="Backend Users" data-placement="bottom" className="" data-filter="internalUser">
              <span className="ml ml-moolya-symbol ot" onClick={this.onStatusChange.bind(this, "BackendUsers")}></span>
            </a>
          </div>
          <div className="row ideators_list">
            <h2>Communities</h2>
            <div className="list_scroll">
              <ScrollArea
                speed={0.8}
                className="list_scroll"
                smoothScrolling={true}
              >
            {list}
              </ScrollArea>
            </div>
          </div>
      </div>
        );

  }

}

