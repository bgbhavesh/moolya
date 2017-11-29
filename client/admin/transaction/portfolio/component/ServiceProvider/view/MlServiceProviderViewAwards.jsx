import React from 'react';
import { render } from 'react-dom';
import { fetchServiceProviderPortfolioAwards } from '../../../actions/findPortfolioServiceProviderDetails';
import { initializeMlAnnotator } from '../../../../../../commons/annotator/mlAnnotator';
import { createAnnotationActionHandler } from '../../../actions/updatePortfolioDetails';
import { findAnnotations } from '../../../../../../commons/annotator/findAnnotations';
import { validateUserForAnnotation } from '../../../actions/findPortfolioIdeatorDetails';
import NoData from '../../../../../../commons/components/noData/noData'
import MlLoader from '../../../../../../commons/components/loader/loader';
const FontAwesome = require('react-fontawesome');
import generateAbsolutePath from '../../../../../../../lib/mlGenerateAbsolutePath';


export default class MlServiceProviderViewAwards extends React.Component {
  constructor(props) {
    super(props);
    this.state = { serviceProviderAwardsList: [], loading: true };
    this.fetchPortfolioStartupDetails.bind(this);
    this.createAnnotations.bind(this);
    this.fetchAnnotations.bind(this);
    this.initalizeAnnotaor.bind(this);
    this.annotatorEvents.bind(this);
    this.validateUserForAnnotation(this)
  }


  componentDidMount() {
    this.fetchPortfolioStartupDetails();
    this.validateUserForAnnotation();
  }

  componentWillMount() {

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
    const details = {
      portfolioId: this.props.portfolioDetailsId,
      docId: 'serviceProviderAwards',
      quote: JSON.stringify(annotation)
    }
    const response = await createAnnotationActionHandler(details);
    if (response && response.success) {
      this.fetchAnnotations(true);
    }
    return response;
  }


  async fetchAnnotations(isCreate) {
    const response = await findAnnotations(this.props.portfolioDetailsId, 'serviceProviderAwards');
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
    if (quotes && quotes.length > 0) {
      this.state.content.annotator('loadAnnotations', quotes);
      return response
    }
    return response


    return response;
  }

  async fetchPortfolioStartupDetails() {
    const that = this;
    const portfoliodetailsId = that.props.portfolioDetailsId;
    const response = await fetchServiceProviderPortfolioAwards(portfoliodetailsId);
    if (response) {
      this.setState({ loading: false, serviceProviderAwardsList: response });
    } else { this.setState({ loading: false }) }
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

  render() {
    const that = this;
    const awardsArray = that.state.serviceProviderAwardsList || [];
    const showLoader = this.state.loading;
    return (
      <div>
        {showLoader === true ? (<MlLoader/>) : (
          <div>
            {_.isEmpty(awardsArray) ? (
              <div className="portfolio-main-wrap">
                <NoData tabName={this.props.tabName}/>
              </div>) : (
              <div id="annotatorContent">
                <h2>Awards</h2>
                <div className="col-lg-12">
                  <div className="row">
                    {awardsArray && awardsArray.map((details, idx) => (<div className="col-lg-2 col-md-3 col-sm-4" key={idx}>
                      <div className="team-block">
                        <img
                          src={details.logo ? generateAbsolutePath(details.logo.fileUrl) : '/images/def_profile.png'}
                          className="team_img"/>
                        <h3>
                          {details.awardName && details.awardName}
                        </h3>
                      </div>
                    </div>))}
                  </div>
                </div>
              </div>
            )
            }
          </div>
        )
        }
      </div>
    )
  }
}
