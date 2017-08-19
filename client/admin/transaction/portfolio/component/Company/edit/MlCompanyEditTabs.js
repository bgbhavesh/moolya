import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import MlTabComponent from "../../../../../../commons/components/tabcomponent/MlTabComponent";
import MlCompanyManagement from "./MlCompanyManagement";
import _ from "lodash";
import MlCompanyAboutUs from "./about/MlCompanyAboutUsLandingPage";
import MlCompanyData from "./MlCompanyData";
import MlCompanyAwards from "./MlCompanyAwards";
import MlCompanyMCL from "./MlCompanyMCL";
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

      {tabClassName: 'tab', panelClassName: 'panel', title:"About" , component:<MlCompanyAboutUs key="1" getAboutus={this.getAboutus.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} backClickHandler={this.backClickHandler.bind(this)}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Management" , component:<MlCompanyManagement  client={client} isAdmin={true} key="2" getManagementDetails={this.getManagementDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Data" , component:<MlCompanyData key="4" isApp={false} client={client} getDataDetails={this.getDataDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      // {tabClassName: 'tab', panelClassName: 'panel', title:"Charts" , component:<MlStartupCharts key="5" getChartDetails={this.getChartDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Awards" , component:<MlCompanyAwards key="6" getAwardsDetails={this.getAwardsDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Library" , component:<PortfolioLibrary key="7" client={client} isAdmin={false} portfolioDetailsId={this.props.portfolioDetailsId}/>}, //
      {tabClassName: 'tab', panelClassName: 'panel', title:"M C & L" , component:<MlCompanyMCL key="8" getMCL={this.getMCL.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},


    ]
    return tabs;
  }

  getAboutus(details,tabName){
    let data = this.state.companyPortfolio;
    data[tabName] = details;
    this.props.getPortfolioDetails({companyPortfolio : data});
  }

  getDataDetails(details,tabName){
    let data = this.state.companyPortfolio;
    data[tabName] = details;
    this.props.getPortfolioDetails({companyPortfolio : data});
  }

  getManagementDetails(details){
    let data = this.state.companyPortfolio;
    if(data && !data.management){
      data['management']=[];
    }
    data['management'] = details;
    this.setState({companyPortfolio : data})
    this.props.getPortfolioDetails({companyPortfolio:this.state.companyPortfolio});
  }

  getAwardsDetails(details){

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

    this.props.getPortfolioDetails({companyPortfolio:this.state.companyPortfolio});
  }

  getMCL(details){
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
    this.props.getPortfolioDetails({companyPortfolio:this.state.companyPortfolio}, []);
  }

  getChartDetails(details,tabName){
    let data = this.state.companyPortfolio;
    data[tabName] = details;
    this.props.getPortfolioDetails({companyPortfolio : data});

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
