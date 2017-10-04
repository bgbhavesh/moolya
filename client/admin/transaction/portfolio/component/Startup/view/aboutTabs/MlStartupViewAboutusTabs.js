/**
 * Created by vishwadeep on 21/8/17.
 */
import React from "react";
import {render} from "react-dom";
import MlStartupViewAbout from "./MlStartupViewAbout"
import MlStartupViewRating from "./MlStartupViewRating"
import MlStartupViewServicesAndProducts from "./MlStartupViewServicesAndProducts";
import MlStartupViewInformation from "./MlStartupViewInformation"
/**Routes need to be changed*/
import MlStartupViewClients from "./MlStartupViewClients";
import MlStartupViewLegalIssues from "./MlStartupViewLegalIssues"
import MlStartupViewAssets from "./MlStartupViewAssets"
import MlStartupViewBranches from "./MlStartupViewBranches"
import MlStartupViewTechnologies from "./MlStartupViewTechnologies"
import MlTabComponent from "../../../../../../../commons/components/tabcomponent/MlTabComponent";
import {client} from '../../../../../../../admin/core/apolloConnection'
import {appClient} from '../../../../../../../app/core/appConnection'

export default class MlStartupViewAboutusTabs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tabs: [], admin: true,
      client: client,activeTab:"About Us",
    }
    ;
  }

  /**
   * handling different condition for app and admin
   * */
  componentDidMount() {
    var props = this.props
    console.log(props)
    setTimeout(function () {
      if (!props.isApp) {
        $('div[role="tab"]').each(function (index) {
          var test = $(this).text();
          $(this).empty();
          $(this).html('<div class="moolya_btn moolya_btn_in">' + test + '</div>');
        });
        $('.last-item').addClass('menunone');
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
    let path = FlowRouter._current.path;
    if (path.indexOf("app") != -1) {
      this.setState({admin: false, client: appClient})
    }
  }

  /**
   * Giving data to all the tabs fetched from the internal "MlStartupViewAboutLanding"
   * */
  getTabComponents() {
    let tabs = [
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "About Us",
        component: <MlStartupViewAbout client={client} isAdmin={true} key="1"
                                       portfolioDetailsId={this.props.portfolioDetailsId}
                                       getSelectedAnnotations={this.props.getSelectedAnnotations}
                                       aboutUsDetails={this.props.startupAboutUsDetails && this.props.startupAboutUsDetails.aboutUs}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Rating",
        component: <MlStartupViewRating key="2" portfolioDetailsId={this.props.portfolioDetailsId}
                                        getSelectedAnnotations={this.props.getSelectedAnnotations}
                                        ratingDetails={this.props.startupAboutUsDetails && this.props.startupAboutUsDetails.rating}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Clients",
        component: <MlStartupViewClients key="3" portfolioDetailsId={this.props.portfolioDetailsId}
                                         getSelectedAnnotations={this.props.getSelectedAnnotations}
                                         clientsDetails={this.props.startupAboutUsDetails && this.props.startupAboutUsDetails.clients}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Services & Products",
        component: <MlStartupViewServicesAndProducts key="4" portfolioDetailsId={this.props.portfolioDetailsId}
                                                     getSelectedAnnotations={this.props.getSelectedAnnotations}
                                                     serviceProductsDetails={this.props.startupAboutUsDetails && this.props.startupAboutUsDetails.serviceProducts}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Information",
        component: <MlStartupViewInformation key="5" portfolioDetailsId={this.props.portfolioDetailsId}
                                             getSelectedAnnotations={this.props.getSelectedAnnotations}
                                             informationDetails={this.props.startupAboutUsDetails && this.props.startupAboutUsDetails.information}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Assets",
        component: <MlStartupViewAssets key="2" portfolioDetailsId={this.props.portfolioDetailsId}
                                        getSelectedAnnotations={this.props.getSelectedAnnotations}
                                        assetsDetails={this.props.startupAboutUsDetails && this.props.startupAboutUsDetails.assets}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Branches",
        component: <MlStartupViewBranches key="8" portfolioDetailsId={this.props.portfolioDetailsId}
                                          getSelectedAnnotations={this.props.getSelectedAnnotations}
                                          branchesDetails={this.props.startupAboutUsDetails && this.props.startupAboutUsDetails.branches}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Technologies",
        component: <MlStartupViewTechnologies key="2" portfolioDetailsId={this.props.portfolioDetailsId}
                                              getSelectedAnnotations={this.props.getSelectedAnnotations}
                                              technologiesDetails={this.props.startupAboutUsDetails && this.props.startupAboutUsDetails.technologies}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Legal Issue",
        component: <MlStartupViewLegalIssues key="9" portfolioDetailsId={this.props.portfolioDetailsId}
                                             getSelectedAnnotations={this.props.getSelectedAnnotations}
                                             legalIssueDetails={this.props.startupAboutUsDetails && this.props.startupAboutUsDetails.legalIssue}/>
      }
    ]
    return tabs;
  }

  componentWillMount() {
    let admin=true;
    let path = FlowRouter._current.path;
    if (path.indexOf("app") != -1){
      admin = false;
    }
    let tabs = this.getTabComponents();

    function getTabs() {
      return tabs.map(tab => ({
        tabClassName: 'moolya_btn', // Optional
        panelClassName: 'panel1', // Optional
        title: tab.title,
        key:tab.title,
        getContent: () => tab.component
      }));
    }
    let AllTabs =getTabs() ||[];
    if(admin){
      AllTabs.forEach(function(v){ delete v.key });
    }
    let activeTab = FlowRouter.getQueryParam('subtab');
    if(activeTab){
      this.setState({activeTab,tabs:AllTabs,admin});
    }else
    this.setState({tabs:AllTabs,admin});
    /**UI changes for back button*/  //+tab.tabClassName?tab.tabClassName:""
  }

  updateTab(index){
    let subtab =  this.state.tabs[index].title;
    FlowRouter.setQueryParams({ subtab });
  }

  render() {
    let tabs = this.state.tabs;
    if(this.state.admin){
      return <MlTabComponent tabs={tabs} backClickHandler={this.props.getStartUpState}/>
    }
    else{
      return <MlTabComponent tabs={tabs}
                             selectedTabKey={this.state.activeTab}
                             onChange={this.updateTab}
                             backClickHandler={this.props.getStartUpState}
                             type="subtab" mkey="title"
      />
    }
  }
}

