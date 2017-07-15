import React from "react";
import {render} from "react-dom";
import MlStartupAboutUs from "./MlStartupAboutUs";
import MlStartupRating from "./MlStartupRating";
import MlStartupClients from "./MlStartupClients";
import MlStartupBranches from "./MlStartupBranches";
import MlStartupInformation from "./MlStartupInformation";
import MlStartupLegal from "./MlStartupLegal";
import MlStartupSP from "./MlStartupSP";
import MlStartupTechnology from "./MlStartupTechnology";
import MlStartupAssets from "./MlStartupAssets";
import MlTabComponent from "../../../../../../../commons/components/tabcomponent/MlTabComponent";
import {client} from '../../../../../../core/apolloConnection'
import {appClient} from '../../../../../../../app/core/appConnection'
import MlStartupEditTemplate from '../MlStartupEditTemplate'

export default class MlStartupTab extends React.Component{
  constructor(props){
    super(props)
    this.state =  {tabs: [], portfolioStartupAboutUs:{}, portfolioStartupAssets:[],portfolioStartupClients:[],
                    portfolioStartupSP:{}, portfolioStartupInfo:{},portfolioStartupBranches:[],
                    portfolioStartupTechnologies:[],portfolioStartupLegal:{}, portfolioStartupRating:{}, admin: true,
                    client:client}
    ;
  }

  componentDidMount(){
    var props = this.props
    setTimeout(function(){
      if(!props.isApp) {
        $('div[role="tab"]').each(function (index) {
          var test = $(this).text();
          $(this).empty();
          $(this).html('<div class="moolya_btn moolya_btn_in">' + test + '</div>');
        });
        $('.first-item').addClass('menunone');
        $('.RRT__tabs').addClass('horizon-swiper');
        $('.RRT__tab').addClass('horizon-item');
        $('.RRT__panel').addClass('nomargintop');
        $('.RRT__panel .RRT__panel').removeClass('nomargintop');
        $('.horizon-swiper').horizonSwiper();
      }
    },10);
    let path = FlowRouter._current.path;
    if (path.indexOf("app") != -1){
      this.setState({admin: false, client: appClient})
    }
  }

  getTabComponents(){
    let tabs = [
      // {tabClassName: 'tab back_icon fa fa-hand-o-left', panelClassName: 'panel', title:""},
      {tabClassName: 'tab', panelClassName: 'panel', title:"About Us", component:<MlStartupAboutUs client={client} isAdmin={true} key="1"  getStartupAboutUs={this.getStartupAboutUs.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} aboutUsDetails={this.props.startupAboutUsDetails&&this.props.startupAboutUsDetails.aboutUs}/> },
      {tabClassName: 'tab', panelClassName: 'panel', title:"Rating" , component:<MlStartupRating key="2" getStartupRating={this.getStartupRating.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} ratingDetails={this.props.startupAboutUsDetails&&this.props.startupAboutUsDetails.rating}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Client", component:<MlStartupClients client={client} isAdmin={true} key="3" getStartupClients={this.getStartupClients.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} clientsDetails={this.props.startupAboutUsDetails&&this.props.startupAboutUsDetails.clients}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Services & Products" , component:<MlStartupSP key="4"  getStartupSP={this.getStartupServiceProducts.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} serviceProductsDetails={this.props.startupAboutUsDetails&&this.props.startupAboutUsDetails.serviceProducts}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Information", component:<MlStartupInformation  key="5" getStartupInfo={this.getStartupInfo.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} informationDetails={this.props.startupAboutUsDetails&&this.props.startupAboutUsDetails.information}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Assets", component:<MlStartupAssets client={this.state.client} isAdmin={this.state.admin} key="6"  getStartupAssets={this.getStartupAssets.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} assetsDetails={this.props.startupAboutUsDetails&&this.props.startupAboutUsDetails.assets}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Branches" , component:<MlStartupBranches client={this.state.client} isAdmin={this.state.admin}  key="7" getStartupBranches={this.getStartupBranches.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} branchDetails={this.props.startupAboutUsDetails&&this.props.startupAboutUsDetails.branches}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Technology", component:<MlStartupTechnology client={this.state.client} isAdmin={this.state.admin}  key="8"  getStartupTechnology={this.getStartupTechnology.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} technologyDetails={this.props.startupAboutUsDetails&&this.props.startupAboutUsDetails.technologies}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Legal Issue", component:<MlStartupLegal  key="9" getStartupLegalIssue={this.getStartupLegalIssue.bind(this)}  portfolioDetailsId={this.props.portfolioDetailsId} legalIssueDetails={this.props.startupAboutUsDetails&&this.props.startupAboutUsDetails.legalIssue}/>}
    ]
    return tabs;
  }

  getStartupAboutUs(details){
    let data = this.state.portfolioStartupAboutUs;
    data=details;
    this.setState({portfolioStartupAboutUs : data})
    let updateItem = _.omit(details, 'logo');
    this.props.getPortfolioStartupAboutUsDetails(updateItem,"aboutUs");
  }
  getStartupAssets(details){
    // let data = this.state.portfolioStartupAssets;
    // data = details;
    this.setState({portfolioStartupAssets : details})
    let ary = [];
    _.each(details, function (obj) {
      let updateItem = _.omit(obj, 'logo');
      ary.push(updateItem)
    })
    var sendData = ary;
    this.props.getPortfolioStartupAboutUsDetails(sendData,"assets");
  }
  getStartupClients(details){
    let data = this.state.portfolioStartupClients;
    data = details;
    this.setState({portfolioStartupClients : data})
    this.props.getPortfolioStartupAboutUsDetails(data,"clients");
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

  getStartupBranches(details) {
    // let data = this.state.portfolioStartupBranches;
    // data = details;
    this.setState({portfolioStartupBranches: details})
    let ary = [];
    _.each(details, function (obj) {
      let updateItem = _.omit(obj, 'logo');
      ary.push(updateItem)
    })
    var sendData = ary;
    this.props.getPortfolioStartupAboutUsDetails(sendData, "branches");
  }
  getStartupTechnology(details){
    // let data = this.state.portfolioStartupTechnologies;
    // data = details;
    this.setState({portfolioStartupTechnologies : details})
    let ary = [];
    _.each(details, function (obj) {
      let updateItem = _.omit(obj, 'logo');
      ary.push(updateItem)
    })
    var sendData = ary;
    this.props.getPortfolioStartupAboutUsDetails(sendData, "technologies");
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
    /**UI changes for back button*/  //+tab.tabClassName?tab.tabClassName:""
  }


  render(){
    let tabs = this.state.tabs;
    return <MlTabComponent tabs={tabs} backClickHandler={this.props.getStartUpState}/>
  }
}

