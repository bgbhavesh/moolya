import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar'
var FontAwesome = require('react-fontawesome');
import {dataVisibilityHandler, OnLockSwitch} from '../../../../../../utils/formElemUtil';
import MlLoader from "../../../../../../../commons/components/loader/loader";
import {fetchInstitutionDetailsHandler} from "../../../../actions/findPortfolioInstitutionDetails";

const KEY = "institutionIncubators"

export default class MlInstitutionStartupIncubators extends React.Component{
  constructor(props, context){
    super(props);
    this.state={
      institutionIncubators:{}
    }
    this.fetchPortfolioDetails.bind(this);
  }

  componentWillMount(){
    this.fetchPortfolioDetails();
  }
  async fetchPortfolioDetails() {
    let that = this;
    let portfolioDetailsId=that.props.portfolioDetailsId;

    const response = await fetchInstitutionDetailsHandler(portfolioDetailsId, KEY);
    if (response && response.institutionIncubators) {
      var object = response.institutionIncubators;
      this.setState({loading: false,institutionIncubators: object});
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
              <p>{this.state.institutionIncubators && this.state.institutionIncubators.institutionIncubatorsDescription ? this.state.institutionIncubators.institutionIncubatorsDescription : ""}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
