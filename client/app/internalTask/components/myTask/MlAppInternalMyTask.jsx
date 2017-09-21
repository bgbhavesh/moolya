/**
 * Created by pankaj on 8/7/17.
 */
import React from 'react';
import MlAppInternalMyTaskList from './MlAppInternalMyTaskList';
import MlAppInternalMyTaskItem from './MlAppInternalMyTaskItem';
import MlInfiniteScroll from "../../../../commons/core/mlInfiniteScroll/components/MlInfiniteScroll";
import {mlMyAppSelfInternalTaskConfig} from './../../config/MlAppSelfTasksConfig';

export default class MlAppInternalMyTask extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      type: (FlowRouter.getQueryParam('add') === 'true' ? "new" : "")
    };
    this.updateType = this.updateType.bind(this);
  }

  updateType(type) {
    this.setState({
      type: type
    });
  }

  render() {
    const that = this;
    switch (that.state.type) {
      case 'new':
        return < MlAppInternalMyTaskItem updateType={that.updateType} />;
      case 'edit':
        return '';
      default:
      return <MlInfiniteScroll viewMode={false} showInfinity={false} config={mlMyAppSelfInternalTaskConfig} />
    }
  }

};
