import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
import {dataVisibilityHandler, OnLockSwitch} from '../../../../../../utils/formElemUtil';
import _ from 'lodash';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
import MlStartupTab from './MlPortfolioStartupAboutsUsTabs'
import {fetchDetailsStartupActionHandler} from '../../../../actions/findPortfolioStartupDetails'



export default class MlStartupAboutUs extends React.Component{
  constructor(props){
    super(props)
    this.state = {aboutStartup:false,startupAboutUs:[], startupAboutUsList:[]}
    this.fetchPortfolioDetails.bind(this);
  }
  selectedTab(field,e){
   this.setState({aboutStartup : true})
  }
  getPortfolioStartupAboutUsDetails(details,tabName){
    this.props.getAboutus(details,tabName);
  }
  componentWillMount(){
    this.fetchPortfolioDetails();
  }
  async fetchPortfolioDetails() {
    let that = this;
    let portfoliodetailsId=that.props.portfolioDetailsId;
    const response = await fetchDetailsStartupActionHandler(portfoliodetailsId);
    if (response) {
      this.setState({loading: false, startupAboutUs: response, startupAboutUsList: response});
    }

  }

  render(){
    console.log(this.state.startupAboutUs.aboutUs);
    return (
      <div>
      {this.state.aboutStartup===false?(<div className=" portfolio-main-wrap">
        <ScrollArea
          speed={0.8}
          className="main_wrap_scroll"
          smoothScrolling={true}
          default={true}
        >        <h2>Portfolio</h2>
        <div className="col-md-6 col-sm-6 nopadding">
          <div className="panel panel-default panel-form-view">
            <div className="panel-heading">About Us <a href="" className="pull-right ellipsis-menu"><FontAwesome name='ellipsis-h' onClick={this.selectedTab.bind(this)}/></a></div>
            <div className="panel-body panel-body-scroll" style={{'height':'384px'}}>
              <p>{this.state.startupAboutUs.aboutUs&&this.state.startupAboutUs.aboutUs.description}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-sm-6 nopadding-right">
          <div className="panel panel-default panel-form-view">
            <div className="panel-heading">Rating <a href="" className="pull-right ellipsis-menu"><FontAwesome name='ellipsis-h' onClick={this.selectedTab.bind(this)}/></a></div>
            <div className="panel-body">
              Rating
            </div>
          </div>
          <div className="clearfix"></div>
          <div className="col-md-6 col-sm-6 nopadding-left">
            <div className="col-md-12 nopadding"><div className="panel panel-default panel-form-view">
              <div className="panel-heading">Clients <a href="" className="pull-right ellipsis-menu"><FontAwesome name='ellipsis-h' onClick={this.selectedTab.bind(this)}/></a></div>
              <div className="panel-body text-center panel-body-scroll">
                <img src="/images/logo.png"/>
                <img src="/images/idea_hub_logo.png"/>
                <img src="/images/nari_preneur_logo.png"/>
              </div>
            </div></div>
            <div className="col-md-12 nopadding"><div className="panel panel-default panel-form-view">
              <div className="panel-heading">Service & Products <a href="" className="pull-right ellipsis-menu"><FontAwesome name='ellipsis-h' onClick={this.selectedTab.bind(this)}/></a></div>
              <div className="panel-body panel-body-scroll">
                <p>{this.state.startupAboutUs.serviceProducts&&this.state.startupAboutUs.serviceProducts.description}</p>
              </div>
            </div></div>
          </div>
          <div className="col-md-6 col-sm-6 nopadding"><div className="panel panel-default panel-form-view">
            <div className="panel-heading">Information <a href="" className="pull-right ellipsis-menu"><FontAwesome name='ellipsis-h' onClick={this.selectedTab.bind(this)}/></a></div>
            <div className="panel-body">
              <ul className="list-info">
                <li>{this.state.startupAboutUs.information&&this.state.startupAboutUs.information.description}</li>
              </ul>
            </div>
          </div></div>

        </div>
        </ScrollArea>
      </div>):(<div>{<MlStartupTab getPortfolioStartupAboutUsDetails={this.getPortfolioStartupAboutUsDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} startupAboutUsDetails={this.state.startupAboutUs}></MlStartupTab> }</div>)}
      </div>

    )
  }
};
