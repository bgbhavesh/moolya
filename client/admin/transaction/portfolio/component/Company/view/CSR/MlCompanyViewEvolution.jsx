import React from 'react';
const FontAwesome = require('react-fontawesome');
import { fetchCompanyDetailsHandler } from '../../../../actions/findCompanyPortfolioDetails';
import { initializeMlAnnotator } from '../../../../../../../commons/annotator/mlAnnotator'
import { createAnnotationActionHandler } from '../../../../actions/updatePortfolioDetails'
import { findAnnotations } from '../../../../../../../commons/annotator/findAnnotations'
import _ from 'lodash'
import NoData from '../../../../../../../commons/components/noData/noData';
import { initalizeFloatLabel } from '../../../../../../utils/formElemUtil';
import { validateUserForAnnotation } from '../../../../actions/findPortfolioIdeatorDetails';
import MlLoader from '../../../../../../../commons/components/loader/loader';

const KEY = 'evolution'

export default class MlCompanyViewEvolution extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      policy: {},
      data: {},
      annotations: [],
      content: {},
      loading: true
    }
    this.createAnnotations.bind(this);
    this.fetchAnnotations.bind(this);
    this.initalizeAnnotaor.bind(this);
    this.annotatorEvents.bind(this);
    this.validateUserForAnnotation(this)
  }

  componentDidMount() {
    const WinHeight = $(window).height();
    $('.main_wrap_scroll ').height(WinHeight - (68 + $('.admin_header').outerHeight(true)));
    initalizeFloatLabel();
  }

  componentWillMount() {
    this.fetchPortfolioDetails();
    const resp = this.validateUserForAnnotation();
    return resp
  }

  async fetchPortfolioDetails() {
    const that = this;
    let data = {};
    const portfoliodetailsId = that.props.portfolioDetailsId;
    const responseM = await fetchCompanyDetailsHandler(portfoliodetailsId, KEY);
    if (responseM) {
      this.setState({ evolution: responseM.evolution, loading: false });
    }

    data = {
      evolution: this.state.evolution
    }
    this.setState({ data })
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
    const details = { portfolioId: this.props.portfolioDetailsId, docId: 'evolution', quote: JSON.stringify(annotation) }
    const response = await createAnnotationActionHandler(details);
    if (response && response.success) {
      this.fetchAnnotations(true);
    }
    return response;
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

  async fetchAnnotations(isCreate) {
    const response = await findAnnotations(this.props.portfolioDetailsId, 'evolution');
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

  render() {
    const that = this;
    const achievements = that.state.evolution || {};
    const loading = this.state.loading

    return (
      <div className="portfolio-main-wrap" id="annotatorContent">
        <div className="col-lg-12 col-sm-12">
          <div className="row">
            <h2>Evolution</h2>
            <div className="panel panel-default panel-form-view">
              <div className="panel-body">
                {loading === true ? (<MlLoader/>) : (<p>{this.state.evolution && this.state.evolution.evolutionDescription ? this.state.evolution.evolutionDescription : (<div className="portfolio-main-wrap">
                  <NoData tabName={this.props.tabName}/>
                </div>)}</p>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
