import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import  $ from 'jquery'
import shouldPureComponentUpdate from 'react-pure-render/function';
import controllable from 'react-controllables';
import GoogleMap from 'google-map-react';
import MapMarkers from './mapMarkers'
import MapCluster from './MapCluster';
import MlLoader from '../../../commons/components/loader/loader'

let defaultCenter={lat: 17.1144718, lng: 5.7694891};
@controllable(['center', 'zoom', 'hoverKey', 'clickKey'])
export default class MoolyaMapView extends Component {

  constructor(props){
    super(props);
  }
  async componentWillMount() {
    let that = this;
    let hasCenter=that.props.fetchCenter||false;
    if(hasCenter){
      let center= await that.props.fetchCenterHandler(that.props);
      this.setState({center:center||defaultCenter,zoom:1});
     }else{
      this.setState({
        center:defaultCenter,
        zoom: 1,
      });
    }
  }

  render()
  {
    const hasCenter=this.state&&this.state.center?this.state.center:null;
    if(!hasCenter){
      return <MlLoader />;
    }
    const data=this.props.data&&this.props.data.data?this.props.data.data:[];
    return (
      <MapCluster data={data} zoom={this.state.zoom} center={this.state.center} mapContext={this.props} module={this.props.module} />
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

