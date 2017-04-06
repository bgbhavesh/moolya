/**
 * Created by venkatasrinag on 5/4/17.
 */
import React from 'react';
import TabPanel from 'react-tab-panel'
import '../../../stylesheets/tab.css'
export default class MlTabComponent extends React.Component {
    constructor(props){
        super(props)
        this.state =  {tabs: props.tabs};
        this.onActivate.bind(this)
    }

    onActivate(index){
        console.log('Tab ' + index + ' was activated!')
    }

    render() {
      let tabs = this.state.tabs;
      return <TabPanel tabAlign="center" tabPosition="top" onActivate={this.onActivate}>{tabs}</TabPanel>
    }
}
