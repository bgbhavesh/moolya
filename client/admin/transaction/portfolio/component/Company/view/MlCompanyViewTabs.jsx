import React, { Component, PropTypes }  from "react";
import MlCompanyViewManagement from './MlCompanyViewManagement';
import MlCompanyViewAwards from './MlCompanyViewAwards';
import MlCompanyViewMCL from './MlCompanyViewMCL';
import MlCompanyViewData from './MlCompanyViewData';
import MlCompanyViewChart from './MlCompanyViewChart';
import MlCompanyViewLibrary from './MlCompanyViewLibrary';
import MlCompanyViewAboutLanding from './about/MlCompanyViewAboutLanding';
import MlCompanyViewIntrapreneur from './MlCompanyViewIntrapreneur';

import MlTabComponent from "../../../../../../commons/components/tabcomponent/MlTabComponent";
// import PortfolioLibrary from '../../../../../../commons/components/portfolioLibrary/PortfolioLibrary'
import {client} from '../../../../../core/apolloConnection'

export default class MlViewInstitutionPortfolioTemplate extends Component {
  constructor(props){
    super(props);
    this.state =  {tabs: []};
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

  backClickHandler(){
    let tabs = this.state.tabs;
    this.setState({tabs: tabs})
  }

  getTabComponents(){
    let tabs = [
      {tabClassName: 'tab', panelClassName: 'panel', title:"About" , component:<MlCompanyViewAboutLanding key="1"  portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations} backClickHandler={this.backClickHandler.bind(this)}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Management" , component:<MlCompanyViewManagement key="2" isAdmin={true} client={client} portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Investor" , component:<MlInstitutionViewInvestor key="3"  portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Data" , component:<MlCompanyViewData key="4"  portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Chart" , component:<MlCompanyViewChart key="5"  portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Awards" , component:<MlCompanyViewAwards key="6"  portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Library" , component:<MlCompanyViewLibrary isAdmin={true} client={client}  key="7"  portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"M C & L" , component:<MlCompanyViewMCL key="8" portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Intrapreneur" , component:<MlCompanyViewIntrapreneur key="12"  portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
    ]
    return tabs;
  }
  render(){
    let tabs = this.state.tabs;
    return <MlTabComponent tabs={tabs}/>
  }
}
