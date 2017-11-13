import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
import 'react-responsive-tabs/styles.css'
var Select = require('react-select');
import {findIdeatorProblemsAndSolutionsActionHandler} from '../../actions/findPortfolioIdeatorDetails'
import {dataVisibilityHandler, OnLockSwitch,initalizeFloatLabel} from '../../../../utils/formElemUtil';
import {initializeMlAnnotator} from '../../../../../commons/annotator/mlAnnotator'
import {createAnnotationActionHandler} from '../../actions/updatePortfolioDetails'
import {findAnnotations} from '../../../../../commons/annotator/findAnnotations'
import _ from 'lodash'
import {validateUserForAnnotation} from '../../actions/findPortfolioIdeatorDetails';
import NoData from '../../../../../commons/components/noData/noData';
import MlLoader from "../../../../../commons/components/loader/loader";
import generateAbsolutePath from '../../../../../../lib/mlGenerateAbsolutePath';

export default class MlPortfolioIdeatorProblemsAndSolutionsView extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      portfolioIdeatorInfo: {
        problemImage: [],
        solutionImage: []
      },
      annotations: [],
      content: {},
      loading: true
    }

    this.createAnnotations.bind(this);
    this.fetchPortfolioInfo.bind(this);
    //this.fetchAnnotations.bind(this);
    this.initalizeAnnotaor.bind(this);
    this.annotatorEvents.bind(this);
    this.validateUserForAnnotation(this)
  }

  initalizeAnnotaor() {
    initializeMlAnnotator(this.annotatorEvents.bind(this))
    this.state.content = jQuery("#psContent").annotator();
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
    let details = {portfolioId: this.props.portfolioDetailsId, docId: "problems", quote: JSON.stringify(annotation)}
    const response = await createAnnotationActionHandler(details);
    if (response && response.success) {
      this.fetchAnnotations(true);
    }
    return response;
  }


  async fetchAnnotations(isCreate) {
    const response = await findAnnotations(this.props.portfolioDetailsId, "problems");
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

  componentWillMount() {
    let resp = this.validateUserForAnnotation();
    return resp
  }

  componentDidMount() {
    $('.actions_switch').click();
// don't use it anywhere
    var WinWidth = $(window).width();
    var WinHeight = $(window).height();

    $('.tab_wrap_scroll').height(WinHeight - ($('.app_header').outerHeight(true) + 200));
    if (WinWidth > 768) {
      $(".tab_wrap_scroll").mCustomScrollbar({theme: "minimal-dark"});
    }

    this.fetchPortfolioInfo();

    //this.fetchAnnotations();
    initalizeFloatLabel();
  }

  async validateUserForAnnotation() {
    const portfolioId = this.props.portfolioDetailsId
    const response = await validateUserForAnnotation(portfolioId);
    if (response && !this.state.isUserValidForAnnotation) {
      this.setState({isUserValidForAnnotation: response})
      this.initalizeAnnotaor()
      this.fetchAnnotations()
    }
  }

  async fetchPortfolioInfo() {
    const response = await findIdeatorProblemsAndSolutionsActionHandler(this.props.portfolioDetailsId);
    response.problemImage ? response.problemImage : response.problemImage = [];
    response.solutionImage ? response.solutionImage : response.solutionImage = [];
    this.setState({portfolioIdeatorInfo: response, loading: false});
    _.each(response.privateFields, function (pf) {
      $("#" + pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
    })
  }

  render() {
    let loading = this.state.loading ? this.state.loading : false;
    return (
      <div>

        <div className="requested_input" id="psContent">

          <h2>Problems and Solutions </h2>
          <div className="tab_wrap_scroll hide_unlock">
            <div className="col-lg-6 col-md-6 col-sm-12 library-wrap nopadding-left">
              <div className="panel panel-default">
                <div className="panel-heading">
                  Problems
                  <FontAwesome name='unlock' className="input_icon req_header_icon un_lock" id="isProblemPrivate"/>
                </div>
                <div className="panel-body">
                  {loading === true ? ( <MlLoader/>) : (
                    <div>{this.state.portfolioIdeatorInfo.problemStatement || this.state.portfolioIdeatorInfo.problemImage.length ? (
                      <p>
                        {this.state.portfolioIdeatorInfo.problemStatement}
                        <br className="brclear"/>
                        {this.state.portfolioIdeatorInfo.problemImage.map(function (imgLink, i) {
                          return <img className="upload-image img upload" src={generateAbsolutePath(imgLink.fileUrl)}
                                      key={i}/>
                        })}
                      </p>
                    ) : (<NoData tabName={this.props.tabName}/>)}</div>)}

                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 library-wrap nopadding-left">
              <div className="panel panel-default">
                <div className="panel-heading">
                  Solutions
                  <FontAwesome name='unlock' className="input_icon req_header_icon un_lock" id="isSolutionPrivate"/>
                </div>
                <div className="panel-body">
                  {loading === true ? ( <MlLoader/>) : (
                    <div>{this.state.portfolioIdeatorInfo.solutionStatement || this.state.portfolioIdeatorInfo.solutionImage.length ? (
                      <p>
                        {this.state.portfolioIdeatorInfo.solutionStatement}
                        <br className="brclear"/>
                        {this.state.portfolioIdeatorInfo.solutionImage.map(function (imgLink, i) {
                          return <img className="upload-image img upload" src={generateAbsolutePath(imgLink.fileUrl)}
                                      key={i}/>
                        })}
                      </p>) : (<NoData tabName={this.props.tabName}/>)}</div>)}
                </div>
              </div>
            </div>


          </div>
          {/*<a href="" id="annotationss">one</a>*/}
        </div>

      </div>
    )
  }
}
