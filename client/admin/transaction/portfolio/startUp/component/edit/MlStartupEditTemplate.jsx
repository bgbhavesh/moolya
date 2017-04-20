import React, { Component, PropTypes }  from "react";
import {render} from "react-dom";
import MlTabComponent from "../../../../../../commons/components/tabcomponent/MlTabComponent";
import MlIdeatorDetails from "../../../component/Ideator/MlIdeatorDetails";
import _ from 'lodash'


export default class MlStartupEditTemplate extends React.Component{
  constructor(props){
    super(props)
    this.state =  {tabs: [], ideatorPortfolio:{}};
    this.getIdeatorDetails.bind(this);
    this.getChildContext.bind(this)
  }

  getChildContext(){
    return {
      ideatorPortfolio: this.state.ideatorPortfolio
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

      {tabClassName: 'tab', panelClassName: 'panel', title:"Ideator" , component:<MlIdeatorDetails key="1" getIdeatorDetails={this.getIdeatorDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},

    ]
    return tabs;
  }

  getIdeatorDetails(details){
    let data = this.state.ideatorPortfolio;
    data['portfolioIdeatorDetails']=details;
    this.setState({ideatorPortfolio : data})
    this.props.getPortfolioDetails({ideatorPortfolio:this.state.ideatorPortfolio});
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
MlStartupEditTemplate.childContextTypes = {
  ideatorPortfolio: PropTypes.object,
};
