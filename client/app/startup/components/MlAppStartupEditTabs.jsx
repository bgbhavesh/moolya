import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import MlTabComponent from "../../../commons/components/tabcomponent/MlTabComponent";
import _ from 'lodash'
import MlStartupAboutUs from "../../../admin/transaction/portfolio/component/Startup/edit/aboutUs/MlStartupAboutUsLandingPage"
import MlStartupManagement from "../../../admin/transaction/portfolio/component/Startup/edit/MlStartupManagement"
import MlStartupInvestor from "../../../admin/transaction/portfolio/component/Startup/edit/MlStartupInvestor";
import MlStartupData from "../../../admin/transaction/portfolio/component/Startup/edit/MlStartupData";
import MlStartupCharts from "../../../admin/transaction/portfolio/component/Startup/edit/MlStartupCharts";
import MlStartupAwards from "../../../admin/transaction/portfolio/component/Startup/edit/MlStartupAwards";
import MlStartupMCL from "../../../admin/transaction/portfolio/component/Startup/edit/MlStartupMCL";
import MlStartupLookingFor from "../../../admin/transaction/portfolio/component/Startup/edit/MlStartupLookingFor";
import MlStartupLibrary from '../../../admin/transaction/portfolio/component/Startup/edit/MlStartupLibrary'
import MlVerticalTabComponent from '../../../commons/components/tabcomponent/MlVerticalTabComponent'

export default class MlAppStartupEditTabs extends React.Component{

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
    },200);
  }

  backClickHandler(){
    let tabs = this.state.tabs;
    this.setState({tabs: tabs})
  }

  getTabComponents(){
    let tabs = [

      {tabClassName: 'tab', panelClassName: 'panel', title:"About" , component:<MlStartupAboutUs key="1" getAboutus={this.getAboutus.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} backClickHandler={this.backClickHandler.bind(this)} isApp={true}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Management" , component:<MlStartupManagement key="2" getManagementDetails={this.getManagementDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Investor" , component:<MlStartupInvestor key="3" getInvestorDetails={this.getInvestorDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Data" , component:<MlStartupData key="4" portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Charts" , component:<MlStartupCharts key="5" getStartupCharts={this.getStartupCharts.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Awards" , component:<MlStartupAwards key="6" getAwardsDetails={this.getAwardsDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Library" , component:<MlStartupLibrary key="7"  portfolioDetailsId={this.props.portfolioDetailsId}/>}, //
      {tabClassName: 'tab', panelClassName: 'panel', title:"M C & L" , component:<MlStartupMCL key="8" getStartupMCL={this.getStartupMCL.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Looking For" , component:<MlStartupLookingFor key="9" getLookingForDetails={this.getLookingForDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},


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
    data['investor'] = details;
    this.setState({startupPortfolio : data})
    let arr = [];
    _.each(details, function (obj) {
      let updateItem = _.omit(obj, 'logo');
      arr.push(updateItem)
    })
    data['investor'] = arr;
    this.props.getPortfolioDetails({startupPortfolio: data});
  }

  getAwardsDetails(details){

    let data = this.state.startupPortfolio;
    if(data && !data.awardsRecognition){
      data['awardsRecognition']=[];
    }
    this.setState({startupPortfolio : data})
    let arr = [];
    _.each(details, function (obj) {
      let updateItem = _.omit(obj, 'logo');
      arr.push(updateItem)
    })
    data['awardsRecognition'] = arr;

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

  getStartupCharts(details){

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
    // return  <MlVerticalTabComponent/>
  }

}
MlAppStartupEditTabs.childContextTypes = {
  startupPortfolio: PropTypes.object,
};