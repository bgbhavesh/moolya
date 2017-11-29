import React from 'react';

import MlMapViewComposer from './MlMapViewComposer'

export default class MlMapViewContainer extends React.Component {
  render() {
    const config = this.props;
    return (
      <MlMapViewComposer {...config}/>
    );
  }
}
