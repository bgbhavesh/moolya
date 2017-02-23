import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import ScrollArea from 'react-scrollbar'
import $ from 'jquery'
import _ from 'lodash'

export default class MlAdminLeftNav extends Component {
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
    var WinWidth = $(window).width();
    var WinHeight = $(window).height();
    $('.admin_menu, .admin_main_wrap ').height(WinHeight-$('.admin_header').outerHeight(true));
    /*$('.actions_switch').click(function(){
      $('.bottom_actions_block').toggleClass('show_block');
      $(this).toggleClass('show_act');
    });*/
    $('.left_wrap').height(WinHeight-(90+$('.admin_header').outerHeight(true)));
    $(document).on('click', '.menu_in a', function(e){
      //e.preventDefault();
      $(this).parents('li').addClass('active_menu');
      $('.admin_menu ul li').not($(this).parents('li')).removeClass('active_menu');
      return false;
    });


  }

  onClickItem(e) {
    console.log(e.target.id)
  }

  render() {
    let path = FlowRouter.current().route.name;

    //let data = this.props.data && this.props.data.data ? this.props.data.data : {};
    let data = this.context.menu||{};
    let menu = data.menu || [];
    let parentKey = find(path, menu)

    function find(uniqueId, menus) {
      var i = 0, found;
      for (; i < menus.length; i++) {
        if (menus[i].uniqueId === uniqueId) {
          var res = menus[i].uniqueId
          return res;
        } else if (_.isArray(menus[i].subMenu)) {
          found = find(uniqueId, menus[i].subMenu)
          if (found) {
            return menus[i].uniqueId
          }

        }
      }
    }

    //localStorage.setItem("leftNavSubMenu", JSON.stringify(menu));

    let navOptions = menu.map(function (dataItem) {
      let activeClass
      if (parentKey == dataItem.uniqueId) {
        activeClass = 'active_menu'
      }
      return (
        <li className={`menu_item ${activeClass} `} key={dataItem.uniqueId}>
          <a href={dataItem.link} id={dataItem.uniqueId}>
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

MlAdminLeftNav.contextTypes = {
  menu: React.PropTypes.object
};
