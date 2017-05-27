import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import controllable from 'react-controllables';
import MapCluster from '../../../commons/components/map/MapCluster';
import MlLoader from '../../../commons/components/loader/loader'
import {getAdminUserContext} from '../../../commons/getAdminUserContext'

let defaultCenter={lat: 17.1144718, lng: 5.7694891};
@controllable(['center', 'zoom', 'hoverKey', 'clickKey'])
export default class MlCommunityMapView extends Component {

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
    let hasCenter=that.props.fetchCenter||false;
    if(hasCenter){
      let center= await that.props.fetchCenterHandler(that.props);
      this.setState({center:center||defaultCenter,zoom:zoom});
    }else{
      this.setState({
        center:defaultCenter,
        zoom: zoom,
      });
    }
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

  render()
  {
    const hasCenter=this.state&&this.state.center?this.state.center:null;
    if(!hasCenter){
      return <MlLoader />;
    }
    const data=this.props.data?this.props.data:[];
    const communityIconList=
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
          <span className="ml ml-startup" onClick={this.onStatusChange.bind(this, "Startups")}></span>
        </a>
        <a data-toggle="tooltip" title="Service Providers" data-placement="bottom" data-filter="provider">
          <span className="ml ml-users" onClick={this.onStatusChange.bind(this, "Service Providers")}></span>
        </a>
        <a data-toggle="tooltip" title="Browsers" data-placement="bottom" data-filter="browser">
          <span className="ml ml-browser" onClick={this.onStatusChange.bind(this, "Browsers")}></span>
        </a>
        <a data-toggle="tooltip" title="Companies" data-placement="bottom" data-filter="company">
          <span className="ml ml-company" onClick={this.onStatusChange.bind(this, "Companies")}></span>
        </a>
        <a data-toggle="tooltip" title="Institutions" data-placement="bottom" data-filter="institution">
          <span className="ml ml-institutions" onClick={this.onStatusChange.bind(this, "Institutions")}></span>
        </a>
        <a data-toggle="tooltip" title="Backend Users" data-placement="bottom" data-filter="internalUser">
          <span className="ml ml-moolya-symbol" onClick={this.onStatusChange.bind(this, "BackendUsers")}></span>
        </a>
      </div>

    return (
      <span>
        {communityIconList}
        <MapCluster data={data} zoom={this.state.zoom} center={this.state.center} mapContext={this.props} module={this.props.module} />
      </span>
    );
  }

}
MlCommunityMapView.propTypes = {
  center: PropTypes.array,
  zoom: PropTypes.number,
  // greatPlaceCoords: PropTypes.any
};
MlCommunityMapView.shouldComponentUpdate = shouldPureComponentUpdate;

MlCommunityMapView._onBoundsChange = (center, zoom) => {
  this.props.onCenterChange(center);
  this.props.onZoomChange(zoom);
}

MlCommunityMapView._onChildClick = (key, childProps) => {
  this.props.onCenterChange([childProps.latitude, childProps.longitude]);
}

MlCommunityMapView._onChildMouseEnter = (key) => {
  this.props.onHoverKeyChange(key);
}

MlCommunityMapView._onChildMouseLeave = () => {
  this.props.onHoverKeyChange(null);
}



