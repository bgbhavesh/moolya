import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar'
const FontAwesome = require('react-fontawesome');
import { dataVisibilityHandler, OnLockSwitch } from '../../../../../../utils/formElemUtil';
import MlLoader from '../../../../../../../commons/components/loader/loader';
import { fetchInstitutionDetailsHandler } from '../../../../actions/findPortfolioInstitutionDetails';
import { initializeMlAnnotator } from '../../../../../../../commons/annotator/mlAnnotator'
import { initalizeFloatLabel } from '../../../../../../utils/formElemUtil';
import { createAnnotationActionHandler } from '../../../../actions/updatePortfolioDetails'
import { findAnnotations } from '../../../../../../../commons/annotator/findAnnotations'
import { validateUserForAnnotation } from '../../../../actions/findPortfolioIdeatorDetails'
import NoData from '../../../../../../../commons/components/noData/noData';
const KEY = 'institutionIncubators'

export default class MlInstitutionStartupIncubators extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      institutionIncubators: {},
      content: {},
      loading: true
    }
    this.fetchPortfolioDetails.bind(this);
    this.createAnnotations.bind(this);
    this.fetchAnnotations.bind(this);
    this.initalizeAnnotaor.bind(this);
    this.annotatorEvents.bind(this);
    this.validateUserForAnnotation(this)
  }

  componentWillMount() {
    this.fetchPortfolioDetails();
    const resp = this.validateUserForAnnotation();
    return resp
  }
  async validateUserForAnnotation() {
    const portfolioId = this.props.portfolioDetailsId
    const response = await validateUserForAnnotation(portfolioId);
    if (response && !this.state.isUserValidForAnnotation) {
      this.setState({ isUserValidForAnnotation: response })

      this.initalizeAnnotaor()

      this.fetchAnnotations();
    }
  }
  initalizeAnnotaor() {
    initializeMlAnnotator(this.annotatorEvents.bind(this))
    this.state.content = jQuery('#annotatorContent').annotator();
    this.state.content.annotator('addPlugin', 'MyPlugin', {
      pluginInit() {
      }
    });
  }

  annotatorEvents(event, annotation, editor) {
    if (!annotation) { return; }
    switch (event) {
      case 'create': {
        const response = this.createAnnotations(annotation);
      }
        break;
      case 'update': {
      }
        break;
      case 'annotationViewer': {
        if (annotation[0].id) {
          this.props.getSelectedAnnotations(annotation[0]);
        } else {
          this.props.getSelectedAnnotations(annotation[1]);
        }
      }
        break;
    }
  }

  async createAnnotations(annotation) {
    const details = { portfolioId: this.props.portfolioDetailsId, docId: 'institutionStartupIncubators', quote: JSON.stringify(annotation) }
    const response = await createAnnotationActionHandler(details);
    if (response && response.success) {
      this.fetchAnnotations(true);
    }
    return response;
  }


  async fetchAnnotations(isCreate) {
    const response = await findAnnotations(this.props.portfolioDetailsId, 'institutionStartupIncubators');
    const resp = JSON.parse(response.result);
    const annotations = this.state.annotations;
    this.setState({ annotations: JSON.parse(response.result) })

    const quotes = [];

    _.each(this.state.annotations, (value) => {
      quotes.push({
        id: value.annotatorId,
        text: value.quote.text,
        quote: value.quote.quote,
        ranges: value.quote.ranges,
        userName: value.userName,
        roleName: value.roleName,
        profileImage: value.profileImage,
        createdAt: value.createdAt
      })
    })
    this.state.content.annotator('loadAnnotations', quotes);

    return response;
  }

  async fetchPortfolioDetails() {
    const that = this;
    const portfolioDetailsId = that.props.portfolioDetailsId;

    const response = await fetchInstitutionDetailsHandler(portfolioDetailsId, KEY);
    if (response && response.institutionIncubators) {
      const object = response.institutionIncubators;
      this.setState({ loading: false, institutionIncubators: object });
    } else {
      this.setState({ loading: false })
    }
  }

  render() {
    const showLoader = this.state.loading;
    return (

      <div className="col-lg-12 col-sm-12">
        <div className="row">
          <h2>Startup Incubators</h2>
          <div className="panel panel-default panel-form-view" id="annotatorContent">
            <div className="panel-body">
              {showLoader === true ? (<MlLoader/>) : (<p>{this.state.institutionIncubators && this.state.institutionIncubators.institutionIncubatorsDescription ? this.state.institutionIncubators.institutionIncubatorsDescription
                : <div className="portfolio-main-wrap">
                  <NoData tabName={this.props.tabName}/>
                </div>
              }</p>)}
            </div>
          </div>
        </div>
      </div>

    )
  }
}
