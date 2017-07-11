import React, { Component, PropTypes }  from "react";
import {render} from "react-dom";
import MlTabComponent from "../../../commons/components/tabcomponent/MlTabComponent";
import _ from 'lodash'
import {getProfileBasedOnPortfolio} from '../../../app/calendar/manageScheduler/service/actions/MlServiceActionHandler'
import MlFunderAbout from '../../../admin/transaction/portfolio/component/Funder/MlFunderAbout'
import MlFunderAreaOfInterest from '../../../admin/transaction/portfolio/component/Funder/MlFunderAreaOfInterest'
import MlFunderEngagementMethod from '../../../admin/transaction/portfolio/component/Funder/MlFunderEngagementMethod'
import MlFunderInvestment from '../../../admin/transaction/portfolio/component/Funder/MlFunderInvestment'
import PortfolioLibrary from '../../../commons/components/portfolioLibrary/PortfolioLibrary';
import MlFunderNews from '../../../admin/transaction/portfolio/component/Funder/MlFunderNews'
import MlFunderPrincipalTeam from '../../../admin/transaction/portfolio/component/Funder/MlFunderPrincipalTeam'
import MlFunderSuccessStories from '../../../admin/transaction/portfolio/component/Funder/MlFunderSuccessStories'
import MlFunderServices from '../../../admin/transaction/portfolio/component/Funder/MlFunderServices'
import FunderCreateServicesView from '../../../admin/transaction/portfolio/component/Funder/funderCreateServicesView'
import {appClient} from '../../core/appConnection'

export default class MlAppFunderEditTabs extends React.Component{
  constructor(props){
    super(props)
    this.state =  {tabs: [],aboutUs: {}, funderPortfolio:{}};
    this.getChildContext.bind(this)
    this.getInvestmentsDetails.bind(this);
    this.getFunderNewsDetails.bind(this);
    this.getFunderLibrary.bind(this);
    this.getServiceDetails.bind(this);
    this.saveDataToServices.bind(this);
  }

  getChildContext(){
    return {
      funderPortfolio: this.state.funderPortfolio
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
      {tabClassName: 'tab', panelClassName: 'panel', title:"Investments" , component:<MlFunderInvestment key="2" getInvestmentsDetails={this.getInvestmentsDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Principal & Team" , component:<MlFunderPrincipalTeam key="3" getPrincipalDetails={this.getPrincipalDetails.bind(this)} getTeamDetails={this.getTeamDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Engagement Methods" , component:<MlFunderEngagementMethod key="4" portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Area Of Interests" , component:<MlFunderAreaOfInterest key="6" getAreaOfInterestDetails={this.getAreaOfInterestDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Success Stories" , component:<MlFunderSuccessStories key="7" getSuccessStoriesDetails={this.getSuccessStoriesDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Library" , component:<PortfolioLibrary client={appClient} isAdmin={false} key="8" getFunderLibrary={this.getFunderLibrary.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"News" , component:<MlFunderNews key="9" getFunderNewsDetails={this.getFunderNewsDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Services" , component:<FunderCreateServicesView key="10" getServiceDetails={this.getServiceDetails.bind(this)}  portfolioDetailsId={this.props.portfolioDetailsId}/>} //getFunderServicesDetails={this.getFunderServicesDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}
    ]
    return tabs;
  }

  getSuccessStoriesDetails(details){
    let data = this.state.funderPortfolio;
    data['successStories'] = details;
    this.setState({funderPortfolio : data})
    this.props.getPortfolioDetails({funderPortfolio:this.state.funderPortfolio});
  }

  getAboutus(details){
    let data = this.state.funderPortfolio;
    data['funderAbout']=details;
    this.setState({funderPortfolio : data})
    this.props.getPortfolioDetails({funderPortfolio : this.state.funderPortfolio});
  }

  getInvestmentsDetails(details){
    let data = this.state.funderPortfolio;
    data['investments'] = details;
    this.setState({funderPortfolio : data})
    this.props.getPortfolioDetails({funderPortfolio:this.state.funderPortfolio});
  }

  getPrincipalDetails(details){
    let data = this.state.funderPortfolio;
    if(data && !data.principal){
      data['principal']=[];
    }
    data['principal'] = details;
    this.setState({funderPortfolio : data})
    this.props.getPortfolioDetails({funderPortfolio:this.state.funderPortfolio});
  }
  getTeamDetails(details){
    let data = this.state.funderPortfolio;
    if(data && !data.team){
      data['team']=[];
    }
    data['team'] = details;
    this.setState({funderPortfolio : data})
    this.props.getPortfolioDetails({funderPortfolio:this.state.funderPortfolio});
  }

  getAreaOfInterestDetails(details){
    let data = this.state.funderPortfolio;
    if(data && !data.areaOfInterest){
      data['areaOfInterest']=[];
    }
    data['areaOfInterest'] = details;
    this.setState({funderPortfolio : data})
    this.props.getPortfolioDetails({funderPortfolio:this.state.funderPortfolio});
  }

  getServiceDetails(details){
    if(details.services){
      let portfolioId = details.portfolioId;
      console.log()
      this.saveDataToServices(portfolioId)
    }
    console.log(details)
    let data = this.state.funderPortfolio;
    data['services'] = details;
    this.setState({funderPortfolio : data})
    this.props.getPortfolioDetails({funderPortfolio:this.state.funderPortfolio});
  }

  async saveDataToServices(portfolioId){
      const resp = await getProfileBasedOnPortfolio(portfolioId)
      this.saveServiceDetails()
      return resp
  }

  getFunderNewsDetails(details){
    let data = this.state.funderPortfolio;
    if(data && !data.lookingFor){
      data['lookingFor']=[];
    }
    data['lookingFor'] = details;
    this.setState({funderPortfolio : data})
    this.props.getPortfolioDetails({funderPortfolio:this.state.funderPortfolio});
  }

  getFunderLibrary(details){
    let data = this.state.funderPortfolio;
    if(details.memberships){
      data['memberships'] = details.memberships;
    }
    if(details.compliances){
      data['compliances'] = details.compliances;
    }
    if(details.licenses){
      data['licenses'] = details.licenses;
    }
    this.setState({funderPortfolio : data})
    this.props.getPortfolioDetails({funderPortfolio:this.state.funderPortfolio}, []);
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
MlAppFunderEditTabs.childContextTypes = {
  funderPortfolio: PropTypes.object,
};
