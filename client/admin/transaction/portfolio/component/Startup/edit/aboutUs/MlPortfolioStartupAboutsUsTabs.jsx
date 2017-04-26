import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar'
import MlStartupAboutUs from "./MlStartupAboutUs";
import MlStartupRating from "./MlStartupRating";
import MlStartupClients from "./MlStartupClients";
import MlStartupBranches from "./MlStartupBranches";
import MlStartupInformation from "./MlStartupInformation";
import MlStartupLegal from "./MlStartupLegal";
import MlStartupSP from "./MlStartupSP";
import MlStartupTechnology from "./MlStartupTechnology";
import MlStartupAssets from "./MlStartupAssets";
import MlTabComponent from "../../../../../../../commons/components/tabcomponent/MlTabComponent"

export default class MlStartupTab extends React.Component{
  constructor(props){
    super(props)
    this.state =  {tabs: [], portfolioStartupAboutUs:{}, portfolioStartupAssets:[],portfolioStartupClients:[],
                    portfolioStartupSP:{}, portfolioStartupInfo:{},portfolioStartupBranches:[],
                    portfolioStartupTechnologies:[],portfolioStartupLegal:{}, portfolioStartupRating:{}};
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
      $('.last-item').addClass('menunone');
      $('.RRT__panel').addClass('nomargintop');
      $('.horizon-swiper').horizonSwiper();
    },300);
  }

  getTabComponents(){
    let tabs = [
      {tabClassName: 'tab', panelClassName: 'panel', title:"About Us", component:<MlStartupAboutUs  key="1"  getStartupAboutUs={this.getStartupAboutUs.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} aboutUsDetails={this.props.startupAboutUsDetails&&this.props.startupAboutUsDetails.aboutUs}/> },
      {tabClassName: 'tab', panelClassName: 'panel', title:"Rating" , component:<MlStartupRating key="2" getStartupRating={this.getStartupRating.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} ratingDetails={this.props.startupAboutUsDetails&&this.props.startupAboutUsDetails.rating}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Client", component:<MlStartupClients key="3" getStartupClients={this.getStartupClients.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} clientsDetails={this.props.startupAboutUsDetails&&this.props.startupAboutUsDetails.clients}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Services & Products" , component:<MlStartupSP key="4"  getStartupSP={this.getStartupServiceProducts.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} serviceProductsDetails={this.props.startupAboutUsDetails&&this.props.startupAboutUsDetails.serviceProducts}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Information", component:<MlStartupInformation  key="5" getStartupInfo={this.getStartupInfo.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} informationDetails={this.props.startupAboutUsDetails&&this.props.startupAboutUsDetails.information}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Assets", component:<MlStartupAssets key="6"  getStartupAssets={this.getStartupAssets.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} assetsDetails={this.props.startupAboutUsDetails&&this.props.startupAboutUsDetails.assets}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Branches" , component:<MlStartupBranches key="7" getStartupBranches={this.getStartupBranches.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} branchDetails={this.props.startupAboutUsDetails&&this.props.startupAboutUsDetails.branches}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Technology", component:<MlStartupTechnology  key="8"  getStartupTechnology={this.getStartupTechnology.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} technologyDetails={this.props.startupAboutUsDetails&&this.props.startupAboutUsDetails.technologies}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Legal Issue", component:<MlStartupLegal  key="9" getStartupLegalIssue={this.getStartupLegalIssue.bind(this)}  portfolioDetailsId={this.props.portfolioDetailsId} legalIssueDetails={this.props.startupAboutUsDetails&&this.props.startupAboutUsDetails.legalIssue}/>}
    ]
    return tabs;
  }


  getStartupAboutUs(details){
    let data = this.state.portfolioStartupAboutUs;
    data=details;
    this.setState({portfolioStartupAboutUs : data})
    this.props.getPortfolioStartupAboutUsDetails(data,"aboutUs");
  }
  getStartupAssets(details,indexArray){
    let data = this.state.portfolioStartupAssets;
    data = details;
    this.setState({portfolioStartupAssets : data})
    this.props.getPortfolioStartupAboutUsDetails(data,"assets",indexArray);
  }
  getStartupClients(details,indexArray){
    let data = this.state.portfolioStartupClients;
    data = details;
    this.setState({portfolioStartupClients : data})
    this.props.getPortfolioStartupAboutUsDetails(data,"clients",indexArray);
  }
  getStartupServiceProducts(details){
    let data = this.state.portfolioStartupSP;
    data = details;
    this.setState({portfolioStartupSP : data})
    this.props.getPortfolioStartupAboutUsDetails(data,"serviceProducts");
  }
  getStartupInfo(details){
    let data = this.state.portfolioStartupInfo;
    data = details;
    this.setState({portfolioStartupInfo : data})
    this.props.getPortfolioStartupAboutUsDetails(data,"information");
  }
  getStartupBranches(details,indexArray){
    let data = this.state.portfolioStartupBranches;
    data = details;
    this.setState({portfolioStartupBranches : data})
    this.props.getPortfolioStartupAboutUsDetails(data,"branches",indexArray);
  }
  getStartupTechnology(details,indexArray){
    let data = this.state.portfolioStartupTechnologies;
    data = details;
    this.setState({portfolioStartupTechnologies : data})
    this.props.getPortfolioStartupAboutUsDetails(data,"technologies",indexArray);
  }
  getStartupLegalIssue(details){
    let data = this.state.portfolioStartupLegal;
    data = details;
    this.setState({portfolioStartupLegal : data})
    this.props.getPortfolioStartupAboutUsDetails(data,"legalIssue");
  }
  getStartupRating(details){
    let data = this.state.portfolioStartupRating;
    data = details;
    this.setState({portfolioStartupRating : data})
    this.props.getPortfolioStartupAboutUsDetails(data,"rating");
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

