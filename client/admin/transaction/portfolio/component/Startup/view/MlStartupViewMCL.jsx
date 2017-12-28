import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
import _ from 'lodash';
var FontAwesome = require('react-fontawesome');
import {fetchStartupDetailsHandler} from '../../../actions/findPortfolioStartupDetails'
import {initializeMlAnnotator} from '../../../../../../commons/annotator/mlAnnotator'
import {createAnnotationActionHandler} from '../../../actions/updatePortfolioDetails'
import {findAnnotations} from '../../../../../../commons/annotator/findAnnotations';
import NoData from '../../../../../../commons/components/noData/noData';
import MlLoader from "../../../../../../commons/components/loader/loader";
import MlTextEditor, {createValueFromString} from "../../../../../../commons/components/textEditor/MlTextEditor";

const MEMBERKEY = 'memberships'
const LICENSEKEY = 'licenses'
const COMPLIANCEKEY = 'compliances'

export default class MlStartupViewMCL extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      memberships:{},
      compliances:{},
      licenses:{},
      data:{},
      annotations:[],
      content:{},
      loading: true
    }
    this.createAnnotations.bind(this);
    this.fetchAnnotations.bind(this);
    this.initalizeAnnotaor.bind(this);
    this.annotatorEvents.bind(this);
  }

  componentDidMount(){
    this.initalizeAnnotaor()
    this.fetchAnnotations();
    var WinWidth = $(window).width();
    var WinHeight = $(window).height();
    var className = this.props.isAdmin?"admin_header":"app_header"
    // $('.tab_wrap_scroll').height(WinHeight-($('.app_header').outerHeight(true)+120));
    $('.tab_wrap_scroll').height(WinHeight-($('.'+className).outerHeight(true)+120));
    if(WinWidth > 768){
      $(".tab_wrap_scroll").mCustomScrollbar({theme:"minimal-dark"});
    }
  }

  componentWillMount() {
    const resp = this.fetchPortfolioStartupDetails();
    return resp
  }

  async fetchPortfolioStartupDetails() {
    let that = this;
    let data = {};
    let membershipDescription;
    let complianceDescription;
    let licenseDescription;

    let portfoliodetailsId = that.props.portfolioDetailsId;
    const responseM = await fetchStartupDetailsHandler(portfoliodetailsId, MEMBERKEY);
    if (responseM) {
      data.memberships = responseM.memberships;
    }
    const responseC = await fetchStartupDetailsHandler(portfoliodetailsId, COMPLIANCEKEY);
    if (responseC) {
      data.compliances = responseC.compliances;
    }
    const responseL = await fetchStartupDetailsHandler(portfoliodetailsId, LICENSEKEY);
    if (responseL) {
      data.licenses = responseL.licenses;
    }
    // data = {
    //   memberships:this.state.memberships,
    //   licenses: this.state.licenses,
    //   compliances:this.state.compliances
    // }
    membershipDescription = createValueFromString(data.memberships ? data.memberships.membershipDescription : null);
    complianceDescription = createValueFromString(data.compliances ? data.compliances.complianceDescription : null);
    licenseDescription = createValueFromString(data.licenses ? data.licenses.licenseDescription : null);
    this.setState({ loading: false, data: data, membershipDescription, complianceDescription, licenseDescription })
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
    let details = {portfolioId:this.props.portfolioDetailsId, docId:"startupMCL", quote:JSON.stringify(annotation)}
    const response = await createAnnotationActionHandler(details);
    if(response && response.success){
      this.fetchAnnotations(true);
    }
    return response;
  }

  async fetchAnnotations(isCreate){
    const response = await findAnnotations(this.props.portfolioDetailsId, "startupMCL");
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
    const { membershipDescription, complianceDescription, licenseDescription } = this.state;
    return (
      <div>
        <div className="tab_wrap_scroll">
          <ScrollArea
            speed={0.8}
            className="tab_wrap_scroll"
            smoothScrolling={true}
            default={true}
          >
        {showLoader === true ? ( <MlLoader/>) : (

            <div className="portfolio-main-wrap" id="annotatorContent">
              <h2>MCL</h2>

              <div className="col-md-6 col-sm-6 nopadding-left">
                <div className="panel panel-default panel-form-view">
                  <div className="panel-heading">Membership</div>
                  <div className="panel-body ">
                    {this.state.data.memberships && this.state.data.memberships.membershipDescription ?
                      <MlTextEditor
                        value={membershipDescription}
                        isReadOnly={true}
                      /> :
                      <div className="portfolio-main-wrap">
                        <NoData tabName={this.props.tabName} />
                      </div>}
                  </div>
                </div>
                <div className="clearfix"></div>
              </div>

              <div className="col-md-6 col-sm-6 nopadding-right">
                <div className="panel panel-default panel-form-view">
                  <div className="panel-heading">Compliances</div>
                  <div className="panel-body ">
                    {this.state.data.compliances && this.state.data.compliances.complianceDescription ?
                      <MlTextEditor
                        value={complianceDescription}
                        isReadOnly={true}
                      /> :
                      <div className="portfolio-main-wrap">
                        <NoData tabName={this.props.tabName} />
                      </div>}
                  </div>
                </div>
                <div className="clearfix"></div>

                <div className="panel panel-default panel-form-view">
                  <div className="panel-heading">Licenses</div>
                  <div className="panel-body ">
                    {this.state.data.licenses && this.state.data.licenses.licenseDescription ?
                      <MlTextEditor
                        value={licenseDescription}
                        isReadOnly={true}
                      /> :
                      <div className="portfolio-main-wrap">
                        <NoData tabName={this.props.tabName} />
                      </div>}
                  </div>
                </div>

              </div>
          </div>
          )
        }
          </ScrollArea>
        </div>
      </div>
    )
  }
}
