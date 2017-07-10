import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import MlTabComponent from "../../../commons/components/tabcomponent/MlTabComponent";
import AppActionButtons from '../../commons/components/appActionButtons'
import InteractionsCounter from '../../commons/components/InteractionsCounter'
import MlStartupViewAboutUs from '../../../admin/transaction/portfolio/component/StartupView/MlStartupViewAboutUs';
import MlStartupViewManagement from '../../../admin/transaction/portfolio/component/StartupView/MlStartupViewManagement';
import MlStartupViewInvestor from '../../../admin/transaction/portfolio/component/StartupView/MlStartupViewInvestor';
import MlStartupViewData from '../../../admin/transaction/portfolio/component/StartupView/MlStartupViewData';
import MlStartupViewAwards from '../../../admin/transaction/portfolio/component/StartupView/MlStartupViewAwards';
import MlStartupViewMCL from '../../../admin/transaction/portfolio/component/StartupView/MlStartupViewMCL';
import MlStartupViewLookingFor from '../../../admin/transaction/portfolio/component/StartupView/MlStartupViewLookingFor';
import MlStartupViewBranches from '../../../admin/transaction/portfolio/component/StartupView/MlStartupViewBranches';
import MlStartupViewClients from '../../../admin/transaction/portfolio/component/StartupView/MlStartupViewClients';
import MlStartupViewTechnologies from '../../../admin/transaction/portfolio/component/StartupView/MlStartupViewTechnologies';
import MlStartupViewAssets from '../../../admin/transaction/portfolio/component/StartupView/MlStartupViewAssets'



//temporary static routes added
import AppStartupAboutUs from './AppStartupAboutUs'
import AppStartupManagement from './AppStartupManagement'
import AppStartupClients from './AppStartupClients'
import AppStartupData from './AppStartupData'
import AppStartupCharts from './AppStartupCharts'
import AppStartupLookingFor from './AppStartupLookingFor'
import AppStartupMCL from './AppStartupMCL'
import AppStartupAwards from './AppStartupAwards'

import 'react-responsive-tabs/styles.css'


export default class MlAppStartupTabs extends React.Component{
  constructor(props){
    super(props)
    this.state =  {
      tabs: [],
      startupId:this.props.config
    };
    // this.getIdeatorDetails.bind(this);
    // this.getProblemSolution.bind(this)
    // this.getChildContext.bind(this)
    // this.getSelectedAnnotation.bind(this);
  }

// getChildContext(){
//   return {
//     ideatorPortfolio: this.state.ideatorPortfolio
//   }
// }

  componentDidMount(){
    // setTimeout(function(){
    //   $('div[role="tab"]').each(function( index ) {
    //     var test = $(this).text();
    //     $(this).empty();
    //     $(this).html('<div class="moolya_btn moolya_btn_in">'+test+'</div>');
    //   });
    //   $('.RRT__tabs').addClass('horizon-swiper');
    //   $('.RRT__tab').addClass('horizon-item');
    //   $('.horizon-swiper').horizonSwiper();
    // },300);
  }
  //
  // (selAnnotation){
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

      {tabClassName: 'tab', panelClassName: 'panel', title:"About" , component:<MlStartupViewAboutUs key="1"  portfolioDetailsId={this.state.startupId} />},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Clients" , component:<MlStartupViewClients key="2"  portfolioDetailsId={this.state.startupId} />},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Assets" , component:<MlStartupViewAssets key="2"  portfolioDetailsId={this.state.startupId} />},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Technologies" , component:<MlStartupViewTechnologies key="2"  portfolioDetailsId={this.state.startupId} />},

      {tabClassName: 'tab', panelClassName: 'panel', title:"Management" , component:<MlStartupViewManagement key="2"  portfolioDetailsId={this.state.startupId} />},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Investor" , component:<MlStartupViewInvestor key="3"  portfolioDetailsId={this.state.startupId} />},
      /*{tabClassName: 'tab', panelClassName: 'panel', title:"Data" , component:<MlStartupViewData key="4" portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},*/
      // {tabClassName: 'tab', panelClassName: 'panel', title:"Charts" , component:<MlIdeatorDetails key="5" getIdeatorDetails={this.getIdeatorDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Awards" , component:<MlStartupViewAwards key="6"  portfolioDetailsId={this.state.startupId} />},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Branches" , component:<MlStartupViewBranches key="7"  portfolioDetailsId={this.state.startupId} />},
      {tabClassName: 'tab', panelClassName: 'panel', title:"M C & L" , component:<MlStartupViewMCL key="8" portfolioDetailsId={this.state.startupId} />},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Looking For" , component:<MlStartupViewLookingFor key="9"  portfolioDetailsId={this.state.startupId} />}

      // {tabClassName: 'tab', panelClassName: 'panel', title:"About" , component:<AppStartupAboutUs key="1"  portfolioDetailsId={this.state.startupId} />},
      // {tabClassName: 'tab', panelClassName: 'panel', title:"Management" , component:<AppStartupManagement key="2"  portfolioDetailsId={this.state.startupId} />},
      // {tabClassName: 'tab', panelClassName: 'panel', title:"Clients" , component:<AppStartupClients key="2"  portfolioDetailsId={this.state.startupId} />},
      // // {tabClassName: 'tab', panelClassName: 'panel', title:"Assets" , component:<MlStartupViewAssets key="2"  portfolioDetailsId={this.state.startupId} />},
      // // {tabClassName: 'tab', panelClassName: 'panel', title:"Technologies" , component:<MlStartupViewTechnologies key="2"  portfolioDetailsId={this.state.startupId} />},
      // // {tabClassName: 'tab', panelClassName: 'panel', title:"Investor" , component:<MlStartupViewInvestor key="3"  portfolioDetailsId={this.state.startupId} />},
      // {tabClassName: 'tab', panelClassName: 'panel', title:"Data" , component:<AppStartupData key="4" portfolioDetailsId={this.props.portfolioDetailsId}/>},
      // {tabClassName: 'tab', panelClassName: 'panel', title:"Charts" , component:<AppStartupCharts key="5" />},
      // {tabClassName: 'tab', panelClassName: 'panel', title:"Awards" , component:<AppStartupAwards key="7"  portfolioDetailsId={this.state.startupId} />},
      // //{tabClassName: 'tab', panelClassName: 'panel', title:"Branches" , component:<MlStartupViewBranches key="8"  portfolioDetailsId={this.state.startupId} />},
      // {tabClassName: 'tab', panelClassName: 'panel', title:"M C & L" , component:<AppStartupMCL key="9" portfolioDetailsId={this.state.startupId} />},
      // {tabClassName: 'tab', panelClassName: 'panel', title:"Looking For" , component:<AppStartupLookingFor key="10"  portfolioDetailsId={this.state.startupId} />},

    ]
    return tabs;
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
            <InteractionsCounter/>
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
// MlAppIdeatorTabs.childContextTypes = {
//   ideatorPortfolio: PropTypes.object,
// };
