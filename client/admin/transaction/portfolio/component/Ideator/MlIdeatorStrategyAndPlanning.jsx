import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
import {dataVisibilityHandler, OnLockSwitch} from '../../../../utils/formElemUtil';
import {findIdeatorStrategyPlansActionHandler} from '../../actions/findPortfolioIdeatorDetails'
import _ from 'lodash';
import MlLoader from '../../../../../commons/components/loader/loader'

export default class MlIdeatorStrategyAndPlanning extends React.Component{
  constructor(props, context){
    super(props);
    this.state={
      loading:true,
      data:{},
      privateKey:{}
    }
    this.onClick.bind(this);
    this.handleBlur.bind(this);
    this.fetchPortfolioDetails.bind(this);
  }
  componentWillMount(){
    this.fetchPortfolioDetails();
  }

  componentDidMount(){
    OnLockSwitch();
    dataVisibilityHandler();
  }

  componentDidUpdate(){
    OnLockSwitch();
    dataVisibilityHandler();
  }

  async fetchPortfolioDetails() {
    let that = this;
    let portfoliodetailsId=that.props.portfolioDetailsId;
    let empty = _.isEmpty(that.context.ideatorPortfolio && that.context.ideatorPortfolio.strategyAndPlanning)
    if(empty){
      const response = await findIdeatorStrategyPlansActionHandler(portfoliodetailsId);
      if (response) {
        this.setState({loading: false, data: response});
      }

      _.each(response.privateFields, function (pf) {
        $("#"+pf.booleanKey).removeClass('un_lock fa-unlock').addClass('fa-lock')
      })

    }else{
      this.setState({loading: false, data: that.context.ideatorPortfolio.strategyAndPlanning});
    }
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

    var privateKey = {keyName:fieldName, booleanKey:field, isPrivate:isPrivate}
    this.setState({privateKey:privateKey})
    this.setState({data:details}, function () {
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
      <div className="admin_main_wrap">
        {showLoader === true ? (<MlLoader/>) : (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
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
                      Startergy and Planning
                    </div>
                    <div className="panel-body">

                      <div className="form-group nomargin-bottom">
                        <textarea placeholder="Describe..." className="form-control" id="cl_about" defaultValue={description} name="spDescription" onBlur={this.handleBlur.bind(this)}></textarea>
                        <FontAwesome name='unlock' className="input_icon req_textarea_icon un_lock" id="isStrategyPlansPrivate" onClick={this.onClick.bind(this, "spDescription", "isStrategyPlansPrivate")}/>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>)}
      </div>
    )
  }
};
MlIdeatorStrategyAndPlanning.contextTypes = {
  ideatorPortfolio: PropTypes.object,
};
