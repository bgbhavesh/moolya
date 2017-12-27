import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
import MlLoader from '../../../../../../commons/components/loader/loader'
var FontAwesome = require('react-fontawesome');
import {dataVisibilityHandler, OnLockSwitch} from '../../../../../utils/formElemUtil';
import {fetchCompanyDetailsHandler} from "../../../actions/findCompanyPortfolioDetails";

const MEMBERKEY = 'memberships'
const LICENSEKEY = 'licenses'
const COMPLIANCEKEY = 'compliances'

export default class MlCompanyMCL extends React.Component{

  constructor(props, context){
    super(props);
    this.state={
      loading:true,
      data:{},
      memberships:{},
      licenses:{},
      compliances:{},
      privateKey:{},
      privateFields:[]
    }
    this.onLockChange.bind(this);
    this.handleBlur.bind(this);
    this.fetchPortfolioDetails.bind(this);
    this.updateprivateFields.bind(this)
  }
  componentWillMount(){
    this.fetchPortfolioDetails();
  }
  updateprivateFields(){
    var that = this
    setTimeout(function () {
      _.each(that.state.privateFields, function (pf) {
        $("#"+pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
      })
    }, 10)
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
    if(that.context.companyPortfolio && (that.context.companyPortfolio.memberships || that.context.companyPortfolio.compliances || that.context.companyPortfolio.licenses)){
      this.setState({
        memberships: that.context.companyPortfolio.memberships,
        compliances: that.context.companyPortfolio.compliances,
        licenses: that.context.companyPortfolio.licenses
      });
      data = {
        memberships:that.context.companyPortfolio.memberships,
        licenses: that.context.companyPortfolio.compliances,
        compliances:that.context.companyPortfolio.licenses
      }
    }else {
      var responseM = await fetchCompanyDetailsHandler(portfoliodetailsId, MEMBERKEY);
      if (responseM && responseM.memberships) {
        var object = responseM.memberships;
        object = _.omit(object, '__typename')
        this.setState({memberships: object});
        this.setState({privateFields:object.privateFields});
      }
      var responseC = await fetchCompanyDetailsHandler(portfoliodetailsId, COMPLIANCEKEY);
      if (responseC && responseC.compliances) {
        var object = responseC.compliances;
        object = _.omit(object, '__typename')
        this.setState({compliances: object});

        var pf = this.state.privateFields;
        if(object.privateFields){
          pf = pf.concat(object.privateFields)
          this.setState({privateFields:pf});
        }
      }
      var responseL = await fetchCompanyDetailsHandler(portfoliodetailsId, LICENSEKEY);
      if (responseL && responseL.licenses) {
        var object = responseL.licenses;
        object = _.omit(object, '__typename')
        this.setState({licenses: object});
        var pf = this.state.privateFields;
        if(object.privateFields){
          pf = pf.concat(object.privateFields)
          this.setState({privateFields:pf});
        }
      }

      data = {
        memberships:this.state.memberships,
        licenses: this.state.licenses,
        compliances:this.state.compliances
      }
    }

    this.setState({loading: false,data:data})
    this.updateprivateFields();
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
  onLockChange(fieldName, type, tabName, e){
    var isPrivate = false;
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
        isPrivate = true;
      }else{
        details=_.extend(details,{[type]:{[key]:false}});
      }
    }

    var privateKey = {
      keyName: fieldName,
      booleanKey: type,
      isPrivate: isPrivate,
      tabName: tabName
    }
    this.setState({privateKey: privateKey})

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

    if(data['memberships'])
      data['memberships'] = _.omit(data['memberships'], ["privateFields"])

    if(data['licenses'])
      data['licenses'] = _.omit(data['licenses'], ["privateFields"])

    if(data['compliances'])
      data['compliances'] = _.omit(data['compliances'], ["privateFields"])


    this.props.getMCL(data)
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
                      <textarea placeholder="Describe..." name="membershipsDescription" className="form-control" id="cl_about" defaultValue={this.state.memberships&&this.state.memberships.membershipsDescription?this.state.memberships.membershipsDescription:""}  onBlur={this.handleBlur.bind(this, "memberships")}></textarea>
                      <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isMembershipsDescriptionPrivate"  onClick={this.onLockChange.bind(this, "isMembershipsDescriptionPrivate", "memberships", MEMBERKEY)}/>
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
                      <textarea placeholder="Describe..." name="compliancesDescription" className="form-control" id="cl_about" defaultValue={this.state.compliances&&this.state.compliances.compliancesDescription?this.state.compliances.compliancesDescription:""}  onBlur={this.handleBlur.bind(this, "compliances")}></textarea>
                      <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isCompliancesDescriptionPrivate" onClick={this.onLockChange.bind(this, "isCompliancesDescriptionPrivate", "compliances", COMPLIANCEKEY)}/>
                    </div>
                  </div>
                </div>
                <div className="clearfix"></div>
                <div className="panel panel-default panel-form-view">
                  <div className="panel-heading">Licenses </div>
                  <div className="panel-body ">
                    <div className="form-group nomargin-bottom">
                      <textarea placeholder="Describe..." name="licensesDescription" className="form-control" id="cl_about" defaultValue={this.state.licenses&&this.state.licenses.licensesDescription?this.state.licenses.licensesDescription:""}  onBlur={this.handleBlur.bind(this, "licenses")}></textarea>
                      <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isLicensesDescriptionPrivate" onClick={this.onLockChange.bind(this, "isLicensesDescriptionPrivate", "licenses", LICENSEKEY)}/>
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
MlCompanyMCL.contextTypes = {
  companyPortfolio: PropTypes.object,
};
