import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import _ from 'lodash';
import MlAppActionComponent from './MlAppActionComponent';
import MlAccordion from './MlAccordion';
import MlIdeatorRelatedIdeas from '../../portfolio/ideators/components/MlAppIdeatorRelatedIdeas';
import { GenericPortfolioActionsConfig } from '../config/mlPortfolioConfig';
import { fetchInteractionActionAttributesHandler } from '../actions/fetchActionAttributesActionHandler';
export default class MlAppPortfolioAccordionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { actions: [] };
    this.fetchActionAttributes.bind(this);
    return this;
  }

  compareQueryOptions(a, b) { return JSON.stringify(a) === JSON.stringify(b); }

  async fetchActionAttributes() {
    const that = this;
    const viewMode = this.props.viewMode === false ? 'edit' : 'view';
    // filter the actions based on action type:edit/view
    const actionOptions = _.filter(GenericPortfolioActionsConfig, { actionType: viewMode }) || [];
    const actions = _.map(actionOptions, 'actionName');
    const serverActionProps = await fetchInteractionActionAttributesHandler({ resourceId: this.props.resourceId, resourceType: 'portfolio', actionNames: actions });
    // attach the attributes to actions
    actionOptions.forEach((action) => {
      const actionProp = _.find(serverActionProps, { actionName: action.actionName }) || {};
      action.showAction = true;
      action.isDisabled = actionProp.isDisabled;
      action.isHidden = actionProp.isHidden || false;
      that.props.assignActionHandler(action);
    });
    return actionOptions;
  }

  async componentWillMount() {
    const actionOptions = await this.fetchActionAttributes();
    this.setState({ actions: actionOptions });
  }

  async componentWillUpdate(nextProps, nextState) {
    if (!this.compareQueryOptions(this.props.interactionAutoId, nextProps.interactionAutoId)) {
      const actionOptions = await this.fetchActionAttributes();
      this.setState({ actions: actionOptions });
    }
  }


  render() {
    const that = this;
    const viewMode = this.props.viewMode === false ? 'edit' : 'view';

    const path = FlowRouter._current.path;
    let isPortfolio = false;
    if (path.indexOf('/app/portfolio/') != -1) {
      isPortfolio = true
    }

    // resolve the actions for the portfolio
    /* var actionOptions= _.filter(GenericPortfolioActionsConfig,{actionType:viewMode})||[];
       actionOptions.forEach(function (action) {
                action.showAction=true;
                that.props.assignActionHandler(action);
       }); */
    const actionOptions = this.state.actions || [];

    // resolve the accordions for the portfolio
    const accordionOptions =
       {
         id: 'portfolioAccordion',
         panelItems: [{
           title: 'Actions', isText: false, style: { background: '#ef4647' }, contentComponent: <MlAppActionComponent resourceDetails={{ resourceId: this.props.resourceId, resourceType: 'portfolio' }} actionOptions={actionOptions}/>
         }]
       };
    // todo: dynamic check for accordion configuration
    if ((this.props.communityType === 'Ideators' || this.props.communityType === 'ideator') && !isPortfolio) {
      accordionOptions.panelItems.push({
        title: 'Related Ideas', isText: false, contentComponent: <MlIdeatorRelatedIdeas />, style: { background: '#ef4647' }
      });
    }

    return (
      <MlAccordion accordionOptions={accordionOptions} {...this.props} />
    )
  }
}
