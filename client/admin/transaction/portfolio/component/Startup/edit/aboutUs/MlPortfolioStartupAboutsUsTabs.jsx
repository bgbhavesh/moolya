import React from 'react';
import _ from 'lodash'
import omitDeep from 'omit-deep-lodash';
import MlStartupAboutUs from './MlStartupAboutUs';
import MlStartupRating from './MlStartupRating';
import MlStartupClients from './MlStartupClients';
import MlStartupBranches from './MlStartupBranches';
import MlStartupInformation from './MlStartupInformation';
import MlStartupLegal from './MlStartupLegal';
import MlStartupSP from './MlStartupSP';
import MlStartupTechnology from './MlStartupTechnology';
import MlStartupAssets from './MlStartupAssets';
import MlTabComponent from '../../../../../../../commons/components/tabcomponent/MlTabComponent';
import { client } from '../../../../../../core/apolloConnection'
import { appClient } from '../../../../../../../app/core/appConnection'

export default class MlStartupTab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 'About Us',
      tabs: [],
      portfolioStartupAboutUs: {},
      portfolioStartupAssets: [],
      portfolioStartupClients: [],
      portfolioStartupSP: {},
      portfolioStartupInfo: {},
      portfolioStartupBranches: [],
      portfolioStartupTechnologies: [],
      portfolioStartupLegal: {},
      portfolioStartupRating: {},
      admin: true,
      client
    };
  }

  /**
   * handling different condition for app and admin
   * */
  componentDidMount() {
    const props = this.props
    setTimeout(() => {
      if (!props.isApp) {
        $('div[role="tab"]').each(function (index) {
          const test = $(this).text();
          $(this).empty();
          $(this).html(`<div class="moolya_btn moolya_btn_in">${test}</div>`);
        });
        $('.first-item').addClass('menunone');
        $('.RRT__tabs').addClass('horizon-swiper');
        $('.RRT__tab').addClass('horizon-item');
        $('.RRT__panel').addClass('nomargintop');
        $('.RRT__panel .RRT__panel').removeClass('nomargintop');
        $('.horizon-swiper').horizonSwiper();
      } else {
        $('.RRT__tabs').addClass('menunone');
        $('.RRT__container .RRT__container .RRT__tabs').removeClass('menunone');
      }
    }, 10);
    const path = FlowRouter._current.path;
    if (path.indexOf('app') != -1) {
      this.setState({ admin: false, client: appClient })
    }
  }

  getTabComponents() {
    const tabs = [
      // {tabClassName: 'tab back_icon fa fa-hand-o-left', panelClassName: 'panel', title:""},
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: 'About Us',
        name: 'About Us',
        component: <MlStartupAboutUs
          client={client} isAdmin={true} key="1" tabName="aboutUs"
          getStartupAboutUs={this.getStartupAboutUs.bind(this)}
          portfolioDetailsId={this.props.portfolioDetailsId}
          aboutUsDetails={this.props.startupAboutUsDetails && this.props.startupAboutUsDetails.aboutUs}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: 'Rating',
        name: 'Rating',
        component: <MlStartupRating
          key="2" getStartupRating={this.getStartupRating.bind(this)}
          portfolioDetailsId={this.props.portfolioDetailsId}
          ratingDetails={this.props.startupAboutUsDetails && this.props.startupAboutUsDetails.rating}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: 'Client',
        name: 'Client',
        component: <MlStartupClients
          client={client} isAdmin={true} key="3" tabName={'clients'}
          getStartupClients={this.getStartupClients.bind(this)}
          portfolioDetailsId={this.props.portfolioDetailsId}
          clientsDetails={this.props.startupAboutUsDetails && this.props.startupAboutUsDetails.clients}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: 'Services & Products',
        name: 'Services And Products',
        component: <MlStartupSP
          key="4" getStartupSP={this.getStartupServiceProducts.bind(this)}
          portfolioDetailsId={this.props.portfolioDetailsId}
          serviceProductsDetails={this.props.startupAboutUsDetails && this.props.startupAboutUsDetails.serviceProducts}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: 'Information',
        name: 'Information',
        component: <MlStartupInformation
          key="5" getStartupInfo={this.getStartupInfo.bind(this)}
          portfolioDetailsId={this.props.portfolioDetailsId}
          informationDetails={this.props.startupAboutUsDetails && this.props.startupAboutUsDetails.information}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: 'Assets',
        name: 'Assets',
        component: <MlStartupAssets
          client={this.state.client} isAdmin={this.state.admin} key="6" tabName={'assets'}
          getStartupAssets={this.getStartupAssets.bind(this)}
          portfolioDetailsId={this.props.portfolioDetailsId}
          assetsDetails={this.props.startupAboutUsDetails && this.props.startupAboutUsDetails.assets}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: 'Branches',
        name: 'Branches',
        component: <MlStartupBranches
          client={this.state.client} isAdmin={this.state.admin} key="7" tabName={'branches'}
          getStartupBranches={this.getStartupBranches.bind(this)}
          portfolioDetailsId={this.props.portfolioDetailsId}
          branchDetails={this.props.startupAboutUsDetails && this.props.startupAboutUsDetails.branches}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: 'Technology',
        name: 'Technology',
        component: <MlStartupTechnology
          client={this.state.client} isAdmin={this.state.admin} key="8" tabName={'technologies'}
          getStartupTechnology={this.getStartupTechnology.bind(this)}
          portfolioDetailsId={this.props.portfolioDetailsId}
          technologyDetails={this.props.startupAboutUsDetails && this.props.startupAboutUsDetails.technologies}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: 'Legal Issue',
        name: 'Legal Issue',
        component: <MlStartupLegal
          key="9" getStartupLegalIssue={this.getStartupLegalIssue.bind(this)}
          portfolioDetailsId={this.props.portfolioDetailsId}
          legalIssueDetails={this.props.startupAboutUsDetails && this.props.startupAboutUsDetails.legalIssue}/>
      }
    ]
    return tabs;
  }
  /**
   * @Note : need to check the use of maintaining state in this file
   * seems there is no use to maintain state in this file
   * */
  getStartupAboutUs(details, privateKey) {
    let data = this.state.portfolioStartupAboutUs;
    data = details;
    this.setState({ portfolioStartupAboutUs: data })
    const updateItem = _.omit(details, 'logo');
    this.props.getPortfolioStartupAboutUsDetails(updateItem, 'aboutUs', privateKey);
  }

  getStartupAssets(details, privateKey, requiredFields) {
    this.setState({ portfolioStartupAssets: details })
    const ary = [];
    _.each(details, (obj) => {
      const updateItem = _.omit(obj, 'logo');
      ary.push(updateItem)
    })
    const sendData = ary;
    this.props.getPortfolioStartupAboutUsDetails(sendData, 'assets', privateKey, requiredFields);
  }

  getStartupClients(details, privateKey, requiredFields) {
    let data = this.state.portfolioStartupClients;
    data = details;
    this.setState({ portfolioStartupClients: data });
    this.props.getPortfolioStartupAboutUsDetails(data, 'clients', privateKey, requiredFields);
  }

  getStartupServiceProducts(details, privateKey) {
    let data = this.state.portfolioStartupSP;
    data = details;
    this.setState({ portfolioStartupSP: data })
    this.props.getPortfolioStartupAboutUsDetails(data, 'serviceProducts', privateKey);
  }

  getStartupInfo(details, privateKey) {
    let data = this.state.portfolioStartupInfo;
    data = details;
    this.setState({ portfolioStartupInfo: data })
    this.props.getPortfolioStartupAboutUsDetails(data, 'information', privateKey);
  }

  getStartupBranches(details, privateKey, requiredFields) {
    this.setState({ portfolioStartupBranches: details })
    this.props.getPortfolioStartupAboutUsDetails(details, 'branches', privateKey, requiredFields);
  }

  getStartupTechnology(details, privateKey, requiredFields) {
    this.setState({ portfolioStartupTechnologies: details })
    this.props.getPortfolioStartupAboutUsDetails(details, 'technologies', privateKey, requiredFields);
  }

  getStartupLegalIssue(details, privateKey) {
    let data = this.state.portfolioStartupLegal;
    data = details;
    this.setState({ portfolioStartupLegal: data })
    this.props.getPortfolioStartupAboutUsDetails(data, 'legalIssue', privateKey);
  }

  getStartupRating(details, privateKey) {
    let data = this.state.portfolioStartupRating;
    data = details;
    this.setState({ portfolioStartupRating: data })
    this.props.getPortfolioStartupAboutUsDetails(data, 'rating', privateKey);
  }

  componentWillMount() {
    let admin = true;
    const path = FlowRouter._current.path;
    if (path.indexOf('app') != -1) {
      admin = false;
    }
    const tabs = this.getTabComponents();
    function getTabs() {
      return tabs.map(tab => ({
        tabClassName: 'moolya_btn', // Optional
        panelClassName: 'panel1', // Optional
        title: tab.title,
        key: tab.name,
        name: tab.name,
        getContent: () => tab.component
      }));
    }
    const AllTabs = getTabs() || [];
    if (admin) {
      AllTabs.forEach((v) => { delete v.key });
    }
    const activeTab = FlowRouter.getQueryParam('subtab');
    if (activeTab) {
      this.setState({ activeTab, tabs: AllTabs, admin });
    } else { this.setState({ tabs: AllTabs, admin }); }
    /** UI changes for back button */ // +tab.tabClassName?tab.tabClassName:""
  }

  updateTab(index) {
    const subtab = this.state.tabs[index].title;
    FlowRouter.setQueryParams({ subtab });
  }
  render() {
    const tabs = this.state.tabs;

    if (this.state.admin) {
      if (this.props.activeTab) {
        const index = tabs.findIndex(i => i.name === this.props.activeTab);
        return <MlTabComponent tabs={tabs} selectedTabKey={index || 0} backClickHandler={this.props.getStartUpState}/>
      } return <MlTabComponent tabs={tabs} backClickHandler={this.props.getStartUpState}/>
    }

    const activeTab = this.props.activeTab || this.state.activeTab;
    return <MlTabComponent
      tabs={tabs}
      selectedTabKey={activeTab}
      onChange={this.updateTab}
      backClickHandler={this.props.getStartUpState}
      type="subtab" mkey="title"
    />
  }
}

