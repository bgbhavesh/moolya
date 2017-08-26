import React, {Component, PropTypes} from "react";
import MlInstitutionViewAboutLanding from "../../../../admin/transaction/portfolio/component/Institution/view/aboutTabs/MlInstitutionViewAboutLanding";
import MlInstitutionViewManagement from "../../../../admin/transaction/portfolio/component/Institution/view/MlInstitutionViewManagement";
import MlInstitutionViewInvestor from "../../../../admin/transaction/portfolio/component/Institution/view/MlInstitutionViewInvestor";
import MlInstitutionViewAwards from "../../../../admin/transaction/portfolio/component/Institution/view/MlInstitutionViewAwards";
import MlInstitutionViewMCL from "../../../../admin/transaction/portfolio/component/Institution/view/MlInstitutionViewMCL";
import MlInstitutionViewLookingFor from "../../../../admin/transaction/portfolio/component/Institution/view/MlInstitutionViewLookingFor";
import MlTabComponent from "../../../../commons/components/tabcomponent/MlTabComponent";
import PortfolioLibrary from "../../../../commons/components/portfolioLibrary/PortfolioLibrary";
import MlInstitutionViewCharts from "../../../../admin/transaction/portfolio/component/Institution/view/MlInstitutionViewChart";
import MlInstitutionIntrapreneur from "../../../../admin/transaction/portfolio/component/Institution/view/MlInstitutionViewIntrapreneur";
import MlInstitutionRAndD from "../../../../admin/transaction/portfolio/component/Institution/view/MlInstitutionViewR&D";
import MlInstitutionCSR from "../../../../admin/transaction/portfolio/component/Institution/view/CSRViewTabs/MlInstitutionCSRViewTabs";
import MlInstitutionViewPartners from "../../../../admin/transaction/portfolio/component/Institution/view/MlInstitutionViewPartners";
import MlInstitutionIncubator from "../../../../admin/transaction/portfolio/component/Institution/view/incubatorsViewTabs/MlInstitutionIncubatorsViewTabs";
import {appClient} from "../../../core/appConnection";

/**
 * Import of all the files from admin need to seperate from app
 * */

//todo://anotations to be includeds
export default class MlAppInstitutionViewTabs extends Component {
  constructor(props) {
    super(props);
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

  backClickHandler(){
    let tabs = this.state.tabs;
    this.setState({tabs: tabs})
  }

  setBackHandler(backMethod){
    this.props.setBackHandler(backMethod);
    $('.RRT__tabs').removeClass('menunone');
  }


  /**
   * rendering of all the tabs in UI
   * */
  getTabComponents() {
    let tabs = [
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "About",
        component: <MlInstitutionViewAboutLanding key="1" portfolioDetailsId={this.props.portfolioDetailsId}
                                              getSelectedAnnotations={this.props.getSelectedAnnotations}
                                              backClickHandler={this.setBackHandler.bind(this)} isApp={true}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Management",
        component: <MlInstitutionViewManagement key="2" isAdmin={false} client={appClient}
                                            portfolioDetailsId={this.props.portfolioDetailsId}
                                            getSelectedAnnotations={this.props.getSelectedAnnotations}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Investor",
        component: <MlInstitutionViewInvestor key="3" portfolioDetailsId={this.props.portfolioDetailsId}
                                          getSelectedAnnotations={this.props.getSelectedAnnotations}/>
      },
      {tabClassName: 'tab',
        panelClassName: 'panel', title:"Charts" ,
        component:<MlInstitutionViewCharts key="5" portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Awards",
        component: <MlInstitutionViewAwards key="6" portfolioDetailsId={this.props.portfolioDetailsId}
                                        getSelectedAnnotations={this.props.getSelectedAnnotations}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Library",
        component: <PortfolioLibrary isAdmin={false} client={appClient} key="7"
                                     portfolioDetailsId={this.props.portfolioDetailsId}
                                     getSelectedAnnotations={this.props.getSelectedAnnotations}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "M C & L",
        component: <MlInstitutionViewMCL key="8" portfolioDetailsId={this.props.portfolioDetailsId}
                                     getSelectedAnnotations={this.props.getSelectedAnnotations}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Looking For",
        component: <MlInstitutionViewLookingFor key="9" portfolioDetailsId={this.props.portfolioDetailsId}
                                            getSelectedAnnotations={this.props.getSelectedAnnotations}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Partner",
        component: <MlInstitutionViewPartners key="10" portfolioDetailsId={this.props.portfolioDetailsId}
                                                getSelectedAnnotations={this.props.getSelectedAnnotations}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "CSR",
        component: <MlInstitutionCSR key="11" portfolioDetailsId={this.props.portfolioDetailsId}
                                     getSelectedAnnotations={this.props.getSelectedAnnotations}
                                     backClickHandler={this.setBackHandler.bind(this)} isApp={true}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "R&D",
        component: <MlInstitutionRAndD key="12" portfolioDetailsId={this.props.portfolioDetailsId}
                                              getSelectedAnnotations={this.props.getSelectedAnnotations}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Intrapreneur",
        component: <MlInstitutionIntrapreneur key="14" portfolioDetailsId={this.props.portfolioDetailsId}
                                              getSelectedAnnotations={this.props.getSelectedAnnotations}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Incubators",
        component: <MlInstitutionIncubator key="15" portfolioDetailsId={this.props.portfolioDetailsId}
                                     getSelectedAnnotations={this.props.getSelectedAnnotations}
                                     backClickHandler={this.setBackHandler.bind(this)} isApp={true}/>
      },
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
