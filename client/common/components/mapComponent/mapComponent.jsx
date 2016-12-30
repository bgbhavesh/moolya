import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import controllable from 'react-controllables';
import GoogleMap from 'google-map-react';

@controllable(['center', 'zoom', 'hoverKey', 'clickKey'])
export default class MoolyaMapComponent extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
              <GoogleMap
                  bootstrapURLKeys={{key: "AIzaSyDnlajbJKYdilDs22Rvso9blSOj8KuL8-A"}}
                  center={this.props.center}
                  zoom={this.props.zoom}>
              </GoogleMap>
        )
    }

}

MoolyaMapComponent.propTypes = {
  center: PropTypes.array,
  zoom: PropTypes.number,
  greatPlaceCoords: PropTypes.any
};

MoolyaMapComponent.defaultProps = {
  center: [59.938043, 30.337157],
  zoom: 9,
  greatPlaceCoords: {lat: 59.724465, lng: 30.080121}
}

MoolyaMapComponent.shouldComponentUpdate = shouldPureComponentUpdate;
