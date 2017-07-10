import React, { Component, PropTypes }  from "react";
import {render} from "react-dom";
import { Meteor } from 'meteor/meteor';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
import MlStartupViewAboutUs from './MlStartupViewAboutUs';
import MlStartupViewManagement from './MlStartupViewManagement';
import MlStartupViewInvestor from './MlStartupViewInvestor';
import MlStartupViewData from './MlStartupViewData';
import MlStartupViewAwards from './MlStartupViewAwards';
import MlStartupViewMCL from './MlStartupViewMCL';
import MlStartupViewLookingFor from './MlStartupViewLookingFor';
import MlStartupViewBranches from './MlStartupViewBranches';
import MlStartupViewClients from './MlStartupViewClients';
import MlStartupViewTechnologies from './MlStartupViewTechnologies';
import MlStartupViewAssets from './MlStartupViewAssets'
import MlTabComponent from "../../../../../commons/components/tabcomponent/MlTabComponent";
import PortfolioLibrary from '../../../../../commons/components/portfolioLibrary/PortfolioLibrary'
import {client} from '../../../../core/apolloConnection'

export default class MlViewStartupPortfolioTemplate extends React.Component {
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
  getTabComponents(){
    let tabs = [

      {tabClassName: 'tab', panelClassName: 'panel', title:"About" , component:<MlStartupViewAboutUs key="1"  portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Clients" , component:<MlStartupViewClients key="2"  portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Assets" , component:<MlStartupViewAssets key="2"  portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Technologies" , component:<MlStartupViewTechnologies key="2"  portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},

      {tabClassName: 'tab', panelClassName: 'panel', title:"Management" , component:<MlStartupViewManagement key="2" isAdmin={true} client={client} portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Investor" , component:<MlStartupViewInvestor key="3"  portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      /*{tabClassName: 'tab', panelClassName: 'panel', title:"Data" , component:<MlStartupViewData key="4" portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},*/
      // {tabClassName: 'tab', panelClassName: 'panel', title:"Charts" , component:<MlIdeatorDetails key="5" getIdeatorDetails={this.getIdeatorDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Awards" , component:<MlStartupViewAwards key="6"  portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Library" , component:<PortfolioLibrary isAdmin={true} client={client}  key="7"  portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Branches" , component:<MlStartupViewBranches key="8"  portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"M C & L" , component:<MlStartupViewMCL key="9" portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Looking For" , component:<MlStartupViewLookingFor key="10"  portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},


    ]
    return tabs;
  }
  render(){
    let tabs = this.state.tabs;
    return <MlTabComponent tabs={tabs}/>
  }
}
