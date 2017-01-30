import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import _ from 'lodash'
export default class MoolyaTabView extends Component {
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
    let menus = this.props.tabOptions||[];
    let subMenu, tabOptions;

     subMenu = find(path, menus);

    function find(id, menus) {
      var i = 0, found;

      for (; i < menus.length; i++) {
        if (menus[i].id === id) {
          return menus[i];
        } else if (_.isArray(menus[i].subMenu)) {
          found = find(id, menus[i].subMenu);
          if (found) {
            return found;
          }
        }
      }
    }


    if (subMenu != undefined) {
      console.log(subMenu.subMenu)
      let tabSubMenu = subMenu.subMenu

      tabOptions = tabSubMenu.map(function (option,index) {
        let activeClass;
        if(index==0){
          activeClass = 'active_btn'
        }
        return (
          <li key={option.name}>
            <div className={`moolya_btn ${activeClass} `}
                 onClick={this.subMenuClick}><a href={option.link}
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

