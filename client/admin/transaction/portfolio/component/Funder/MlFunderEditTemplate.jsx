import React, { Component, PropTypes }  from "react";
import {render} from "react-dom";
import MlTabComponent from "../../../../.././commons/components/tabcomponent/MlTabComponent";
import _ from 'lodash'
import MlFunderAbout from './MlFunderAbout'
import MlFunderAreaOfInterest from './MlFunderAreaOfInterest'
import MlFunderEngagementMethod from './MlFunderEngagementMethod'
import MlFunderInvestment from './MlFunderInvestment'
import PortfolioLibrary from '../../../../../commons/components/portfolioLibrary/PortfolioLibrary'
import MlFunderNews from './MlFunderNews'
import MlFunderPrincipalTeam from './MlFunderPrincipalTeam'
import MlFunderSuccessStories from './MlFunderSuccessStories'
import MlFunderServices from './MlFunderServices'
import {client} from '../../../../core/apolloConnection'

export default class MlFunderEditTemplate extends React.Component{
  constructor(props){
    super(props)
    this.state =  {tabs: [],aboutUs: {}, funderPortfolio:{}};
    this.getChildContext.bind(this)
    this.getInvestmentsDetails.bind(this);
    this.getFunderNewsDetails.bind(this);
    this.getFunderLibrary.bind(this)
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
      {tabClassName: 'tab', panelClassName: 'panel', title:"About" , component:<MlFunderAbout client={client} isAdmin={true} key="1" getAboutus={this.getAboutus.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Investments" , component:<MlFunderInvestment key="2" getInvestmentsDetails={this.getInvestmentsDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Principal & Team" , component:<MlFunderPrincipalTeam client={client} key="3" getPrincipalDetails={this.getPrincipalDetails.bind(this)} getTeamDetails={this.getTeamDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Engagement Methods" , component:<MlFunderEngagementMethod key="4" portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Area Of Interests" , component:<MlFunderAreaOfInterest key="6" getAreaOfInterestDetails={this.getAreaOfInterestDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Success Stories" , component:<MlFunderSuccessStories key="7" getSuccessStoriesDetails={this.getSuccessStoriesDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Library" , component:<PortfolioLibrary key="8" client={client} isAdmin={true} getFunderLibrary={this.getFunderLibrary.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}  />},
      {tabClassName: 'tab', panelClassName: 'panel', title:"News" , component:<MlFunderNews key="9" getFunderNewsDetails={this.getFunderNewsDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Services" , component:<MlFunderServices key="10" portfolioDetailsId={this.props.portfolioDetailsId}/>} //getFunderServicesDetails={this.getFunderServicesDetails.bind(this)}
    ]
    return tabs;
  }

  getSuccessStoriesDetails(details, privateKey){
    let data = this.state.funderPortfolio;
    data['successStories'] = details;
    this.setState({funderPortfolio : data})
    let arr = [];
    _.each(details, function (obj) {
      let updateItem = _.omit(obj, 'logo');
      arr.push(updateItem)
    })
    data['successStories'] = arr;
    this.props.getPortfolioDetails({funderPortfolio:data}, privateKey);
  }

  getAboutus(details, privateKey){
    let data = this.state.funderPortfolio;
    data['funderAbout']=details;
    this.setState({funderPortfolio : data})
    this.props.getPortfolioDetails({funderPortfolio : this.state.funderPortfolio}, privateKey);
  }

  getInvestmentsDetails(details, privateKey){
    let data = this.state.funderPortfolio;
    data['investments'] = details;
    this.setState({funderPortfolio : data})
    this.props.getPortfolioDetails({funderPortfolio:this.state.funderPortfolio}, privateKey);
  }

  getPrincipalDetails(details, privateKey){
    let data = this.state.funderPortfolio;
    if(data && !data.principal){
      data['principal']=[];
    }
    data['principal'] = details;
    this.setState({funderPortfolio : data})
    let arr = [];
    _.each(details, function (obj) {
      let updateItem = _.omit(obj, 'logo');
      arr.push(updateItem)
    })
    data['principal'] = arr;
    this.props.getPortfolioDetails({funderPortfolio:data}, privateKey);
  }
  getTeamDetails(details, privateKey){
    let data = this.state.funderPortfolio;
    if(data && !data.team){
      data['team']=[];
    }
    data['team'] = details;
    this.setState({funderPortfolio : data})
    let arr = [];
    _.each(details, function (obj) {
      let updateItem = _.omit(obj, 'logo');
      arr.push(updateItem)
    })
    data['team'] = arr;
    this.props.getPortfolioDetails({funderPortfolio:data}, privateKey);
  }

  getAreaOfInterestDetails(details, privateKey){
    let data = this.state.funderPortfolio;
    if(data && !data.areaOfInterest){
      data['areaOfInterest']=[];
    }
    data['areaOfInterest'] = details;
    this.setState({funderPortfolio : data})
    this.props.getPortfolioDetails({funderPortfolio:this.state.funderPortfolio}, privateKey);
  }

  getFunderNewsDetails(details, privateKey){
    let data = this.state.funderPortfolio;
    if(data && !data.lookingFor){
      data['lookingFor']=[];
    }
    data['lookingFor'] = details;
    this.setState({funderPortfolio : data})
    this.props.getPortfolioDetails({funderPortfolio:this.state.funderPortfolio}, privateKey);
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
MlFunderEditTemplate.childContextTypes = {
  funderPortfolio: PropTypes.object,
};
