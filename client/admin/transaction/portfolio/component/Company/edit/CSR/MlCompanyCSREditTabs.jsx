
import React from "react";
import {render} from "react-dom";
import MlCompanyEvolution from "./MlCompanyEvolution";
import MlCompanyPolicy from "./MlCompanyPolicy";
import MlCompanyAchivements from "./MlCompanyAchivements";
import MlTabComponent from "../../../../../../../commons/components/tabcomponent/MlTabComponent";
import {client} from '../../../../../../core/apolloConnection'
import {appClient} from '../../../../../../../app/core/appConnection'
import MlCompanyCSRReports from './MlCompanyCSRReports'

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
  setBackTab(e) {
    this.props.backClickHandler(this.getCompanyCSRs.bind(this))
  }
  getCompanyCSRs() {
    this.props.backClickHandler();
  }

  getTabComponents(){
    let tabs = [
      // {tabClassName: 'tab back_icon fa fa-hand-o-left', panelClassName: 'panel', title:""},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Evolution", component:<MlCompanyEvolution client={client} isAdmin={true} key="1"  getEvolution={this.getEvolution.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/> },
      {tabClassName: 'tab', panelClassName: 'panel', title:"Achivements" , component:<MlCompanyAchivements key="2" getAchivements={this.getAchivements.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} />},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Reports", component:<MlCompanyCSRReports client={client} isAdmin={true} key="4" getReports={this.getReports.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} />},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Our Policy", component:<MlCompanyPolicy client={client} isAdmin={true} key="3" getPolicy={this.getPolicy.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId} />},
    ]
    return tabs;
  }

  getEvolution(details, privateKey){
    let data = this.state.evolution;
    data = details;
    this.setState({evolution : data})
    this.props.getCSRDetails(data,"evolution", privateKey);

  }
  getAchivements(details, privateKey){
    let data = this.state.achivements;
    data=details;
    this.setState({achivements : data})
    this.props.getCSRDetails(data,"achievements", privateKey);
  }
  getPolicy(details, privateKey){
    let data = this.state.listOfIncubators;
    data = details;
    this.setState({policy : data})
    this.props.getCSRDetails(data,"policy", privateKey);
  }
  getReports(details){
    let data = this.state.reports;
    data = details;
    this.setState({reports : data})
    this.props.getCSRDetails(data,"reports",null);
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
    this.setBackTab()
  }


  render(){
    let tabs = this.state.tabs;
    return <MlTabComponent tabs={tabs} backClickHandler={this.props.backClickHandler}/>
  }
}

