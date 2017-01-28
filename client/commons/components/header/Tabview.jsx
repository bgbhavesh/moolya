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
  render(){
    let path=FlowRouter.current().route.name;
   // const dashboard=path&&path.indexOf('dashboard')>=0?true:false;
    let menus=this.props.tabOptions
    let subMenu,tabOptions;
    //subMenu=_.find(menus, function(o) { return o.id == path; });

    function find(id, items) {
      var i = 0, found;

      for (; i < items.length; i++) {
        if (items[i].id === id) {
          return items[i];
        } else if (_.isArray(items[i].subMenu)) {
          found = find(id, items[i].subMenu);
          if (found) {
            return found;
          }
        }
      }
    }
    console.log(find(path,menus))

    subMenu=find(path,menus);
    if(subMenu!=undefined){
      console.log(subMenu.subMenu)
      let tabSubMenu=subMenu.subMenu
      menuStatus='moolya_btn'
      tabOptions = tabSubMenu.map(function(option) {

        return (
          <li key={option.name}>
            <div className={menuStatus}
                 onClick={this.subMenuClick}><a href={option.link} className={"moolya_btn moolya_btn_in"}>  {option.name} </a> </div>
          </li>
        )
      });
    }

   // menuStatus='moolya_btn'
   /*for(let i=0;i<menus.length;i++){
      menuid="/admin/"+menus[i].id
      if(menuid==path){
        subMenu=menus[i].subMenu
        console.log(subMenu)
        tabOptions = subMenu.map(function(option) {

          return (
            <li key={option.name}>
              <div className={menuStatus}
                  onClick={this.subMenuClick}><a href={option.link} className={"moolya_btn moolya_btn_in"}>  {option.name} </a> </div>
            </li>
          )
        });
      }

    }*/
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
