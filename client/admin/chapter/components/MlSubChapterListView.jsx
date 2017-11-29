import React from 'react';
import MlInfinity from '../../dashboard/component/MlInfinity';
import MlListViewContainer from '../../core/containers/MlListViewContainer';
import MlMapViewContainer from '../../core/containers/MlMapViewContainer'

export default class MlSubChapterView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewMode: true
    }
    this.viewModeChange.bind(this);
  }

  viewModeChange(mode) {
    this.setState({ viewMode: mode });
  }


  render() {
    const viewMode = this.state.viewMode;
    const showInfinity = true;
    const infinityViewProps = { viewMode: this.state.viewMode, onViewModeChange: this.viewModeChange.bind(this) };
    const config = this.props;
    const listConfig = this.props.listConfig;
    // listConfig.data=[{displayName:"India"}];
    return (
      <div>
        <div className="admin_main_wrap">
          {viewMode ? <MlMapViewContainer {...config.mapConfig} /> : <div><MlListViewContainer {...listConfig}/></div> }
          {showInfinity && (<MlInfinity {...infinityViewProps} />)}
        </div>
      </div>

    )
  }
}
