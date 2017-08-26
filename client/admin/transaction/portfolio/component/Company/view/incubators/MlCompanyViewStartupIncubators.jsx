import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar'
var FontAwesome = require('react-fontawesome');
import {dataVisibilityHandler, OnLockSwitch} from '../../../../../../utils/formElemUtil';
import MlLoader from "../../../../../../../commons/components/loader/loader";
import {fetchCompanyDetailsHandler} from "../../../../actions/findCompanyPortfolioDetails";

const KEY = "startupIncubators"

export default class MlCompanyViewStartupIncubators extends React.Component{
  constructor(props, context){
    super(props);
    this.state={
      startupIncubators:{}
    }
    this.fetchPortfolioDetails.bind(this);
  }

  componentWillMount(){
    this.fetchPortfolioDetails();
  }
  async fetchPortfolioDetails() {
    let that = this;
    let portfolioDetailsId=that.props.portfolioDetailsId;

    const response = await fetchCompanyDetailsHandler(portfolioDetailsId, KEY);
    if (response && response.startupIncubators) {
      var object = response.startupIncubators;
      this.setState({loading: false,startupIncubators: object});
    }else{
      this.setState({loading:false})
    }
  }

  render(){
    return (
      <div className="col-lg-12 col-sm-12" >
        <div className="row">
          <h2>Startup Incubators</h2>
          <div className="panel panel-default panel-form-view">
            <div className="panel-body">
              <p>{this.state.startupIncubators && this.state.startupIncubators.startupIncubatorsDescription ? this.state.startupIncubators.startupIncubatorsDescription : ""}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
