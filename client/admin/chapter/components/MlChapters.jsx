import React from 'react';
import MlInfinity from '../../dashboard/component/MlInfinity';
import MlListViewContainer from '../../core/containers/MlListViewContainer';
import MlMapViewContainer from '../../core/containers/MlMapViewContainer'

export default class MlChaptersView extends React.Component {
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
    const params = this.props.params ? this.props.params : null;
    return (
      <div>
        <div className="admin_main_wrap">

          <div><MlListViewContainer params={params} {...listConfig}/></div>

        </div>
      </div>

    )
  }
}
