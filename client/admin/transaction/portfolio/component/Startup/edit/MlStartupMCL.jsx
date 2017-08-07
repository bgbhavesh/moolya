import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
import MlLoader from '../../../../../../commons/components/loader/loader'
var FontAwesome = require('react-fontawesome');
import {dataVisibilityHandler, OnLockSwitch} from '../../../../../utils/formElemUtil';
import {fetchStartupPortfolioMemberships, fetchStartupPortfolioLicenses, fetchStartupPortfolioCompliances} from '../../../actions/findPortfolioStartupDetails'

export default class MlStartupMCL extends React.Component{

  constructor(props, context){
    super(props);
    this.state={
      loading:true,
      data:{},
      memberships:{},
      licenses:{},
      compliances:{}
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
      const responseM = await fetchStartupPortfolioMemberships(portfoliodetailsId);
      if (responseM) {
        this.setState({memberships: responseM});
      }
      const responseC = await fetchStartupPortfolioCompliances(portfoliodetailsId);
      if (responseC) {
        this.setState({compliances: responseC});
      }
      const responseL = await fetchStartupPortfolioLicenses(portfoliodetailsId);
      if (responseL) {
        this.setState({licenses: responseL});
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
  onLockChange(field,type, e){
    let details = this.state.data||{};
    let key = e.target.id;
    // details=_.omit(details,[key]);
    let className = e.target.className;

    let mcl = details[type];
    if(details && mcl){
      if(className.indexOf("fa-lock") != -1){
        // details=_.extend(details,{[key]:true});
        mcl[key] = true
        details[type] = mcl;
      }else{
        // details=_.extend(details,{[key]:false});
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

    // if(className.indexOf("fa-lock") != -1){
    //   details=_.extend(details,{[key]:true});
    // }else{
    //   details=_.extend(details,{[key]:false});
    // }
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
                      <textarea placeholder="Describe..." name="description" className="form-control" id="cl_about" defaultValue={this.state.data&&this.state.data.memberships&&this.state.data.memberships.description?this.state.data.memberships.description:""}  onBlur={this.handleBlur.bind(this, "memberships")}></textarea>
                      <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isDescriptionPrivate"  onClick={this.onLockChange.bind(this, "isDescriptionPrivate", "memberships")}/><input type="checkbox" className="lock_input" id="isDescriptionPrivate" checked={this.state.data&& this.state.data.memberships&&this.state.data.memberships.isDescriptionPrivate?this.state.data.memberships.isDescriptionPrivate:false}/>
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
                      <textarea placeholder="Describe..." name="description" className="form-control" id="cl_about" defaultValue={this.state.data&&this.state.data.compliances&&this.state.data.compliances.description?this.state.data.compliances.description:""}  onBlur={this.handleBlur.bind(this, "compliances")}></textarea>
                      <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isDescriptionPrivate" onClick={this.onLockChange.bind(this, "isDescriptionPrivate", "compliances")}/><input type="checkbox" className="lock_input" id="isDescriptionPrivate" checked={this.state.data&& this.state.data.compliances&&this.state.data.compliances.isDescriptionPrivate?this.state.data.compliances.isDescriptionPrivate:false}/>
                    </div>
                  </div>
                </div>
                <div className="clearfix"></div>
                <div className="panel panel-default panel-form-view">
                  <div className="panel-heading">Licenses </div>
                  <div className="panel-body ">
                    <div className="form-group nomargin-bottom">
                      <textarea placeholder="Describe..." name="description" className="form-control" id="cl_about" defaultValue={this.state.data&&this.state.data.licenses&&this.state.data.licenses.description?this.state.data.licenses.description:""}  onBlur={this.handleBlur.bind(this, "licenses")}></textarea>
                      <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isDescriptionPrivate" onClick={this.onLockChange.bind(this, "isDescriptionPrivate", "licenses")}/><input type="checkbox" className="lock_input" id="isDescriptionPrivate" checked={this.state.data&& this.state.data.licenses&&this.state.data.licenses.isDescriptionPrivate?this.state.data.licenses.isDescriptionPrivate:false}/>
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
