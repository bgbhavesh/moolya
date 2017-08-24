
/**
 * Import of all the usable components
 * */
import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import MlTabComponent from "../../../../commons/components/tabcomponent/MlTabComponent";
import {appClient} from '../../../core/appConnection'
import MlCompanyManagement from '../../../../admin/transaction/portfolio/component/Company/edit/MlCompanyManagement';
import MlCompanyAboutUsLandingPage from "../../../../admin/transaction/portfolio/component/Company/edit/about/MlCompanyAboutUsLandingPage";
import MlCompanyData from "../../../../admin/transaction/portfolio/component/Company/edit/MlCompanyData";
import MlCompanyAwards from "../../../../admin/transaction/portfolio/component/Company/edit/MlCompanyAwards";
import MlCompanyMCL from "../../../../admin/transaction/portfolio/component/Company/edit/MlCompanyMCL";
import MlCompanyIncubatorsEditTabs from "../../../../admin/transaction/portfolio/component/Company/edit/incubators/MlCompanyIncubatorsEditTabs"
import MlCompanyPartners from "../../../../admin/transaction/portfolio/component/Company/edit/MlCompanyPartners";
import MlCompanyCSREditTabs from "../../../../admin/transaction/portfolio/component/Company/edit/CSR/MlCompanyCSREditTabs"
import MlCompanyIntrapreneur from '../../../../admin/transaction/portfolio/component/Company/edit/MlCompanyIntrapreneur'
import MlCompanyRAndD from '../../../../admin/transaction/portfolio/component/Company/edit/MlCompanyR&D'
import PortfolioLibrary from '../../../../commons/components/portfolioLibrary/PortfolioLibrary'

export default class MlAppCompaniesEditTabs extends Component {
  constructor(props) {
    super(props)
    this.state = {tabs: [], companiesPortfolio: {}};
    this.getChildContext.bind(this)
  }

  getChildContext() {
    return {
      companiesPortfolio: this.state.companiesPortfolio
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
      {tabClassName: 'tab', panelClassName: 'panel', title:"About" , component:<MlCompanyAboutUsLandingPage key="1" getAboutus={this.getAboutus.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} backClickHandler={this.backClickHandler.bind(this)}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Management" , component:<MlCompanyManagement  client={client} isAdmin={true} key="2" getManagementDetails={this.getManagementDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Data" , component:<MlCompanyData key="4" isApp={false} client={client} getDataDetails={this.getDataDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Awards" , component:<MlCompanyAwards key="6" getAwardsDetails={this.getAwardsDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Library" , component:<PortfolioLibrary key="7" client={client} isAdmin={false} portfolioDetailsId={this.props.portfolioDetailsId}/>}, //
      {tabClassName: 'tab', panelClassName: 'panel', title:"M C & L" , component:<MlCompanyMCL key="8" getMCL={this.getMCL.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Incubators" , component:<MlCompanyIncubatorsEditTabs key="9" getIncubators={this.getIncubators.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} backClickHandler={this.backClickHandler.bind(this)}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Partners" , component:<MlCompanyPartners key="10" getPartnersDetails={this.getPartnersDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"CSR" , component:<MlCompanyCSREditTabs key="11" getCSRDetails={this.getCSRDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} backClickHandler={this.backClickHandler.bind(this)}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"R&D" , component:<MlCompanyRAndD key="13" getRDDetails={this.getRDDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Intrapreneur" , component:<MlCompanyIntrapreneur key="12" getIntrapreneurDetails={this.getIntrapreneurDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
    ]
    return tabs;
  }

  /**
   * getting all values from the child components and passing all to Main component through props
   * */
  getAboutus(details, privateKey) {
    let data = this.state.companiesPortfolio;
    data['about'] = details;
    this.setState({companiesPortfolio: data})
    this.props.getPortfolioDetails({companiesPortfolio: this.state.companiesPortfolio}, privateKey);
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
MlAppCompaniesEditTabs.childContextTypes = {
  companiesPortfolio: PropTypes.object,
};
