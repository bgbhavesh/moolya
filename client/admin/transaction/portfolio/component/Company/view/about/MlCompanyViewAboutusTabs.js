/**
 * Created by Birendra on 21/8/17.
 */
import React from "react";
import MlCompanyViewAbout from "./MlCompanyViewAbout"
import MlCompanyViewRating from "./MlCompanyViewRating"
import MlCompanyViewServicesAndProducts from "./MlCompanyViewServicesAndProducts";
import MlCompanyViewInformation from "./MlCompanyViewInformation"
/**Routes need to be changed*/
import MlCompanyViewClients from "./MlCompanyViewClients";
import MlTabComponent from "../../../../../../../commons/components/tabcomponent/MlTabComponent";
import {client} from '../../../../../../../admin/core/apolloConnection'
import {appClient} from '../../../../../../../app/core/appConnection'

export default class MlCompanyViewAboutusTabs extends React.Component {
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
        title: "About Us",
        component: <MlCompanyViewAbout client={client} isAdmin={true} key="1"
                                       portfolioDetailsId={this.props.portfolioDetailsId}
                                       getSelectedAnnotations={this.props.getSelectedAnnotations}
                                       aboutUsDetails={this.props.institutionAboutUsDetails && this.props.institutionAboutUsDetails.aboutUs}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Rating",
        component: <MlCompanyViewRating key="2" portfolioDetailsId={this.props.portfolioDetailsId}
                                        getSelectedAnnotations={this.props.getSelectedAnnotations}
                                        ratingDetails={this.props.institutionAboutUsDetails && this.props.institutionAboutUsDetails.rating}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Clients",
        component: <MlCompanyViewClients key="3" portfolioDetailsId={this.props.portfolioDetailsId}
                                         getSelectedAnnotations={this.props.getSelectedAnnotations}
                                         clientsDetails={this.props.institutionAboutUsDetails && this.props.institutionAboutUsDetails.clients}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Services & Products",
        component: <MlCompanyViewServicesAndProducts key="4" portfolioDetailsId={this.props.portfolioDetailsId}
                                                     getSelectedAnnotations={this.props.getSelectedAnnotations}
                                                     serviceProductsDetails={this.props.institutionAboutUsDetails && this.props.institutionAboutUsDetails.serviceProducts}/>
      },
      {
        tabClassName: 'tab',
        panelClassName: 'panel',
        title: "Information",
        component: <MlCompanyViewInformation key="5" portfolioDetailsId={this.props.portfolioDetailsId}
                                             getSelectedAnnotations={this.props.getSelectedAnnotations}
                                             informationDetails={this.props.institutionAboutUsDetails && this.props.institutionAboutUsDetails.information}/>
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

