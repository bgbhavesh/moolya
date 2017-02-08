import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import _ from 'lodash'
export default class MlTabView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // tabOptions: props.tabOptions,
      // linkField: props.linkField,
      // nameField: props.nameField,
    }
    return this;
  }

  render() {
    let path = FlowRouter.current().route.name;
    let params = FlowRouter.current().params;
    let queryParams = FlowRouter.current().queryParams;
    let menus = this.props.tabOptions||[];
    let subMenu, tabOptions;

     subMenu = find(path, menus);

    function find(uniqueId, menus) {
      var i = 0, found;

      for (; i < menus.length; i++) {
        if (menus[i].uniqueId === uniqueId) {
          return menus[i];
        } else if (_.isArray(menus[i].subMenu)) {
          found = find(uniqueId, menus[i].subMenu);
          if (found) {
            return found;
          }
        }
      }
    }

    function dynamicLinkHandler(path,params,queryParams){
      const menuLinkHandlerConfig={
        "editCluster":function(params,queryParams){
              return '/admin/cluster/'+params.cluserId;
        }
      }
      let menuLinkHandler=menuLinkHandlerConfig[path];
          if(menuLinkHandler){
            let link=menuLinkHandler(params,queryParams);
            return link;
          }
      return "";
    }

    if (subMenu != undefined) {
      console.log(subMenu.subMenu)
      let tabSubMenu = subMenu.subMenu||[];

      tabOptions = tabSubMenu.map(function (option,index) {
        let activeClass;
        if(index==0){
          activeClass = 'active_btn'
        }
        let isDynamicLink=option.dynamicLink||false;
        let menuLink=option.link;
        if(isDynamicLink){
          menuLink=dynamicLinkHandler(option.uniqueId,params,queryParams);
        }
        return (
          <li key={option.name}>
            <div className={`moolya_btn ${activeClass} `}
                 onClick={this.subMenuClick}><a href={menuLink}
                                                className={"moolya_btn moolya_btn_in"}>  {option.name} </a></div>
          </li>
        )
      });
    }

    return (

      <ul className="swiping_filters">
        {tabOptions}
      </ul>


    )
  }

}

