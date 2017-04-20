import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
import {dataVisibilityHandler, OnLockSwitch} from '../../../../../utils/formElemUtil';
/*import MlIdeatorPortfolioAbout from './MlIdeatorPortfolioAbout'*/
import {findIdeatorDetailsActionHandler} from '../../actions/findPortfolioIdeatorDetails'
import _ from 'lodash';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');


export default class MlStartupAboutUs extends React.Component{
  constructor(props, context){
    super(props);
    this.state={
      loading: true,
      data:{}
    }
    this.onClick.bind(this);
    this.handleBlur.bind(this);
    // this.fetchPortfolioDetails.bind(this);
    return this;
  }

  componentDidMount()
  {
    OnLockSwitch();
    dataVisibilityHandler();
  }
  componentDidUpdate()
  {
    OnLockSwitch();
    dataVisibilityHandler();
  }
  componentWillMount(){
    // this.fetchPortfolioDetails();
  }

  onClick(field,e){
    let details = this.state.data||{};
    let key = e.target.id;
    details=_.omit(details,[key]);
    let className = e.target.className;
    if(className.indexOf("fa-lock") != -1){
      details=_.extend(details,{[key]:true});
    }else{
      details=_.extend(details,{[key]:false});
    }
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
  // async fetchPortfolioDetails() {
  //   let that = this;
  //   let portfoliodetailsId=that.props.portfolioDetailsId;
  //   let empty = _.isEmpty(that.context.ideatorPortfolio && that.context.ideatorPortfolio.portfolioIdeatorDetails)
  //   if(empty){
  //     const response = await findIdeatorDetailsActionHandler(portfoliodetailsId);
  //     if (response) {
  //       this.setState({loading: false, data: response});
  //     }
  //   }else{
  //     this.setState({loading: false, data: that.context.ideatorPortfolio.portfolioIdeatorDetails});
  //   }
  //
  // }

  sendDataToParent(){
    let data = this.state.data;
    for (var propName in data) {
      if (data[propName] === null || data[propName] === undefined) {
        delete data[propName];
      }
    }
    this.props.getIdeatorDetails(data)
  }
  render(){
    const showLoader = this.state.loading;
    return (
      <div className="admin_main_wrap">



      </div>
    )
  }
};
