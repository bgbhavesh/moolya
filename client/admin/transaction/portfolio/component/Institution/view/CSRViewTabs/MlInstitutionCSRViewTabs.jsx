/** Evolution
 * Created by Birendra on 21/8/17.
 */
import React from 'react';
/* import MlInstitutionViewAbout from "./MlInstitutionViewAbout"
import MlInstitutionViewRating from "./MlInstitutionViewRating"
import MlInstitutionViewServicesAndProducts from "./MlInstitutionViewServicesAndProducts";
import MlInstitutionViewInformation from "./MlInstitutionViewInformation" */
/** Routes need to be changed */
import MlInstitutionViewAchievements from './MlInstitutionViewAchievements';
import MlInstitutionViewEvolution from './MlInstitutionViewEvolution'
import MlInstitutionViewPolicy from './MlInstitutionViewPolicy'
import MlInstitutionCSRReports from '../../edit/CSR/MlInstitutionCSRReports'
import MlTabComponent from '../../../../../../../commons/components/tabcomponent/MlTabComponent';
import { client } from '../../../../../../../admin/core/apolloConnection'
import { appClient } from '../../../../../../../app/core/appConnection'

export default class MlInstitutionCSRViewTabs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tabs: [],
      admin: true,
      activeTab: 'Evolution',
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
    const path = FlowRouter._current.path;
    if (path.indexOf('app') != -1) {
      this.setState({ admin: false, client: appClient })
    }
  }
  setBackTab(e) {
    this.props.backClickHandler(this.getInstitutionCSRs.bind(this))
  }

  getInstitutionCSRs() {
    this.props.backClickHandler();
    $('.RRT__tab--first').click();
  }

  /**
   * Giving data to all the tabs fetched from the internal "MlInstitutionViewAboutLanding"
   * */
  getTabComponents() {
    const tabs = [
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: 'Evolution',
        component: <MlInstitutionViewEvolution
          key="2" portfolioDetailsId={this.props.portfolioDetailsId} tabName="evolution"
          getSelectedAnnotations={this.props.getSelectedAnnotations}
        />
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: 'Achievements',
        component: <MlInstitutionViewAchievements
          key="1" portfolioDetailsId={this.props.portfolioDetailsId}
          getSelectedAnnotations={this.props.getSelectedAnnotations}
        />
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: 'Reports',
        component: <MlInstitutionCSRReports key="3" portfolioDetailsId={this.props.portfolioDetailsId} />
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: 'Policy',
        component: <MlInstitutionViewPolicy
          key="4" portfolioDetailsId={this.props.portfolioDetailsId} tabName="policy"
          getSelectedAnnotations={this.props.getSelectedAnnotations}
        />
      }
    ]
    return tabs;
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
        key: tab.title,
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
    this.setBackTab()
  }

  updateTab(index) {
    const subtab = this.state.tabs[index].title;
    FlowRouter.setQueryParams({ subtab });
  }

  render() {
    const tabs = this.state.tabs;
    if (this.state.admin) {
      return <MlTabComponent tabs={tabs} backClickHandler={this.props.backClickHandler}/>
    }

    return <MlTabComponent
      tabs={tabs}
      selectedTabKey={this.state.activeTab}
      onChange={this.updateTab}
      backClickHandler={this.props.backClickHandler}
      type="subtab" mkey="title"
    />
  }
}

