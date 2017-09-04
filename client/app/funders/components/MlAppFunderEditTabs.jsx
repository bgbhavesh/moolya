import React, {Component, PropTypes}  from "react";
import {render} from "react-dom";
import MlTabComponent from "../../../commons/components/tabcomponent/MlTabComponent";
import _ from 'lodash'
import {getProfileBasedOnPortfolio} from '../../../app/calendar/manageScheduler/service/actions/MlServiceActionHandler'
import MlFunderAbout from '../../../admin/transaction/portfolio/component/Funder/MlFunderAbout'
import MlFunderAreaOfInterest from '../../../admin/transaction/portfolio/component/Funder/MlFunderAreaOfInterest'
import MlFunderEngagementMethod from '../../../admin/transaction/portfolio/component/Funder/MlFunderEngagementMethod'
import MlFunderInvestment from '../../../admin/transaction/portfolio/component/Funder/MlFunderInvestment'
import PortfolioLibrary from '../../../commons/components/portfolioLibrary/PortfolioLibrary';
import MlFunderNews from '../../../admin/transaction/portfolio/component/Funder/MlFunderNews'
import MlFunderPrincipalTeam from '../../../admin/transaction/portfolio/component/Funder/MlFunderPrincipalTeam'
import MlFunderSuccessStories from '../../../admin/transaction/portfolio/component/Funder/MlFunderSuccessStories'
import MlFunderServices from '../../../admin/transaction/portfolio/component/Funder/MlFunderServices'
import FunderCreateServicesView from '../../../admin/transaction/portfolio/component/Funder/beSpokeHandler'
import MlBeSpokeListView from '../../../admin/transaction/portfolio/component/Funder/MlFunderServicesList'
import {appClient} from '../../core/appConnection'

