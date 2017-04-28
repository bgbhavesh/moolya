import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
import MlTabComponent from "../../../commons/components/tabcomponent/MlTabComponent";
import MlAppIdeatorDetails from './MlAppIdeatorDetails';
import MlAppIdeatorIdeas from './MlAppIdeatorIdeas';
import MlAppIdeatorProblemsSolutions from './MlAppIdeatorProblemsSolutions';
import MlAppIdeatorAudience from './MlAppIdeatorAudience';
import MlAppIdeatorLibrary from './MlAppIdeatorLibrary';
import MlAppIdeatorStrategyAndProblems from './MlAppIdeatorStrategyAndProblems';
import MlAppIdeatorIntellectual from './MlAppIdeatorIntellectual';
import MlAppIdeatorLookingFor from './MlAppIdeatorLookingFor'


export default class MlAppIdeatorTabs extends React.Component{
constructor(props){
  super(props)
  this.state =  {tabs: [], ideatorPortfolio:{}};
  // this.getIdeatorDetails.bind(this);
  // this.getProblemSolution.bind(this)
  // this.getChildContext.bind(this)
}

// getChildContext(){
//   return {
//     ideatorPortfolio: this.state.ideatorPortfolio
//   }
// }

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
    {tabClassName: 'tab', panelClassName: 'panel', title:"Ideator", component:<MlAppIdeatorDetails key="1"/>},
    {tabClassName: 'tab', panelClassName: 'panel', title:"Ideas", component:<MlAppIdeatorIdeas key="2"/>},
    {tabClassName: 'tab', panelClassName: 'panel', title:"Problems and Solutions", component: <MlAppIdeatorProblemsSolutions key="3"/>},
    {tabClassName: 'tab', panelClassName: 'panel', title:"Audience", component:<MlAppIdeatorAudience key="4"/>},
    {tabClassName: 'tab', panelClassName: 'panel', title:"Library", component: <MlAppIdeatorLibrary key="5"/>},
    {tabClassName: 'tab', panelClassName: 'panel', title:"Strategy and Planning", component:<MlAppIdeatorStrategyAndProblems key="6"/>},
    {tabClassName: 'tab', panelClassName: 'panel', title:"Intellectual Planning and Trademark", component:<MlAppIdeatorIntellectual key="7"/>},
    {tabClassName: 'tab', panelClassName: 'panel', title:"Looking For", component:<MlAppIdeatorLookingFor key="8"/>}
  ]
  return tabs;
}

// getIdeatorDetails(details){
//   let data = this.state.ideatorPortfolio;
//   data['portfolioIdeatorDetails']=details;
//   this.setState({ideatorPortfolio : data})
//   // this.state.ideatorPortfolio['portfolioIdeatorDetails'] = details;
//   // this.setState({ideatorDetails:details})
//   this.props.getPortfolioDetails({ideatorPortfolio:this.state.ideatorPortfolio});
// }
// getIdeas(details) {
//   let data = this.state.ideatorPortfolio;
//   data['ideas']=details;
//   this.setState({ideatorPortfolio : data})
//   this.props.getPortfolioDetails({ideatorPortfolio:this.state.ideatorPortfolio});
// }
// getProblemSolution(details) {
//   let data = this.state.ideatorPortfolio;
//   data['problemSolution']=details;
//   this.setState({ideatorPortfolio : data})
//   this.props.getPortfolioDetails({ideatorPortfolio:this.state.ideatorPortfolio});
// }
// getStrategyAndPlanning(details) {
//   let data = this.state.ideatorPortfolio;
//   data['strategyAndPlanning']=details;
//   this.setState({ideatorPortfolio : data})
//   this.props.getPortfolioDetails({ideatorPortfolio:this.state.ideatorPortfolio});
// }
// getIntellectualPlanning(details) {
//   let data = this.state.ideatorPortfolio;
//   data['intellectualPlanning']=details;
//   this.setState({ideatorPortfolio : data})
//   this.props.getPortfolioDetails({ideatorPortfolio:this.state.ideatorPortfolio});
// }
// getAudience(details) {
//   let data = this.state.ideatorPortfolio;
//   data['audience']=details;
//   this.setState({ideatorPortfolio : data})
//   this.props.getPortfolioDetails({ideatorPortfolio:this.state.ideatorPortfolio});
// }
// getLookingFor(details) {
//   let data = this.state.ideatorPortfolio;
//   data['lookingFor']=details;
//   this.setState({ideatorPortfolio : data})
//   this.props.getPortfolioDetails({ideatorPortfolio:this.state.ideatorPortfolio});
// }

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
// MlAppIdeatorTabs.childContextTypes = {
//   ideatorPortfolio: PropTypes.object,
// };
