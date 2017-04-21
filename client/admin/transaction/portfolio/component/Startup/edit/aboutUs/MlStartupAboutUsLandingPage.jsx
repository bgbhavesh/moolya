import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
import {dataVisibilityHandler, OnLockSwitch} from '../../../../../../utils/formElemUtil';
import _ from 'lodash';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
import MlStartupTab from './MlPortfolioStartupAboutsUsTabs'



export default class MlStartupAboutUs extends React.Component{
  constructor(props){
    super(props)
    this.state = {aboutStartup:false}

  }
  selectedTab(field,e){
   this.setState({aboutStartup : true})
  }
  getPortfolioStartupAboutUsDetails(details,tabName){
    this.props.getAboutus(details,tabName);
  }
  render(){

    return (
      <div>
      {this.state.aboutStartup===false?(<div>
        <h2>Portfolio</h2>
        <div className="col-md-6 col-sm-6 nopadding">
          <div className="panel panel-default panel-form-view">
            <div className="panel-heading">About Us <FontAwesome name='ellipsis-h' className="pull-right ellipsis-menu" onClick={this.selectedTab.bind(this)}/></div>
            <div className="panel-body panel-body-scroll" style={{'height':'384px'}}>
              <h4>Infosis</h4>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
              <p>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-sm-6 nopadding-right">
          <div className="panel panel-default panel-form-view">
            <div className="panel-heading">Rating <FontAwesome name='ellipsis-h' className="pull-right ellipsis-menu"/></div>
            <div className="panel-body">
              Rating
            </div>
          </div>
          <div className="clearfix"></div>
          <div className="col-md-6 col-sm-6 nopadding-left">
            <div className="col-md-12 nopadding"><div className="panel panel-default panel-form-view">
              <div className="panel-heading">Clients <FontAwesome name='ellipsis-h' className="pull-right ellipsis-menu"/></div>
              <div className="panel-body text-center panel-body-scroll">
                <img src="/images/logo.png"/>
                <img src="/images/idea_hub_logo.png"/>
                <img src="/images/nari_preneur_logo.png"/>
              </div>
            </div></div>
            <div className="col-md-12 nopadding"><div className="panel panel-default panel-form-view">
              <div className="panel-heading">Service & Products <FontAwesome name='ellipsis-h' className="pull-right ellipsis-menu"/></div>
              <div className="panel-body panel-body-scroll">
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
              </div>
            </div></div>
          </div>
          <div className="col-md-6 col-sm-6 nopadding"><div className="panel panel-default panel-form-view">
            <div className="panel-heading">Information <FontAwesome name='ellipsis-h' className="pull-right ellipsis-menu"/></div>
            <div className="panel-body">
              <ul className="list-info">
                <li>Lorem Ipsum is simply  printing and typesetting industry.</li>
                <li>Lorem Ipsum is simply dummy text of the printing and industry.</li>
                <li>Lorem Ipsum is simply dummy text of the printing and typesetting.</li>
                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
              </ul>
            </div>
          </div></div>

        </div>

      </div>):(<div>{<MlStartupTab getPortfolioStartupAboutUsDetails={this.getPortfolioStartupAboutUsDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}></MlStartupTab> }</div>)}
      </div>

    )
  }
};
