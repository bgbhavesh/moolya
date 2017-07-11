/**
 * Created by vishwadeep on 11/7/17.
 */

import React from "react";
import {render} from "react-dom";
var FontAwesome = require('react-fontawesome');
import {fetchServiceProviderPortfolioAbout} from "../../../actions/findPortfolioServiceProviderDetails";
import {dataVisibilityHandler, OnLockSwitch} from "../../../../../utils/formElemUtil";
import {createAnnotationActionHandler} from "../../../actions/updatePortfolioDetails";
import {findAnnotations} from "../../../../../../commons/annotator/findAnnotations";
import {initializeMlAnnotator} from "../../../../../../commons/annotator/mlAnnotator";

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
  }

  componentWillMount() {
    const resp = this.fetchPortfolioDetails();
    return resp
  }

  componentDidMount() {
    OnLockSwitch();
    dataVisibilityHandler();
    /**fetch the component data*/
    this.initalizeAnnotaor()
    var WinHeight = $(window).height();
    $('.main_wrap_scroll ').height(WinHeight - (68 + $('.admin_header').outerHeight(true)));
  }

  componentDidUpdate() {
    OnLockSwitch();
    dataVisibilityHandler();
  }





  initalizeAnnotaor() {
    initializeMlAnnotator(this.annotatorEvents.bind(this))
    this.state.content = jQuery("#annotatorContent").annotator();
    this.state.content.annotator('addPlugin', 'MyPlugin', {
      pluginInit: function () {
      }
    });
  }

  annotatorEvents(event, annotation, editor) {
    if (!annotation)
      return;
    switch (event) {
      case 'create': {
        let response = this.createAnnotations(annotation);
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
    let details = {portfolioId: this.props.portfolioDetailsId, docId: "serviceproviderAbout", quote: JSON.stringify(annotation)}
    const response = await createAnnotationActionHandler(details);
    if (response && response.success) {
      this.fetchAnnotations(true);
    }
    return response;
  }


  async fetchAnnotations(isCreate) {
    const response = await findAnnotations(this.props.portfolioDetailsId, "serviceproviderAbout");
    let resp = JSON.parse(response.result);
    let annotations = this.state.annotations;
    this.setState({annotations: JSON.parse(response.result)})

    let quotes = [];

    _.each(this.state.annotations, function (value) {
      quotes.push({
        "id": value.annotatorId,
        "text": value.quote.text,
        "quote": value.quote.quote,
        "ranges": value.quote.ranges,
        "userName": value.userName,
        "roleName": value.roleName,
        "profileImage": value.profileImage,
        "createdAt": value.createdAt
      })
    })
    this.state.content.annotator('loadAnnotations', quotes);
  }

  async fetchPortfolioDetails() {
    let that = this;
    let portfolioDetailsId = that.props.portfolioDetailsId;
    const response = await fetchServiceProviderPortfolioAbout(portfolioDetailsId);
    if (response) {
      this.setState({loading: false, data: response});
      this.fetchAnnotations();
    }
    _.each(response.privateFields, function (pf) {
      $("#" + pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
    })
  }

  render() {
    let description = this.state.data.aboutDescription ? this.state.data.aboutDescription : ''
    let title = this.state.data.aboutTitle ? this.state.data.aboutTitle : ''
    let image = this.state.data.aboutImages&&this.state.data.aboutImages[0]&&this.state.data.aboutImages[0].fileUrl ? this.state.data.aboutImages[0].fileUrl : ''
    //let isServicesPrivate = this.state.data.isServicesPrivate ? this.state.data.isServicesPrivate : false
    const showLoader = this.state.loading;
    return (
      <div className="sp_about" id="annotatorContent">

        <div className="media">
          <div className="media-left">
            <a href="#">
              <img className="media-object" src={image}/>
            </a>
          </div>
          <div className="media-body">
            <h4 className="media-heading">{title}</h4>
            {/*<p>Founder,25yr.Experience</p>*/}
          </div>
        </div>
        <p>{description}</p>

      </div>
    )
  }
};
