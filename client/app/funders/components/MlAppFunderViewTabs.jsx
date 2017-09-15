import React, { Component, PropTypes }  from "react";
import {render} from "react-dom";
import MlTabComponent from "../../../commons/components/tabcomponent/MlTabComponent";
import MlFunderAboutView from '../../../admin/transaction/portfolio/component/FunderView/MlFunderAboutView'
import MlFunderInvestmentView from '../../../admin/transaction/portfolio/component/FunderView/MlFunderInvestmentView'
import MlFunderEngagementMethodView from '../../../admin/transaction/portfolio/component/FunderView/MlFunderEngagementMethodView'
import MlFunderAreaOfInterestView from '../../../admin/transaction/portfolio/component/FunderView/MlFunderAreaOfInterestView'
import MlFunderLibraryView from '../../../admin/transaction/portfolio/component/FunderView/MlFunderLibraryView'
import MlFunderNewsView from '../../../admin/transaction/portfolio/component/FunderView/MlFunderNewsView'
import MlFunderPrincipalTeamView from '../../../admin/transaction/portfolio/component/FunderView/MlFunderPrincipalTeamView'
import MlFunderSuccessStoriesView from '../../../admin/transaction/portfolio/component/FunderView/MlFunderSuccessStoriesView'
import MlFunderLookingForView from '../../../admin/transaction/portfolio/component/FunderView/MlFunderLookingForView'
import MlBeSpokeListView from '../../../admin/transaction/portfolio/component/Funder/Services/Container/MlFunderServicesList'
import {appClient} from '../../core/appConnection'
import PortfolioLibrary from '../../../commons/components/portfolioLibrary/PortfolioLibrary';

export default class MlAppFunderViewTabs extends React.Component{
  constructor(props){
    super(props)
    this.state =  {tabs: [],aboutUs: {}, funderPortfolio:{},activeTab:'About'};
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
      {tabClassName: 'tab', panelClassName: 'panel', title:"About" , component:<MlFunderAboutView key="1" portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Investments" , component:<MlFunderInvestmentView key="2" portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Principals & Team" , component:<MlFunderPrincipalTeamView key="3" portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Engagement Methods" , component:<MlFunderEngagementMethodView key="4" portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Areas Of Interest" , component:<MlFunderAreaOfInterestView key="6" portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Success Stories" , component:<MlFunderSuccessStoriesView key="7" portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Library" , component:<PortfolioLibrary  client={appClient} key="8" portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"News" , component:<MlFunderNewsView key="9" portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Looking For" , component:<MlFunderLookingForView key="11" tabName="lookingFor" portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Services" , component:<MlBeSpokeListView  myPortfolio={true} key="10" portfolioDetailsId={this.props.portfolioDetailsId}/>} //getFunderServicesDetails={this.getFunderServicesDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}
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
        key: tab.title,
        getContent: () => tab.component
      }));
    }
    let activeTab = FlowRouter.getQueryParam('tab');
    if(activeTab){
      this.setState({activeTab});
    }
    this.setState({tabs:getTabs() ||[]});
  }
  updateTab(index){
    let tab =  this.state.tabs[index].title;
    FlowRouter.setQueryParams({ tab: tab });
  }
  render(){
    let tabs = this.state.tabs;
    return <MlTabComponent tabs={tabs} selectedTabKey={this.state.activeTab}  onChange={this.updateTab}/>
  }
}
