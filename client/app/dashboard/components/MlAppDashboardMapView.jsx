/** ************************************************************
 * Date: 17 Julu, 2017
 * Rajat Shekhar Srivastava
 * Dashboard Map View with community filter icon.
 * *************************************************************** */

import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import controllable from 'react-controllables';
import MapCommunity from '../../../commons/components/map/MapCommunity';
import MlLoader from '../../../commons/components/loader/loader'
import {getAdminUserContext} from '../../../commons/getAdminUserContext'

let defaultCenter={lat: 17.1144718, lng: 5.7694891};
@controllable(['center', 'zoom', 'hoverKey', 'clickKey'])
export default class MlDashboardMapView extends Component {

  constructor(props){
    super(props);
    this.state={
      userType : "All",
      configState:{}
    }
  }
  async componentWillMount() {
    let that = this;
    let zoom = 1;
    let loggedInUser = getAdminUserContext();
    if(loggedInUser.hierarchyLevel != 4){
      zoom = 4;
    }
    let hasCenter=that.props.config.fetchCenter||false;
    if(hasCenter){
      let center= await that.props.config.fetchCenterHandler(that.props.config);
      this.setState({center:center||defaultCenter,zoom:zoom});
    }else{
      this.setState({
        center:defaultCenter,
        zoom: zoom,
      });
    }
  }
  componentDidMount() {

  }
  componentDidUpdate(){
    /*let loggedInUser = getAdminUserContext();
     if(loggedInUser.hierarchyLevel == 0){
     $('.community_icons a').removeClass('active_community');
     $('.'+communityCode).addClass('active_community');
     }*/

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

  onStatusChange(userType,e) {
    // const data = this.state.data;
    if (userType) {
      //this.setState({userType: userType});
      // console.log(this.props);
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

  render()
  {
    const hasCenter=this.state&&this.state.center?this.state.center:null;
    if(!hasCenter){
      return <MlLoader />;
    }
    const data=this.props.data?this.props.data:[];
    const communityIconList=
      <div className="community_icons">
        <a data-toggle="tooltip" title="All" data-placement="bottom" className="All map_active_community" data-filter="all">
          <span className="ml ml-browser br" onClick={this.onStatusChange.bind(this, "All")}></span>{/*<FontAwesome className="ml" name='th'/>*/}
        </a>
        <a data-toggle="tooltip" title="Ideators" data-placement="bottom" className="IDE " data-filter="ideator">
          <span className="ml ml-ideator id" onClick={this.onStatusChange.bind(this, "Ideators")}></span>
        </a>
        <a data-toggle="tooltip" title="Investors" data-placement="bottom" className="FUN" data-filter="funder">
          <span className="ml ml-funder fu" onClick={this.onStatusChange.bind(this, "Investors")}></span>
        </a>
        <a data-toggle="tooltip" title="Start Ups" data-placement="bottom" className="STU" data-filter="startup">
          <span className="ml ml-startup st" onClick={this.onStatusChange.bind(this, "Startups")}></span>
        </a>
        <a data-toggle="tooltip" title="Service Providers" data-placement="bottom" className="Service Providers" data-filter="provider">
          <span className="ml ml-users pr" onClick={this.onStatusChange.bind(this, "Service Providers")}></span>
        </a>
        {/*<a data-toggle="tooltip" title="Browsers" data-placement="bottom" className="Browsers" data-filter="browser">*/}
        {/*<span className="ml ml-browser br" onClick={this.onStatusChange.bind(this, "Browsers")}></span>*/}
        {/*</a>*/}
        <a data-toggle="tooltip" title="Companies" data-placement="bottom" className="Companies" data-filter="company">
          <span className="ml ml-company co" onClick={this.onStatusChange.bind(this, "Companies")}></span>
        </a>
        <a data-toggle="tooltip" title="Institutions" data-placement="bottom" className="Institutions" data-filter="institution">
          <span className="ml ml-institutions in" onClick={this.onStatusChange.bind(this, "Institutions")}></span>
        </a>
      </div>

    return (
      <span>
        {communityIconList}
        <MapCommunity data={data} zoom={this.state.zoom} center={this.state.center} mapContext={this.props} module={this.props.module} />
      </span>
    );
  }

}
MlDashboardMapView.propTypes = {
  center: PropTypes.array,
  zoom: PropTypes.number,
  // greatPlaceCoords: PropTypes.any
};
MlDashboardMapView.shouldComponentUpdate = shouldPureComponentUpdate;

MlDashboardMapView._onBoundsChange = (center, zoom) => {
  this.props.onCenterChange(center);
  this.props.onZoomChange(zoom);
}

MlDashboardMapView._onChildClick = (key, childProps) => {
  this.props.onCenterChange([childProps.latitude, childProps.longitude]);
}

MlDashboardMapView._onChildMouseEnter = (key) => {
  this.props.onHoverKeyChange(key);
}

MlDashboardMapView._onChildMouseLeave = () => {
  this.props.onHoverKeyChange(null);
}



