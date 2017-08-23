import React, {Component, PropTypes} from "react";
import MlTabComponent from "../../../../../../commons/components/tabcomponent/MlTabComponent";
import _ from "lodash";
import MlInstitutionEditMCL from './MlInstitutionEditMCL';
import MlInstitutionEditManagement from './MlInstitutionEditManagement';
import MlInstitutionEditInvestor from './MlInstitutionEditInvestor';
import MlInstitutionEditAwards from './MlInstitutionEditAwards';
import MlInstitutionEditLookingFor from './MlInstitutionEditLookingFor';
import MlInstitutionEditLibrary from './MlInstitutionEditLibrary';
import MlInstitutionEditChart from './MlInstitutionEditChart';
import MlInstitutionEditData from './MlInstitutionEditData';
import MlInstitutionAboutUs from "./aboutUs/MlInstitutionAboutUsLandingPage";
import MlInstitutionCSREditTabs from "./CSR/MlInstitutionCSREditTabs";
import MlInstitutionEditIntrapreneur from './MlInstitutionEditIntrapreneur';

import {client} from '../../../../../core/apolloConnection'


export default class MlInstitutionEditTab extends Component{
  constructor(props){
    super(props)
    this.state =  {tabs: [], institutionPortfolio:{}};
    this.getChildContext.bind(this)
    this.getManagementDetails.bind(this);
    this.getAwardsDetails.bind(this);
    this.getLookingForDetails.bind(this);
    this.getInstitutionMCL.bind(this)
  }

  componentWillMount() {
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

  getChildContext(){
    return {
      institutionPortfolio: this.state.institutionPortfolio
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
      {tabClassName: 'tab', panelClassName: 'panel', title:"About" , component:<MlInstitutionAboutUs key="1" getAboutus={this.getAboutus.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} backClickHandler={this.backClickHandler.bind(this)}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Management" , component:<MlInstitutionEditManagement  client={client} isAdmin={true} key="2" getManagementDetails={this.getManagementDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Investor" , component:<MlInstitutionEditInvestor key="3" getInvestorDetails={this.getInvestorDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Data" , component:<MlInstitutionEditData key="4" getInvestorDetails={this.getInvestorDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Charts" , component:<MlInstitutionEditChart key="5" getInvestorDetails={this.getInvestorDetails.bind(this)} getChartDetails={this.getChartDetails.bind(this)}portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Awards" , component:<MlInstitutionEditAwards key="6" getAwardsDetails={this.getAwardsDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Library" , component:<MlInstitutionEditLibrary key="7" client={client} isAdmin={true} getInvestorDetails={this.getInvestorDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"M C & L" , component:<MlInstitutionEditMCL key="8" getInstitutionMCL={this.getInstitutionMCL.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Looking For" , component:<MlInstitutionEditLookingFor key="9" getLookingForDetails={this.getLookingForDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"CSR" , component:<MlInstitutionCSREditTabs key="10" getCSRDetails={this.getCSRDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      //{tabClassName: 'tab', panelClassName: 'panel', title:"R&D" , component:<MlInstitutionEditAwards key="11" getAwardsDetails={this.getAwardsDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Intrapreneur" , component:<MlInstitutionEditIntrapreneur key="12" getIntrapreneurDetails={this.getIntrapreneurDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
    ];
    return tabs;
  }

  getAboutus(details, tabName, privateKey){
    let data = this.state.institutionPortfolio;
    data[tabName] = details;
    this.props.getPortfolioDetails({institutionPortfolio : data}, privateKey);
  }

  getManagementDetails(details, privateKey){
    let data = this.state.institutionPortfolio;
    if(data && !data.management){
      data['management']=[];
    }
    data['management'] = details;
    this.setState({institutionPortfolio : data})
    this.props.getPortfolioDetails({institutionPortfolio:this.state.institutionPortfolio}, privateKey);
  }

  getInvestorDetails(details, privateKey){
    let data = this.state.institutionPortfolio;
    data['investor'] = details;
    this.setState({institutionPortfolio : data})
    let arr = [];
    _.each(details, function (obj) {
      let updateItem = _.omit(obj, 'logo');
      arr.push(updateItem)
    })
    data['investor'] = arr;
    this.props.getPortfolioDetails({institutionPortfolio: data}, privateKey);
  }

  getAwardsDetails(details, privateKey){

    let data = this.state.institutionPortfolio;
    if(data && !data.awardsRecognition){
      data['awardsRecognition']=[];
    }
    this.setState({institutionPortfolio : data})
    let arr = [];
    _.each(details, function (obj) {
      let updateItem = _.omit(obj, 'logo');
      arr.push(updateItem)
    })
    data['awardsRecognition'] = arr;

    this.props.getPortfolioDetails({institutionPortfolio:this.state.institutionPortfolio}, privateKey);
  }

  getIntrapreneurDetails(details, privateKey){

    let data = this.state.institutionPortfolio;
    if(data && !data.intrapreneurRecognition){
      data['intrapreneurRecognition']=[];
    }
    this.setState({institutionPortfolio : data})
    let arr = [];
    _.each(details, function (obj) {
      let updateItem = _.omit(obj, 'logo');
      arr.push(updateItem)
    })
    data['intrapreneurRecognition'] = arr;

    this.props.getPortfolioDetails({institutionPortfolio:this.state.institutionPortfolio}, privateKey);
  }

  getLookingForDetails(details, privateKey){
    let data = this.state.institutionPortfolio;
    if(data && !data.lookingFor){
      data['lookingFor']=[];
    }
    data['lookingFor'] = details;
    this.setState({institutionPortfolio : data})
    this.props.getPortfolioDetails({institutionPortfolio:this.state.institutionPortfolio}, privateKey);
  }


  getChartDetails(details,tabName){
    let data = this.state.institutionPortfolio;
    data[tabName] = details;
    this.props.getPortfolioDetails({institutionPortfolio : data});

  }


  getInstitutionMCL(details, privateKey){
    let data = this.state.institutionPortfolio;
    if(details.memberships){
      data['memberships'] = details.memberships;
    }
    if(details.compliances){
      data['compliances'] = details.compliances;
    }
    if(details.licenses){
      data['licenses'] = details.licenses;
    }
    this.setState({institutionPortfolio : data})
    this.props.getPortfolioDetails({institutionPortfolio:this.state.institutionPortfolio}, privateKey);
  }

  getCSRDetails(details,tabName, privateKey){

    let data = this.state.institutionPortfolio;
    data[tabName] = details;
    this.props.getPortfolioDetails({institutionPortfolio : data}, privateKey);
  }

  render(){
    let tabs = this.state.tabs;
    return <MlTabComponent tabs={tabs}/>
  }
}
MlInstitutionEditTab.childContextTypes = {
  institutionPortfolio: PropTypes.object,
};
