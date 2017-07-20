import React from 'react';
import MlInfinity from "../../../commons/components/infinityView/MlInfinityView";
import MlListViewContainer from "../../core/containers/MlAppListViewContainer";
import MlMapViewContainer from "../../core/containers/MlAppMapViewContainer"

/*
 Created by mohammed.mohasin on 01/03/17.

 Accepts viewMode,showInfinity as props to display the components
 //listConfig,mapConfig is configuration for the component
 */
export default class MlViews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewMode:true,
    }
    this.viewModeChange.bind(this);
  }

  viewModeChange(mode) {
    this.setState({'viewMode': mode});
  }


  render() {
    var specificViewMode = _.has(this.props, 'viewMode');
    var viewMode = null;
    if (specificViewMode) {
      if (this.props.viewMode == true && this.state.viewMode == true) {
        viewMode = true;
      } else if (this.props.viewMode == true && this.state.viewMode == false) {
        viewMode = false;
      } else if (this.props.viewMode == false && this.state.viewMode == true) {
        viewMode = false;
      } else if (this.props.viewMode == false && this.state.viewMode == false) {
        viewMode = true;
      }   // viewMode=this.props.viewMode; 
    } else {
      viewMode = this.state.viewMode;
    }
    //let viewMode = this.state.viewMode;
    var showInfinity = _.has(this.props, 'showInfinity') ? this.props.showInfinity : true;
    var infinityViewProps = {viewMode: this.state.viewMode, viewModeParams: this.props.viewMode, onViewModeChange: this.viewModeChange.bind(this)};
    var config = this.props;
    var listConfig = this.props.listConfig;
    var params = this.props.params ? this.props.params : null;
    return (
      <div className="app_main_wrap">
        {viewMode ? <MlMapViewContainer params={params} {...config.mapConfig} /> :
          <MlListViewContainer params={params} {...listConfig}/> }
        {showInfinity && (<MlInfinity {...infinityViewProps} />)}
      </div>

    )

  }
}
