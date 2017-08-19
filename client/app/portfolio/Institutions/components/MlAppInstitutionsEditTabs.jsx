/**
 * Created by vishwadeep on 19/8/17.
 */

/**
 * Import of all the usable components
 * */
import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import MlTabComponent from "../../../../commons/components/tabcomponent/MlTabComponent";
import MlServiceProviderAbout from '../../../../admin/transaction/portfolio/component/ServiceProvider/edit/MlServiceProviderAbout'
import {appClient} from '../../../core/appConnection'
//todo:import the View component of admin//

export default class MlAppInstitutionsEditTabs extends Component {
  constructor(props) {
    super(props)
    this.state = {tabs: [], institutionsPortfolio: {}};
    this.getChildContext.bind(this)
  }

  getChildContext() {
    return {
      institutionsPortfolio: this.state.institutionsPortfolio
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
        component: <MlServiceProviderAbout client={appClient} isAdmin={false} key="1"
                                           getAboutus={this.getAboutus.bind(this)}
                                           portfolioDetailsId={this.props.portfolioDetailsId}/>
      }
    ]
    return tabs;
  }

  /**
   * getting all values from the child components and passing all to Main component through props
   * */
  getAboutus(details, privateKey) {
    let data = this.state.institutionsPortfolio;
    data['about'] = details;
    this.setState({institutionsPortfolio: data})
    this.props.getPortfolioDetails({institutionsPortfolio: this.state.institutionsPortfolio}, privateKey);
  }

  /**
   * tab mounting component
   * */
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

/**
 * preparing context of all the data coming from child component
 * */
MlAppInstitutionsEditTabs.childContextTypes = {
  institutionsPortfolio: PropTypes.object,
};
