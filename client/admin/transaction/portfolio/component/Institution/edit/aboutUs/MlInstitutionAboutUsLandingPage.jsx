import React, { Component, PropTypes }  from "react";
import ScrollArea from 'react-scrollbar';
import _ from 'lodash';
var FontAwesome = require('react-fontawesome');
var Rating = require('react-rating');
import MlInstitutionTab from './MlPortfolioInstitutionAboutsUsTabs'
import {fetchDetailsInstitutionActionHandler} from '../../../../actions/findPortfolioInstitutionDetails'
import generateAbsolutePath from '../../../../../../../../lib/mlGenerateAbsolutePath';

import underscore from "underscore";


export default class MlInstitutionAboutUsLandingPage extends Component{
  constructor(props){
    super(props)
    this.state = {aboutInstitution:false,institutionAboutUs:[], institutionAboutUsList:[]}
    this.fetchPortfolioDetails.bind(this);
    this.selectedTab=this.selectedTab.bind(this);
  }
  selectedTab(activeTab){
    this.setState({aboutInstitution : true,activeTab:activeTab})
    this.props.backClickHandler(this.getInstitutionState.bind(this))
  }

  getPortfolioInstitutionAboutUsDetails(details, tabName, privateKey, requiredFields) {
    this.props.getAboutus(details, tabName, privateKey, requiredFields);
  }
  componentDidMount()
  {
    var className = this.props.isAdmin ? "admin_header" : "app_header";
    var WinHeight = $(window).height();
    $('.md_scroll').height(WinHeight-($('.'+className).outerHeight(true)+255));
    $('.sm_scroll').height(WinHeight-($('.'+className).outerHeight(true)+535));
  }

  componentWillMount(){
    if(FlowRouter.getQueryParam('subtab') && FlowRouter.getQueryParam('tab')==='About'){
      this.setState({aboutInstitution: true});
    }
    this.fetchPortfolioDetails();
  }
  async fetchPortfolioDetails() {
    let that = this;
    let portfoliodetailsId=that.props.portfolioDetailsId;
    const response = await fetchDetailsInstitutionActionHandler(portfoliodetailsId);
    if (response) {
      this.setState({loading: false, institutionAboutUs: response, institutionAboutUsList: response});
    }

  }

  getInstitutionState() {
    this.setState({aboutInstitution: false})
    this.props.backClickHandler();

  }

  render(){
    let aboutUsImages=null;
    let institutionAboutUs=this.state.institutionAboutUs;
    if(institutionAboutUs){
      let clients=institutionAboutUs.clients;
      if(clients){
        let logos=[]
        _.map(clients,function(client){
          if(client.logo){
            logos.push(client.logo)
          }
        })
        if(logos.length>0){
             aboutUsImages=logos.map(function (items,id) {
               return ( <img src={generateAbsolutePath(items.fileUrl)} key={id}/>)

              })
        }
      }
    }
    return (
      <div>
      {this.state.aboutInstitution===false?(<div className=" portfolio-main-wrap">
        <ScrollArea
          speed={0.8}
          className="main_wrap_scroll"
          smoothScrolling={true}
          default={true}
        >        <h2>Portfolio</h2>
        <div className="col-md-6 col-sm-6 nopadding">
          <div className="panel panel-default panel-form-view">
            <div className="panel-heading">About Us<a href="" className="pull-right ellipsis-menu"><FontAwesome name='ellipsis-h' onClick={e=>this.selectedTab('About Us')}/></a></div>
            <div className="panel-body">
              <div className="md_scroll">
                <ScrollArea
                  speed={0.8}
                  className="md_scroll"
                  smoothScrolling={true}
                  default={true}
                >
              <p>{this.state.institutionAboutUs.aboutUs&&this.state.institutionAboutUs.aboutUs.institutionDescription}</p>
                </ScrollArea>
              </div>
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
                  initialRate={this.state.institutionAboutUs.rating && this.state.institutionAboutUs.rating.rating ? this.state.institutionAboutUs.rating.rating : 4}
                  readonly={true}
                />
              </div>
            </div>
          </div>
          <div className="clearfix"></div>
          <div className="col-md-6 col-sm-6 nopadding-left">
            <div className="col-md-12 nopadding"><div className="panel panel-default panel-form-view">
              <div className="panel-heading">Clients <a href="" className="pull-right ellipsis-menu"><FontAwesome name='ellipsis-h' onClick={e=>this.selectedTab('Client')}/></a></div>
              <div className="panel-body">
                <div className="sm_scroll">
                  <ScrollArea
                    speed={0.8}
                    className="sm_scroll"
                    smoothScrolling={true}
                    default={true}
                  >
                {aboutUsImages}
                  </ScrollArea>
                </div>
              </div>
            </div></div>
            <div className="col-md-12 nopadding"><div className="panel panel-default panel-form-view">
              <div className="panel-heading">Service & Products <a href="" className="pull-right ellipsis-menu"><FontAwesome name='ellipsis-h' onClick={e=>this.selectedTab('Services And Products')}/></a></div>
              <div className="panel-body">
                <div className="sm_scroll">
                  <ScrollArea
                    speed={0.8}
                    className="sm_scroll"
                    smoothScrolling={true}
                    default={true}
                  >
                <p>{this.state.institutionAboutUs.serviceProducts&&this.state.institutionAboutUs.serviceProducts.spDescription}</p>
                  </ScrollArea>
                </div>
              </div>
            </div></div>
          </div>
          <div className="col-md-6 col-sm-6 nopadding"><div className="panel panel-default panel-form-view">
            <div className="panel-heading">Information <a href="" className="pull-right ellipsis-menu"><FontAwesome name='ellipsis-h' onClick={e=>this.selectedTab('Information')}/></a></div>
            <div className="panel-body">
              <div className="sm_scroll">
                <ScrollArea
                  speed={0.8}
                  className="sm_scroll"
                  smoothScrolling={true}
                  default={true}
                >
              <ul className="list-info">
                <li>{this.state.institutionAboutUs.information&&this.state.institutionAboutUs.information.informationDescription}</li>
              </ul>
                </ScrollArea>
              </div>
            </div>
          </div></div>

        </div>
        </ScrollArea>
      </div>):(<div>{<MlInstitutionTab getInstitutionState={this.getInstitutionState.bind(this)} getPortfolioInstitutionAboutUsDetails={this.getPortfolioInstitutionAboutUsDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} institutionAboutUsDetails={this.state.institutionAboutUs} isApp={this.props.isApp} activeTab={this.state.activeTab||null}></MlInstitutionTab> }</div>)}
      </div>

    )
  }
};
