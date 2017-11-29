/**
 * Created by Rajat on 21/8/17.
 */
import React from 'react';
import { initializeMlAnnotator } from '../../../../../../../commons/annotator/mlAnnotator'
import { initalizeFloatLabel } from '../../../../../../utils/formElemUtil';
import { createAnnotationActionHandler } from '../../../../actions/updatePortfolioDetails'
import { findAnnotations } from '../../../../../../../commons/annotator/findAnnotations'
import { validateUserForAnnotation } from '../../../../actions/findPortfolioIdeatorDetails'
import NoData from '../../../../../../../commons/components/noData/noData';

export default class MlCompanyViewInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {}
    }
    this.createAnnotations.bind(this);
    this.fetchAnnotations.bind(this);
    this.initalizeAnnotaor.bind(this);
    this.annotatorEvents.bind(this);
    this.validateUserForAnnotation(this)
  }
  componentDidMount() {
    // this.initalizeAnnotaor()
    // this.fetchAnnotations();
    $('.actions_switch').click();
    $('.appCommentBox').addClass('in');
    initalizeFloatLabel();
  }
  componentWillMount() {
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
    const details = { portfolioId: this.props.portfolioDetailsId, docId: 'companyInformation', quote: JSON.stringify(annotation) }
    const response = await createAnnotationActionHandler(details);
    if (response && response.success) {
      this.fetchAnnotations(true);
    }
    return response;
  }


  async fetchAnnotations(isCreate) {
    const response = await findAnnotations(this.props.portfolioDetailsId, 'companyInformation');
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
    console.log(this.props)
    return (
      <div className="col-lg-12 col-sm-12" id="annotatorContent">
        <div className="row">
          <h2>Information</h2>
          <div className="panel panel-default panel-form-view">
            <div className="panel-body">
              <p>{this.props.informationDetails && this.props.informationDetails.informationDescription ? this.props.informationDetails.informationDescription : (<NoData tabName={this.props.tabName}/>)}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
