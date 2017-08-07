import React, {Component} from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
import {
  fetchServiceProviderMemberships,
  fetchServiceProviderCompliances,
  fetchServiceProviderLicenses
} from "../../../actions/findPortfolioServiceProviderDetails";
import {initializeMlAnnotator} from "../../../../../../commons/annotator/mlAnnotator";
import {createAnnotationActionHandler} from "../../../actions/updatePortfolioDetails";
import {findAnnotations} from "../../../../../../commons/annotator/findAnnotations";
import _ from "lodash";
var FontAwesome = require('react-fontawesome');


export default class MlServiceProviderViewMCL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberships: {},
      compliances: {},
      licenses: {},
      data: {},
      annotations: [],
      content: {}
    }
    this.createAnnotations.bind(this);
    this.fetchAnnotations.bind(this);
    this.initalizeAnnotaor.bind(this);
    this.annotatorEvents.bind(this);
  }

  componentDidMount() {
    this.initalizeAnnotaor()
    var WinHeight = $(window).height();
    $('.main_wrap_scroll ').height(WinHeight - (68 + $('.admin_header').outerHeight(true)));

  }

  componentWillMount() {
    this.fetchPortfolioStartupDetails();
  }

  async fetchPortfolioStartupDetails() {
    let that = this;
    let data = {};
    let portfoliodetailsId = that.props.portfolioDetailsId;
    const responseM = await fetchServiceProviderMemberships(portfoliodetailsId);
    if (responseM) {
      this.setState({memberships: responseM});
    }
    const responseC = await fetchServiceProviderCompliances(portfoliodetailsId);
    if (responseC) {
      this.setState({compliances: responseC});
    }
    const responseL = await fetchServiceProviderLicenses(portfoliodetailsId);
    if (responseL) {
      this.setState({licenses: responseL});
    }

    data = {
      memberships: this.state.memberships,
      licenses: this.state.licenses,
      compliances: this.state.compliances
    }
    this.setState({data: data},function () {
      this.fetchAnnotations();
    })

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
    let details = {portfolioId: this.props.portfolioDetailsId, docId: "serviceproviderMCL", quote: JSON.stringify(annotation)}
    const response = await createAnnotationActionHandler(details);
    if (response && response.success) {
      this.fetchAnnotations(true);
    }
    return response;
  }


  async fetchAnnotations(isCreate) {
    const response = await findAnnotations(this.props.portfolioDetailsId, "serviceproviderMCL");
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

    return response;
  }

  render() {

    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap portfolio-main-wrap" id="annotatorContent">
          <h2>MCL</h2>
          <div className="main_wrap_scroll" id="annotatorContent">
            <ScrollArea
              speed={0.8}
              className="main_wrap_scroll"
              smoothScrolling={true}
              default={true}
            >
              <div className="col-md-6 col-sm-6 nopadding-left">
                <div className="panel panel-default panel-form-view">
                  <div className="panel-heading">Memberships</div>
                  <div className="panel-body ">

                    {this.state.memberships && this.state.memberships.membershipDescription ? this.state.memberships.membershipDescription : ""}

                  </div>
                </div>
                <div className="clearfix"></div>
              </div>
              <div className="col-md-6 col-sm-6 nopadding-right">
                <div className="panel panel-default panel-form-view">
                  <div className="panel-heading">Compliances</div>
                  <div className="panel-body ">

                    {this.state.compliances && this.state.compliances.compliancesDescription ? this.state.compliances.compliancesDescription : ""}

                  </div>
                </div>
                <div className="clearfix"></div>
                <div className="panel panel-default panel-form-view">
                  <div className="panel-heading">Licenses</div>
                  <div className="panel-body ">

                    {this.state.licenses && this.state.licenses.licensesDescription ? this.state.licenses.licensesDescription : ""}

                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    )
  }
}
