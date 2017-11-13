import React from 'react';
var FontAwesome = require('react-fontawesome');
import {fetchCompanyDetailsHandler} from "../../../actions/findCompanyPortfolioDetails";
import {initializeMlAnnotator} from '../../../../../../commons/annotator/mlAnnotator'
import {createAnnotationActionHandler} from '../../../actions/updatePortfolioDetails'
import {findAnnotations} from '../../../../../../commons/annotator/findAnnotations'
import _ from 'lodash'
import NoData from '../../../../../../commons/components/noData/noData';
import {initalizeFloatLabel} from "../../../../../utils/formElemUtil";
import {validateUserForAnnotation} from '../../../actions/findPortfolioIdeatorDetails';
import MlLoader from "../../../../../../commons/components/loader/loader";

const MEMBERKEY = 'memberships'
const LICENSEKEY = 'licenses'
const COMPLIANCEKEY = 'compliances'

export default class MlCompanyViewMCL extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      memberships:{},
      compliances:{},
      licenses:{},
      data:{},
      annotations:[],
      content:{},
      loading:true
    }
    this.createAnnotations.bind(this);
    this.fetchAnnotations.bind(this);
    this.initalizeAnnotaor.bind(this);
    this.annotatorEvents.bind(this);
    this.validateUserForAnnotation(this)
  }

  componentDidMount(){
    // this.initalizeAnnotaor()
    // this.fetchAnnotations();
    var WinHeight = $(window).height();
    $('.main_wrap_scroll ').height(WinHeight-(68+$('.admin_header').outerHeight(true)));
    this.fetchPortfolioDetails();
    initalizeFloatLabel();
  }

  componentWillMount(){

    let resp = this.validateUserForAnnotation();
    return resp
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

  async fetchPortfolioDetails() {
    let that = this;
    let data = {};
    let portfoliodetailsId=that.props.portfolioDetailsId;

    const responseM = await fetchCompanyDetailsHandler(portfoliodetailsId, MEMBERKEY);
    if (responseM) {
      this.setState({memberships: responseM.memberships,loading: true},function () {
        this.fetchAnnotations();
        this.setState({loading: false})
      });
    }
    const responseC = await fetchCompanyDetailsHandler(portfoliodetailsId, COMPLIANCEKEY);
    if (responseC) {
      this.setState({compliances: responseC.compliances,loading: true},function () {
        this.fetchAnnotations();
        this.setState({loading: false})
      });
    }
    const responseL = await fetchCompanyDetailsHandler(portfoliodetailsId, LICENSEKEY);
    if (responseL) {
      this.setState({licenses: responseL.licenses,loading: true},function () {
        this.fetchAnnotations();
        this.setState({loading: false})
      });
    }
    //this.setState({loading: false});
    data = {
      memberships:this.state.memberships,
      licenses: this.state.licenses,
      compliances:this.state.compliances
    }
    this.setState({data:data})

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
    let details = {portfolioId:this.props.portfolioDetailsId, docId:"MCL", quote:JSON.stringify(annotation)}
    const response = await createAnnotationActionHandler(details);
    if(response && response.success){
      this.fetchAnnotations(true);
    }
    return response;
  }



  async fetchAnnotations(isCreate){
    const response = await findAnnotations(this.props.portfolioDetailsId, "MCL");
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
    return (
      <div>

        <div className="portfolio-main-wrap" id="annotatorContent">
          <h2>MCL</h2>

          <div className="col-md-6 col-sm-6 nopadding-left">
            <div className="panel panel-default panel-form-view">
              <div className="panel-heading">Membership</div>
              <div className="panel-body ">

                {showLoader === true ? ( <MlLoader/>) : (<p>{this.state.memberships && this.state.memberships.membershipsDescription ? <div>{this.state.memberships.membershipsDescription}</div> :  (<div className="portfolio-main-wrap">
                  <NoData tabName={this.props.tabName}/>
                </div>)}</p>)}

              </div>
            </div>
            <div className="clearfix"></div>


          </div>
          <div className="col-md-6 col-sm-6 nopadding-right">


            <div className="panel panel-default panel-form-view">
              <div className="panel-heading">Compliances</div>
              <div className="panel-body ">

                {showLoader === true ? ( <MlLoader/>) : (<p>{this.state.compliances && this.state.compliances.compliancesDescription ? this.state.compliances.compliancesDescription : (<div className="portfolio-main-wrap">
                  <NoData tabName={this.props.tabName}/>
                </div>)}</p>)}

              </div>
            </div>
            <div className="clearfix"></div>
            <div className="panel panel-default panel-form-view">
              <div className="panel-heading">Licenses</div>
              <div className="panel-body ">

                {showLoader === true ? ( <MlLoader/>) : (<p>{this.state.licenses && this.state.licenses.licensesDescription ? this.state.licenses.licensesDescription : (<div className="portfolio-main-wrap">
                  <NoData tabName={this.props.tabName}/>
                </div>)}</p>)}

              </div>
            </div>


          </div>
        </div>

      </div>
    )
  }
}
