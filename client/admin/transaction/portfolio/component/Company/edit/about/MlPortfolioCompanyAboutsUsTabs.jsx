import React from "react";
import {render} from "react-dom";
import MlCompanyAboutUs from "./MlCompanyAboutUs";
import MlCompanyRating from "./MlCompanyRating";
import MlCompanyClients from "./MlCompanyClients";
import MlCompanySP from "./MlCompanySP";
import MlCompanyInformation from "./MlCompanyInformation";
import MlTabComponent from "../../../../../../../commons/components/tabcomponent/MlTabComponent";
import {client} from '../../../../../../core/apolloConnection'
import {appClient} from '../../../../../../../app/core/appConnection'

export default class MlPortfolioCompanyAboutsUsTabs extends React.Component{
  constructor(props){
    super(props)
    this.state =  {tabs: [], portfolioAboutUs:{},portfolioClients:[],
                    portfolioSP:{}, portfolioInfo:{}, portfolioRating:{}, admin: true,
                    client:client}
    ;
  }

  /**
   * handling different condition for app and admin
   * */
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
      }else {
        $('.RRT__tabs').addClass('menunone');
        $('.RRT__container .RRT__container .RRT__tabs').removeClass('menunone');
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
      {tabClassName: 'tab', panelClassName: 'panel', title:"About Us", component:<MlCompanyAboutUs client={client} isAdmin={true} key="1"  getAboutUs={this.getAboutUs.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} aboutUsDetails={this.props.aboutUsDetails&&this.props.aboutUsDetails.aboutUs}/> },
      {tabClassName: 'tab', panelClassName: 'panel', title:"Rating" , component:<MlCompanyRating key="2" getRating={this.getRating.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} ratingDetails={this.props.aboutUsDetails&&this.props.aboutUsDetails.rating}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Client", component:<MlCompanyClients client={client} isAdmin={true} key="3" getClients={this.getClients.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} clientsDetails={this.props.aboutUsDetails&&this.props.aboutUsDetails.clients}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Services & Products" , component:<MlCompanySP key="4"  getSP={this.getServiceProducts.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} serviceProductsDetails={this.props.aboutUsDetails&&this.props.aboutUsDetails.serviceProducts}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Information", component:<MlCompanyInformation  key="5" getInfo={this.getInfo.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} informationDetails={this.props.aboutUsDetails&&this.props.aboutUsDetails.information}/>},
    ]
    return tabs;
  }

  getAboutUs(details){
    let data = this.state.portfolioAboutUs;
    data=details;
    this.setState({portfolioAboutUs : data})
    let updateItem = _.omit(details, 'logo');
    this.props.getPortfolioAboutUsDetails(updateItem,"aboutUs");
  }
  getClients(details){
    let data = this.state.portfolioClients;
    data = details;
    this.setState({portfolioClients : data})
    this.props.getPortfolioAboutUsDetails(data,"clients");
  }
  getServiceProducts(details){
    let data = this.state.portfolioSP;
    data = details;
    this.setState({portfolioSP : data})
    this.props.getPortfolioAboutUsDetails(data,"serviceProducts");
  }
  getInfo(details){
    let data = this.state.portfolioInfo;
    data = details;
    this.setState({portfolioInfo : data})
    this.props.getPortfolioAboutUsDetails(data,"information");
  }

  getRating(details){
    let data = this.state.portfolioRating;
    data = details;
    this.setState({portfolioRating : data})
    this.props.getPortfolioAboutUsDetails(data,"rating");
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
    return <MlTabComponent tabs={tabs} backClickHandler={this.props.getState}/>
  }
}

