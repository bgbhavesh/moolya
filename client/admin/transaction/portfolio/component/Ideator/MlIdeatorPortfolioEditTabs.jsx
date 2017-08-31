import React, {Component, PropTypes}  from "react";
import {render} from "react-dom";
import MlTabComponent from "../../../../../commons/components/tabcomponent/MlTabComponent";
import MlIdeatorDetails from "../Ideator/MlIdeatorDetails";
import MlIdeatorProblemsAndSolutions from "../Ideator/MlIdeatorProblemsAndSolutions";
import MlIdeatorAudience from "../Ideator/MlIdeatorAudience";
import MlIdeatorStrategyAndPlanning from "../Ideator/MlIdeatorStrategyAndPlanning";
import MlIdeatorIntellectualPlanningAndTrademark from "../Ideator/MlIdeatorIntellectualPlanningAndTrademark";
import MlIdeatorLookingFor from "../Ideator/MlIdeatorLookingFor";
import MlIdeatorIdeas from '../Ideator/MlIdeatorIdeas'
import PortfolioLibrary from '../../../../../commons/components/portfolioLibrary/PortfolioLibrary'
import {client} from '../../../../core/apolloConnection'


export default class MlIdeatorPortfolioEditTabs extends Component {
  constructor(props) {
    super(props)
    this.state = {tabs: [], ideatorPortfolio: {}, idea: {}, privateValues: []}; //privateKeys: []
    this.getIdeatorDetails.bind(this);
    this.getProblemSolution.bind(this)
    this.getChildContext.bind(this)
  }

  getChildContext() {
    return {
      ideatorPortfolio: this.state.ideatorPortfolio,
      idea: this.state.idea,
      privateValues: this.state.privateValues
    }
  }

  componentDidMount() {
    setTimeout(function () {
      $('div[role="tab"]').each(function (index) {
        var test = $(this).text();
        $(this).empty();
        $(this).html('<div class="moolya_btn moolya_btn_in">' + test + '</div>');
      });
      $('.RRT__tabs').addClass('horizon-swiper');
      $('.RRT__tab').addClass('horizon-item');
      $('.horizon-swiper').horizonSwiper();
    }, 300);
  }

  getTabComponents() {
    console.log("This state", this.state);
    let tabs = [
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Ideas",
        component: <MlIdeatorIdeas tabName="Ideas" key="2" getIdeas={this.getIdeas.bind(this)}
                                   portfolioDetailsId={this.props.portfolioDetailsId} ideaId={this.props.ideaId}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Ideator",
        component: <MlIdeatorDetails key="1" tabName="Ideator" client={client} isAdmin={true}
                                     getIdeatorDetails={this.getIdeatorDetails.bind(this)}
                                     portfolioDetailsId={this.props.portfolioDetailsId}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Problems and Solutions",
        component: <MlIdeatorProblemsAndSolutions tabName="Problems and Solutions" client={client} isAdmin={true}
                                                  key="3" getProblemSolution={this.getProblemSolution.bind(this)}
                                                  portfolioDetailsId={this.props.portfolioDetailsId}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Audience",
        component: <MlIdeatorAudience key="4" client={client} tabName="Audience" isAdmin={true}
                                      getAudience={this.getAudience.bind(this)}
                                      portfolioDetailsId={this.props.portfolioDetailsId}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Library",
        component: <PortfolioLibrary client={client} isAdmin={true} tabName="Library" key="5"
                                     portfolioDetailsId={this.props.portfolioDetailsId}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Strategy and Planning",
        component: <MlIdeatorStrategyAndPlanning key="6" tabName="Strategy and Planning"
                                                 getStrategyAndPlanning={this.getStrategyAndPlanning.bind(this)}
                                                 portfolioDetailsId={this.props.portfolioDetailsId}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Intellectual Property And Trademark",
        component: <MlIdeatorIntellectualPlanningAndTrademark key="7" tabName="intellectualPlanning"
                                                              getIntellectualPlanning={this.getIntellectualPlanning.bind(this)}
                                                              portfolioDetailsId={this.props.portfolioDetailsId}
                                                              getPrivateKeys={this.getAllPrivateKeys.bind(this)}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Looking For",
        component: <MlIdeatorLookingFor key="8" getLookingFor={this.getLookingFor.bind(this)} tabName="lookingFor"
                                        portfolioDetailsId={this.props.portfolioDetailsId}
                                        getPrivateKeys={this.getAllPrivateKeys.bind(this)}/>
      }
    ]
    return tabs;
  }

  getIdeatorDetails(details, privateKey) {
    let data = this.state.ideatorPortfolio;
    data['portfolioIdeatorDetails'] = details;
    this.setState({ideatorPortfolio: data})
    this.props.getPortfolioDetails({ideatorPortfolio: this.state.ideatorPortfolio}, privateKey);
  }

  getIdeas(details, privateKey) {
    let data = this.state.idea;
    data = details;
    this.setState({idea: data})
    this.props.getIdeatorIdeaDetails(data, privateKey);
  }

  getProblemSolution(details, privateKey) {
    let data = this.state.ideatorPortfolio;
    data['problemSolution'] = details;
    this.setState({ideatorPortfolio: data})
    this.props.getPortfolioDetails({ideatorPortfolio: this.state.ideatorPortfolio}, privateKey);
  }

  getStrategyAndPlanning(details, privateKey) {
    let data = this.state.ideatorPortfolio;
    data['strategyAndPlanning'] = details;
    this.setState({ideatorPortfolio: data})
    this.props.getPortfolioDetails({ideatorPortfolio: this.state.ideatorPortfolio}, privateKey);
  }

  getIntellectualPlanning(details, privateKey) {
    let data = this.state.ideatorPortfolio;
    data['intellectualPlanning'] = details;
    this.setState({ideatorPortfolio: data})
    this.props.getPortfolioDetails({ideatorPortfolio: this.state.ideatorPortfolio}, privateKey);
  }

  getAudience(details, privateKey) {
    let data = this.state.ideatorPortfolio;
    data['audience'] = details;
    this.setState({ideatorPortfolio: data})
    this.props.getPortfolioDetails({ideatorPortfolio: this.state.ideatorPortfolio}, privateKey);
  }

  getLookingFor(details, privateKey) {
    let data = this.state.ideatorPortfolio;
    data['lookingFor'] = details;
    this.setState({ideatorPortfolio: data})
    this.props.getPortfolioDetails({ideatorPortfolio: this.state.ideatorPortfolio}, privateKey);
  }

  componentWillMount() {
    let tabs = this.getTabComponents();

    function getTabs() {
      return tabs.map(tab => ({
        tabClassName: 'moolya_btn', // Optional
        panelClassName: 'panel1', // Optional
        title: tab.title,
        getContent: () => tab.component
      }));
    }

    this.setState({tabs: getTabs() || []});
  }

  getAllPrivateKeys(newProps) {
    this.setState({privateValues: newProps});
    return newProps
  }

  componentWillReceiveProps(newProps) {
    console.log('newProps', newProps);
    if (newProps && newProps.privateKeys.length) {
      const resp = this.getAllPrivateKeys(newProps.privateKeys);
      return resp
    }
  }

  render() {
    let tabs = this.state.tabs;
    return <MlTabComponent tabs={tabs}/>
  }
}
MlIdeatorPortfolioEditTabs.childContextTypes = {
  ideatorPortfolio: PropTypes.object,
  idea: PropTypes.object,
  privateValues: PropTypes.array
};
