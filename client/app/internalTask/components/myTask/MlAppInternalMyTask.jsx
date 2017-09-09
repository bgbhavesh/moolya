/**
 * Created by pankaj on 8/7/17.
 */
import React from 'react';
import MlAppInternalMyTaskList from './MlAppInternalMyTaskList';
import MlAppInternalMyTaskItem from './MlAppInternalMyTaskItem';

export default class MlAppInternalMyTask extends React.Component{

  constructor(props){
    super(props);
    this.state ={
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
      return <MlAppInternalMyTaskList updateType={that.updateType} data={that.props.data} />
    }
  }

};
