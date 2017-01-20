import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import _ from 'lodash'
export default class MoolyaTabView extends Component {
  constructor(props){
    super(props);
    this.state={
     // tabOptions: props.tabOptions,
     // linkField: props.linkField,
     // nameField: props.nameField,
    }
    return this;
  }
  active_btn
  isActive(id) {
    return this.state.selectedTabId === id;
  }

  setActiveTab(selectedTabId) {
    this.setState({ selectedTabId });
  }
  subMenuClick(e){
    this.props.menuStatus='moolya_btn active_btn'
  }
  isActive() {
    return FlowRouter.current().path === this.props.href;
  }
  render(){
    let path=FlowRouter.current().path
    console.log(path)
    if (path === this.href) {
      return 'active';
    }
   // const dashboard=path&&path.indexOf('dashboard')>=0?true:false;
    let menus=this.props.tabOptions
    let subMenu,tabOptions
    menuStatus='moolya_btn'
    for(let i=0;i<menus.length;i++){
      menuid="/admin/"+menus[i].id
      if(menuid==path){
        subMenu=menus[i].subMenu
        tabOptions = subMenu.map(function(option) {

          return (
            <li key={option.name}>
              <div className={menuStatus}
                  onclick={this.subMenuClick}><a href={option.link} className={"moolya_btn moolya_btn_in"}>  {option.name} </a> </div>
            </li>
          )
        });
      }

    }
    /*if(dashboard==true){
      let result=_.findKey(this.props.tabOptions, {id:'clusters'});
      console.log(result)
    }*/
    let self = this;
   // let tabOptions

 /* let tabOptions = self.state.tabOptions.map(function(option) {

      return (
        <li key={option.name}>
        <div className={"moolya_btn"} ><a href={option[self.state.linkField]} className={"moolya_btn moolya_btn_in"}>  {option[self.state.nameField]} </a> </div>
        </li>
      )
    });*/
    return(

          <ul className="swiping_filters">
            {tabOptions}
          </ul>


    )
  }

}
MoolyaTabView.propTypes={
 // tabOptions: React.PropTypes.array.isRequired,
 // linkField: React.PropTypes.string,
 // nameField: React.PropTypes.string,
}
