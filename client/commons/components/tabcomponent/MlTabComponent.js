/**
 * Created by venkatasrinag on 5/4/17.
 */
import React from 'react';
import Tabs from 'react-responsive-tabs';
import 'react-responsive-tabs/styles.css'

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
      return <Tabs items={tabs} onChange={this.onActivate} />;
    }
}
