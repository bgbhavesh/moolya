
import React from "react";
import {render} from "react-dom";
import MlCompanyEvolution from "./MlCompanyEvolution";
import MlCompanyPolicy from "./MlCompanyPolicy";
import MlCompanyAchivements from "./MlCompanyAchivements";
import MlTabComponent from "../../../../../../../commons/components/tabcomponent/MlTabComponent";
import {client} from '../../../../../../core/apolloConnection'
import {appClient} from '../../../../../../../app/core/appConnection'

export default class MlCompanyCSREditTabs extends React.Component{
  constructor(props){
    super(props)
    this.state =  {
      tabs: [],
      portfolioCSR:{},
      evolution:{},
      achivements:[],
      policy:{},
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
        $('.first-item').addClass('menunone');
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
      {tabClassName: 'tab', panelClassName: 'panel', title:"Evolution", component:<MlCompanyEvolution client={client} isAdmin={true} key="1"  getInstitutionEvolution={this.getInstitutionEvolution.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/> },
      {tabClassName: 'tab', panelClassName: 'panel', title:"Achivements" , component:<MlCompanyAchivements key="2" getInstitutionAchivements={this.getInstitutionAchivements.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} />},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Our Policy", component:<MlCompanyPolicy client={client} isAdmin={true} key="3" getInstitutionPolicy={this.getInstitutionPolicy.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} />},
    ]
    return tabs;
  }

  getInstitutionEvolution(details, privateKey){
    let data = this.state.evolution;
    data = details;
    this.setState({evolution : data})
    this.props.getCSRDetails(data,"evolution", privateKey);

  }
  getInstitutionAchivements(details, privateKey){
    let data = this.state.achivements;
    data=details;
    this.setState({achivements : data})
    this.props.getCSRDetails(data,"achievements", privateKey);
  }
  getInstitutionPolicy(details, privateKey){
    let data = this.state.listOfIncubators;
    data = details;
    this.setState({policy : data})
    this.props.getCSRDetails(data,"policy", privateKey);
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

