/**
 * Created by venkatasrinag on 5/4/17.
 */
import React from 'react';
import Tabs from 'react-responsive-tabs';

export default class MlTabComponent extends React.Component {
    constructor(props){
        super(props)
        this.state =  {tabs: props.tabs, selectedTabKey: props.selectedTabKey};
        this.onActivate.bind(this)
    }

    onActivate(index){
        if(this.state.tabs[index].title == ''){
            this.props.backClickHandler();
        }
        console.log('Tab ' + index + ' was activated!')
    }

    render() {
      let tabs = this.state.tabs;
      let selectedTabKey = this.state.selectedTabKey
      return <Tabs items={tabs} onChange={this.onActivate.bind(this)} selectedTabKey={selectedTabKey}/>;
    }
}
