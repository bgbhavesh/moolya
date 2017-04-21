import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar'
import MlStartupAboutUs from "../aboutUs/MlStartupAboutUs";
import MlStartupRating from "../aboutUs/MlStartupRating";
import MlStartupClients from "../aboutUs/MlStartupClients";
import MlStartupBranches from "../aboutUs/MlStartupBranches";
import MlStartupInformation from "../aboutUs/MlStartupInformation";
import MlStartupLegal from "../aboutUs/MlStartupLegal";
import MlStartupSP from "../aboutUs/MlStartupSP";
import MlStartupTechnology from "../aboutUs/MlStartupTechnology";
import MlStartupAssets from "../aboutUs/MlStartupAssets";
import MlTabComponent from "../../../../../../../commons/components/tabcomponent/MlTabComponent"

export default class MlStartupTab extends React.Component{
  constructor(props){
    super(props)
    this.state =  {tabs: [], portfolioStartupAboutUs:{}};
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
      {tabClassName: 'tab', panelClassName: 'panel', title:"About Us", component:<MlStartupAboutUs  key="1"  getStartupAboutUs={this.getStartupAboutUs.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/> },
      {tabClassName: 'tab', panelClassName: 'panel', title:"Rating" , component:<MlStartupRating key="2"  portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Client", component:<MlStartupClients key="3" portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Services & Products" , component:<MlStartupSP key="4" portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Information", component:<MlStartupInformation  key="5"/> },
      {tabClassName: 'tab', panelClassName: 'panel', title:"Assets", component:<MlStartupAssets key="6"  portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Branches" , component:<MlStartupBranches key="7"  portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Technology", component:<MlStartupTechnology  key="8"  portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Legal", component:<MlStartupLegal  key="9"  portfolioDetailsId={this.props.portfolioDetailsId}/>}
    ]
    return tabs;
  }


  getStartupAboutUs(details){
    let data = this.state.portfolioStartupAboutUs;
    data['aboutUs']=details;
    this.setState({portfolioStartupAboutUs : data})
    // this.state.ideatorPortfolio['portfolioIdeatorDetails'] = details;
    // this.setState({ideatorDetails:details})
    this.props.getPortfolioStartupAboutUsDetails(this.state.portfolioStartupAboutUs);
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

