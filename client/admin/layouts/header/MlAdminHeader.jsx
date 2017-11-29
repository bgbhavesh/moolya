import React, { Component, PropTypes } from 'react';
import MlTabView from  './MlAdminTabView'
import MlAdminSearch from  './MlAdminSearch'
import  MlAdminProfile from './MlAdminProfile'
import VerticalBreadCrum from "../breadcrum/VerticalBreadCrum";
import BugReportWrapper from "../../commons/components/MlAdminBugReportWrapper";

// const today = new Date();
// const dd = today.getDate().toString();
// const mm = (today.getMonth()+1).toString(); //January is 0!
// const yy = today.getFullYear().toString().substr(-2)
// const curDate = dd+mm+yy;

const build_versionToken = localStorage.getItem('build_version');

export default class MlAdminHeader extends Component {
  constructor(props,context){
    super(props,context);
    this.state={
      tabOptions:props.tabOptions,
    };
    return this;
  }

  render(){
    let subMenu = this.context.menu.menu||[];
    let tabsubMenu;
     //let subMenu=localStorage.getItem("leftNavSubMenu")
    if(subMenu){
    //tabsubMenu=JSON.parse(subMenu)
      tabsubMenu=subMenu;
    }

    return (
      <div className="admin_header">
        <div className="overlay"> </div>
        <BugReportWrapper />

        <MlAdminProfile/>
          <span className="version">Ver.&beta;eta {build_versionToken}</span>
        <VerticalBreadCrum {...this.props}/>
        <div className="header_bottom">
          <MlTabView tabOptions={tabsubMenu}  linkField="link" nameField="name"/>
        </div>
      </div>

    )
  }
}

MlAdminHeader.contextTypes = {
  menu: React.PropTypes.object
};
