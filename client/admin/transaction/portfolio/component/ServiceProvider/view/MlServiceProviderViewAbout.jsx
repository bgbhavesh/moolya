/**
 * Created by vishwadeep on 11/7/17.
 */

import React from 'react';
import { render } from 'react-dom';
const FontAwesome = require('react-fontawesome');
import { fetchServiceProviderPortfolioAbout } from '../../../actions/findPortfolioServiceProviderDetails';
import { dataVisibilityHandler, OnLockSwitch } from '../../../../../utils/formElemUtil';
import { createAnnotationActionHandler } from '../../../actions/updatePortfolioDetails';
import { findAnnotations } from '../../../../../../commons/annotator/findAnnotations';
import { initializeMlAnnotator } from '../../../../../../commons/annotator/mlAnnotator';
import { validateUserForAnnotation } from '../../../actions/findPortfolioIdeatorDetails'
import NoData from '../../../../../../commons/components/noData/noData';
import MlLoader from '../../../../../../commons/components/loader/loader';
import generateAbsolutePath from '../../../../../../../lib/mlGenerateAbsolutePath';

export default class MlServiceProviderViewAbout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: {},
      privateKey: {}
    }
    this.createAnnotations.bind(this);
    this.fetchAnnotations.bind(this);
    this.initalizeAnnotaor.bind(this);
    this.annotatorEvents.bind(this);
    this.fetchPortfolioDetails.bind(this);
    this.validateUserForAnnotation.bind(this)
  }

  componentWillMount() {

  }

  componentDidMount() {
    // OnLockSwitch();
    // dataVisibilityHandler();
    /** fetch the component data */
    // this.initalizeAnnotaor()
    const WinHeight = $(window).height();
    $('.main_wrap_scroll ').height(WinHeight - (68 + $('.admin_header').outerHeight(true)));
    this.validateUserForAnnotation();
    this.fetchPortfolioDetails();
  }

  componentDidUpdate() {
    // OnLockSwitch();
    // dataVisibilityHandler();
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
    const details = { portfolioId: this.props.portfolioDetailsId, docId: 'serviceproviderAbout', quote: JSON.stringify(annotation) }
    const response = await createAnnotationActionHandler(details);
    if (response && response.success) {
      this.fetchAnnotations(true);
    }
    return response;
  }


  async fetchAnnotations(isCreate) {
    const response = await findAnnotations(this.props.portfolioDetailsId, 'serviceproviderAbout');
    if (response) {
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
    }
  }

  async fetchPortfolioDetails() {
    const that = this;
    const portfolioDetailsId = that.props.portfolioDetailsId;
    const response = await fetchServiceProviderPortfolioAbout(portfolioDetailsId);
    if (response) {
      this.setState({ loading: false, data: response });
      this.fetchAnnotations();
    }
    /** condition if private fields are not there */
    const fields = response ? response.privateFields : []
    _.each(fields, (pf) => {
      $(`#${pf.booleanKey}`).removeClass('un_lock fa-unlock').addClass('fa-lock')
    })
  }


  async validateUserForAnnotation() {
    const portfolioId = this.props.portfolioDetailsId
    const response = await validateUserForAnnotation(portfolioId);
    if (response && !this.state.isUserValidForAnnotation) {
      this.setState({ isUserValidForAnnotation: response })
      this.initalizeAnnotaor()
      this.fetchAnnotations()
    }
  }

  render() {
    const description = this.state.data.aboutDescription ? this.state.data.aboutDescription : ''
    const title = this.state.data.aboutTitle ? this.state.data.aboutTitle : ''
    const image = this.state.data.aboutImages && this.state.data.aboutImages[0] && this.state.data.aboutImages[0].fileUrl ? this.state.data.aboutImages[0].fileUrl : ''
    // let isServicesPrivate = this.state.data.isServicesPrivate ? this.state.data.isServicesPrivate : false
    const showLoader = this.state.loading;
    return (
      <div>
        {showLoader === true ? (<MlLoader/>) : (
          <div className="requested_input">
            {image || title || description ? (
              <div className="col-lg-12">
                <div className="row">
                  <div className="sp_about hide_unlock" id="annotatorContent">
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        {title} <FontAwesome name='unlock' className="input_icon req_input_icon un_lock" id="isAboutTitlePrivate"/>
                      </div>
                      <div className="panel-body">
                        <FontAwesome
                          name='unlock' className="input_icon view_req_textarea_icon un_lock"
                          id="isDescriptionPrivate"/>{description}
                        <div className="media">
                          <div className="upload-image">
                            <a href="">
                              <img className="media-object" src={generateAbsolutePath(image)}/>
                            </a>
                          </div>

                        </div>
                      </div>
                    </div>


                  </div>
                </div>
              </div>
            ) : (<NoData tabName={this.props.tabName}/>)}
          </div>
        )}
      </div>
    )
  }
}
