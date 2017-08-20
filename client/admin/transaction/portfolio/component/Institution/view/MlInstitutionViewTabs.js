import React, { Component, PropTypes }  from "react";
import MlInstitutionViewManagement from './MlInstitutionViewManagement';
import MlInstitutionViewInvestor from './MlInstitutionViewInvestor';
import MlInstitutionViewAwards from './MlInstitutionViewAwards';
import MlInstitutionViewMCL from './MlInstitutionViewMCL';
import MlInstitutionViewLookingFor from './MlInstitutionViewLookingFor';
import MlInstitutionViewData from './MlInstitutionViewData';
import MlInstitutionViewChart from './MlInstitutionViewChart';
import MlInstitutionViewLibrary from './MlInstitutionViewLibrary';
import MlTabComponent from "../../../../../../commons/components/tabcomponent/MlTabComponent";
import PortfolioLibrary from '../../../../../../commons/components/portfolioLibrary/PortfolioLibrary'
import {client} from '../../../../../core/apolloConnection'
import MlInstitutionEditManagement from "../edit/MlInstitutionEditManagement";
import MlInstitutionEditData from "../edit/MlInstitutionEditData";
import MlInstitutionEditChart from "../edit/MlInstitutionEditChart";
import MlInstitutionEditLibrary from "../edit/MlInstitutionEditLibrary";
import MlInstitutionEditMCL from "../edit/MlInstitutionEditMCL";
import MlInstitutionEditLookingFor from "../edit/MlInstitutionEditLookingFor";

export default class MlViewInstitutionPortfolioTemplate extends Component {
  constructor(props){
    super(props);
    this.state =  {tabs: []};
  }
  componentDidMount(){
    setTimeout(function(){
      $('div[role="tab"]').each(function( index ) {
        var test = $(this).text();
        $(this).empty();
        $(this).html('<div class="moolya_btn moolya_btn_in">'+test+'</div>');
      });
      $('.RRT__tabs').addClass('horizon-swiper');
      $('.RRT__tab').addClass('horizon-item');
      $('.horizon-swiper').horizonSwiper();
    },300);
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
  }
  getTabComponents(){
    let tabs = [
      {tabClassName: 'tab', panelClassName: 'panel', title:"Management" , component:<MlInstitutionEditManagement key="2" isAdmin={true} client={client} portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Investor" , component:<MlInstitutionViewInvestor key="3"  portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Data" , component:<MlInstitutionViewData key="4"  portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Chart" , component:<MlInstitutionEditChart key="5"  portfolioDetailsId={this.props.portfolioDetailsId}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Awards" , component:<MlInstitutionViewAwards key="6"  portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Library" , component:<MlInstitutionEditLibrary isAdmin={true} client={client}  key="7"  portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"M C & L" , component:<MlInstitutionEditMCL key="8" portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},
      {tabClassName: 'tab', panelClassName: 'panel', title:"Looking For" , component:<MlInstitutionEditLookingFor key="9"  portfolioDetailsId={this.props.portfolioDetailsId} getSelectedAnnotations={this.props.getSelectedAnnotations}/>},

    ]
    return tabs;
  }
  render(){
    let tabs = this.state.tabs;
    return <MlTabComponent tabs={tabs}/>
  }
}
