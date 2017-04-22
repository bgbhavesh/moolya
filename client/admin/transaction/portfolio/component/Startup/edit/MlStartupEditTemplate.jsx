import React, { Component, PropTypes }  from "react";
import {render} from "react-dom";
import MlTabComponent from "../../../../../../commons/components/tabcomponent/MlTabComponent";
import MlIdeatorDetails from "../../Ideator/MlIdeatorDetails";
import MlStartupManagement from './MlStartupManagement'
import _ from 'lodash'
import MlStartupAboutUs from "./aboutUs/MlStartupAboutUsLandingPage"


export default class MlStartupEditTemplate extends React.Component{
  constructor(props){
    super(props)
    this.state =  {tabs: [],aboutUs: {}, startupPortfolio:{}};
    this.getChildContext.bind(this)
    this.getManagementDetails.bind(this);
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

      {tabClassName: 'tab', panelClassName: 'panel', title:"About" , component:<MlStartupAboutUs key="1" getAboutus={this.getAboutus.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Management" , component:<MlStartupManagement key="2" getManagementDetails={this.getManagementDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Investor" , component:<MlIdeatorDetails key="3" portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Data" , component:<MlIdeatorDetails key="4" portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Charts" , component:<MlIdeatorDetails key="5" portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Awards" , component:<MlIdeatorDetails key="6" portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Library" , component:<MlIdeatorDetails key="7" portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"M C & L" , component:<MlIdeatorDetails key="8" portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Looking For" , component:<MlIdeatorDetails key="9" portfolioDetailsId={this.props.portfolioDetailsId}/>},


    ]
    return tabs;
  }

  getAboutus(details){
    let data = this.state.startupPortfolio;
    data = details;
    this.props.getPortfolioDetails({startupPortfolio : data});
  }

  getManagementDetails(details, indexArray){
    let data = this.state.startupPortfolio;
    if(data && !data.management){
      data['management']=[];
    }
    data['management'] = details;
    this.setState({startupPortfolio : data})
    this.props.getPortfolioDetails({startupPortfolio:this.state.startupPortfolio}, indexArray);
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
MlStartupEditTemplate.childContextTypes = {
  startupPortfolio: PropTypes.object,
};
