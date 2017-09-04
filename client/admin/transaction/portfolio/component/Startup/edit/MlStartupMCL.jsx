import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
import MlLoader from '../../../../../../commons/components/loader/loader'
var FontAwesome = require('react-fontawesome');
import {dataVisibilityHandler, OnLockSwitch} from '../../../../../utils/formElemUtil';
import {fetchStartupPortfolioMemberships, fetchStartupPortfolioLicenses, fetchStartupPortfolioCompliances} from '../../../actions/findPortfolioStartupDetails'
import {fetchStartupDetailsHandler} from '../../../actions/findPortfolioStartupDetails'
import _ from 'lodash';

const MEMBERKEY = 'memberships'
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
      privateKey:{},
      privateFields:[]
    }
    this.onLockChange.bind(this);
    this.handleBlur.bind(this);
    this.updateprivateFields.bind(this)
    this.fetchPortfolioDetails.bind(this);
  }
  componentWillMount(){
   const resp = this.fetchPortfolioDetails();
   return resp
  }

  componentDidUpdate(){
    OnLockSwitch();
    dataVisibilityHandler();
  }

  updateprivateFields(){
    var that = this
    setTimeout(function () {
      _.each(that.state.privateFields, function (pf) {
        $("#"+pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
      })
    }, 10)
  }

  async fetchPortfolioDetails() {
    let that = this;
    let data = {};
    let portfoliodetailsId=that.props.portfolioDetailsId;
    var responseM = await fetchStartupDetailsHandler(portfoliodetailsId, MEMBERKEY);
    var responseC = await fetchStartupDetailsHandler(portfoliodetailsId, COMPLIANCEKEY);
    var responseL = await fetchStartupDetailsHandler(portfoliodetailsId, LICENSEKEY);

    if(that.context.startupPortfolio && (that.context.startupPortfolio.memberships || that.context.startupPortfolio.compliances || that.context.startupPortfolio.licenses)){
      this.setState({
        memberships: that.context.startupPortfolio.memberships,
        compliances: that.context.startupPortfolio.compliances,
        licenses: that.context.startupPortfolio.licenses
      });
      data = {
        memberships:that.context.startupPortfolio.memberships,
        compliances: that.context.startupPortfolio.compliances,
        licenses:that.context.startupPortfolio.licenses
      }

      if (responseM && responseM.memberships) {
        this.setState({loading: false,data:data}, () => {
          this.lockPrivateKeys('memberships', responseM.memberships.privateFields);
        });
      }
      else {
        this.setState({loading: false,data:data}, () => {
          this.lockPrivateKeys('memberships');
        });
      }

      if (responseL && responseL.licenses) {
        this.setState({loading: false, data: data}, () => {
          this.lockPrivateKeys('licenses', responseL.licenses.privateFields);
        });
      }
      else {
        this.setState({loading: false, data: data}, () => {
          this.lockPrivateKeys('licenses');
        });
      }

      if (responseC && responseC.compliances) {
        this.setState({loading: false, data: data}, () => {
          this.lockPrivateKeys('compliances', responseC.compliances.privateFields);
        });
      }
      else {
        this.setState({loading: false, data: data}, () => {
          this.lockPrivateKeys('compliances');
        });
      }

    }else {
      var pf;
      if (responseM && responseM.memberships) {
        var object = responseM.memberships;
        object = _.omit(object, '__typename')
        this.setState({memberships: object});
        pf = object.privateFields;
      }
      if (responseC && responseC.compliances) {
        var object = responseC.compliances;
        object = _.omit(object, '__typename')
        this.setState({compliances: object});

        if(object.privateFields){
          pf = pf.concat(object.privateFields)
        }
      }
      if (responseL && responseL.licenses) {
        var object = responseL.licenses;
        object = _.omit(object, '__typename')
        this.setState({licenses: object});
        if(object.privateFields){
          pf = pf.concat(object.privateFields)
        }
      }
      this.setState({privateFields:pf});
      data = {
        memberships:this.state.memberships,
        licenses: this.state.licenses,
        compliances:this.state.compliances
      }
      this.setState({loading: false,data:data});
      this.updateprivateFields();
    }
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


    this.props.getStartupMCL(data, this.state.privateKey)
  }

  /**
   * UI creating lock function
   * */
  lockPrivateKeys(tabname, privateValues) {
    var filterPrivateKeys = _.filter(this.context.portfolioKeys.privateKeys, {tabName: tabname});
    var filterRemovePrivateKeys = _.filter(this.context.portfolioKeys.removePrivateKeys, {tabName: tabname})
    var finalKeys = _.unionBy(filterPrivateKeys, privateValues, 'booleanKey')
    var keys = _.differenceBy(finalKeys, filterRemovePrivateKeys, 'booleanKey')
    console.log('keysssssssssssssssss', keys)
    // setTimeout(function () {
      _.each(keys, function (pf) {
        $("#"+pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
      })
    // }, 10)
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
                      <textarea placeholder="Describe..." name="membershipDescription" className="form-control" id="cl_about" defaultValue={this.state.data&&this.state.data.memberships&&this.state.data.memberships.membershipDescription?this.state.data.memberships.membershipDescription:""}  onBlur={this.handleBlur.bind(this, "memberships")}></textarea>
                      <FontAwesome name='unlock' className="input_icon un_lock" id="isMDPrivate"  onClick={this.onLockChange.bind(this, "membershipDescription", "isMDPrivate", MEMBERKEY)}/>
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
                      <textarea placeholder="Describe..." name="complianceDescription" className="form-control" id="cl_about" defaultValue={this.state.data&&this.state.data.compliances&&this.state.data.compliances.complianceDescription?this.state.data.compliances.complianceDescription:""}  onBlur={this.handleBlur.bind(this, "compliances")}></textarea>
                      <FontAwesome name='unlock' className="input_icon fa-unlock un_lock" id="isCDPrivate" onClick={this.onLockChange.bind(this, "complianceDescription", "isCDPrivate", COMPLIANCEKEY)}/>
                    </div>
                  </div>
                </div>


                <div className="clearfix"></div>
                <div className="panel panel-default panel-form-view">
                  <div className="panel-heading">Licenses </div>
                  <div className="panel-body ">
                    <div className="form-group nomargin-bottom">
                      <textarea placeholder="Describe..." name="licenseDescription" className="form-control" id="cl_about" defaultValue={this.state.data&&this.state.data.licenses&&this.state.data.licenses.licenseDescription?this.state.data.licenses.licenseDescription:""}  onBlur={this.handleBlur.bind(this, "licenses")}></textarea>
                      <FontAwesome name='unlock' className="input_icon fa-unlock un_lock" id="isLDPrivate" onClick={this.onLockChange.bind(this, "licenseDescription", "isLDPrivate", LICENSEKEY)}/>
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
  portfolioKeys: PropTypes.object,
};
