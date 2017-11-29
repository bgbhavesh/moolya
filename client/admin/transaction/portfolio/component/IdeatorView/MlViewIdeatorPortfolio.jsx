import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import MlPortfolioIdeatorBasicDetailsView from '../../component/IdeatorView/MlPortfolioIdeatorBasicDetailsView'
import MlTabComponent from '../../../../../commons/components/tabcomponent/MlTabComponent'
import MlPortfolioIdeatorProblemsAndSolutionsView from '../../component/IdeatorView/MlProblemsAndSolutionsView'
import MlPortfolioIdeatorAudienceView from '../../component/IdeatorView/MlAudienceView'
import MlPortfolioIdeatorStrategyPlansView from '../../component/IdeatorView/MlStartergyAndPlanningView'
import MlIdeatorLookingForView from './MlIdeatorLookingForView'
import MlPortfolioIdeatorPlanningTrademarkView from '../../component/IdeatorView/MlInAndTrademarkView'
import MlIdeaView from '../../../../../admin/transaction/portfolio/component/IdeatorView/MlIdeaView'
import PortfolioLibrary from '../../../../../commons/components/portfolioLibrary/PortfolioLibrary'
import { client } from '../../../../core/apolloConnection'

// import {fetchTemplateHandler} from "../../../../commons/containers/templates/mltemplateActionHandler";
// import MlActionComponent from '../../../../commons/components/actions/ActionComponent'

export default class MlViewIdeatorPortfolioTemplate extends React.Component {
  constructor(props, context) {
    super(props)
    console.log(context)
    this.state = { tabs: [], portfolioIdeatorInfo: {} };
  }


  componentDidMount() {
    setTimeout(() => {
      $('div[role="tab"]').each(function (index) {
        const test = $(this).text();
        $(this).empty();
        $(this).html(`<div class="moolya_btn moolya_btn_in">${test}</div>`);
      });
      $('.RRT__tabs').addClass('horizon-swiper');
      $('.RRT__tab').addClass('horizon-item');
      $('.horizon-swiper').horizonSwiper();
    }, 300);
  }


  componentWillMount() {
    const tabs = this.getTabComponents();
    function getTabs() {
      return tabs.map(tab => ({
        tabClassName: 'moolya_btn', // Optional
        panelClassName: 'panel1', // Optional
        title: tab.title,
        getContent: () => tab.component
      }));
    }
    this.setState({ tabs: getTabs() || [] });
  }

  getTabComponents() {
    const tabs = [
      {
        tabClassName: 'tab', panelClassName: 'panel', title: 'The Idea', component: <MlIdeaView key="0" tabName="The Idea" portfolioDetailsId={this.props.portfolioDetailsId} ideaId={this.props.ideaId} getSelectedAnnotations={this.props.getSelectedAnnotations} client={client}/>
      },
      {
        tabClassName: 'tab', panelClassName: 'panel', title: 'About', component: <MlPortfolioIdeatorBasicDetailsView key="1" tabName="About" isAdmin={true} client={client} portfolioDetailsId={this.props.portfolioDetailsId}/>
      },
      {
        tabClassName: 'tab', panelClassName: 'panel', title: 'Problems and Solutions', component: <MlPortfolioIdeatorProblemsAndSolutionsView key="2" tabName="Problems and Solutions" portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>
      },
      {
        tabClassName: 'tab', panelClassName: 'panel', title: 'Audience', component: <MlPortfolioIdeatorAudienceView key="3" tabName="Audience" isAdmin={true} client={client} portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>
      },
      {
        tabClassName: 'tab', panelClassName: 'panel', title: 'Library', component: <PortfolioLibrary tabName="Library" isAdmin={true} client={client} key="4" portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>
      },
      {
        tabClassName: 'tab', panelClassName: 'panel', title: 'Strategy and Plans', component: <MlPortfolioIdeatorStrategyPlansView key="5" tabName="Strategy and Plans" portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>
      },
      {
        tabClassName: 'tab', panelClassName: 'panel', title: 'Intellectual Property And Trademarks', component: <MlPortfolioIdeatorPlanningTrademarkView key="6" tabName="IP and Trademark" portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>
      },
      {
        tabClassName: 'tab', panelClassName: 'panel', title: 'Looking For', component: <MlIdeatorLookingForView key="7" tabName="Looking For" portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>
      }

    ]
    return tabs;
  }

  render() {
    const tabs = this.state.tabs;
    return <MlTabComponent tabs={tabs}/>
  }
}
