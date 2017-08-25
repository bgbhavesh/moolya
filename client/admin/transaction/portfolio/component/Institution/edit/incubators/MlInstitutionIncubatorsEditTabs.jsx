
import React from "react";
import {render} from "react-dom";
import MlInstitutionStartupIncubators from "./MlInstitutionStartupIncubators";
import MlInstitutionSectors from "./MlInstitutionSectors";
import MlInstitutionListOfIncubators from "./MlInstitutionListOfIncubators";
import MlTabComponent from "../../../../../../../commons/components/tabcomponent/MlTabComponent";
import {client} from '../../../../../../core/apolloConnection'
import {appClient} from '../../../../../../../app/core/appConnection'

export default class MlInstitutionIncubatorsEditTabs extends React.Component{
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
    ;
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
    let path = FlowRouter._current.path;
    if (path.indexOf("app") != -1){
      this.setState({admin: false, client: appClient})
    }
  }

  getTabComponents(){
    let tabs = [
      // {tabClassName: 'tab back_icon fa fa-hand-o-left', panelClassName: 'panel', title:""},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Startup Incubators", component:<MlInstitutionStartupIncubators client={client} isAdmin={true} key="1"  getStartupIncubators={this.getStartupIncubators.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/> },
      {tabClassName: 'tab', panelClassName: 'panel', title:"Sectors and Service" , component:<MlInstitutionSectors key="2" getSectors={this.getSectors.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} />},
      {tabClassName: 'tab', panelClassName: 'panel', title:"List of Incubators", component:<MlInstitutionListOfIncubators client={client} isAdmin={true} key="3" getListOfIncubators={this.getListOfIncubators.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} />},
    ]
    return tabs;
  }

  getStartupIncubators(details, privateKey){
    let data = this.state.institutionIncubators;
    data=details;
    this.setState({institutionIncubators : data})
    let updateItem = _.omit(details, 'logo');
    this.props.getIncubators(updateItem,"institutionIncubators", privateKey);
  }
  getSectors(details, privateKey){
    let data = this.state.sectorsAndServices;
    data = details;
    this.setState({sectorsAndServices : data})
    this.props.getIncubators(data,"sectorsAndServices", privateKey);
  }
  getListOfIncubators(details, privateKey){
    let data = this.state.listOfIncubators;
    data = details;
    this.setState({listOfIncubators : data})
    this.props.getIncubators(data,"listOfIncubators", privateKey);
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
    /**UI changes for back button*/  //+tab.tabClassName?tab.tabClassName:""
  }


  render(){
    let tabs = this.state.tabs;
    return <MlTabComponent tabs={tabs} backClickHandler={this.props.getState}/>
  }
}

