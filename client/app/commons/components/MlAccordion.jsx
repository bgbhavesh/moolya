/**
 * Created by mohammed.mohasin on 11/6/17.
 */
import React from 'react';
import { render } from 'react-dom';
import _ from 'lodash';
import FontAwesome from 'react-fontawesome';

export default class MlAccordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpand: [true, true],
      expandClassName: ['active', 'active']
    }
    this.onTabClick.bind(this);
    // set action panel activation handler callback
    if (_.isFunction(props.activateActionPanelHandler)) {
      props.activateActionPanelHandler(this.activateActionPanel.bind(this));
    }
    return this;
  }

  activateActionPanel() {
    // $("#portfolioAccordion0").addClass("in");
    $('#portfolioAccordion0').collapse('show');
  }

  componentDidMount() {
    this.onTabClick(1);
  }
  onTabClick(index) {
    const { isExpand, expandClassName } = this.state;
    const data = $(`#pdp-accord-toggle_${index}`).attr('aria-expanded');
    isExpand[index] = data == 'true';
    expandClassName[index] = data == 'true' ? 'active' : '';

    if (index === 0 && isExpand[0]) {
      isExpand[1] = false;
      expandClassName[1] = '';
    }

    if (index === 1 && isExpand[1]) {
      isExpand[0] = false;
      expandClassName[0] = '';
    }

    this.setState({ isExpand, expandClassName });
  }
  render() {
    const _this = this;
    /* props 'accordionOptions'  contains accordion configuration only */
    const accordion = this.props.accordionOptions ? this.props.accordionOptions : {};
    const accordionId = accordion.id || 'accordion';
    const panelOptions = accordion.panelItems || [];
    const panelItems = panelOptions.map((option, index) => (
      <a
        className={`re-btn ${_this.state.expandClassName[index]}`} id={`pdp-accord-toggle_${index}`} data-toggle="collapse" data-parent={`#${accordionId}`} key={`panel${index}`}
        href={`#${accordionId}${index}`} onClick={_this.onTabClick.bind(_this, index)}>
        {option.title} <span className={`fa fa-caret-${_this.state.isExpand[index] ? 'down' : 'up'}`}/>
      </a>
    ));

    const propz = _.omit(this.props, ['accordionOptions']);
    const panelItemsContent = panelOptions.map((option, index) => {
      const isText = option.isText || false;
      const PanelComponent = React.cloneElement(option.contentComponent, propz);

      if (isText) {
        if (index == 0) {
          return (<div id={accordionId + index} key={`panelContent${index}`} className="panel-collapse collapse in" style={option.style}>{option.contentComponent}</div>);
        }

        return (<div id={accordionId + index} key={`panelContent${index}`} className="panel-collapse collapse" style={option.style}>{option.contentComponent}</div>);
      }
      if (index == 0) {
        return (<div id={accordionId + index} key={`panelContent${index}`} className="panel-collapse collapse in" style={option.style}>
          {PanelComponent}
        </div>)
      }

      return (<div id={accordionId + index} key={`panelContent${index}`} className="panel-collapse collapse" style={option.style}>
        {PanelComponent}
      </div>)
    });

    return (
      <div>
        {/* <div className="opacity"></div> */}
        <div className="panel-group bottom-buttons" id={accordionId}>
          <div className="panel">
            <div className="panel-heading clearfix">
              <h4 className="panel-title text-left">
                {panelItems}
              </h4>
            </div>

            {panelItemsContent}


          </div>
        </div>
      </div>
    )
  }
}
