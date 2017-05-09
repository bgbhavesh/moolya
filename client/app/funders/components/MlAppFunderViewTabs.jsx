import React, { Component, PropTypes }  from "react";
import {render} from "react-dom";
import MlTabComponent from "../../../commons/components/tabcomponent/MlTabComponent";
import _ from 'lodash'
import MlFunderAboutView from '../../../admin/transaction/portfolio/component/FunderView/MlFunderAboutView'
import MlFunderInvestmentView from '../../../admin/transaction/portfolio/component/FunderView/MlFunderInvestmentView'
import MlFunderEngagementMethodView from '../../../admin/transaction/portfolio/component/FunderView/MlFunderEngagementMethodView'
import MlFunderAreaOfInterestView from '../../../admin/transaction/portfolio/component/FunderView/MlFunderAreaOfInterestView'
import MlFunderLibraryView from '../../../admin/transaction/portfolio/component/FunderView/MlFunderLibraryView'
import MlFunderNewsView from '../../../admin/transaction/portfolio/component/FunderView/MlFunderNewsView'
import MlFunderPrincipalTeamView from '../../../admin/transaction/portfolio/component/FunderView/MlFunderPrincipalTeamView'
import MlFunderSuccessStoriesView from '../../../admin/transaction/portfolio/component/FunderView/MlFunderSuccessStoriesView'

export default class MlAppFunderViewTabs extends React.Component{
  constructor(props){
    super(props)
    this.state =  {tabs: [],aboutUs: {}, funderPortfolio:{}};
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
      {tabClassName: 'tab', panelClassName: 'panel', title:"About" , component:<MlFunderAboutView key="1" portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Investments" , component:<MlFunderInvestmentView key="2" portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Principal & Team" , component:<MlFunderPrincipalTeamView key="3" portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Engagement Methods" , component:<MlFunderEngagementMethodView key="4" portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Area Of Interests" , component:<MlFunderAreaOfInterestView key="6" portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Success Stories" , component:<MlFunderSuccessStoriesView key="7" portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Library" , component:<MlFunderLibraryView key="8" portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"News" , component:<MlFunderNewsView key="9" portfolioDetailsId={this.props.portfolioDetailsId}/>}
    ]
    return tabs;
  }

  componentWillMount()
  {
    let tabs = this.getTabComponents();
    function getTabs() {
      return tabs.map(tab => ({
        tabClassName: 'horizon-item', // Optional
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