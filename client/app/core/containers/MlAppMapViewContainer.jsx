import React from 'react';

import MlMapViewComposer from './MlAppMapViewComposer'

export default class MlMapViewContainer extends React.Component {

  render() {
    let config=this.props;
    return (
      <MlMapViewComposer {...config}/>
    );
  }
};
