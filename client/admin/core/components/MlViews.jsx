import React from 'react';
import MlInfinity from '../../dashboard/component/MlInfinity';
import MlListViewContainer from '../containers/MlListViewContainer';
import MlMapViewContainer from '../containers/MlMapViewContainer'

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
    this.getBound = this.getBound.bind(this);
  }

  viewModeChange(mode) {
    this.setState({ viewMode: mode });
  }
  getBound(obj) {
    // let variables={};
    // let hasQueryOptions = this.props&&this.props.queryOptions ? true : false;
    //   if (hasQueryOptions) {
    //     let config = this.props.listConfig
    //     if(config && config.params){
    //       let bounds={bounds:obj.bounds}
    //       _.extend(config.params,bounds)
    //     }else{
    //       let newParams = {params:{bounds:obj.bounds}}
    //       data = _.omit(config, 'params')
    //       config=_.extend(data,newParams);
    //     }
    //     let dynamicQueryOption = this.props.listConfig && this.props.listConfig.buildQueryOptions ? this.props.listConfig.buildQueryOptions(config) : {};
    //     variables = _.extend(variables, dynamicQueryOption);
    //   }
    //   this.props.listConfig.fetchMore(variables);

  }

  render() {
    const specificViewMode = _.has(this.props, 'viewMode');
    let viewMode = null;
    if (specificViewMode) {
      if (this.props.viewMode == true && this.state.viewMode == true) {
        viewMode = true;
      } else if (this.props.viewMode == true && this.state.viewMode == false) {
        viewMode = false;
      } else if (this.props.viewMode == false && this.state.viewMode == true) {
        viewMode = false;
      } else if (this.props.viewMode == false && this.state.viewMode == false) {
        viewMode = true;
      }
      // viewMode=this.props.viewMode;
    } else {
      viewMode = this.state.viewMode;
    }
    // let viewMode = this.state.viewMode;
    const showInfinity = _.has(this.props, 'showInfinity') ? this.props.showInfinity : true;
    const infinityViewProps = { viewMode: this.state.viewMode, viewModeParams: this.props.viewMode, onViewModeChange: this.viewModeChange.bind(this) };
    const config = this.props;
    const listConfig = this.props.listConfig;
    const params = this.props.params ? this.props.params : null;
    return (
      <div className="admin_main_wrap">
        {viewMode ? <MlMapViewContainer params={params} bounds={this.getBound.bind(this)} {...config.mapConfig} /> :
          <MlListViewContainer params={params} {...listConfig}/> }
        {showInfinity && (<MlInfinity {...infinityViewProps} />)}
      </div>

    )
  }
}
