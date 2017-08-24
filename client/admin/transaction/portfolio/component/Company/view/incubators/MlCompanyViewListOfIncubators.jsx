import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar'
var FontAwesome = require('react-fontawesome');
import {dataVisibilityHandler, OnLockSwitch} from '../../../../../../utils/formElemUtil';
import MlLoader from "../../../../../../../commons/components/loader/loader";
import {fetchCompanyDetailsHandler} from "../../../../actions/findCompanyPortfolioDetails";

const KEY = "listOfIncubators"

export default class MlCompanyViewListOfIncubators extends React.Component{
  constructor(props, context){
    super(props);
    this.state= {
      listOfIncubators: {}
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
    if (response && response.listOfIncubators) {
      var object = response.listOfIncubators;
      this.setState({loading: false,listOfIncubators: object});
    }else{
      this.setState({loading:false})
    }
  }

  render(){
    return (
      <div className="col-lg-12 col-sm-12" >
        <div className="row">
          <h2>List Of Incubators</h2>
          <div className="panel panel-default panel-form-view">

            <div className="panel-body">
              <p>{this.state.listOfIncubators && this.state.listOfIncubators.listOfIncubatorsDescription ? this.state.listOfIncubators.listOfIncubatorsDescription : ""}</p>

            </div>
          </div>

        </div>
      </div>
    )
  }
}

