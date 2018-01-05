import React, { Component, PropTypes }  from "react";
import { render } from 'react-dom';
import {fetchCompanyDetailsHandler} from "../../../../actions/findCompanyPortfolioDetails";
import {initalizeFloatLabel} from "../../../../../../utils/formElemUtil";
import {validateUserForAnnotation} from '../../../../actions/findPortfolioIdeatorDetails'
import {initializeMlAnnotator} from '../../../../../../../commons/annotator/mlAnnotator'
import {createAnnotationActionHandler} from '../../../../actions/updatePortfolioDetails'
import {findAnnotations} from '../../../../../../../commons/annotator/findAnnotations'
import NoData from '../../../../../../../commons/components/noData/noData';
import MlLoader from "../../../../../../../commons/components/loader/loader";
import MlTextEditor, {createValueFromString} from "../../../../../../../commons/components/textEditor/MlTextEditor";
const KEY = "startupIncubators"

export default class MlCompanyViewStartupIncubators extends React.Component{
  constructor(props, context){
    super(props);
    this.state={
      startupIncubators:{},
      content:{},
      loading: true
    }
    this.fetchPortfolioDetails.bind(this);
    this.createAnnotations.bind(this);
    this.fetchAnnotations.bind(this);
    this.initalizeAnnotaor.bind(this);
    this.annotatorEvents.bind(this);
    this.validateUserForAnnotation(this)
  }

  componentWillMount(){
    this.fetchPortfolioDetails();
    let resp = this.validateUserForAnnotation();
    return resp
  }

  componentDidMount(){
    var WinHeight = $(window).height();
    $('.main_wrap_scroll ').height(WinHeight-(68+$('.admin_header').outerHeight(true)));
    initalizeFloatLabel();
  }

  async fetchPortfolioDetails() {
    let that = this;
    let portfolioDetailsId=that.props.portfolioDetailsId;

    const response = await fetchCompanyDetailsHandler(portfolioDetailsId, KEY);
    if (response && response.startupIncubators) {
      const editorValue = createValueFromString(response.startupIncubators.startupIncubatorsDescription);
      var object = response.startupIncubators;
      this.setState({loading: false,startupIncubators: object,editorValue: editorValue});
    }else{
      this.setState({loading:false})
    }
  }
  initalizeAnnotaor(){
    initializeMlAnnotator(this.annotatorEvents.bind(this))
    this.state.content = jQuery("#annotatorContent").annotator();
    this.state.content.annotator('addPlugin', 'MyPlugin', {
      pluginInit:  function () {
      }
    });
  }

  annotatorEvents(event, annotation, editor){
    if(!annotation)
      return;
    switch (event){
      case 'create':{
        let response = this.createAnnotations(annotation);
      }
        break;
      case 'update':{
      }
        break;
      case 'annotationViewer':{
        if(annotation[0].id){
          this.props.getSelectedAnnotations(annotation[0]);
        }else{
          this.props.getSelectedAnnotations(annotation[1]);
        }

      }
        break;
    }
  }

  async createAnnotations(annotation){
    let details = {portfolioId:this.props.portfolioDetailsId, docId:"companyStartupIncubators", quote:JSON.stringify(annotation)}
    const response = await createAnnotationActionHandler(details);
    if(response && response.success){
      this.fetchAnnotations(true);
    }
    return response;
  }

  async validateUserForAnnotation() {
    const portfolioId = this.props.portfolioDetailsId
    const response = await validateUserForAnnotation(portfolioId);
    if (response && !this.state.isUserValidForAnnotation) {
      this.setState({isUserValidForAnnotation:response})

      this.initalizeAnnotaor()

      this.fetchAnnotations();
    }
  }

  async fetchAnnotations(isCreate){
    const response = await findAnnotations(this.props.portfolioDetailsId, "companyStartupIncubators");
    let resp = JSON.parse(response.result);
    let annotations = this.state.annotations;
    this.setState({annotations:JSON.parse(response.result)})

    let quotes = [];

    _.each(this.state.annotations, function (value) {
      quotes.push({
        "id":value.annotatorId,
        "text" : value.quote.text,
        "quote" : value.quote.quote,
        "ranges" : value.quote.ranges,
        "userName" : value.userName,
        "roleName" : value.roleName,
        "profileImage" : value.profileImage,
        "createdAt" : value.createdAt
      })
    })
    this.state.content.annotator('loadAnnotations', quotes);

    return response;
  }

  render(){
    const showLoader = this.state.loading;
    const { editorValue } = this.state;
    return (

      <div className="col-lg-12 col-sm-12" id="annotatorContent">
        <div className="row">
          <h2>Startup Incubators</h2>
          <div className="panel panel-default panel-form-view">
            <div className="panel-body">
            {showLoader === true ? (<MlLoader />) : (<div>{this.state.startupIncubators && this.state.startupIncubators.startupIncubatorsDescription ?
                        <MlTextEditor
                          value={editorValue}
                          isReadOnly={true}
                        /> : (<NoData tabName={this.props.tabName} />)}</div>)}

{/* 
                {showLoader === true ? ( <MlLoader/>) : (<p>{this.state.startupIncubators && this.state.startupIncubators.startupIncubatorsDescription ? this.state.startupIncubators.startupIncubatorsDescription :  (<div className="portfolio-main-wrap">
                  <NoData tabName={this.props.tabName}/>
                </div>)}</p>)} */}

            </div>
          </div>
        </div>
      </div>

    )
  }
}
