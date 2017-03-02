import React from 'react';
import MlInfinity from "../../dashboard/component/MlInfinity";
import MlListViewContainer from "../containers/MlListViewContainer";
import MlMapViewContainer from "../containers/MlMapViewContainer"

/*
 Created by mohammed.mohasin on 01/03/17.

 Accepts viewMode,showInfinity as props to display the components
 //listConfig,mapConfig is configuration for the component
*/
export default class MlViews extends React.Component {
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
    let specificViewMode=_.has(this.props,'viewMode');
    let viewMode=null;
    if(specificViewMode){
      viewMode=this.props.viewMode;
    }else{
      viewMode = this.state.viewMode;
    }
    //let viewMode = this.state.viewMode;
    let showInfinity=_.has(this.props,'showInfinity')?this.props.showInfinity:true;
    let infinityViewProps = {viewMode: this.state.viewMode, onViewModeChange:this.viewModeChange.bind(this)};
    let config=this.props;
    let listConfig=this.props.listConfig;
     let params=this.props.params?this.props.params:null;
    return (
      <div>
        <div className="admin_main_wrap">
          {viewMode ? <MlMapViewContainer params={params} {...config.mapConfig} /> : <div><MlListViewContainer params={params} {...listConfig}/></div> }
          {showInfinity && (<MlInfinity {...infinityViewProps} />)}
        </div>
      </div>

    )

  }
}
