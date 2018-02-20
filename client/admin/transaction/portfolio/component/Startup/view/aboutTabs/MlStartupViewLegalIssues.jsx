import React from 'react';
import NoData from '../../../../../../../commons/components/noData/noData';
import {initializeMlAnnotator} from '../../../../../../../commons/annotator/mlAnnotator'
import {createAnnotationActionHandler} from '../../../../actions/updatePortfolioDetails'
import {findAnnotations} from '../../../../../../../commons/annotator/findAnnotations';
import MlTextEditor, {createValueFromString} from "../../../../../../../commons/components/textEditor/MlTextEditor";
import {validateUserForAnnotation} from '../../../../actions/findPortfolioIdeatorDetails';
import { initalizeLockTitle } from '../../../../../../../commons/utils/formElemUtil.js';
const FontAwesome = require('react-fontawesome');

export default class MlStartupViewLegalIssues extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorValue: createValueFromString(this.props.legalIssueDetails ? this.props.legalIssueDetails.legalDescription : null)
    }
    this.createAnnotations.bind(this);
    this.fetchAnnotations.bind(this);
    this.initalizeAnnotaor.bind(this);
    this.annotatorEvents.bind(this);
  }

  componentDidMount() {
    let resp = this.validateUserForAnnotation();
    return resp
  }

  componentWillMount() {
    const { privateFields } = this.props.legalIssueDetails;
    this.setState({ loading: false }, () => {
      _.each(privateFields, function (pf) {
        $("#" + pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock');
      })
      initalizeLockTitle();
    });
  }

  async validateUserForAnnotation() {
    const portfolioId = this.props.portfolioDetailsId
    const response = await validateUserForAnnotation(portfolioId);
    if (response && !this.state.isUserValidForAnnotation) {
      this.setState({isUserValidForAnnotation: true})
      this.initalizeAnnotaor()
      this.fetchAnnotations()
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
    let details = {portfolioId:this.props.portfolioDetailsId, docId:"startupLegalIssues", quote:JSON.stringify(annotation)}
    const response = await createAnnotationActionHandler(details);
    if(response && response.success){
      this.fetchAnnotations(true);
    }
    return response;
  }

  async fetchAnnotations(isCreate){
    const response = await findAnnotations(this.props.portfolioDetailsId, "startupLegalIssues");
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


  render() {
    const showLoader = this.state.loading;
    const { editorValue } = this.state;
    return (
      <div> 
        {showLoader === true ? ( <MlLoader/>) : (
      <div className="col-lg-12 col-sm-12">
        <div className="row">
          <h2>Legal Issue</h2>
          <div className="panel panel-default panel-form-view hide_unlock">
            <div className="panel-body">
                  <div id="annotatorContent">{this.props.legalIssueDetails && this.props.legalIssueDetails.legalDescription ?
                    <MlTextEditor
                      value={editorValue}
                      isReadOnly={true}
                    /> : (<NoData tabName={this.props.tabName} />)}</div>
                    <FontAwesome name='unlock' className="input_icon req_header_icon un_lock" id="isDescriptionPrivate" />
            </div>
          </div>
        </div>
      </div>)}
      </div>
    )
  }
};
