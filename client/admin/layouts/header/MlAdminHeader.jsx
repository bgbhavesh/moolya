import React, { Component, PropTypes } from 'react';
import MlTabView from  './MlAdminTabView'
import MlAdminSearch from  './MlAdminSearch'
import  MlAdminProfile from './MlAdminProfile'
import VerticalBreadCrum from "../breadcrum/VerticalBreadCrum";
import BugReport from "../../../commons/components/bugReport/BugReport";
export default class MlAdminHeader extends Component {
  constructor(props,context){
    super(props,context);
    this.state={
      tabOptions:props.tabOptions,
    }
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
        /**Bug Report Module */
        <BugReport />

        <MlAdminProfile/>

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
