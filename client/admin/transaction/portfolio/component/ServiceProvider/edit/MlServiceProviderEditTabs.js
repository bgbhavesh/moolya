/**
 * Created by vishwadeep on 8/7/17.
 */

/**
 * Import of all the usable components
 * */
import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import MlTabComponent from "../../../../../../commons/components/tabcomponent/MlTabComponent";
import _ from "lodash";
import MlFunderAbout from "../../Funder/MlFunderAbout";
import PortfolioLibrary from '../../../../../../commons/genericComponents/portfolioLibrary'
import MlServiceProviderAwards from "./MlServiceProviderAwards";
import MlServiceProviderMCL from "./MlServiceProviderMCL";
import MlServiceProviderServices from "./MlServiceProviderServices";
import MlServiceProviderClients from "./MlServiceProviderClients";
import {client} from '../../../../../core/apolloConnection'

export default class MlServiceProviderEditTabs extends Component {
  constructor(props) {
    super(props)
    this.state = {tabs: [], aboutUs: {}, serviceProviderPortfolio: {}};
    this.getChildContext.bind(this)
    this.getAwardsDetails.bind(this);
    this.getFunderLibrary.bind(this)
  }

  getChildContext() {
    return {
      serviceProviderPortfolio: this.state.serviceProviderPortfolio
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
        title: "About",
        component: <MlFunderAbout key="1" getAboutus={this.getAboutus.bind(this)}
                                  portfolioDetailsId={this.props.portfolioDetailsId}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Awards and Rewards",
        component: <MlServiceProviderAwards key="2" getAwardsDetails={this.getAwardsDetails.bind(this)}
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
        component: <MlServiceProviderMCL key="4" getServiceProviderMCL={this.getServiceProviderMCL.bind(this)}
                                         portfolioDetailsId={this.props.portfolioDetailsId}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Services",
        component: <MlServiceProviderServices key="5"
                                              getServiceProviderServices={this.getServiceProviderServices.bind(this)}
                                              portfolioDetailsId={this.props.portfolioDetailsId}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Clients",
        component: <MlServiceProviderClients key="6"
                                             getServiceProviderClients={this.getServiceProviderClients.bind(this)}
                                             portfolioDetailsId={this.props.portfolioDetailsId}
                                             clientsDetails={this.props.startupAboutUsDetails && this.props.startupAboutUsDetails.clients}/>
      }
    ]
    return tabs;
  }

  /**
   * getting all values from the child components and passing all to Main component through props
   * */
  getAboutus(details, privateKey) {
    let data = this.state.serviceProviderPortfolio;
    data['funderAbout'] = details;
    this.setState({serviceProviderPortfolio: data})
    this.props.getPortfolioDetails({serviceProviderPortfolio: this.state.serviceProviderPortfolio}, privateKey);
  }

  getAwardsDetails(details) {
    let data = this.state.serviceProviderPortfolio;
    if (data && !data.awardsRecognition) {
      data['awardsRecognition'] = [];
    }
    this.setState({serviceProviderPortfolio: data})
    let arr = [];
    _.each(details, function (obj) {
      let updateItem = _.omit(obj, 'logo');
      arr.push(updateItem)
    })
    data['awardsRecognition'] = arr;
    this.props.getPortfolioDetails({serviceProviderPortfolio: this.state.serviceProviderPortfolio});
  }

  getServiceProviderMCL(details) {
    let data = this.state.startupPortfolio;
    if (details.memberships) {
      data['memberships'] = details.memberships;
    }
    if (details.compliances) {
      data['compliances'] = details.compliances;
    }
    if (details.licenses) {
      data['licenses'] = details.licenses;
    }
    this.setState({startupPortfolio: data})
    this.props.getPortfolioDetails({startupPortfolio: this.state.startupPortfolio}, []);
  }

  getServiceProviderServices(details, privateKey) {
    let data = this.state.serviceProviderPortfolio;
    data['services']=details;
    this.setState({serviceProviderPortfolio : data})
    this.props.getPortfolioDetails({serviceProviderPortfolio:this.state.serviceProviderPortfolio}, privateKey);
  }

  getFunderLibrary(details) {
    let data = this.state.serviceProviderPortfolio;
    if (details.memberships) {
      data['memberships'] = details.memberships;
    }
    if (details.compliances) {
      data['compliances'] = details.compliances;
    }
    if (details.licenses) {
      data['licenses'] = details.licenses;
    }
    this.setState({serviceProviderPortfolio: data})
    this.props.getPortfolioDetails({serviceProviderPortfolio: this.state.serviceProviderPortfolio}, []);
  }

  getServiceProviderClients(details) {
    let data = this.state.portfolioStartupClients;
    data = details;
    this.setState({portfolioStartupClients: data})
    this.props.getPortfolioStartupAboutUsDetails(data, "clients");
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
MlServiceProviderEditTabs.childContextTypes = {
  serviceProviderPortfolio: PropTypes.object,
};
