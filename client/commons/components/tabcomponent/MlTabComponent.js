/**
 * Created by venkatasrinag on 5/4/17.
 */
import React, { PropTypes } from 'react';
import Tabs from 'react-responsive-tabs';
export default class MlTabComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tabs: props.tabs, selectedTabKey: props.selectedTabKey };
    this.onActivate.bind(this);
  }

  componentWillMount() {
    if (this.props.selectedTabKey !== undefined) {
      if (!FlowRouter.getQueryParam('tab')) {
        let value = '';
        if (this.state.tabs[0].title && typeof this.state.tabs[0].title === 'string') {
          value = this.state.tabs[0].title;
        } else if (this.state.tabs[0].name) {
          value = this.state.tabs[0].name;
        } else {
          value = this.state.tabs[0].key;
        }
        FlowRouter.setQueryParams({ tab: value });
      }
      this.context.breadCrum.updateBreadCrum();

      if (this.props.tabs[0].tabClassName === 'moolya_btn') {
        if (!FlowRouter.getQueryParam('subtab')) { FlowRouter.setQueryParams({ subtab: this.props.tabs[0].title }); }
      }
    }
  }

  onActivate(index) {
    if (this.props.selectedTabKey !== undefined) {
      if (!isNumber(index)) {
        FlowRouter.setQueryParams({ tab: index });
      } else {
        const tab = Object.assign(this.state.tabs)[index];
        FlowRouter.setQueryParams({ subtab: tab.title });
      }
      this.context.breadCrum.updateBreadCrum();
    }
  }

  render() {
    const tabs = this.state.tabs;
    const selectedTabKey = this.props.selectedTabKey;
    return <Tabs items={tabs} selectedTabKey={selectedTabKey} onChange={this.onActivate.bind(this)} />;
  }
}

function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }


MlTabComponent.contextTypes = {
  breadCrum: PropTypes.Object,
};
