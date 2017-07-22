import React from 'react';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import defaultProps from 'recompose/defaultProps';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import withPropsOnChange from 'recompose/withPropsOnChange';
import GoogleMap from 'google-map-react';
import ClusterMarker from './ClusterMarker';
import MapMarkers from './mapMarkers'
import supercluster from 'points-cluster';

export const gMap = ({
  style, hoverDistance, options,
  mapProps: {center, zoom,bounds },clusterRadius,onChildClick,
  onChange, onChildMouseEnter, onChildMouseLeave,
  clusters,mapContext,module,showImage
}) => {
  return (
    <GoogleMap
      options={options}
      bootstrapURLKeys={{key: Meteor.settings.public.googleApiKey}}
      hoverDistance={hoverDistance}
      center={center}
      zoom={zoom}
      onChange={onChange}
      onChildClick={(evt, loc)=>onChildClick(evt, loc,zoom,center)}
      onChildMouseEnter={onChildMouseEnter}
      onChildMouseLeave={onChildMouseLeave}
    >
      {
        clusters
          .map(({...markerProps, id, numPoints}) => (
            numPoints === 1
              ? <MapMarkers  key={id} lat={markerProps.lat} {...mapContext} module={module} hover={mapContext.hoverKey === markerProps.id}
                             lng={markerProps.lng} text={markerProps.desc}
                             desc={markerProps.desc}  markerId={markerProps.recordId} isActive ={markerProps.isActive} status ={markerProps.status} showImage={showImage}/>
              : <ClusterMarker key={id} {...markerProps} />
          ))
      }
    </GoogleMap>
  );
}



let compareQueryOptions=function(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
};

const markerDataConfig = lifecycle({
  componentDidMount() {
    this.setState({markers:this.props.data||[],mapProps:{center:this.props.center,zoom:this.props.zoom}});
  },
  componentWillUpdate(nextProps) {
    // console.log(nextProps);
    if(!compareQueryOptions(this.props.data,nextProps.data)){
      this.setState({markers:nextProps.data,mapProps:{center:nextProps.center,zoom:nextProps.zoom}});
    }
  }
});


const mapClusterHOC =compose(
    markerDataConfig,
    defaultProps({
      clusterRadius: 60,
      hoverDistance: 30,
      minZoom: 3,
      maxZoom: 15,
      options: {
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
    }),
    // withState so you could change markers if you want
   /* withState(
      'markers',
      'setMarkers',
      markersData
    ),*/
    withState(
      'hoveredMarkerId',
      'setHoveredMarkerId',
      -1
    ),
    withState(
      'mapProps',
      'setMapProps',
     /* {
        center: {lat: 17.1144718, lng: 5.7694891},
        zoom: 1,
      }*/
      (configurations)=>{
        return {center:configurations.center,zoom:configurations.zoom};
      }
    ),
    // describe events
    withHandlers({
      onChange: ({setMapProps, getBounds}) => ({center, zoom, bounds}) => {
        getBounds({ center, zoom, bounds });
        setMapProps({ center, zoom, bounds });
      },
      onChildMouseEnter: ({setHoveredMarkerId}) => (hoverKey, {id}) => {
        setHoveredMarkerId(id);
      },
      onChildClick: ({setMapProps}) => (evt, loc, zoom, centerPoint) => {
        let center = {
          lat: loc.lat, lng: loc.lng
        };
        let myzoom={zoom:(zoom|| 0)+1};
        if( parseFloat(center.lat).toFixed(4) != parseFloat(centerPoint.lat).toFixed(4) || parseFloat(center.lng).toFixed(4) != parseFloat(centerPoint.lng).toFixed(4)){
          setMapProps({center,zoom}, function () {
            setMapProps(myzoom);
          });
        } else {
          setMapProps(myzoom);
        }
      },
        //console.log(map, location, this);
      onChildMouseLeave: ({setHoveredMarkerId}) => (/* hoverKey, childProps */) => {
        setHoveredMarkerId(-1);
      },
    }),
    // precalculate clusters if markers data has changed
    withPropsOnChange(
      ['markers'],
      ({markers = [], clusterRadius, options: {minZoom=1, maxZoom=15}}) => ({
        getCluster: supercluster(
          markers,
          {
            minZoom, // min zoom to generate clusters on
            maxZoom, // max zoom level to cluster the points on
            radius: clusterRadius, // cluster radius in pixels
          }
        ),
      })
    ),
    // get clusters specific for current bounds and zoom
    withPropsOnChange(
      ['mapProps', 'getCluster'],
      ({mapProps, getCluster}) => ({
        clusters: mapProps.bounds
          ? getCluster(mapProps)
          .map(({wx, wy, numPoints, points}) => ({
            lat: parseFloat(wy),
            lng: parseFloat(wx),
            text: numPoints,
            numPoints,
            id: `${numPoints}_${points[0]._id}`,
            recordId: points[0]._id,
            isActive: points[0].isActive,
            status: points[0].status,
            desc:points[0].text,

          }))
          : [],
      })
    ),
    // set hovered
    withPropsOnChange(
      ['clusters', 'hoveredMarkerId'],
      ({clusters, hoveredMarkerId}) => ({
        clusters: clusters
          .map(({...cluster, id}) => ({
            ...cluster,
            hovered: id === hoveredMarkerId,
          })),
      })
    ),
  );




export default mapClusterHOC(gMap);