export default class MlAppFunderEditTabs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {tabs: [], aboutUs: {}, funderPortfolio: {}, portfolioKeys: {privateKeys: [], removePrivateKeys: []}};
    this.getChildContext.bind(this)
    this.getInvestmentsDetails.bind(this);
    this.getFunderNewsDetails.bind(this);
    this.getFunderLibrary.bind(this);
    this.getServiceDetails.bind(this);
    this.saveDataToServices.bind(this);
  }

  getChildContext() {
    return {
      funderPortfolio: this.state.funderPortfolio,
      portfolioKeys: this.state.portfolioKeys
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
    let tabs = [
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "About",
        component: <MlFunderAbout client={appClient} tabName="funderAbout" isAdmin={false} key="1"
                                  getAboutus={this.getAboutus.bind(this)}
                                  portfolioDetailsId={this.props.portfolioDetailsId}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Investments",
        component: <MlFunderInvestment client={appClient} isAdmin={false} key="2" tabName="investments"
                                       getInvestmentsDetails={this.getInvestmentsDetails.bind(this)}
                                       portfolioDetailsId={this.props.portfolioDetailsId}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Principals & Team",
        component: <MlFunderPrincipalTeam client={appClient} isAdmin={false} key="3"
                                          getPrincipalDetails={this.getPrincipalDetails.bind(this)}
                                          getTeamDetails={this.getTeamDetails.bind(this)}
                                          portfolioDetailsId={this.props.portfolioDetailsId}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Engagement Methods",
        component: <MlFunderEngagementMethod client={appClient} isAdmin={false} key="4"
                                             portfolioDetailsId={this.props.portfolioDetailsId}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Areas Of Interest",
        component: <MlFunderAreaOfInterest client={appClient} isAdmin={false} key="6"
                                           getAreaOfInterestDetails={this.getAreaOfInterestDetails.bind(this)}
                                           portfolioDetailsId={this.props.portfolioDetailsId}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Success Stories",
        component: <MlFunderSuccessStories client={appClient} isAdmin={false} key="7" tabName="successStories"
                                           getSuccessStoriesDetails={this.getSuccessStoriesDetails.bind(this)}
                                           portfolioDetailsId={this.props.portfolioDetailsId}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Library",
        component: <PortfolioLibrary client={appClient} isAdmin={false} key="8"
                                     getFunderLibrary={this.getFunderLibrary.bind(this)}
                                     portfolioDetailsId={this.props.portfolioDetailsId}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "News",
        component: <MlFunderNews client={appClient} isAdmin={false} key="9"
                                 getFunderNewsDetails={this.getFunderNewsDetails.bind(this)}
                                 portfolioDetailsId={this.props.portfolioDetailsId}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Services",
        component: <MlFunderServices myPortfolio={true} createServiceMode={true} client={appClient} isAdmin={false}
                                     key="10" getServiceDetails={this.getServiceDetails.bind(this)}
                                     portfolioDetailsId={this.props.portfolioDetailsId}/>
      } //getFunderServicesDetails={this.getFunderServicesDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}
    ]
    return tabs;
  }

  getSuccessStoriesDetails(details, privatekey) {
    let data = this.state.funderPortfolio;
    data['successStories'] = details;
    this.setState({funderPortfolio: data})
    this.props.getPortfolioDetails({funderPortfolio: this.state.funderPortfolio}, privatekey);
  }

  getAboutus(details, privatekey) {
    let data = this.state.funderPortfolio;
    data['funderAbout'] = details;
    this.setState({funderPortfolio: data})
    this.props.getPortfolioDetails({funderPortfolio: this.state.funderPortfolio}, privatekey);
  }

  getInvestmentsDetails(details, privatekey) {
    let data = this.state.funderPortfolio;
    data['investments'] = details;
    this.setState({funderPortfolio: data})
    this.props.getPortfolioDetails({funderPortfolio: this.state.funderPortfolio}, privatekey);
  }

  getPrincipalDetails(details, privatekey) {
    let data = this.state.funderPortfolio;
    if (data && !data.principal) {
      data['principal'] = [];
    }
    data['principal'] = details;
    this.setState({funderPortfolio: data})
    let arr = [];
    _.each(details, function (obj) {
      let updateItem = _.omit(obj, 'logo');
      arr.push(updateItem)
    })
    data['principal'] = arr;
    this.props.getPortfolioDetails({funderPortfolio: data}, privatekey);
  }

  getTeamDetails(details, privatekey) {
    let data = this.state.funderPortfolio;
    if (data && !data.team) {
      data['team'] = [];
    }
    data['team'] = details;
    this.setState({funderPortfolio: data})
    let arr = [];
    _.each(details, function (obj) {
      let updateItem = _.omit(obj, 'logo');
      arr.push(updateItem)
    })
    data['team'] = arr;
    this.props.getPortfolioDetails({funderPortfolio: data}, privatekey);
  }

  getAreaOfInterestDetails(details, privatekey) {
    let data = this.state.funderPortfolio;
    if (data && !data.areaOfInterest) {
      data['areaOfInterest'] = [];
    }
    data['areaOfInterest'] = details;
    this.setState({funderPortfolio: data})
    this.props.getPortfolioDetails({funderPortfolio: this.state.funderPortfolio}, privatekey);
  }

  getServiceDetails(details, privatekey) {
    if (details.services) {
      let portfolioId = details.portfolioId;
      console.log()
      this.saveDataToServices(portfolioId)
    }
    console.log(details)
    let data = this.state.funderPortfolio;
    data['services'] = details;
    this.setState({funderPortfolio: data})
    this.props.getPortfolioDetails({funderPortfolio: this.state.funderPortfolio}, privatekey);
  }

  async saveDataToServices(portfolioId) {
    const resp = await getProfileBasedOnPortfolio(portfolioId)
    this.saveServiceDetails()
    return resp
  }

  getFunderNewsDetails(details, privatekey) {
    let data = this.state.funderPortfolio;
    if (data && !data.lookingFor) {
      data['lookingFor'] = [];
    }
    data['lookingFor'] = details;
    this.setState({funderPortfolio: data})
    this.props.getPortfolioDetails({funderPortfolio: this.state.funderPortfolio}, privatekey);
  }

  getFunderLibrary(details) {
    let data = this.state.funderPortfolio;
    if (details.memberships) {
      data['memberships'] = details.memberships;
    }
    if (details.compliances) {
      data['compliances'] = details.compliances;
    }
    if (details.licenses) {
      data['licenses'] = details.licenses;
    }
    this.setState({funderPortfolio: data})
    this.props.getPortfolioDetails({funderPortfolio: this.state.funderPortfolio}, []);
  }

  getAllPrivateKeys(privateKeys, removePrivateKeys) {
    let obj = {
      privateKeys: privateKeys,
      removePrivateKeys: removePrivateKeys
    }
    this.setState({portfolioKeys: obj});
    return obj
  }

  componentWillReceiveProps(newProps) {
    console.log('newProps', newProps);
    if (newProps) {
      const resp = this.getAllPrivateKeys(newProps.privateKeys, newProps.removePrivateKeys);
      return resp
    }
  }

  componentWillMount() {
    let tabs = this.getTabComponents();

    function getTabs() {
      return tabs.map(tab => ({
        tabClassName: 'horizon-item', // Optional
        panelClassName: 'panel1', // Optional
        title: tab.title,
        getContent: () => tab.component
      }));
    }

    this.setState({tabs: getTabs() || []});
  }

  render() {
    let tabs = this.state.tabs;
    return <MlTabComponent tabs={tabs}/>
  }
}
MlAppFunderEditTabs.childContextTypes = {
  funderPortfolio: PropTypes.object,
  portfolioKeys: PropTypes.object
};
