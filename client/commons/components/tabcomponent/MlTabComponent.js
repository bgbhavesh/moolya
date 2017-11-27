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
        const object = {};
        let key = 'title';
        if (this.state.tabs[0].key) {
          key = 'key';
        } else if (this.props.mkey) {
          key = this.props.mkey;
        } else if (this.state.tabs[0].name) {
          key = 'name';
        }

        if (this.props.selectedTabKey) { object[type] = this.props.selectedTabKey; } else { object[type] = this.state.tabs[0][key]; }
        FlowRouter.setQueryParams(object);
      }
      this.context.breadCrum.updateBreadCrum();
    }
  }

  onActivate(index) {
    const type = this.props.type;
    if (type) {
      const object = {};
      object[type] = index;
      object.appointment = null;
      object[' Team'] = null;
      object.add = null;
      object[' Products'] = null;
      FlowRouter.setQueryParams(object);
    }
    this.context.breadCrum.updateBreadCrum();
  }

  render() {
    const tabs = this.state.tabs;
    const params = new URL(window.location.href).searchParams;
    if (this.props.type) {
      const selectedTabKey = params.get(this.props.type);
      return <Tabs items={tabs} selectedTabKey={selectedTabKey || this.props.selectedTabKey} onChange={this.onActivate.bind(this)} />;
    }

    return <Tabs items={tabs} selectedTabKey={this.props.selectedTabKey || 0} onChange={this.onActivate.bind(this)} />;
  }
}

function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }


MlTabComponent.contextTypes = {
  breadCrum: PropTypes.object
};
