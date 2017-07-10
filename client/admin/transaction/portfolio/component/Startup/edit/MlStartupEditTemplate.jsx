import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import MlTabComponent from "../../../../../../commons/components/tabcomponent/MlTabComponent";
import MlStartupManagement from "./MlStartupManagement";
import _ from "lodash";
import MlStartupAboutUs from "./aboutUs/MlStartupAboutUsLandingPage";
import MlStartupInvestor from "./MlStartupInvestor";
import MlStartupData from "./MlStartupData";
import MlStartupAwards from "./MlStartupAwards";
import MlStartupMCL from "./MlStartupMCL";
import MlStartupLookingFor from "./MlStartupLookingFor";
import PortfolioLibrary from '../../../../../../commons/genericComponents/portfolioLibrary'
import {client} from '../../../../../core/apolloConnection'


export default class MlStartupEditTemplate extends React.Component{
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
    },10);
  }

  backClickHandler(){
    let tabs = this.state.tabs;
    this.setState({tabs: tabs})
  }

  getTabComponents(){
    let tabs = [

      {tabClassName: 'tab', panelClassName: 'panel', title:"About" , component:<MlStartupAboutUs key="1" getAboutus={this.getAboutus.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} backClickHandler={this.backClickHandler.bind(this)}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Management" , component:<MlStartupManagement key="2" getManagementDetails={this.getManagementDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Investor" , component:<MlStartupInvestor key="3" getInvestorDetails={this.getInvestorDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Data" , component:<MlStartupData key="4" portfolioDetailsId={this.props.portfolioDetailsId}/>},
      // {tabClassName: 'tab', panelClassName: 'panel', title:"Charts" , component:<MlIdeatorDetails key="5" getIdeatorDetails={this.getIdeatorDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Awards" , component:<MlStartupAwards key="6" getAwardsDetails={this.getAwardsDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Library" , component:<PortfolioLibrary key="7" client={client} isAdmin={true} portfolioDetailsId={this.props.portfolioDetailsId}/>}, //
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
MlStartupEditTemplate.childContextTypes = {
  startupPortfolio: PropTypes.object,
};
