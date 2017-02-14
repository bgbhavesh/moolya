import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import  $ from 'jquery'
import shouldPureComponentUpdate from 'react-pure-render/function';
import controllable from 'react-controllables';
import GoogleMap from 'google-map-react';
import MapMarkers from './mapMarkers'

@controllable(['center', 'zoom', 'hoverKey', 'clickKey'])
export default class MoolyaMapView extends Component {

  constructor(props){
    super(props);
  }
  componentWillMount(){
    this.setState({
      center: {lat: 23.6850, lng: 90.3563},
      zoom: 1,
    });
  }

  render()
  {
    const places = this.props.data?this.props.data.data.map(place => {
      // const { ...data} = place;
      return (
        <MapMarkers key={place.countryId} lat={place.latitude} lng={place.longitude} text={place.displayName} hover={this.props.hoverKey === place._id} desc={place.about}/>
      );
    }):[];
    return(
      <div className="map">
        <GoogleMap
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
    )
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



