import React, {Component, PropTypes} from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import _ from 'lodash';

import {render} from 'react-dom';

export default class MlAppMapMarker extends Component {
  constructor(props) {
    super(props);
  }


  render() {

    return (
      <div>
        <div className="map_profiles">
          <span className="ml fu"></span>
          <img src="/images/def_profile.png" />
        </div>
      </div>
    );
  }
}
MlAppMapMarker.propTypes = {
  text: PropTypes.string
}
MlAppMapMarker.defaultProps = {};
MlAppMapMarker.shouldComponentUpdate = shouldPureComponentUpdate;

