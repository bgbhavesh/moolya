import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar'
var FontAwesome = require('react-fontawesome');
import {dataVisibilityHandler, OnLockSwitch} from '../../../../../../utils/formElemUtil';
import MlLoader from "../../../../../../../commons/components/loader/loader";
import {fetchInstitutionDetailsHandler} from "../../../../actions/findPortfolioInstitutionDetails";

const KEY = "sectorsAndServices"

export default class MlInstitutionSectors extends React.Component{
  constructor(props, context){
    super(props);
    this.state={
      sectorsAndServices:{}
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
      if (response && response.sectorsAndServices) {
        var object = response.sectorsAndServices;
        this.setState({loading: false,sectorsAndServices: object});
      }else{
        this.setState({loading:false})
      }
  }

  render(){
    return (
      <div className="col-lg-12 col-sm-12" >
        <div className="row">
          <h2>Sectors And Services</h2>
          <div className="panel panel-default panel-form-view">

            <div className="panel-body">
              <p>{this.state.sectorsAndServices && this.state.sectorsAndServices.sectorsAndServicesDescription ? this.state.sectorsAndServices.sectorsAndServicesDescription : ""}</p>

            </div>
          </div>

        </div>
      </div>
    )
  }
}
