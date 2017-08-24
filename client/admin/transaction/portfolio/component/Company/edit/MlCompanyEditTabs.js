import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import MlTabComponent from "../../../../../../commons/components/tabcomponent/MlTabComponent";
import MlCompanyManagement from "./MlCompanyManagement";
import _ from "lodash";
import MlCompanyAboutUsLandingPage from "./about/MlCompanyAboutUsLandingPage";
import MlCompanyData from "./MlCompanyData";
import MlCompanyAwards from "./MlCompanyAwards";
import MlCompanyMCL from "./MlCompanyMCL";
import MlCompanyIncubatorsEditTabs from "./incubators/MlCompanyIncubatorsEditTabs"
import MlCompanyPartners from "./MlCompanyPartners";
import MlCompanyCSREditTabs from "./CSR/MlCompanyCSREditTabs"
import MlCompanyIntrapreneur from './MlCompanyIntrapreneur'
import MlCompanyRAndD from './MlCompanyR&D'
import PortfolioLibrary from '../../../../../../commons/components/portfolioLibrary/PortfolioLibrary'
// import MlStartupCharts from "./MlStartupCharts/MlStartupCharts";
import {client} from '../../../../../core/apolloConnection'


export default class MlCompanyEditTabs extends React.Component{
  constructor(props){
    super(props)
    this.state =  {tabs: [],aboutUs: {}, companyPortfolio:{}};
    this.getChildContext.bind(this)
    this.getManagementDetails.bind(this);
    this.getAwardsDetails.bind(this);
    this.getMCL.bind(this)
  }

  getChildContext(){
    return {
      companyPortfolio: this.state.companyPortfolio
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

      {tabClassName: 'tab', panelClassName: 'panel', title:"About" , component:<MlCompanyAboutUsLandingPage key="1" client={client} getAboutus={this.getAboutus.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} backClickHandler={this.backClickHandler.bind(this)}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Management" , component:<MlCompanyManagement  client={client} isAdmin={true} key="2" getManagementDetails={this.getManagementDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Data" , component:<MlCompanyData key="4" isApp={false} client={client} getDataDetails={this.getDataDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Awards" , component:<MlCompanyAwards key="6" client={client} getAwardsDetails={this.getAwardsDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Library" , component:<PortfolioLibrary key="7" client={client} isAdmin={false} portfolioDetailsId={this.props.portfolioDetailsId}/>}, //
      {tabClassName: 'tab', panelClassName: 'panel', title:"M C & L" , component:<MlCompanyMCL key="8" client={client} getMCL={this.getMCL.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Incubators" , component:<MlCompanyIncubatorsEditTabs key="9" client={client} getIncubators={this.getIncubators.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} backClickHandler={this.backClickHandler.bind(this)}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Partners" , component:<MlCompanyPartners key="10" client={client} getPartnersDetails={this.getPartnersDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"CSR" , component:<MlCompanyCSREditTabs key="11" client={client} getCSRDetails={this.getCSRDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} backClickHandler={this.backClickHandler.bind(this)}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"R&D" , component:<MlCompanyRAndD key="13" client={client} getRDDetails={this.getRDDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Intrapreneur" , component:<MlCompanyIntrapreneur key="12" client={client} getIntrapreneurDetails={this.getIntrapreneurDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
    ]
    return tabs;
  }

  getAboutus(details,tabName, privateKey){
    let data = this.state.companyPortfolio;
    data[tabName] = details;
    this.props.getPortfolioDetails({companyPortfolio : data}, privateKey);
  }

  getDataDetails(details,tabName){
    let data = this.state.companyPortfolio;
    data[tabName] = details;
    this.props.getPortfolioDetails({companyPortfolio : data});
  }

  getManagementDetails(details, privateKey){
    let data = this.state.companyPortfolio;
    if(data && !data.management){
      data['management']=[];
    }
    data['management'] = details;
    this.setState({companyPortfolio : data})
    this.props.getPortfolioDetails({companyPortfolio:this.state.companyPortfolio}, privateKey);
  }

  getAwardsDetails(details, privateKey){

    let data = this.state.companyPortfolio;
    if(data && !data.awardsRecognition){
      data['awardsRecognition']=[];
    }
    this.setState({companyPortfolio : data})
    let arr = [];
    _.each(details, function (obj) {
      let updateItem = _.omit(obj, 'logo');
      arr.push(updateItem)
    })
    data['awardsRecognition'] = arr;

    this.props.getPortfolioDetails({companyPortfolio:this.state.companyPortfolio}, privateKey);
  }

  getMCL(details, privateKey){
    let data = this.state.companyPortfolio;
    if(details.memberships){
      data['memberships'] = details.memberships;
    }
    if(details.compliances){
      data['compliances'] = details.compliances;
    }
    if(details.licenses){
      data['licenses'] = details.licenses;
    }
    this.setState({companyPortfolio : data})
    this.props.getPortfolioDetails({companyPortfolio:this.state.companyPortfolio}, privateKey);
  }

  getChartDetails(details,tabName){
    let data = this.state.companyPortfolio;
    data[tabName] = details;
    this.props.getPortfolioDetails({companyPortfolio : data});
  }

  getIncubators (details,tabName, privateKey){
    let data = this.state.companyPortfolio;
    data[tabName] = details;
    this.props.getPortfolioDetails({companyPortfolio : data}, privateKey);
  }

  getPartnersDetails(details, privateKey){

    let data = this.state.companyPortfolio;
    if(data && !data.partners){
      data['partners']=[];
    }
    this.setState({companyPortfolio : data})
    let arr = [];
    _.each(details, function (obj) {
      let updateItem = _.omit(obj, 'logo');
      arr.push(updateItem)
    })
    data['partners'] = arr;

    this.props.getPortfolioDetails({companyPortfolio:this.state.companyPortfolio}, privateKey);
  }
  getCSRDetails(details,tabName, privateKey){

    let data = this.state.companyPortfolio;
    data[tabName] = details;
    this.props.getPortfolioDetails({companyPortfolio : data}, privateKey);
  }
  getRDDetails(details, privateKey){
    let data = this.state.companyPortfolio;
    if(data && !data.awardsRecognition){
      data['researchAndDevelopment']=[];
    }
    this.setState({companyPortfolio : data})
    let arr = [];
    _.each(details, function (obj) {
      let updateItem = _.omit(obj, 'logo');
      arr.push(updateItem)
    })
    data['researchAndDevelopment'] = arr;

    this.props.getPortfolioDetails({companyPortfolio:this.state.companyPortfolio}, privateKey);

  }

  getIntrapreneurDetails(details, privateKey){

    let data = this.state.companyPortfolio;
    if(data && !data.intrapreneurRecognition){
      data['intrapreneurRecognition']=[];
    }
    this.setState({companyPortfolio : data})
    let arr = [];
    _.each(details, function (obj) {
      let updateItem = _.omit(obj, 'logo');
      arr.push(updateItem)
    })
    data['intrapreneurRecognition'] = arr;

    this.props.getPortfolioDetails({companyPortfolio:this.state.companyPortfolio}, privateKey);
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
MlCompanyEditTabs.childContextTypes = {
  companyPortfolio: PropTypes.object,
};
