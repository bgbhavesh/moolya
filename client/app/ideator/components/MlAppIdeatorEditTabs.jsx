import React, { Component, PropTypes }  from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import MlTabComponent from "../../../commons/components/tabcomponent/MlTabComponent";
import MlIdeatorDetails from '../../../admin/transaction/portfolio/component/Ideator/MlIdeatorDetails'
import MlIdeatorProblemsAndSolutions from '../../../admin/transaction/portfolio/component/Ideator/MlIdeatorProblemsAndSolutions'
import MlIdeatorAudience from '../../../admin/transaction/portfolio/component/Ideator/MlIdeatorAudience'
import MlIdeatorLibrary from '../../../admin/transaction/portfolio/component/Ideator/MlIdeatorLibrary'
import MlIdeatorStrategyAndPlanning from '../../../admin/transaction/portfolio/component/Ideator/MlIdeatorStrategyAndPlanning'
import MlIdeatorLookingFor from '../../../admin/transaction/portfolio/component/Ideator/MlIdeatorLookingFor'
import MlIdeatorIntellectualPlanningAndTrademark from '../../../admin/transaction/portfolio/component/Ideator/MlIdeatorIntellectualPlanningAndTrademark'
import AppActionButtons from '../../commons/components/appActionButtons'
import TopIconsList from '../../commons/components/topIconsList'
import {updatePortfolioActionHandler} from '../../../admin/transaction/portfolio/actions/updatePortfolioDetails';

// import MlAppIdeatorIdeas from './MlAppIdeatorIdeas'

import 'react-responsive-tabs/styles.css'


export default class MlAppIdeatorEditTabs extends React.Component{
  constructor(props){
    super(props)
    this.state =  {
      tabs: [],
      ideatorPortfolio:{},
      ideatorId:this.props.config
    };
    this.getIdeatorDetails.bind(this);
    this.getProblemSolution.bind(this)
    this.getChildContext.bind(this)
    // this.getSelectedAnnotation.bind(this);
  }

getChildContext(){
  return {
    ideatorPortfolio: this.state.ideatorPortfolio
  }
}

  componentDidMount(){
  }

  getTabComponents(){
    let tabs = [
      {tabClassName: 'tab', panelClassName: 'panel', title:"Details" , component:<MlIdeatorDetails key="1"  portfolioDetailsId={this.state.ideatorId} getIdeatorDetails={this.getIdeatorDetails.bind(this)}/>},    //this.props.portfolioDetailsId}
      {tabClassName: 'tab', panelClassName: 'panel', title:"Problems and Solutions" , component:<MlIdeatorProblemsAndSolutions key="2"  portfolioDetailsId={this.state.ideatorId}  getProblemSolution={this.getProblemSolution.bind(this)}/>},   //id will be dyanmic
      {tabClassName: 'tab', panelClassName: 'panel', title:"Audience" , component:<MlIdeatorAudience key="3"  portfolioDetailsId={this.state.ideatorId} getAudience={this.getAudience.bind(this)}/>},                            //id will be dyanmic
      {tabClassName: 'tab', panelClassName: 'panel', title:"Library" , component:<MlIdeatorLibrary key="4"  portfolioDetailsId={this.state.ideatorId} />},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Strategy and Plans" , component:<MlIdeatorStrategyAndPlanning key="5"  portfolioDetailsId={this.state.ideatorId} getStrategyAndPlanning={this.getStrategyAndPlanning.bind(this)}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"IntellectualPlanning and Trademark" , component:<MlIdeatorIntellectualPlanningAndTrademark key="6"  portfolioDetailsId={this.state.ideatorId} getIntellectualPlanning={this.getIntellectualPlanning.bind(this)}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Looking For" , component:<MlIdeatorLookingFor key="7"  portfolioDetailsId={this.state.ideatorId} getLookingFor={this.getLookingFor.bind(this)}/>},
    ]
    return tabs;
  }
  getIdeatorDetails(details){
    let data = this.state.ideatorPortfolio;
    data['portfolioIdeatorDetails']=details;
    this.setState({ideatorPortfolio : data})
    // this.state.ideatorPortfolio['portfolioIdeatorDetails'] = details;
    // this.setState({ideatorDetails:details})
    // this.props.getPortfolioDetails({ideatorPortfolio:this.state.ideatorPortfolio});
  }
  getProblemSolution(details) {
    let data = this.state.ideatorPortfolio;
    data['problemSolution']=details;
    this.setState({ideatorPortfolio : data})
    // this.props.getPortfolioDetails({ideatorPortfolio:this.state.ideatorPortfolio});
  }
  getStrategyAndPlanning(details) {
    let data = this.state.ideatorPortfolio;
    data['strategyAndPlanning']=details;
    this.setState({ideatorPortfolio : data})
    // this.props.getPortfolioDetails({ideatorPortfolio:this.state.ideatorPortfolio});
  }
  getIntellectualPlanning(details) {
    let data = this.state.ideatorPortfolio;
    data['intellectualPlanning']=details;
    this.setState({ideatorPortfolio : data})
    // this.props.getPortfolioDetails({ideatorPortfolio:this.state.ideatorPortfolio});
  }
  getAudience(details) {
    let data = this.state.ideatorPortfolio;
    data['audience']=details;
    this.setState({ideatorPortfolio : data})
    // this.props.getPortfolioDetails({ideatorPortfolio:this.state.ideatorPortfolio});
  }
  getLookingFor(details) {
    let data = this.state.ideatorPortfolio;
    data['lookingFor']=details;
    this.setState({ideatorPortfolio : data})
    // this.props.getPortfolioDetails({ideatorPortfolio:this.state.ideatorPortfolio});
  }

  async updatePortfolioDetails() {
    let jsonData={
      portfolioId :this.props.config,
      portfolio :this.state.ideatorPortfolio
    }
    const response = await updatePortfolioActionHandler(jsonData)
    return response;
  }

  componentWillMount()
  {
    let tabs = this.getTabComponents();
    function getTabs() {
      return tabs.map(tab => ({
        tabClassName: 'horizon-item', // Optional
        panelClassName: 'panel1', // Optional
        title: tab.title,
        getContent: () => tab.component
      }));
    }
    this.setState({tabs:getTabs() ||[]});
  }

  render(){
    let tabs = this.state.tabs;
    return (
      <div className="app_main_wrap">
        <div className="app_padding_wrap">
          <div className="col-md-12">
            <TopIconsList/>
            <MlTabComponent tabs={tabs}/>
          </div>
          <AppActionButtons/>
          <br className="brclear"/>
        </div>
      </div>
    )
    // return <MlTabComponent tabs={tabs}/>
  }
}
MlAppIdeatorEditTabs.childContextTypes = {
  ideatorPortfolio: PropTypes.object,
};
