import React from 'react';

import MlAppMapViewComposer from './MlAppMapViewComposer'

export default class MlAppMapViewContainer extends React.Component {
  render() {
    const config = this.props;
    return (
      <MlAppMapViewComposer {...config}/>
    );
  }
}
