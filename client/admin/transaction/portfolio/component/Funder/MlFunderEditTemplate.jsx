import React, { Component, PropTypes }  from "react";
import {render} from "react-dom";
import MlTabComponent from "../../../../.././commons/components/tabcomponent/MlTabComponent";
import MlIdeatorDetails from "../Ideator/MlIdeatorDetails";
import _ from 'lodash'
import MlFunderAbout from './MlFunderAbout'
import MlFunderAreaOfInterest from './MlFunderAreaOfInterest'
import MlFunderEngagementMethod from './MlFunderEngagementMethod'
import MlFunderInvestment from './MlFunderInvestment'
import MlFunderLibrary from './MlFunderLibrary'
import MlFunderNews from './MlFunderNews'
import MlFunderPrincipalTeam from './MlFunderPrincipalTeam'
import MlFunderSuccessStories from './MlFunderSuccessStories'

export default class MlFunderEditTemplate extends React.Component{
  constructor(props){
    super(props)
    this.state =  {tabs: [],aboutUs: {}, startupPortfolio:{}};
    this.getChildContext.bind(this)
    this.getManagementDetails.bind(this);
    this.getAwardsDetails.bind(this);
    this.getLookingForDetails.bind(this);
    this.getStartupMCL.bind(this)
  }

  getChildContext(){
    return {
      startupPortfolio: this.state.startupPortfolio
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

      {tabClassName: 'tab', panelClassName: 'panel', title:"About" , component:<MlFunderAbout key="1" getAboutus={this.getAboutus.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Management" , component:<MlFunderInvestment key="2" getManagementDetails={this.getManagementDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Investor" , component:<MlFunderPrincipalTeam key="3" getInvestorDetails={this.getInvestorDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Data" , component:<MlFunderEngagementMethod key="4" portfolioDetailsId={this.props.portfolioDetailsId}/>},
      // {tabClassName: 'tab', panelClassName: 'panel', title:"Charts" , component:<MlIdeatorDetails key="5" getIdeatorDetails={this.getIdeatorDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Awards" , component:<MlFunderAreaOfInterest key="6" getAwardsDetails={this.getAwardsDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Library" , component:<MlFunderSuccessStories key="7" getIdeatorDetails={this.getIdeatorDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"M C & L" , component:<MlFunderLibrary key="8" getStartupMCL={this.getStartupMCL.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Looking For" , component:<MlFunderNews key="9" getLookingForDetails={this.getLookingForDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},


    ]
    return tabs;
  }

  getAboutus(details,tabName){
    let data = this.state.startupPortfolio;
    data[tabName] = details;
    this.props.getPortfolioDetails({startupPortfolio : data});
  }

  getManagementDetails(details){
    let data = this.state.startupPortfolio;
    if(data && !data.management){
      data['management']=[];
    }
    data['management'] = details;
    this.setState({startupPortfolio : data})
    this.props.getPortfolioDetails({startupPortfolio:this.state.startupPortfolio});
  }

  getInvestorDetails(details){

    let data = this.state.startupPortfolio;
    if(data && !data.investor){
      data['investor']=[];
    }
    data['investor'] = details;
    this.setState({startupPortfolio : data})
    this.props.getPortfolioDetails({startupPortfolio:this.state.startupPortfolio});
  }

  getAwardsDetails(details){

    let data = this.state.startupPortfolio;
    if(data && !data.awardsRecognition){
      data['awardsRecognition']=[];
    }
    data['awardsRecognition'] = details;
    this.setState({startupPortfolio : data})
    this.props.getPortfolioDetails({startupPortfolio:this.state.startupPortfolio});
  }

  getLookingForDetails(details){

    let data = this.state.startupPortfolio;
    if(data && !data.lookingFor){
      data['lookingFor']=[];
    }
    data['lookingFor'] = details;
    this.setState({startupPortfolio : data})
    this.props.getPortfolioDetails({startupPortfolio:this.state.startupPortfolio});
  }
  getStartupMCL(details){
    let data = this.state.startupPortfolio;
    if(details.memberships){
      data['memberships'] = details.memberships;
    }
    if(details.compliances){
      data['compliances'] = details.compliances;
    }
    if(details.licenses){
      data['licenses'] = details.licenses;
    }
    this.setState({startupPortfolio : data})
    this.props.getPortfolioDetails({startupPortfolio:this.state.startupPortfolio}, []);
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
MlFunderEditTemplate.childContextTypes = {
  startupPortfolio: PropTypes.object,
};
