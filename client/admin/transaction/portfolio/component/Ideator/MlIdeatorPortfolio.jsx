import React from "react";
import {render} from "react-dom";
import MlTabComponent from "../../../../../commons/components/tabcomponent/MlTabComponent";
import MlIdeatorDetails from "../Ideator/MlIdeatorDetails";
import MlIdeatorProblemsAndSolutions from "../Ideator/MlIdeatorProblemsAndSolutions";
import MlIdeatorAudience from "../Ideator/MlIdeatorAudience";
import MlIdeatorLibrary from "../Ideator/MlIdeatorLibrary";
import MlIdeatorStrategyAndPlanning from "../Ideator/MlIdeatorStrategyAndPlanning";
import MlIdeatorIntellectualPlanningAndTrademark from "../Ideator/MlIdeatorIntellectualPlanningAndTrademark";
import MlIdeatorLookingFor from "../Ideator/MlIdeatorLookingFor";
// import '../../../../../stylesheets/tab.css'

export default class MlIdeatorPortfolioTemplate extends React.Component{
    constructor(props){
        super(props)
        this.state =  {tabs: [], ideatorPortfolio:{}, problemSolution:{}};
        this.getIdeatorDetails.bind(this);
        this.getProblemSolution.bind(this)
    }

    getTabComponents(){
        let tabs = [
          {tabClassName: 'tab', panelClassName: 'panel', title:"Ideator" , component:<MlIdeatorDetails key="1" getIdeatorDetails={this.getIdeatorDetails.bind(this)}/>},
          {tabClassName: 'tab', panelClassName: 'panel', title:"Ideas", component:<div  key="2"> second </div>},
          {tabClassName: 'tab', panelClassName: 'panel', title:"Problems and Solutions", component:<MlIdeatorProblemsAndSolutions key="3" getProblemSolution={this.getProblemSolution.bind(this)}/>},
          {tabClassName: 'tab', panelClassName: 'panel', title:"Audience" , component:<MlIdeatorAudience key="4"/>},
          {tabClassName: 'tab', panelClassName: 'panel', title:"Library", component:<MlIdeatorLibrary  key="5"/> },
          {tabClassName: 'tab', panelClassName: 'panel', title:"Strategy and Planning", component:<MlIdeatorStrategyAndPlanning key="6"/>},
          {tabClassName: 'tab', panelClassName: 'panel', title:"Intellectual Planning and Trademark" , component:<MlIdeatorIntellectualPlanningAndTrademark key="7" getIntellectualPlanning={this.getIntellectualPlanning.bind(this)}/>},
          {tabClassName: 'tab', panelClassName: 'panel', title:"Looking For", component:<MlIdeatorLookingFor  key="8" getLookingFor={this.getLookingFor.bind(this)}/>}
        ]
        return tabs;
    }

    getIdeatorDetails(details){
        this.state.ideatorPortfolio['ideatorDetails'] = details;
        this.props.getPortfolioDetails(this.state.ideatorPortfolio);
    }
    getProblemSolution(details) {
      this.state.ideatorPortfolio['problemSolution'] = details;
      this.props.getPortfolioDetails(this.state.ideatorPortfolio);
    }
    getLookingFor(details) {
      this.state.ideatorPortfolio['lookingFor'] = details;
      this.props.getPortfolioDetails(this.state.ideatorPortfolio);
    }

    componentWillMount()
    {
        let tabs = this.getTabComponents();
        function getTabs() {
          return tabs.map(tab => ({
            tabClassName: 'tab', // Optional
            panelClassName: 'panel', // Optional
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
