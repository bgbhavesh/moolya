import React from 'react';

import MlListViewComposer from './MlListViewComposer';

export default class MlListViewContainer extends React.Component {
  render() {
    const config = this.props;
    return (
      <MlListViewComposer {...config}/>
    );
  }
}
