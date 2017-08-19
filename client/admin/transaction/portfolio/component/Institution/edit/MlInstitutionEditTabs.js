/**
 * Created by vishwadeep on 19/8/17.
 */

/**
 * Import of all the usable components
 * */
import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import MlTabComponent from "../../../../../../commons/components/tabcomponent/MlTabComponent";
import _ from "lodash";
import PortfolioLibrary from '../../../../../../commons/components/portfolioLibrary/PortfolioLibrary'
import MlServiceProviderAwards from "./MlServiceProviderAwards";
import MlServiceProviderMCL from "./MlServiceProviderMCL";
import MlServiceProviderServices from "./MlServiceProviderServices";
import MlServiceProviderClients from "./MlServiceProviderClients";
import MlServiceProviderAbout from './MlServiceProviderAbout'
import {client} from '../../../../../core/apolloConnection'

export default class MlInstitutionEditTabs extends Component {
  constructor(props) {
    super(props)
    this.state = {tabs: [], aboutUs: {}, institutionPortfolio: {}};
    this.getChildContext.bind(this)
    this.getAwardsDetails.bind(this);
    this.getFunderLibrary.bind(this)
  }

  getChildContext() {
    return {
      institutionPortfolio: this.state.institutionPortfolio
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

  /**
   * Display of all tabs of service provider and passing the portfolioId
   * */
  getTabComponents() {
    let tabs = [
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "About Institution",
        component: <MlServiceProviderAbout client={client} isAdmin={true} key="1" getAboutus={this.getAboutus.bind(this)}
                                  portfolioDetailsId={this.props.portfolioDetailsId}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Awards and Rewards",
        component: <MlServiceProviderAwards client={client} isAdmin={true} key="2" getAwardsDetails={this.getAwardsDetails.bind(this)}
                                            portfolioDetailsId={this.props.portfolioDetailsId}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Library",
        component: <PortfolioLibrary isAdmin={true} client={client} key="3" getFunderLibrary={this.getFunderLibrary.bind(this)}
                                    portfolioDetailsId={this.props.portfolioDetailsId}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "MCL",
        component: <MlServiceProviderMCL client={client} isAdmin={true} key="4" getServiceProviderMCL={this.getServiceProviderMCL.bind(this)}
                                         portfolioDetailsId={this.props.portfolioDetailsId}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Services",
        component: <MlServiceProviderServices key="5"client={client} isAdmin={true}
                                              getServiceProviderServices={this.getServiceProviderServices.bind(this)}
                                              portfolioDetailsId={this.props.portfolioDetailsId}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Clients",
        component: <MlServiceProviderClients key="6" client={client}
                                             getServiceProviderClients={this.getServiceProviderClients.bind(this)}
                                             portfolioDetailsId={this.props.portfolioDetailsId}/>
      }
    ]
    return tabs;
  }

  /**
   * getting all values from the child components and passing all to Main component through props
   * */
  getAboutus(details, privateKey) {
    let data = this.state.institutionPortfolio;
    data['about'] = details;
    this.setState({institutionPortfolio: data})
    this.props.getPortfolioDetails({institutionPortfolio: this.state.institutionPortfolio}, privateKey);
  }

  getAwardsDetails(details) {
    let data = this.state.institutionPortfolio;
    if (data && !data.awardsRecognition) {
      data['awardsRecognition'] = [];
    }
    this.setState({institutionPortfolio: data})
    let arr = [];
    _.each(details, function (obj) {
      let updateItem = _.omit(obj, 'logo');
      arr.push(updateItem)
    })
    data['awardsRecognition'] = arr;
    this.props.getPortfolioDetails({institutionPortfolio: this.state.institutionPortfolio});
  }

  getServiceProviderMCL(details, privateKey) {
    let data = this.state.institutionPortfolio;
    if (details.memberships) {
      data['memberships'] = details.memberships;
    }
    if (details.compliances) {
      data['compliances'] = details.compliances;
    }
    if (details.licenses) {
      data['licenses'] = details.licenses;
    }
    this.setState({institutionPortfolio: data})
    this.props.getPortfolioDetails({institutionPortfolio: this.state.institutionPortfolio}, privateKey);
  }

  getServiceProviderServices(details, privateKey) {
    let data = this.state.institutionPortfolio;
    data['services']=details;
    this.setState({institutionPortfolio : data})
    this.props.getPortfolioDetails({institutionPortfolio:this.state.institutionPortfolio}, privateKey);
  }

  getFunderLibrary(details) {
    let data = this.state.institutionPortfolio;
    if (details.memberships) {
      data['memberships'] = details.memberships;
    }
    if (details.compliances) {
      data['compliances'] = details.compliances;
    }
    if (details.licenses) {
      data['licenses'] = details.licenses;
    }
    this.setState({institutionPortfolio: data})
    this.props.getPortfolioDetails({institutionPortfolio: this.state.institutionPortfolio}, []);
  }

  getServiceProviderClients(details, privateKey) {
    let data = this.state.institutionPortfolio;
    if (data && !data.clients) {
      data['clients'] = [];
    }
    this.setState({institutionPortfolio: data})
    let arr = [];
    _.each(details, function (obj) {
      let updateItem = _.omit(obj, 'logo');
      arr.push(updateItem)
    })
    data['clients'] = arr;
    this.setState({institutionPortfolio: data})
    this.props.getPortfolioDetails({institutionPortfolio: this.state.institutionPortfolio}, privateKey);
  }


  /**
   * tab mounting component
   * */
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

  render() {
    let tabs = this.state.tabs;
    return <MlTabComponent tabs={tabs}/>
  }
}

/**
 * preparing context of all the data coming from child component
 * */
MlInstitutionEditTabs.childContextTypes = {
  institutionPortfolio: PropTypes.object,
};
