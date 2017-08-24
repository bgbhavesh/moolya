
/**
 * Import of all the usable components
 * */
import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import MlTabComponent from "../../../../commons/components/tabcomponent/MlTabComponent";
import MlCompanyViewManagement from '../../../../admin/transaction/portfolio/component/Company/view/MlCompanyViewManagement';
import MlCompanyViewAwards from '../../../../admin/transaction/portfolio/component/Company/view/MlCompanyViewAwards';
import MlCompanyViewMCL from '../../../../admin/transaction/portfolio/component/Company/view/MlCompanyViewMCL';
import MlCompanyViewData from '../../../../admin/transaction/portfolio/component/Company/view/MlCompanyViewData';
import MlCompanyViewChart from '../../../../admin/transaction/portfolio/component/Company/view/MlCompanyViewChart';
import MlCompanyViewLibrary from '../../../../admin/transaction/portfolio/component/Company/view/MlCompanyViewLibrary';
import MlCompanyViewAboutLanding from '../../../../admin/transaction/portfolio/component/Company/view/about/MlCompanyViewAboutLanding';
import MlCompanyViewIntrapreneur from '../../../../admin/transaction/portfolio/component/Company/view/MlCompanyViewIntrapreneur';
import MlCSRViewTabs from '../../../../admin/transaction/portfolio/component/Company/view/CSR/MlCSRViewTabs'
import MlCompanyViewPartners from '../../../../admin/transaction/portfolio/component/Company/view/MlCompanyViewPartners'
import MlCompanyViewRAndD from '../../../../admin/transaction/portfolio/component/Company/view/MlCompanyViewR&D'
import MlCompanyIncubatorsViewTabs from '../../../../admin/transaction/portfolio/component/Company/view/incubators/MlCompanyIncubatorsViewTabs'
//todo:import the View component of about screen//

export default class MlAppCompaniesViewTabs extends Component {
  constructor(props) {
    super(props)
    this.state = {tabs: []};
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
      {tabClassName: 'tab', panelClassName: 'panel', title:"About" , component:<MlCompanyViewAboutLanding key="1"  portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations} backClickHandler={this.backClickHandler.bind(this)}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Management" , component:<MlCompanyViewManagement key="2" isAdmin={true} client={client} portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Data" , component:<MlCompanyViewData key="4"  portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Chart" , component:<MlCompanyViewChart key="5"  portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Awards" , component:<MlCompanyViewAwards key="6"  portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Library" , component:<MlCompanyViewLibrary isAdmin={true} client={client}  key="7"  portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"M C & L" , component:<MlCompanyViewMCL key="8" portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Incubators" , component:<MlCompanyIncubatorsViewTabs key="19"  portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations} backClickHandler={this.backClickHandler.bind(this)}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Partners" , component:<MlCompanyViewPartners key="9" portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"CSR" , component:<MlCSRViewTabs key="10"  portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations} backClickHandler={this.backClickHandler.bind(this)}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"R&D" , component:<MlCompanyViewRAndD key="11" portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Intrapreneur" , component:<MlCompanyViewIntrapreneur key="12"  portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
    ]
    return tabs;
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
