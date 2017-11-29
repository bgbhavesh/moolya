import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import _ from 'lodash';
import dynamicLinkHandler from './actions/dynamicRoutesHandler.js';
export default class MlAdminProfileTabView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // tabOptions: props.tabOptions,
      // linkField: props.linkField,
      // nameField: props.nameField,
    }
    return this;
  }

  componentDidMount() {
    const mySwiper = new Swiper('.swiper-menu', {
      speed: 400,
      spaceBetween: 30,
      slidesPerView: 'auto'
    });

    $(document).ready(() => {
      $('.moolya_btn_in').click((e) => {
        let transaction = $('.swiping_filters').css('transform');
        if ($('.swiping_filters')[0] && $('.swiping_filters')[0].childNodes && $('.swiping_filters')[0].childNodes[0]) {
          transaction = JSON.stringify({ transaction, name: $('.swiping_filters')[0].childNodes[0].innerText });
          localStorage.setItem('transaction', transaction);
        }
      });
    });

    let transaction = localStorage.getItem('transaction');
    if (transaction) {
      transaction = JSON.parse(transaction);
      localStorage.setItem('transaction', '');

      if (transaction.name === $('.swiping_filters')[0].childNodes[0].innerText) {
        setTimeout(() => {
          $('.swiping_filters').css('transform', transaction.transaction);
        }, 500);
      }
    }
  }

  render() {
    const path = FlowRouter.current().route.name;
    const params = FlowRouter.current().params;
    const queryParams = FlowRouter.current().queryParams;
    const menuConfig = this.props.tabOptions || [];
    let menu,
      tabOptions;

    menu = find(path, menuConfig);

    function find(uniqueId, menus) {
      let i = 0,
        found;

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


    if (menu != undefined) {
      const subMenuHide = menu.hideSubMenu;
      console.log(menu.subMenu)
      // if subMenu has subMenusId then we need to fetch the subMenus for that mapping Id
      const subMenusId = menu.subMenusId;
      const subMenuMappingId = menu.subMenuMappingId;
      if (subMenusId) {
        menu = find(menu.subMenusId, menuConfig);
      }

      let tabMenu = [];
      if (!subMenuHide) {
        tabMenu = menu.subMenu;
      }


      tabOptions = tabMenu.map(function (option, index) {
        let activeClass = '';
        if (option.uniqueId === path) {
          activeClass = 'active_btn'
        }

        if (subMenuMappingId && subMenuMappingId === option.uniqueId) {
          activeClass = 'active_btn'
        }

        const isDynamicLink = option.dynamicLink || false;
        let menuLink = option.link;
        if (isDynamicLink) {
          menuLink = dynamicLinkHandler(option.uniqueId, params, queryParams);
        }
        return (
          <li key={option.name} className="swiper-slide">
            <div
              className={`moolya_btn ${activeClass} `}
              onClick={this.subMenuClick}><a
                href={menuLink}
                className={'moolya_btn moolya_btn_in'}>  {option.name} </a></div>
          </li>
        )
      });
    }
    const hierarchyOption = this.props.hierarchyOption
    if (hierarchyOption != undefined) {
      tabOptions = hierarchyOption.map(function (option, index) {
        let activeClass = '';
        if (option.uniqueId === path) {
          activeClass = 'active_btn'
        }

        return (
          <li key={option.name} className="swiper-slide">
            <div
              className={`moolya_btn ${activeClass} `}
              onClick={this.subMenuClick}><a
                href={option.link}
                className={'moolya_btn moolya_btn_in'}>  {option.name} </a></div>
          </li>
        )
      })
    }

    return (
      <div className="swiper-container swiper-menu">
        <ul className="swiper-wrapper swiping_filters">
          {tabOptions}
        </ul>
      </div>


    )
  }
}

