/**
 * Created by Birendra on 21/8/17.
 */
import React from "react";
/*import MlInstitutionViewAbout from "./MlInstitutionViewAbout"
import MlInstitutionViewRating from "./MlInstitutionViewRating"
import MlInstitutionViewServicesAndProducts from "./MlInstitutionViewServicesAndProducts";
import MlInstitutionViewInformation from "./MlInstitutionViewInformation"*/
/**Routes need to be changed*/
import MlInstitutionViewAchievements from "./MlInstitutionViewAchievements";
import MlInstitutionViewEvolution from "./MlInstitutionViewEvolution"
import MlInstitutionViewPolicy from "./MlInstitutionViewPolicy"
import MlTabComponent from "../../../../../../../commons/components/tabcomponent/MlTabComponent";
import {client} from '../../../../../../../admin/core/apolloConnection'
import {appClient} from '../../../../../../../app/core/appConnection'

export default class MlInstitutionCSRViewTabs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tabs: [], admin: true,
      client: client
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
   * Giving data to all the tabs fetched from the internal "MlInstitutionViewAboutLanding"
   * */
  getTabComponents() {
    let tabs = [
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Evolution",
        component: <MlInstitutionViewEvolution key="2" portfolioDetailsId={this.props.portfolioDetailsId}
                                               getSelectedAnnotations={this.props.getSelectedAnnotations}
        />
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Achievements",
        component: <MlInstitutionViewAchievements key="1" portfolioDetailsId={this.props.portfolioDetailsId}
                                             getSelectedAnnotations={this.props.getSelectedAnnotations}
                                             />
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Policy",
        component: <MlInstitutionViewPolicy key="3" portfolioDetailsId={this.props.portfolioDetailsId}
                                                 getSelectedAnnotations={this.props.getSelectedAnnotations}
                                                 />
      }
    ]
    return tabs;
  }

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
    /**UI changes for back button*/  //+tab.tabClassName?tab.tabClassName:""
  }


  render() {
    let tabs = this.state.tabs;
    return <MlTabComponent tabs={tabs} backClickHandler={this.props.getStartUpState}/>
  }
}

