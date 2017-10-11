import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
import {dataVisibilityHandler, OnLockSwitch, initalizeFloatLabel} from '../../../../utils/formElemUtil';
import {findIdeatorStrategyPlansActionHandler} from '../../actions/findPortfolioIdeatorDetails'
import _ from 'lodash';
import MlLoader from '../../../../../commons/components/loader/loader'

export default class MlIdeatorStrategyAndPlanning extends React.Component{
  constructor(props, context){
    super(props);
    this.state={
      loading:true,
      data:{},
      privateKey:{},
      privateValues:[]
    }
    this.onClick.bind(this);
    this.handleBlur.bind(this);
    this.fetchPortfolioDetails.bind(this);
  }
  componentWillMount(){
    const resp = this.fetchPortfolioDetails();
    return resp
  }

  componentDidMount(){
    OnLockSwitch();
    dataVisibilityHandler();
  }

  componentDidUpdate(){
    OnLockSwitch();
    dataVisibilityHandler();
    initalizeFloatLabel();
  }

  async fetchPortfolioDetails() {
    let that = this;
    let portfoliodetailsId=that.props.portfolioDetailsId;
    const response = await findIdeatorStrategyPlansActionHandler(portfoliodetailsId);
    let empty = _.isEmpty(that.context.ideatorPortfolio && that.context.ideatorPortfolio.strategyAndPlanning)
    if(empty && response){
        this.setState({loading: false, data: response});
      _.each(response.privateFields, function (pf) {
        $("#"+pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
      })
    }else{
      this.setState({loading: false, data: that.context.ideatorPortfolio.strategyAndPlanning, privateValues: response.privateFields}, () => {
        this.lockPrivateKeys()
      });
    }
  }

  /**
   * UI creating lock function
   * */
  lockPrivateKeys() {
    var filterPrivateKeys = _.filter(this.context.portfolioKeys.privateKeys, {tabName: this.props.tabName})
    var filterRemovePrivateKeys = _.filter(this.context.portfolioKeys.removePrivateKeys, {tabName: this.props.tabName})
    var finalKeys = _.unionBy(filterPrivateKeys, this.state.privateValues, 'booleanKey')
    var keys = _.differenceBy(finalKeys, filterRemovePrivateKeys, 'booleanKey')
    console.log('keysssssssssssssssss', keys)
    _.each(keys, function (pf) {
      $("#" + pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
    })
  }

  onClick(fieldName, field,e){
    let details = this.state.data||{};
    let key = e.target.id;
    var isPrivate = false
    details=_.omit(details,[key]);
    let className = e.target.className;
    if(className.indexOf("fa-lock") != -1){
      details=_.extend(details,{[key]:true});
      isPrivate = true
    }else{
      details=_.extend(details,{[key]:false});
    }

    var privateKey = {keyName: fieldName, booleanKey: field, isPrivate: isPrivate, tabName: this.props.tabName}
    // this.setState({privateKey:privateKey})
    this.setState({data: details, privateKey: privateKey}, function () {
      this.sendDataToParent()
    })
  }

  handleBlur(e){
    let details =this.state.data;
    let name  = e.target.name;
    details=_.omit(details,[name]);
    details=_.extend(details,{[name]:e.target.value});
    this.setState({data:details}, function () {
      this.sendDataToParent()
    })
  }

  sendDataToParent(){
    let data = this.state.data;
    for (var propName in data) {
      if (data[propName] === null || data[propName] === undefined) {
        delete data[propName];
      }
    }

    data=_.omit(data,["privateFields"]);
    this.props.getStrategyAndPlanning(data, this.state.privateKey)
  }

  render(){
    let description =this.state.data.spDescription?this.state.data.spDescription:''
    let isStrategyPlansPrivate = this.state.data.isStrategyPlansPrivate?this.state.data.isStrategyPlansPrivate:false
    const showLoader = this.state.loading;
    return (
      <div>
        <h2>Problems and Solutions</h2>
        {showLoader === true ? (<MlLoader/>) : (
          <div className="main_wrap_scroll">
            <ScrollArea
              speed={0.8}
              className="main_wrap_scroll"
              smoothScrolling={true}
              default={true}
            >
              <div className="row requested_input">
                <div className="col-lg-12">
                  <div className="panel panel-default panel-form">
                    <div className="panel-heading">
                      Strategy and Planning
                      <FontAwesome name='unlock' className="input_icon req_header_icon un_lock" id="isStrategyPlansPrivate" onClick={this.onClick.bind(this, "spDescription", "isStrategyPlansPrivate")}/>
                    </div>
                    <div className="panel-body">

                      <div className="form-group nomargin-bottom">
                        <textarea placeholder="Describe..." className="form-control" id="cl_about" defaultValue={description} name="spDescription" onBlur={this.handleBlur.bind(this)}></textarea>

                      </div>

                    </div>
                  </div>

                </div>
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    )
  }
};
MlIdeatorStrategyAndPlanning.contextTypes = {
  ideatorPortfolio: PropTypes.object,
  portfolioKeys: PropTypes.object,
};
