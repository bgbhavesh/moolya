import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
import MlTabComponent from "../../../commons/components/tabcomponent/MlTabComponent";
import MlPortfolioIdeatorBasicDetailsView from '../../../admin/transaction/portfolio/component/IdeatorView/MlPortfolioIdeatorBasicDetailsView'
import MlPortfolioIdeatorProblemsAndSolutionsView from '../../../admin/transaction/portfolio/component/IdeatorView/MlProblemsAndSolutionsView'
import MlPortfolioIdeatorAudienceView from '../../../admin/transaction/portfolio/component/IdeatorView/MlAudienceView'
import MlPortfolioIdeatorLibraryView from '../../../admin/transaction/portfolio/component/IdeatorView/MlPortfolioLibrary'
import MlPortfolioIdeatorStrategyPlansView from '../../../admin/transaction/portfolio/component/IdeatorView/MlStartergyAndPlanningView'
import MlPortfolioIdeatorLookingForView from '../../../admin/transaction/portfolio/component/IdeatorView/MlLookingForView'
import MlPortfolioIdeatorPlanningTrademarkView from '../../../admin/transaction/portfolio/component/IdeatorView/MlInAndTrademarkView'


export default class MlAppIdeatorTabs extends React.Component{
constructor(props){
  super(props)
  this.state =  {tabs: [], ideatorPortfolio:{}};
  // this.getIdeatorDetails.bind(this);
  // this.getProblemSolution.bind(this)
  // this.getChildContext.bind(this)
  this.getSelectedAnnotation.bind(this);
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
  // getSelectedAnnotation(selAnnotation){
  //   if(!this.state.popoverOpen){
  //     this.toggle();
  //     $('.comment-input-box').slideToggle();
  //   }
  //   if(selAnnotation){
  //     this.setState({annotationData : selAnnotation},function(){
  //       this.fetchComments(selAnnotation.id);
  //     })
  //   }
  //
  //
  // }

getTabComponents(){
  let tabs = [
    {tabClassName: 'tab', panelClassName: 'panel', title:"Details" , component:<MlPortfolioIdeatorBasicDetailsView key="1"  portfolioDetailsId={this.props.portfolioDetailsId}/>},
    {tabClassName: 'tab', panelClassName: 'panel', title:"Problems and Solutions" , component:<MlPortfolioIdeatorProblemsAndSolutionsView key="2"  portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={}/>},
    {tabClassName: 'tab', panelClassName: 'panel', title:"Audience" , component:<MlPortfolioIdeatorAudienceView key="3"  portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={}/>},
    {tabClassName: 'tab', panelClassName: 'panel', title:"Library" , component:<MlPortfolioIdeatorLibraryView key="4"  portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={}/>},
    {tabClassName: 'tab', panelClassName: 'panel', title:"Strategy and Plans" , component:<MlPortfolioIdeatorStrategyPlansView key="4"  portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={}/>},
    {tabClassName: 'tab', panelClassName: 'panel', title:"IntellectualPlanning and Trademark" , component:<MlPortfolioIdeatorPlanningTrademarkView key="5"  portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={}/>},
    {tabClassName: 'tab', panelClassName: 'panel', title:"Looking For" , component:<MlPortfolioIdeatorLookingForView key="5"  portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={}/>},
  ]
  return tabs;
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
// MlAppIdeatorTabs.childContextTypes = {
//   ideatorPortfolio: PropTypes.object,
// };
