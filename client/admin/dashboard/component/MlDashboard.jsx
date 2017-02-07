import React from 'react';
import MlInfinityView from "../component/MlInfinityView";
import MlMapView from "../component/MlMapView";
import MlListViewContainer from "../container/MlListViewContainer";
export default class MlDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewMode: true
    }
    this.viewModeChange.bind(this);
  }

  viewModeChange(mode){
    this.setState({'viewMode':mode});
  }


  render() {
    let viewMode = this.state.viewMode;
    let showInfinity=true;
    let infinityViewProps = {viewMode: this.state.viewMode, onViewModeChange:this.viewModeChange.bind(this)};
    let config=this.props;
    let listConfig=this.props.listConfig;
    listConfig.data=[{displayName:"India"}];
    return (
      <div>
        <div className="admin_main_wrap">
          {viewMode ? <MlMapView {...config.mapConfig} /> : <div><MlListViewContainer {...listConfig}/></div> }
          {showInfinity && (<MlInfinityView {...infinityViewProps} />)}
        </div>
      </div>

    )

  }
}
