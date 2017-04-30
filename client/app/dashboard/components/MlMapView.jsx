import React,{PropTypes} from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import GoogleMap from 'google-map-react';

export default class MapView extends React.Component{
  componentDidMount()
  { }
  render(){
    return (
      <GoogleMap
        options={createMapOptions}
        apiKey={'AIzaSyCtC-S_Fm8a1JoEoNUEpmoeCv65ANzRcUE'} // set if you need stats etc ...
        center={this.props.center}
        zoom={this.props.zoom}
      >
      </GoogleMap>
    )
  }
};

MapView.defaultProps = {
  center: [25.6249905, 79.5113235],
  zoom: 1,
  greatPlaceCoords: {lat: 25.6249905, lng: 79.5113235}
  //styles:
};
//india: 23.3737562,80.4414432
MapView.propTypes = {
  center: PropTypes.array,
  zoom: PropTypes.number,
  greatPlaceCoords: PropTypes.any,
  //styles: PropTypes.any
};

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
