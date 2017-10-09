import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import controllable from 'react-controllables';
//import GoogleMap from 'google-map-react';
//import MapMarkers from './mapMarkers'
import MapCluster from './MapCluster';
import MlLoader from '../../../commons/components/loader/loader'

let defaultCenter={lat: 17.1144718, lng: 5.7694891};
@controllable(['center', 'zoom', 'hoverKey', 'clickKey'])
export default class MoolyaMapView extends Component {
componentDidMount(){
  setTimeout(function(){
    $('.gm-fullscreen-control').parent().addClass('hide');
  },1000);
}
  constructor(props){
    super(props);
    this.state = {
      pubSelector: null
    }
  }
  async componentWillMount() {
    let that = this;
    let zoom = 1;
    let hasZoom=that.props.fetchZoom||false;
    if(hasZoom){
       zoom= await that.props.fetchZoomHandler(that.props)||zoom;
    }
    /*let loggedInUser = getAdminUserContext();
    if(loggedInUser.hierarchyLevel != 4){
      zoom = 4;
    }*/
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
    // const resp = this.fetchZoomCenter()
    // return resp
  }

  // async fetchZoomCenter(){
  //   let that = this;
  //   let zoom = 1;
  //   let hasZoom=that.props.fetchZoom||false;
  //   if(hasZoom){
  //     zoom= await that.props.fetchZoomHandler(that.props)||zoom;
  //   }
  //   if(that.props.hasCenter){
  //     var center= await that.props.fetchCenterHandler(that.props);
  //     this.setState({center:center||defaultCenter,zoom:zoom});
  //   }else {
  //     this.setState({
  //       center: defaultCenter,
  //       zoom: zoom,
  //     });
  //   }
  // }

  componentWillUpdate(nextProps, nextState) {
    if ((this.state.sizePerPage !== nextState.sizePerPage) || (this.state.pageNumber !== nextState.pageNumber)) {

      let hasQueryOptions = this.props.queryOptions ? true : false;
      let variables = {
        offset: nextState.sizePerPage * (nextState.pageNumber - 1) || 0,
        limit: nextState.sizePerPage || 20  //5
      }
      if (hasQueryOptions) {
        let dynamicQueryOptions = this.props.buildQueryOptions ? this.props.buildQueryOptions(this.props) : {};
        // let extendedVariables = _.extend(dynamicQueryOptions);
        let extendedVariables = _.merge(dynamicQueryOptions, variables);
        this.props.fetchMore(extendedVariables);
      }
      if(this.state.searchValue!==nextState.searchValue){
        let searchCriteria=this.constructSearchCriteria(nextState.searchValue);
        variables.fieldsData=searchCriteria||null
        this.props.fetchMore(variables);
      }
      this.props.fetchMore(variables);
    }
    else if(this.state.searchValue!==nextState.searchValue){
      let searchCriteria=this.constructSearchCriteria(nextState.searchValue);
      let variables = {
        offset: nextState.sizePerPage * (nextState.pageNumber - 1) || 0,
        fieldsData :searchCriteria||null
      }
      this.props.fetchMore(variables);
    }
  }

  render()
  {
    const hasCenter=this.state&&this.state.center?this.state.center:null;
    if(!hasCenter){
      return <MlLoader />;
    }
    const data=this.props.data&&this.props.data.data?this.props.data.data:[];
    let MapComponent = null;
    let MapFooterComponent=null;
    // Fix me
    var path = window.location.pathname;
    if(path.indexOf("/communities") !== -1){
      MapComponent=React.cloneElement(this.props.viewComponent,{data:data,config:this.props});
    }

    if(this.props.mapFooterComponent){
      MapFooterComponent=React.cloneElement(this.props.mapFooterComponent,{data:data,mapContext:this.props});
    }
    return (
      <span>
        {MapComponent?MapComponent:
          <MapCluster data={data} zoom={this.state.zoom} center={this.state.center} mapContext={this.props} module={this.props.module} showImage={this.props.showImage} getBounds={this.props.bounds}/>
        }
        {/*{data.length>0?<MlMapFooter data={data} mapContext={this.props}/>:
          <div className="bottom_actions_block bottom_count">
            <div><b>0</b> of <b>0</b> users are Active<br/></div>
          </div>
        }*/}
        {MapFooterComponent}

      </span>

    );

    /*
    const places = this.props.data&&this.props.data.data?this.props.data.data.map(place => {
      // const { ...data} = place;
      return (
        <MapMarkers {...this.props} module={this.props.module} key={place._id} lat={place.lat} isActive ={place.isActive} status ={place.status} lng={place.lng} text={place.text} markerId={place._id} hover={this.props.hoverKey === place._id} desc={place.desc}/>
          );
    }):[];*/

    /*return(
      <div className="map">
        <GoogleMap
          options={createMapOptions}
          bootstrapURLKeys={{key: "AIzaSyDnlajbJKYdilDs22Rvso9blSOj8KuL8-A"}}
          center={this.state.center}
          zoom={this.state.zoom}
          hoverDistance={40 / 2}
          onBoundsChange={this._onBoundsChange}
          onChildClick={this._onChildClick}
          onChildMouseEnter={this._onChildMouseEnter}
          onChildMouseLeave={this._onChildMouseLeave}>
          {places}
        </GoogleMap>
      </div>
    )*/

   /* let markerData=this.props.data&&this.props.data.data?this.props.data.data:[];
    const GMapComponent=GMap(markerData,{module:this.props.module},gMap);
 */
   }

}
MoolyaMapView.propTypes = {
  center: PropTypes.array,
  zoom: PropTypes.number,
  // greatPlaceCoords: PropTypes.any
};
MoolyaMapView.shouldComponentUpdate = shouldPureComponentUpdate;

MoolyaMapView._onBoundsChange = (center, zoom) => {
  this.props.onCenterChange(center);
  this.props.onZoomChange(zoom);
}

MoolyaMapView._onChildClick = (key, childProps) => {
  this.props.onCenterChange([childProps.latitude, childProps.longitude]);
}

MoolyaMapView._onChildMouseEnter = (key) => {
  this.props.onHoverKeyChange(key);
}

MoolyaMapView._onChildMouseLeave = () => {
  this.props.onHoverKeyChange(null);
}

