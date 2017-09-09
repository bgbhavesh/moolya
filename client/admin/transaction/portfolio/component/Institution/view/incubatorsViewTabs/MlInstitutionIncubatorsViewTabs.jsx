/**
 * Created by vishwadeep on 21/8/17.
 */
import React from "react";
import {render} from "react-dom";
import MlInstitutionStartupIncubators from "./MlInstitutionViewStartupIncubators";
import MlInstitutionSectors from "./MlInstitutionViewSectors";
import MlInstitutionListOfIncubators from "./MlInstitutionViewListOfIncubators";
import MlTabComponent from "../../../../../../../commons/components/tabcomponent/MlTabComponent";
import {client} from '../../../../../../core/apolloConnection'
import {appClient} from '../../../../../../../app/core/appConnection'

export default class MlInstitutionIncubatorsViewTabs extends React.Component{
  constructor(props){
    super(props)
    this.state =  {
      tabs: [],
      portfolioIncubators:{},
      institutionIncubators:{},
      sectorsAndServices:{},
      listOfIncubators:{},
      admin: true,
    }
  }

  /**
   * handling different condition for app and admin
   * */
  componentDidMount(){
    var props = this.props
    setTimeout(function(){
      if(!props.isApp) {
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
      }else {
        $('.RRT__tabs').addClass('menunone');
        $('.RRT__container .RRT__container .RRT__tabs').removeClass('menunone');
      }
    },10);
    // let path = FlowRouter._current.path;
    // if (path.indexOf("app") != -1){
    //   this.setState({admin: false, client: appClient})
    // }
  }

  setBackTab(e) {
    this.props.backClickHandler(this.getIncubators.bind(this))
  }

  getIncubators() {
    this.props.backClickHandler();
    $('.RRT__tab--first').click();
  }

  getTabComponents(){
    let tabs = [
      {tabClassName: 'tab', panelClassName: 'panel', title:"Institutions Incubators", component:<MlInstitutionStartupIncubators client={client} isAdmin={true} key="1" portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/> },
      {tabClassName: 'tab', panelClassName: 'panel', title:"Sectors and Service" , component:<MlInstitutionSectors key="2" portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"List of Incubators", component:<MlInstitutionListOfIncubators client={client} isAdmin={true} key="3" portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
    ]
    return tabs;
  }

  componentWillMount()
  {
    let tabs = this.getTabComponents();
    function getTabs() {
      return tabs.map(tab => ({
        tabClassName: 'moolya_btn', // Optional
        panelClassName: 'panel1', // Optional
        title: tab.title,
        getContent: () => tab.component
      }));
    }
    this.setState({tabs:getTabs() ||[]});
    this.setBackTab()
    /**UI changes for back button*/
  }


  render(){
    let tabs = this.state.tabs;
    return <MlTabComponent tabs={tabs} backClickHandler={this.props.backClickHandler}/>
  }
}

