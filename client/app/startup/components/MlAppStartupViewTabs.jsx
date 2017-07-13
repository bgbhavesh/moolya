import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import MlStartupViewAboutUs from "../../../admin/transaction/portfolio/component/StartupView/MlStartupViewAboutUs";
import MlStartupViewManagement from "../../../admin/transaction/portfolio/component/StartupView/MlStartupViewManagement";
import MlStartupViewInvestor from "../../../admin/transaction/portfolio/component/StartupView/MlStartupViewInvestor";
import MlStartupViewAwards from "../../../admin/transaction/portfolio/component/StartupView/MlStartupViewAwards";
import MlStartupViewMCL from "../../../admin/transaction/portfolio/component/StartupView/MlStartupViewMCL";
import MlStartupViewLookingFor from "../../../admin/transaction/portfolio/component/StartupView/MlStartupViewLookingFor";
import MlStartupViewBranches from "../../../admin/transaction/portfolio/component/StartupView/MlStartupViewBranches";
import MlStartupViewClients from "../../../admin/transaction/portfolio/component/StartupView/MlStartupViewClients";
import MlStartupViewTechnologies from "../../../admin/transaction/portfolio/component/StartupView/MlStartupViewTechnologies";
import MlStartupViewAssets from "../../../admin/transaction/portfolio/component/StartupView/MlStartupViewAssets";
import MlTabComponent from "../../../commons/components/tabcomponent/MlTabComponent";
import PortfolioLibrary from "../../../commons/components/portfolioLibrary/PortfolioLibrary";
import {appClient} from "../../core/appConnection";

/**
 * Import of all the files from admin need to seperate from app
 * */

//todo://anotations to be includeds
export default class MlAppStartupViewTabs extends Component {
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

  /**
   * rendering of all the tabs in UI
   * */
  getTabComponents() {
    let tabs = [
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "About",
        component: <MlStartupViewAboutUs key="1" portfolioDetailsId={this.props.portfolioDetailsId}
                                         getSelectedAnnotations={this.props.getSelectedAnnotations}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Clients",
        component: <MlStartupViewClients key="2" portfolioDetailsId={this.props.portfolioDetailsId}
                                         getSelectedAnnotations={this.props.getSelectedAnnotations}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Assets",
        component: <MlStartupViewAssets key="2" portfolioDetailsId={this.props.portfolioDetailsId}
                                        getSelectedAnnotations={this.props.getSelectedAnnotations}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Technologies",
        component: <MlStartupViewTechnologies key="2" portfolioDetailsId={this.props.portfolioDetailsId}
                                              getSelectedAnnotations={this.props.getSelectedAnnotations}/>
      },

      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Management",
        component: <MlStartupViewManagement key="2" isAdmin={false} client={appClient}
                                            portfolioDetailsId={this.props.portfolioDetailsId}
                                            getSelectedAnnotations={this.props.getSelectedAnnotations}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Investor",
        component: <MlStartupViewInvestor key="3" portfolioDetailsId={this.props.portfolioDetailsId}
                                          getSelectedAnnotations={this.props.getSelectedAnnotations}/>
      },
      // {tabClassName: 'tab', panelClassName: 'panel', title:"Charts" , component:<MlIdeatorDetails key="5" getIdeatorDetails={this.getIdeatorDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Awards",
        component: <MlStartupViewAwards key="6" portfolioDetailsId={this.props.portfolioDetailsId}
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
        title: "Branches",
        component: <MlStartupViewBranches key="8" portfolioDetailsId={this.props.portfolioDetailsId}
                                          getSelectedAnnotations={this.props.getSelectedAnnotations}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "M C & L",
        component: <MlStartupViewMCL key="9" portfolioDetailsId={this.props.portfolioDetailsId}
                                     getSelectedAnnotations={this.props.getSelectedAnnotations}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Looking For",
        component: <MlStartupViewLookingFor key="10" portfolioDetailsId={this.props.portfolioDetailsId}
                                            getSelectedAnnotations={this.props.getSelectedAnnotations}/>
      }
    ]
    return tabs;
  }

  render() {
    let tabs = this.state.tabs;
    return <MlTabComponent tabs={tabs}/>
  }
}
