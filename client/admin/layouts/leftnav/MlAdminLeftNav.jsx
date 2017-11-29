import React, { Component, PropTypes } from 'react';
// import {Meteor} from 'meteor/meteor';
// import {render} from 'react-dom';
import ScrollArea from 'react-scrollbar'
import $ from 'jquery'
import _ from 'lodash'

// class MlAdminLeftNavScroll extends Component {
//   constructor(props){
//     super(props);
//     // console.log('Props',props);
//   }
//   componentDidMount(){
//     if(this.context && this.context.scrollArea) {
//       setTimeout( function(){
//         let scrollTo = this.props.scrollTo;
//         $(".admin_menu .scrollarea-content").css({"margin-top": -scrollTo+"px"});
//         this.context.scrollArea.refresh();
//         this.context.scrollArea.scrollYTo(scrollTo);
//       }.bind(this), 500);
//     }
//     // console.log('MlAdminLeftNavScroll', this);
//   }
//
//   render() {
//     return null;
//   }
// }
// MlAdminLeftNavScroll.contextTypes = {
//   scrollArea: React.PropTypes.object
// };

export default class MlAdminLeftNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navOptions: props.navOptions,
      imageField: props.imageField,
      linkField: props.linkField,
      nameField: props.nameField
    }
  }

  componentDidMount() {
    const WinWidth = $(window).width();
    const WinHeight = $(window).height();
    $('.admin_menu, .admin_main_wrap ').height(WinHeight - $('.admin_header').outerHeight(true));
    // $('.main_wrap_scroll ').height(WinHeight-(68+$('.admin_header').outerHeight(true)));
    /* $('.actions_switch').click(function(){
      $('.bottom_actions_block').toggleClass('show_block');
      $(this).toggleClass('show_act');
    }); */
    $('.left_wrap').height(WinHeight - (90 + $('.admin_header').outerHeight(true)));

    const topscroll = localStorage.getItem('top');
    if (topscroll) {
      const margin = parseFloat(topscroll.split('px')[0])

      localStorage.setItem('top', '');
      setTimeout(() => {
        $('.admin_menu .scrollarea-content').css({ 'margin-top': margin });
        // $(".admin_menu .scrollarea-content").refresh();
        $('.admin_menu .scrollarea-content').animate({ scrollTop: -margin });
      }, 500);
    }


    $(document).on('click', '.menu_in a', function (e) {
      // e.preventDefault();
      $(this).parents('li').addClass('active_menu');
      $('.admin_menu ul li').not($(this).parents('li')).removeClass('active_menu');
      return false;
    });

    $(document).ready(() => {
      $('.menu_item a').click((event) => {
        console.log('called');
        // Do the async thing
        const margin = $('.admin_menu .scrollarea-content').css('margin-top');
        localStorage.setItem('top', margin);
      });
    });
  }


  render() {
    let path = FlowRouter.current().route.name;
    if (path == 'clusterview') { path = 'cluster' }

    // let data = this.props.data && this.props.data.data ? this.props.data.data : {};
    const data = this.context.menu || {};
    const menu = data.menu || [];
    const parentKey = find(path, menu)

    function find(uniqueId, menus) {
      let i = 0,
        found;
      for (; i < menus.length; i++) {
        if (menus[i].uniqueId === uniqueId) {
          const res = menus[i].uniqueId
          return res;
        } else if (_.isArray(menus[i].subMenu)) {
          found = find(uniqueId, menus[i].subMenu)
          if (found) {
            return menus[i].uniqueId
          }
        }
      }
    }

    // let testFunction =  function (that) {
    //   // console.log(this ,that);
    // };

    let activeIndex = 0;

    const navOptions = menu.map((dataItem, index) => {
      let activeClass;
      if (parentKey == dataItem.uniqueId) {
        activeClass = 'active_menu';
        activeIndex = index;
      }
      // console.log(navOptions);
      return (
        <li className={`menu_item ${activeClass} `} key={dataItem.uniqueId}>
          <a href={dataItem.link} id={dataItem.uniqueId}>
            <div className={'menu_in'}>
              <span className={dataItem.image}></span>
              {dataItem.name}
            </div>
            <div className={'menu_item menu_item_in'}></div>
          </a>
        </li>
      )
    });

    // let scrollTo = activeIndex*108;
    // console.log(scrollTo, activeIndex);

    return (
      <div className="admin_menu">
        <ScrollArea
          speed={0.8}
          className="admin_menu"
          smoothScrolling={true}
        >
          {/* {testFunction(this)} */}
          <ul>
            {navOptions }
            <li className="menu_item">
              <div className="menu_item menu_item_in"></div>
            </li>
          </ul>
          {/* <MlAdminLeftNavScroll scrollTo={scrollTo} /> */}
        </ScrollArea>
      </div>
    )
  }
}

MlAdminLeftNav.contextTypes = {
  menu: React.PropTypes.object,
  scrollArea: React.PropTypes.object
};

