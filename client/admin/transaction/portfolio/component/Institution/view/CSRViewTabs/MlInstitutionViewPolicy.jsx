import React from 'react';
import { render } from 'react-dom';
import { fetchInstitutionDetailsHandler } from '../../../../actions/findPortfolioInstitutionDetails';
import { initializeMlAnnotator } from '../../../../../../../commons/annotator/mlAnnotator'
import { findAnnotations } from '../../../../../../../commons/annotator/findAnnotations'
import { validateUserForAnnotation } from '../../../../actions/findPortfolioIdeatorDetails'
import NoData from '../../../../../../../commons/components/noData/noData';
import MlLoader from '../../../../../../../commons/components/loader/loader';
const KEY = 'policy'
export default class MlInstitutionViewPolicy extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
    this.fetchPortfolioDetails.bind(this);
    this.createAnnotations.bind(this);
    this.fetchAnnotations.bind(this);
    this.initalizeAnnotaor.bind(this);
    this.annotatorEvents.bind(this);
  }

  /* componentDidMount() {
    this.initalizeAnnotaor()
    this.fetchAnnotations();
  } */

  componentWillMount() {
    this.fetchPortfolioDetails();

    const resp = this.validateUserForAnnotation();
    return resp
  }


  async validateUserForAnnotation() {
    const portfolioId = this.props.portfolioDetailsId
    const response = await validateUserForAnnotation(portfolioId);
    if (response && !this.state.isUserValidForAnnotation) {
      this.setState({ isUserValidForAnnotation: response, loading: false })

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
    const details = { portfolioId: this.props.portfolioDetailsId, docId: 'institutionPolicy', quote: JSON.stringify(annotation) }
    const response = await createAnnotationActionHandler(details);
    if (response && response.success) {
      this.fetchAnnotations(true);
    }
    return response;
  }


  async fetchAnnotations(isCreate) {
    const response = await findAnnotations(this.props.portfolioDetailsId, 'institutionPolicy');
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
    if (response && response.policy) {
      let object = response.policy;
      object = _.omit(object, '__typename')
      // this.setState({data: object});
      this.setState({ loading: false, data: object });
    } else {
      this.setState({ loading: false })
    }
  }

  render() {
    return (
      <div className="col-lg-12 col-sm-12" >
        <div className="row" id="annotatorContent">
          <h2>Policy</h2>
          <div className="panel panel-default panel-form-view">

            <div className="panel-body">
              {showLoader === true ? (<MlLoader/>) : (<p>{this.state.data && this.state.data.institutionPolicyDescription ? this.state.data.institutionPolicyDescription : (<NoData tabName={this.props.tabName}/>)}</p>)}

            </div>
          </div>

        </div>
      </div>
    )
  }
}
