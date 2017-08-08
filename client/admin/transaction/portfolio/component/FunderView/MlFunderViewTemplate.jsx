import React, { Component, PropTypes }  from "react";
import {render} from "react-dom";
import MlTabComponent from "../../../../.././commons/components/tabcomponent/MlTabComponent";
import MlIdeatorDetails from "../Ideator/MlIdeatorDetails";
import _ from 'lodash'
import MlFunderAboutView from './MlFunderAboutView'
import MlFunderInvestmentView from './MlFunderInvestmentView'
import MlFunderEngagementMethodView from './MlFunderEngagementMethodView'

import MlFunderAreaOfInterestView from './MlFunderAreaOfInterestView'
import MlFunderLibraryView from './MlFunderLibraryView'
import MlFunderNewsView from './MlFunderNewsView'
import PortfolioLibrary from '../../../../../commons/components/portfolioLibrary/PortfolioLibrary'
import MlFunderPrincipalTeamView from './MlFunderPrincipalTeamView'
import MlFunderSuccessStoriesView from './MlFunderSuccessStoriesView'
import {client} from '../../../../core/apolloConnection'

export default class MlFunderViewTemplate extends React.Component{
  constructor(props){
    super(props)
    this.state =  {tabs: [],aboutUs: {}, funderPortfolio:{}};
    this.getChildContext.bind(this)
    this.getInvestmentsDetails.bind(this);
    this.getFunderNewsDetails.bind(this);
    this.getFunderLibrary.bind(this)
  }

  getChildContext(){
    return {
      funderPortfolio: this.state.funderPortfolio
    }
  }

  componentDidMount(){
    setTimeout(function(){
      $('div[role="tab"]').each(function( index ) {
        var test = $(this).text();
        $(this).empty();
        $(this).html('<div class="moolya_btn moolya_btn_in">'+test+'</div>');
      });
      $('.RRT__tabs').addClass('horizon-swiper');
      $('.RRT__tab').addClass('horizon-item');
      $('.horizon-swiper').horizonSwiper();
    },300);
  }

  getTabComponents(){
    let tabs = [
      {tabClassName: 'tab', panelClassName: 'panel', title:"About" , component:<MlFunderAboutView client={client} isAdmin={true}  key="1" getAboutus={this.getAboutus.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Investments" , component:<MlFunderInvestmentView client={client} isAdmin={true}  key="2" getInvestmentsDetails={this.getInvestmentsDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Principals & Team" , component:<MlFunderPrincipalTeamView client={client} isAdmin={true}  key="3" getPrincipalDetails={this.getPrincipalDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Engagement Methods" , component:<MlFunderEngagementMethodView client={client} isAdmin={true}  key="4" portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Areas Of Interest" , component:<MlFunderAreaOfInterestView client={client} isAdmin={true}  key="6" getAreaOfInterestDetails={this.getAreaOfInterestDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Success Stories" , component:<MlFunderSuccessStoriesView client={client} isAdmin={true}  key="7" getSuccessStoriesDetails={this.getSuccessStoriesDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Library" , component:<PortfolioLibrary client={client} isAdmin={true} key="8" getFunderLibrary={this.getFunderLibrary.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"News" , component:<MlFunderNewsView key="9" client={client} isAdmin={true}  getFunderNewsDetails={this.getFunderNewsDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>}
    ]
    return tabs;
  }
  getSuccessStoriesDetails(details){
    let data = this.state.funderPortfolio;
    data['portfolioIdeatorDetails']=details;
    this.setState({ideatorPortfolio : data})
    // this.state.ideatorPortfolio['portfolioIdeatorDetails'] = details;
    // this.setState({ideatorDetails:details})
    this.props.getPortfolioDetails({ideatorPortfolio:this.state.ideatorPortfolio});
  }
  getAboutus(details,tabName){
    let data = this.state.funderPortfolio;
    data[tabName] = details;
    this.props.getPortfolioDetails({funderPortfolio : data});
  }

  getInvestmentsDetails(details){
    let data = this.state.funderPortfolio;
    if(data && !data.management){
      data['management']=[];
    }
    data['management'] = details;
    this.setState({funderPortfolio : data})
    this.props.getPortfolioDetails({funderPortfolio:this.state.funderPortfolio});
  }

  getPrincipalDetails(details){
    let data = this.state.funderPortfolio;
    if(data && !data.investor){
      data['investor']=[];
    }
    data['investor'] = details;
    this.setState({funderPortfolio : data})
    this.props.getPortfolioDetails({funderPortfolio:this.state.funderPortfolio});
  }

  getAreaOfInterestDetails(details){
    let data = this.state.funderPortfolio;
    if(data && !data.awardsRecognition){
      data['awardsRecognition']=[];
    }
    data['awardsRecognition'] = details;
    this.setState({funderPortfolio : data})
    this.props.getPortfolioDetails({funderPortfolio:this.state.funderPortfolio});
  }

  getFunderNewsDetails(details){
    let data = this.state.funderPortfolio;
    if(data && !data.lookingFor){
      data['lookingFor']=[];
    }
    data['lookingFor'] = details;
    this.setState({funderPortfolio : data})
    this.props.getPortfolioDetails({funderPortfolio:this.state.funderPortfolio});
  }

  getFunderLibrary(details){
    let data = this.state.funderPortfolio;
    if(details.memberships){
      data['memberships'] = details.memberships;
    }
    if(details.compliances){
      data['compliances'] = details.compliances;
    }
    if(details.licenses){
      data['licenses'] = details.licenses;
    }
    this.setState({funderPortfolio : data})
    this.props.getPortfolioDetails({funderPortfolio:this.state.funderPortfolio}, []);
  }

  componentWillMount()
  {
    let tabs = this.getTabComponents();
    function getTabs() {
      return tabs.map(tab => ({
        tabClassName: 'moolya_btn', // Optional
        panelClassName: 'panel1', // Optional
        title: tab.title,
        getContent: () => tab.component
      }));
    }
    this.setState({tabs:getTabs() ||[]});
  }

  render(){
    let tabs = this.state.tabs;
    return <MlTabComponent tabs={tabs}/>
  }
}
MlFunderViewTemplate.childContextTypes = {
  funderPortfolio: PropTypes.object,
};
