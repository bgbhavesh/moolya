import React from 'react';

import MlTableViewComposer from './MlTableViewComposer';

export default class MlTableViewContainer extends React.Component {
  render() {
    const config = this.props;
    return (
      <MlTableViewComposer {...config}/>
    );
  }
}
