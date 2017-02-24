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
    const places = this.props.data&&this.props.data.data?this.props.data.data.map(place => {
      // const { ...data} = place;
      return (
        <MapMarkers module={this.props.module} key={place._id} lat={place.lat} lng={place.lng} text={place.text} markerId={place._id} hover={this.props.hoverKey === place._id} desc={place.desc}/>
          );
    }):[];

    let createMapOptions= function (maps) {
      return {
        styles: [
          {
            elementType: 'geometry',
            stylers: [
              {
                color: '#242f3e'
              }
            ]
          },
          {
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#746855'
              }
            ]
          },
          {
            elementType: 'labels.text.stroke',
            stylers: [
              {
                color: '#242f3e'
              }
            ]
          },
          {
            featureType: 'administrative.country',
            stylers: [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            featureType: 'administrative.country',
            elementType: 'geometry.fill',
            stylers: [
              {
                color: '#273545'
              },
              {
                'visibility': 'on'
              },
              {
                'weight': 8
              }
            ]
          },
          {
            featureType: 'administrative.country',
            elementType: 'geometry.stroke',
            stylers: [
              {
                color: '#ffffff'
              },
              {
                'visibility': 'on'
              },
              {
                'weight': 1
              }
            ]
          },
          {
            featureType: 'administrative.country',
            elementType: 'labels.text',
            stylers: [
              {
                'visibility': 'on'
              }
            ]

          },
          {
            featureType: 'administrative.country',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#ef4647'
              },
              {
                'saturation': 100
              },
              {
                'lightness': 5
              },
              {
                'visibility': 'on'
              }
            ]
          },
          {
            featureType: 'administrative.country',
            elementType: 'labels.text.stroke',
            stylers: [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            featureType: 'administrative.land_parcel',
            stylers: [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            featureType: 'administrative.locality',
            elementType: 'geometry.fill',
            stylers: [
              {
                color: '#ffff44'
              }
            ]
          },
          {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#ffff44'
              }
            ]
          },
          {
            featureType: 'administrative.neighborhood',
            elementType: 'labels.text',
            stylers: [
              {
                color: '#273545'
              },
              {
                'visibility': 'on'
              }
            ]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text',
            stylers: [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#d59563'
              }
            ]
          },
          {
            featureType: 'poi.attraction',
            stylers: [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            featureType: 'poi.business',
            stylers: [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            featureType: 'poi.business',
            elementType: 'labels.text.fill',
            stylers: [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            featureType: 'poi.government',
            stylers: [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [
              {
                color: '#263c3f'
              }
            ]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text',
            stylers: [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#6b9a76'
              }
            ]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [
              {
                color: '#38414e'
              }
            ]
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [
              {
                color: '#212a37'
              }
            ]
          },
          {
            featureType: 'road',
            elementType: 'labels',
            stylers: [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#9ca5b3'
              }
            ]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [
              {
                color: '#746855'
              }
            ]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [
              {
                color: '#1f2835'
              }
            ]
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#f3d19c'
              }
            ]
          },
          {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [
              {
                color: '#2f3948'
              }
            ]
          },
          {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#d59563'
              }
            ]
          },
          {
            featureType: 'transit.station.bus',
            stylers: [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [
              {
                color: '#17263c'
              }
            ]
          },
          {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [
              {
                color: '#547396'
              },
              {
                'visibility': 'on'
              }
            ]
          },
          {
            featureType: 'water',
            elementType: 'labels.text',
            stylers: [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#515c6d'
              }
            ]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [
              {
                color: '#17263c'
              }
            ]
          }
        ]
      }
    };
    // options={createMapOptions}
    return(
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



