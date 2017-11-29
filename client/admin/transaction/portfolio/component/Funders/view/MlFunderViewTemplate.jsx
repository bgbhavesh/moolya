import React, { Component, PropTypes }  from "react";
import {render} from "react-dom";
import MlTabComponent from "../../../../../../commons/components/tabcomponent/MlTabComponent";
import MlFunderAboutView from './MlFunderAboutView'
import MlFunderInvestmentView from './MlFunderInvestmentView'
import MlFunderEngagementMethodView from './MlFunderEngagementMethodView'
import MlFunderAreaOfInterestView from './MlFunderAreaOfInterestView'
import MlFunderLibraryView from './MlFunderLibraryView'
import MlFunderNewsView from './MlFunderNewsView'
import PortfolioLibrary from '../../../../../../commons/components/portfolioLibrary/PortfolioLibrary'
import MlFunderPrincipalTeamView from './MlFunderPrincipalTeamView'
import MlFunderSuccessStoriesView from './MlFunderSuccessStoriesView'
import MlFunderLookingForView from './MlFunderLookingForView'
import {client} from '../../../../../core/apolloConnection'

export default class MlFunderViewTemplate extends React.Component{
  constructor(props){
    super(props)
    this.state =  {tabs: [],aboutUs: {}, funderPortfolio:{},activeTab:'About'};
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
      {tabClassName: 'tab', panelClassName: 'panel', title:"About" ,  name:"About" ,component:<MlFunderAboutView client={client} isAdmin={true}  key="1" tabName="About" getAboutus={this.getAboutus.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Investments" ,name:"Investments" , component:<MlFunderInvestmentView client={client} isAdmin={true}  key="2" tabName="Investments" getInvestmentsDetails={this.getInvestmentsDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Principals & Team" ,name:"Principals And Team" , component:<MlFunderPrincipalTeamView client={client} isAdmin={true}  key="3" tabName="Principals & Team" getPrincipalDetails={this.getPrincipalDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Engagement Methods" ,name:"Engagement Methods" , component:<MlFunderEngagementMethodView client={client} isAdmin={true}  key="4" tabName="Engagement Methods" portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Areas Of Interest" ,name:"Areas Of Interest" , component:<MlFunderAreaOfInterestView client={client} isAdmin={true}  key="6" tabName="Areas Of Interest" getAreaOfInterestDetails={this.getAreaOfInterestDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Success Stories" ,name:"Success Stories" , component:<MlFunderSuccessStoriesView client={client} isAdmin={true}  key="7" tabName="Success Stories" getSuccessStoriesDetails={this.getSuccessStoriesDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Library" ,name:"Library" ,  component:<PortfolioLibrary client={client} isAdmin={true} key="8" tabName="Library" getFunderLibrary={this.getFunderLibrary.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"News" ,name:"News" , component:<MlFunderNewsView key="9" client={client} isAdmin={true} tabName="News" getFunderNewsDetails={this.getFunderNewsDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Looking For" , name:"Looking For" , component:<MlFunderLookingForView key="7" tabName="lookingFor" portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
    ]
    return tabs;
  }
  getSuccessStoriesDetails(details){
    let data = this.state.funderPortfolio;
    data['portfolioIdeatorDetails']=details;
    this.setState({ideatorPortfolio : data})
    this.props.getPortfolioDetails({ideatorPortfolio:this.state.ideatorPortfolio});
  }
  getAboutus(details,tabName){
    let data = this.state.funderPortfolio;
    data[tabName] = details;
    this.props.getPortfolioDetails({funderPortfolio : data});
  }

  getInvestmentsDetails(details){
    let data = this.state.funderPortfolio;
    if(data && !data.management){
      data['management']=[];
    }
    data['management'] = details;
    this.setState({funderPortfolio : data})
    this.props.getPortfolioDetails({funderPortfolio:this.state.funderPortfolio});
  }

  getPrincipalDetails(details){
    let data = this.state.funderPortfolio;
    if(data && !data.investor){
      data['investor']=[];
    }
    data['investor'] = details;
    this.setState({funderPortfolio : data})
    this.props.getPortfolioDetails({funderPortfolio:this.state.funderPortfolio});
  }

  getAreaOfInterestDetails(details){
    let data = this.state.funderPortfolio;
    if(data && !data.awardsRecognition){
      data['awardsRecognition']=[];
    }
    data['awardsRecognition'] = details;
    this.setState({funderPortfolio : data})
    this.props.getPortfolioDetails({funderPortfolio:this.state.funderPortfolio});
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
        tabClassName: 'moolya_btn', // Optional
        panelClassName: 'panel1', // Optional
        title: tab.title,
        key: tab.name,
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
    return <MlTabComponent tabs={tabs} selectedTabKey={this.state.activeTab}  onChange={this.updateTab} type="tab" mkey="name"/>
  }
}
MlFunderViewTemplate.childContextTypes = {
  funderPortfolio: PropTypes.object,
};
