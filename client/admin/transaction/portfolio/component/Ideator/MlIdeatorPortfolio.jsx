import React, { Component, PropTypes }  from "react";
import {render} from "react-dom";
import MlTabComponent from "../../../../../commons/components/tabcomponent/MlTabComponent";
import MlIdeatorDetails from "../Ideator/MlIdeatorDetails";
import MlIdeatorProblemsAndSolutions from "../Ideator/MlIdeatorProblemsAndSolutions";
import MlIdeatorAudience from "../Ideator/MlIdeatorAudience";
import MlIdeatorLibrary from "../Ideator/MlIdeatorLibrary";
import MlIdeatorStrategyAndPlanning from "../Ideator/MlIdeatorStrategyAndPlanning";
import MlIdeatorIntellectualPlanningAndTrademark from "../Ideator/MlIdeatorIntellectualPlanningAndTrademark";
import MlIdeatorLookingFor from "../Ideator/MlIdeatorLookingFor";
import MlIdeatorIdeas from '../Ideator/MlIdeatorIdeas'
import _ from 'lodash'


export default class MlIdeatorPortfolioTemplate extends React.Component{
    constructor(props){
        super(props)
        this.state =  {tabs: [], ideatorPortfolio:{}, idea:{}, privateKeys:[]};
        this.getIdeatorDetails.bind(this);
        this.getProblemSolution.bind(this)
        this.getChildContext.bind(this)
    }

    getChildContext(){
      return {
        ideatorPortfolio: this.state.ideatorPortfolio,
        idea:this.state.idea
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
          {tabClassName: 'tab', panelClassName: 'panel', title:"Ideas", component:<MlIdeatorIdeas  key="2" getIdeas={this.getIdeas.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} ideaId={this.props.ideaId}/> },
          {tabClassName: 'tab', panelClassName: 'panel', title:"Ideator" , component:<MlIdeatorDetails key="1" getIdeatorDetails={this.getIdeatorDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
          {tabClassName: 'tab', panelClassName: 'panel', title:"Problems and Solutions", component:<MlIdeatorProblemsAndSolutions key="3" getProblemSolution={this.getProblemSolution.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
          {tabClassName: 'tab', panelClassName: 'panel', title:"Audience" , component:<MlIdeatorAudience key="4" getAudience={this.getAudience.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
          {tabClassName: 'tab', panelClassName: 'panel', title:"Library", component:<MlIdeatorLibrary  key="5" portfolioDetailsId={this.props.portfolioDetailsId}  /> },
          {tabClassName: 'tab', panelClassName: 'panel', title:"Strategy and Planning", component:<MlIdeatorStrategyAndPlanning key="6" getStrategyAndPlanning={this.getStrategyAndPlanning.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
          {tabClassName: 'tab', panelClassName: 'panel', title:"Intellectual Planning and Trademark" , component:<MlIdeatorIntellectualPlanningAndTrademark key="7" getIntellectualPlanning={this.getIntellectualPlanning.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
          {tabClassName: 'tab', panelClassName: 'panel', title:"Looking For", component:<MlIdeatorLookingFor  key="8" getLookingFor={this.getLookingFor.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>}
        ]
        return tabs;
    }

    getIdeatorDetails(details, privateKey){
        let data = this.state.ideatorPortfolio;
        data['portfolioIdeatorDetails']=details;
        this.setState({ideatorPortfolio : data})
        // this.state.ideatorPortfolio['portfolioIdeatorDetails'] = details;
        // this.setState({ideatorDetails:details})
        this.props.getPortfolioDetails({ideatorPortfolio:this.state.ideatorPortfolio}, privateKey);
    }
    getIdeas(details, privateKey) {
      let data = this.state.idea;
      data=details;
      this.setState({idea : data})
      this.props.getIdeatorIdeaDetails(data, privateKey);
    }
    getProblemSolution(details, privateKey) {
      let data = this.state.ideatorPortfolio;
      data['problemSolution']=details;
      this.setState({ideatorPortfolio : data})
      this.props.getPortfolioDetails({ideatorPortfolio:this.state.ideatorPortfolio}, privateKey);
    }
    getStrategyAndPlanning(details, privateKey) {
      let data = this.state.ideatorPortfolio;
      data['strategyAndPlanning']=details;
      this.setState({ideatorPortfolio : data})
      this.props.getPortfolioDetails({ideatorPortfolio:this.state.ideatorPortfolio}, privateKey);
    }
    getIntellectualPlanning(details, privateKey) {
      let data = this.state.ideatorPortfolio;
      data['intellectualPlanning']=details;
      this.setState({ideatorPortfolio : data})
      this.props.getPortfolioDetails({ideatorPortfolio:this.state.ideatorPortfolio}, privateKey);
    }
    getAudience(details, privateKey) {
      let data = this.state.ideatorPortfolio;
      data['audience']=details;
      this.setState({ideatorPortfolio : data})
      this.props.getPortfolioDetails({ideatorPortfolio:this.state.ideatorPortfolio}, privateKey);
    }
    getLookingFor(details, privateKey) {
      let data = this.state.ideatorPortfolio;
      data['lookingFor']=details;
      this.setState({ideatorPortfolio : data})
      this.props.getPortfolioDetails({ideatorPortfolio:this.state.ideatorPortfolio}, privateKey);
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
MlIdeatorPortfolioTemplate.childContextTypes = {
  ideatorPortfolio: PropTypes.object,
  idea:PropTypes.object
};
