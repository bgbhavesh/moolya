import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
import {dataVisibilityHandler, OnLockSwitch} from '../../../../../../utils/formElemUtil';
import _ from 'lodash';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
var Rating = require('react-rating');
import MlPortfolioCompanyAboutsUsTabs from './MlPortfolioCompanyAboutsUsTabs'
import {fetchDetailsCompanyActionHandler} from '../../../../actions/findCompanyPortfolioDetails'
import underscore from "underscore";


export default class MlCompanyAboutUsLandingPage extends React.Component{
  constructor(props){
    super(props)
    this.state = {aboutUsCompany:false,aboutUs:[], aboutUsList:[]}
    this.fetchPortfolioDetails.bind(this);
    this.selectedTab=this.selectedTab.bind(this);
  }
  selectedTab(activeTab){
    this.setState({aboutUsCompany: true,activeTab:activeTab})
    this.props.backClickHandler(this.getState.bind(this))
  }
  getPortfolioAboutUsDetails(details,tabName, privateKey){
    this.props.getAboutus(details,tabName,privateKey);
  }
  componentWillMount(){
    if(FlowRouter.getQueryParam('subtab') && FlowRouter.getQueryParam('tab')==='About'){
      this.setState({aboutUsCompany: true});
    }
    this.fetchPortfolioDetails();
  }
  async fetchPortfolioDetails() {
    let that = this;
    let portfoliodetailsId=that.props.portfolioDetailsId;
    const response = await fetchDetailsCompanyActionHandler(portfoliodetailsId);
    if (response) {
      this.setState({loading: false, aboutUs: response, aboutUsList: response});
    }

  }

  getState() {
    this.setState({aboutUsCompany: false})
    //$('.last-item').removeClass('menunone');
    this.props.backClickHandler();

  }

  render(){
    let aboutUsImages=null;
    let aboutUs=this.state.aboutUs;
    if(aboutUs){
      let clients=aboutUs.clients;
      if(clients){
        let logos=[]
        _.map(clients,function(client){
          if(client.logo){
            logos.push(client.logo)
          }
        })
        if(logos.length>0){
             aboutUsImages=logos.map(function (items,id) {
               return ( <img src={items.fileUrl} key={id}/>)

              })
        }
      }
    }
    return (
      <div>
      {this.state.aboutUsCompany===false?(<div className=" portfolio-main-wrap">
        <ScrollArea
          speed={0.8}
          className="main_wrap_scroll"
          smoothScrolling={true}
          default={true}
        >        <h2>Portfolio</h2>
        <div className="col-md-6 col-sm-6 nopadding">
          <div className="panel panel-default panel-form-view">
            <div className="panel-heading">About Us<a href="" className="pull-right ellipsis-menu"><FontAwesome name='ellipsis-h' onClick={e=>this.selectedTab('About Us')}/></a></div>
            <div className="panel-body panel-body-scroll" style={{'height':'384px'}}>
              <p>{this.state.aboutUs.aboutUs&&this.state.aboutUs.aboutUs.companyDescription}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-sm-6 nopadding-right">
          <div className="panel panel-default panel-form-view">
            <div className="panel-heading ">Rating <a href="" className="pull-right ellipsis-menu"><FontAwesome name='ellipsis-h' onClick={e=>this.selectedTab('Rating')}/></a></div>
            <div className="panel-body rating_small">
              <div className="star_ratings">
                <Rating
                  empty="fa fa-star-o empty"
                  full="fa fa-star fill"
                  fractions={2}
                  initialRate={this.state.aboutUs.rating && this.state.aboutUs.rating.rating ? Number(this.state.aboutUs.rating.rating) : 0}
                  readonly={true}
                />
              </div>
            </div>
          </div>
          <div className="clearfix"></div>
          <div className="col-md-6 col-sm-6 nopadding-left">
            <div className="col-md-12 nopadding"><div className="panel panel-default panel-form-view">
              <div className="panel-heading">Clients <a href="" className="pull-right ellipsis-menu"><FontAwesome name='ellipsis-h' onClick={e=>this.selectedTab('Client')}/></a></div>
              <div className="panel-body text-center panel-body-scroll">
                {aboutUsImages}
              </div>
            </div></div>
            <div className="col-md-12 nopadding"><div className="panel panel-default panel-form-view">
              <div className="panel-heading">Service & Products <a href="" className="pull-right ellipsis-menu"><FontAwesome name='ellipsis-h' onClick={e=>this.selectedTab('Services And Products')}/></a></div>
              <div className="panel-body panel-body-scroll">
                <p>{this.state.aboutUs.serviceProducts&&this.state.aboutUs.serviceProducts.spDescription}</p>
              </div>
            </div></div>
          </div>
          <div className="col-md-6 col-sm-6 nopadding"><div className="panel panel-default panel-form-view">
            <div className="panel-heading">Information <a href="" className="pull-right ellipsis-menu"><FontAwesome name='ellipsis-h' onClick={e=>this.selectedTab('Information')}/></a></div>
            <div className="panel-body panel-body-scroll">
              <ul className="list-info">
                <li>{this.state.aboutUs.information&&this.state.aboutUs.information.informationDescription}</li>
              </ul>
            </div>
          </div></div>

        </div>
        </ScrollArea>
      </div>):(<div>{<MlPortfolioCompanyAboutsUsTabs getState={this.getState.bind(this)} getPortfolioAboutUsDetails={this.getPortfolioAboutUsDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} aboutUsDetails={this.state.aboutUs} isApp={this.props.isApp} activeTab={this.state.activeTab || null}></MlPortfolioCompanyAboutsUsTabs> }</div>)}
      </div>

    )
  }
};
