import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import ScrollArea from 'react-scrollbar'
import $ from 'jquery'
import _ from 'lodash'

export default class MoolyaLeftNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navOptions: props.navOptions,
      imageField: props.imageField,
      linkField: props.linkField,
      nameField: props.nameField,
    }
  }

  componentDidMount() {
    let WinWidth = $(window).width();
    let WinHeight = $(window).height();
    $('.admin_menu, .admin_main_wrap ').height(WinHeight - $('.admin_header').outerHeight(true));


  }

  onClickItem(e) {
    console.log(e.target.id)
  }

  render() {
    let path = FlowRouter.current().route.name;

    let data = this.props.data && this.props.data.data ? this.props.data.data : {};

    let menu = data.menu || [];
    let parentKey = find(path, menu)

    function find(id, menus) {
      var i = 0, found;
      for (; i < menus.length; i++) {
        if (menus[i].id === id) {
          var res = menus[i].id
          return res;
        } else if (_.isArray(menus[i].subMenu)) {
          found = find(id, menus[i].subMenu)
          if (found) {
            return menus[i].id
          }

        }
      }
    }

    localStorage.setItem("leftNavSubMenu", JSON.stringify(menu));

    let navOptions = menu.map(function (dataItem) {
      let activeClass
      if (parentKey == dataItem.id) {
        activeClass = 'active_menu'
      }
      return (
        <li className={`menu_item ${activeClass} `} key={dataItem.name}>
          <a href={dataItem.link} id={dataItem.id}>
            <div className={"menu_in"}>
              <img src={dataItem.image}/>
              {dataItem.name}
            </div>
            <div className={"menu_item menu_item_in"}></div>
          </a>
        </li>
      )
    });

    return (
      <div className="admin_menu">
        <ScrollArea
          speed={0.8}
          className="admin_menu"
          smoothScrolling={true}
        >
          <ul>
            {navOptions }

            <li className="menu_item">
              <div className="menu_item menu_item_in"></div>
            </li>
          </ul>
        </ScrollArea>
      </div>

    )
  }

}
