
/**
 * Import of all the usable components
 * */
import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import MlTabComponent from "../../../../commons/components/tabcomponent/MlTabComponent";
import {appClient} from '../../../core/appConnection'
import MlCompanyManagement from '../../../../admin/transaction/portfolio/component/Company/edit/MlCompanyManagement';
import MlCompanyAboutUsLandingPage from "../../../../admin/transaction/portfolio/component/Company/edit/about/MlCompanyAboutUsLandingPage";
import MlCompanyData from "../../../../admin/transaction/portfolio/component/Company/edit/MlCompanyData";
import MlCompanyAwards from "../../../../admin/transaction/portfolio/component/Company/edit/MlCompanyAwards";
import MlCompanyMCL from "../../../../admin/transaction/portfolio/component/Company/edit/MlCompanyMCL";
import MlCompanyIncubatorsEditTabs from "../../../../admin/transaction/portfolio/component/Company/edit/incubators/MlCompanyIncubatorsEditTabs"
import MlCompanyPartners from "../../../../admin/transaction/portfolio/component/Company/edit/MlCompanyPartners";
import MlCompanyCSREditTabs from "../../../../admin/transaction/portfolio/component/Company/edit/CSR/MlCompanyCSREditTabs"
import MlCompanyIntrapreneur from '../../../../admin/transaction/portfolio/component/Company/edit/MlCompanyIntrapreneur'
import MlCompanyRAndD from '../../../../admin/transaction/portfolio/component/Company/edit/MlCompanyR&D'
import MlCompanyLookingFor from '../../../../admin/transaction/portfolio/component/Company/edit/MlCompanyLookingFor'
import MlCompanyCharts from "../../../../admin/transaction/portfolio/component/Company/edit/MlCompanyEditCharts";
import PortfolioLibrary from '../../../../commons/components/portfolioLibrary/PortfolioLibrary'

export default class MlAppCompaniesEditTabs extends Component {
  constructor(props) {
    super(props)
    this.state = {tabs: [], companyPortfolio: {}, portfolioKeys: {privateKeys: [], removePrivateKeys: []}};
    this.getChildContext.bind(this)
  }

  getChildContext() {
    return {
      companyPortfolio: this.state.companyPortfolio,
      portfolioKeys: this.state.portfolioKeys
    }
  }
  setBackHandler(backMethod){
    this.props.setBackHandler(backMethod);
    $('.RRT__tabs').removeClass('menunone');
  }
  backClickHandler(){
    let tabs = this.state.tabs;
    this.setState({tabs: tabs})
  }

  componentDidMount() {
    // setTimeout(function () {
    //   $('div[role="tab"]').each(function (index) {
    //     var test = $(this).text();
    //     $(this).empty();
    //     $(this).html('<div class="moolya_btn moolya_btn_in">' + test + '</div>');
    //   });
    //   $('.RRT__tabs').addClass('horizon-swiper');
    //   $('.RRT__tab').addClass('horizon-item');
    //   $('.horizon-swiper').horizonSwiper();
    // }, 300);
  }

  /**
   * Display of all tabs of service provider and passing the portfolioId
   * */
  getTabComponents() {
    let tabs = [
      {tabClassName: 'tab', panelClassName: 'panel', title:"About" , component:<MlCompanyAboutUsLandingPage key="1" client={appClient} getAboutus={this.getAboutus.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} backClickHandler={this.setBackHandler.bind(this)} isApp={true}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Management" , component:<MlCompanyManagement  client={appClient} isAdmin={true} key="2" getManagementDetails={this.getManagementDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Data" , component:<MlCompanyData key="4" isApp={false} client={appClient} getDataDetails={this.getDataDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Charts" , component:<MlCompanyCharts key="5" client={appClient} isAdmin={false}  getChartDetails={this.getChartDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}  backClickHandler={this.setBackHandler.bind(this)} isApp={true}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Awards" , component:<MlCompanyAwards key="6" getAwardsDetails={this.getAwardsDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Library" , component:<PortfolioLibrary key="7" client={appClient} isAdmin={false} portfolioDetailsId={this.props.portfolioDetailsId}/>}, //
      {tabClassName: 'tab', panelClassName: 'panel', title:"M C & L" , component:<MlCompanyMCL key="8" client={appClient} getMCL={this.getMCL.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Incubators" , component:<MlCompanyIncubatorsEditTabs key="9" client={appClient} getIncubators={this.getIncubators.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} backClickHandler={this.setBackHandler.bind(this)} isApp={true}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Partners" , component:<MlCompanyPartners key="10" client={appClient} getPartnersDetails={this.getPartnersDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"CSR" , component:<MlCompanyCSREditTabs key="11" client={appClient} getCSRDetails={this.getCSRDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} backClickHandler={this.setBackHandler.bind(this)} isApp={true}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"R&D" , component:<MlCompanyRAndD key="13" client={appClient} getRDDetails={this.getRDDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Intrapreneur" , component:<MlCompanyIntrapreneur key="12" client={appClient} getIntrapreneurDetails={this.getIntrapreneurDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Looking For" , component:<MlCompanyLookingFor key="14" client={appClient} getLookingForDetails={this.getLookingForDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
    ]
    return tabs;
  }

  /**
   * getting all values from the child components and passing all to Main component through props
   * */
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
    if(tabName == "reports"){
      let data = this.state.companyPortfolio;
      data[tabName] = details;
      this.props.getPortfolioDetails({companyPortfolio : data});
    }else{
      let data = this.state.companyPortfolio;
      data[tabName] = details;
      this.props.getPortfolioDetails({companyPortfolio : data}, privateKey);
    }
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

  getLookingForDetails(details, privatekey) {

    let data = this.state.companyPortfolio;
    if (data && !data.lookingFor) {
      data['lookingFor'] = [];
    }
    data['lookingFor'] = details;
    this.setState({companyPortfolio: data})
    this.props.getPortfolioDetails({companyPortfolio: this.state.companyPortfolio}, privatekey);
  }
  /**
   * tab mounting component
   * */
  componentWillMount() {
    let tabs = this.getTabComponents();

    function getTabs() {
      return tabs.map(tab => ({
        tabClassName: 'horizon-item', // Optional
        panelClassName: 'panel1', // Optional
        title: tab.title,
        getContent: () => tab.component
      }));
    }

    this.setState({tabs: getTabs() || []});
  }

  getAllPrivateKeys(privateKeys, removePrivateKeys) {
    let obj = {
      privateKeys:privateKeys,
      removePrivateKeys:removePrivateKeys
    }
    this.setState({portfolioKeys: obj});
    return obj
  }

  componentWillReceiveProps(newProps) {
    console.log('newProps', newProps);
    if (newProps) {
      const resp = this.getAllPrivateKeys(newProps.privateKeys, newProps.removePrivateKeys);
      return resp
    }
  }
  render() {
    let tabs = this.state.tabs;
    return <MlTabComponent tabs={tabs}/>
  }
}

/**
 * preparing context of all the data coming from child component
 * */
MlAppCompaniesEditTabs.childContextTypes = {
  companyPortfolio: PropTypes.object,
  portfolioKeys: PropTypes.object
};
