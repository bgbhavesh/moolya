import React, { PropTypes } from 'react';
import Tabs from 'react-responsive-tabs';
export default class MlTabComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tabs: props.tabs, selectedTabKey: props.selectedTabKey };
    this.onActivate.bind(this);
  }

  componentWillMount() {
    const type = this.props.type;
    if (type) {
      if (!FlowRouter.getQueryParam(type)) {
        let object = {};
        var key= this.props.mkey || 'title';
        if(this.state.tabs[0].name) key= 'name';
        object[type]=this.state.tabs[0][key];
        FlowRouter.setQueryParams(object);
      }
      this.context.breadCrum.updateBreadCrum();
    }
  }

  onActivate(index) {
    const type = this.props.type;
    if (type) {
      let object = {};
      object[type]=index;
      FlowRouter.setQueryParams(object);
    }
    this.context.breadCrum.updateBreadCrum();
  }

  render() {
    const tabs = this.state.tabs;
    let params = new URL(window.location.href).searchParams;
    if(this.props.type){
      let selectedTabKey = params.get(this.props.type);
      return <Tabs items={tabs} selectedTabKey={selectedTabKey ||this.props.selectedTabKey} onChange={this.onActivate.bind(this)} />;
    }
    else{
      return <Tabs items={tabs} onChange={this.onActivate.bind(this)} />;
    }
  }
}

function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }


MlTabComponent.contextTypes = {
  breadCrum: PropTypes.Object,
};
