import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
import MlLoader from '../../../../../../commons/components/loader/loader'
var FontAwesome = require('react-fontawesome');
import {dataVisibilityHandler, OnLockSwitch} from '../../../../../utils/formElemUtil';
import {fetchStartupPortfolioMemberships, fetchStartupPortfolioLicenses, fetchStartupPortfolioCompliances} from '../../../actions/findPortfolioStartupDetails'
import {fetchStartupDetailsHandler} from '../../../actions/findPortfolioStartupDetails'

const MEMBERKEY = 'membership'
const LICENSEKEY = 'licenses'
const COMPLIANCEKEY = 'compliances'

export default class MlStartupMCL extends React.Component{

  constructor(props, context){
    super(props);
    this.state={
      loading:true,
      data:{},
      memberships:{},
      licenses:{},
      compliances:{},
      privateKey:{}
    }
    this.onLockChange.bind(this);
    this.handleBlur.bind(this);
    this.fetchPortfolioDetails.bind(this);
  }
  componentWillMount(){
    this.fetchPortfolioDetails();
  }

  componentDidUpdate(){
    OnLockSwitch();
    dataVisibilityHandler();
  }
  async fetchPortfolioDetails() {
    let that = this;
    let data = {};
    let portfoliodetailsId=that.props.portfolioDetailsId;
    // let empty = _.isEmpty(that.context.startupPortfolio && that.context.startupPortfolio.memberships)
    // let compliancesEmpty = _.isEmpty(that.context.startupPortfolio && that.context.startupPortfolio.compliances)
    // let licensesEmpty = _.isEmpty(that.context.startupPortfolio && that.context.startupPortfolio.licenses)
    if(that.context.startupPortfolio && (that.context.startupPortfolio.memberships || that.context.startupPortfolio.compliances || that.context.startupPortfolio.licenses)){
      this.setState({
        memberships: that.context.startupPortfolio.memberships,
        compliances: that.context.startupPortfolio.compliances,
        licenses: that.context.startupPortfolio.licenses
      });
      data = {
        memberships:that.context.startupPortfolio.memberships,
        licenses: that.context.startupPortfolio.compliances,
        compliances:that.context.startupPortfolio.licenses
      }
    }else {
      var responseM = await fetchStartupDetailsHandler(portfoliodetailsId, MEMBERKEY);
      if (responseM && responseM.memberships) {
        this.setState({memberships: responseM.memberships});
      }
      var responseC = await fetchStartupDetailsHandler(portfoliodetailsId, COMPLIANCEKEY);
      if (responseC && responseC.compliances) {
        this.setState({compliances: responseC.compliances});
      }
      var responseL = await fetchStartupDetailsHandler(portfoliodetailsId, LICENSEKEY);
      if (responseL && responseL.licenses) {
        this.setState({licenses: responseL.licenses});
      }

      data = {
        memberships:this.state.memberships,
        licenses: this.state.licenses,
        compliances:this.state.compliances
      }
    }

    this.setState({loading: false,data:data})
  }

  componentDidMount(){
    OnLockSwitch();
    dataVisibilityHandler();
  }
  handleBlur(type, e){
    let details = this.state.data;
    let name  = e.target.name;
    let mcl = details[type];
    if(details && mcl){
      mcl[name] = e.target.value
      details[type] = mcl;
    }else{
      details=_.extend(details,{[type]:{[name]:e.target.value}});
    }
    this.setState({data:details}, function () {
      this.sendDataToParent()
    })
  }
  onLockChange(fieldName, type, e){
    let details = this.state.data||{};
    let key = e.target.id;
    let className = e.target.className;
    let mcl = details[type];
    if(details && mcl){
      if(className.indexOf("fa-lock") != -1){
        mcl[key] = true
        details[type] = mcl;
      }else{
        mcl[key] = false
        details[type] = mcl;
      }
    }else{
      if(className.indexOf("fa-lock") != -1){
        details=_.extend(details,{[type]:{[key]:true}});
      }else{
        details=_.extend(details,{[type]:{[key]:false}});
      }
    }
    this.setState({data:details}, function () {
      this.sendDataToParent()
    })
  }
  sendDataToParent(){
    let data = this.state.data;
    for (var propName in data.compliances) {
      if (data['compliances'][propName] === null || data['compliances'][propName] === undefined) {
        delete data['compliances'][propName];
      }
    }
    for (var propName in data.licenses) {
      if (data['licenses'][propName] === null || data['licenses'][propName] === undefined) {
        delete data['licenses'][propName];
      }
    }
    for (var propName in data.memberships) {
      if (data['memberships'][propName] === null || data['memberships'][propName] === undefined) {
        delete data['memberships'][propName];
      }
    }
    this.props.getStartupMCL(data)
  }
  render(){
    const showLoader = this.state.loading;
    return (
      <div>
        {showLoader === true ? ( <MlLoader/>) : (
        <div className="portfolio-main-wrap">
          <h2>MCL</h2>

              <div className="col-md-6 col-sm-6 nopadding-left">
                <div className="panel panel-default panel-form-view">
                  <div className="panel-heading">Membership </div>
                  <div className="panel-body ">
                    <div className="form-group nomargin-bottom">
                      <textarea placeholder="Describe..." name="membershipDescription" className="form-control" id="cl_about" defaultValue={this.state.data&&this.state.data.memberships&&this.state.data.memberships.complianceDescription?this.state.data.memberships.membershipDescription:""}  onBlur={this.handleBlur.bind(this, "memberships")}></textarea>
                      <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isMDPrivate"  onClick={this.onLockChange.bind(this, "membershipDescription", "isMDPrivate")}/>
                    </div>
                  </div>
                </div>
                <div className="clearfix"></div>
              </div>


              <div className="col-md-6 col-sm-6 nopadding-right">
                <div className="panel panel-default panel-form-view">
                  <div className="panel-heading">Compliances</div>
                  <div className="panel-body ">
                    <div className="form-group nomargin-bottom">
                      <textarea placeholder="Describe..." name="description" className="form-control" id="cl_about" defaultValue={this.state.data&&this.state.data.compliances&&this.state.data.compliances.complianceDescription?this.state.data.compliances.complianceDescription:""}  onBlur={this.handleBlur.bind(this, "compliances")}></textarea>
                      <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isCDPrivate" onClick={this.onLockChange.bind(this, "complianceDescription", "isCDPrivate")}/>
                    </div>
                  </div>
                </div>


                <div className="clearfix"></div>
                <div className="panel panel-default panel-form-view">
                  <div className="panel-heading">Licenses </div>
                  <div className="panel-body ">
                    <div className="form-group nomargin-bottom">
                      <textarea placeholder="Describe..." name="description" className="form-control" id="cl_about" defaultValue={this.state.data&&this.state.data.licenses&&this.state.data.licenses.licenseDescription?this.state.data.licenses.description:""}  onBlur={this.handleBlur.bind(this, "licenses")}></textarea>
                      <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isLDPrivate" onClick={this.onLockChange.bind(this, "licenseDescription", "isLDPrivate")}/>
                    </div>
                  </div>
                </div>
              </div>
        </div>

)}
      </div>
    )
  }
};
MlStartupMCL.contextTypes = {
  startupPortfolio: PropTypes.object,
};
