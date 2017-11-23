import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import _ from 'lodash';
import dynamicLinkHandler from './actions/dynamicRoutesHandler.js';
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

  componentDidMount(){
    var mySwiper = new Swiper('.swiper-menu',{
      speed: 400,
      spaceBetween:30,
      slidesPerView:'auto',
      mousewheelControl:true
    });

    let transaction =localStorage.getItem('transaction');
    if(transaction) {
      localStorage.setItem('transaction','');
      setTimeout(function () {
        $('.swiping_filters').css("transform",transaction);
      }, 500);
    }
  }

  render() {
    let path = FlowRouter.current().route.name;
    let params = FlowRouter.current().params;
    let queryParams = FlowRouter.current().queryParams;
    let menuConfig = this.props.tabOptions||[];
    let menu, tabOptions;

    menu = find(path, menuConfig);

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

    /*function dynamicLinkHandler(path,params,queryParams){
      const menuLinkHandlerConfig={
        "editCluster":function(params,queryParams){
              return '/admin/cluster/'+params.cluserId;
        },
        "dashboard_chapters":function(params,queryParams){
             let dynamicParams=params||{};
              if(_.has(dynamicParams,"clusterId")&&_.has(dynamicParams,"chapterId")){
                return `/admin/dashboard/${dynamicParams.clusterId}/${dynamicParams.chapterId}/subChapters`;
              }else if(_.has(dynamicParams,"clusterId")){
                return `/admin/dashboard/${dynamicParams.clusterId}/chapters`;
              }else{
                return '/admin/dashboard/chapters';
              }
          return '';
        },

        "cluster_clusterDetails":function (params,queryParams) {
            let dynamicParams=params||{};
            if(_.has(dynamicParams,"clusterId")){
                return `/admin/clusters/${dynamicParams.clusterId}/clusterDetails`;
            }
        },
        "cluster_chapters":function (params,queryParams) {
          let dynamicParams=params||{};
          if(_.has(dynamicParams,"clusterId")){
            return `/admin/clusters/${dynamicParams.clusterId}/chapters`;
          }
        },
        "cluster_chapter_subChapterDetails":function (params,queryParams) {
          let dynamicParams=params||{};
          if(_.has(dynamicParams,"clusterId")){
            return `/admin/clusters/${dynamicParams.clusterId}/${dynamicParams.chapterId}/${dynamicParams.subChapterId}/${dynamicParams.subChapterName}/subChapterDetails`;
          }
        },
        "cluster_chapter_communities":function (params,queryParams) {
          let dynamicParams=params||{};
          if(_.has(dynamicParams,"clusterId")){
            return `/admin/clusters/${dynamicParams.clusterId}/${dynamicParams.chapterId}/${dynamicParams.subChapterId}/${dynamicParams.subChapterName}/communities`;
          }
        },
        "cluster_chapter_assignusers":function (params,queryParams) {
          let dynamicParams=params||{};
          if(_.has(dynamicParams,"clusterId")){
            return `/admin/clusters/${dynamicParams.clusterId}/${dynamicParams.chapterId}/${dynamicParams.subChapterId}/${dynamicParams.subChapterName}/assignusers`;
          }
        },

        "cluster_communities":function (params,queryParams) {
          let dynamicParams=params||{};
          if(_.has(dynamicParams,"clusterId")){
            return `/admin/clusters/${dynamicParams.clusterId}/communities`;
          }
        },
        "cluster_assignusers":function (params,queryParams) {
          let dynamicParams=params||{};
          if(_.has(dynamicParams,"clusterId")){
            return `/admin/clusters/${dynamicParams.clusterId}/assignusers`;
          }
        },

        "chapter_subChapterDetails":function (params,queryParams) {
          let dynamicParams=params||{};
          if(_.has(dynamicParams,"subChapterId")){
            return `/admin/chapters/${dynamicParams.clusterId}/${dynamicParams.chapterId}/${dynamicParams.subChapterId}/${dynamicParams.subChapterName}/subChapterDetails`;
          }
        },

        "chapter_communities":function (params,queryParams) {
          let dynamicParams=params||{};
          if(_.has(dynamicParams,"subChapterId")){
            return `/admin/chapters/${dynamicParams.clusterId}/${dynamicParams.chapterId}/${dynamicParams.subChapterId}/${dynamicParams.subChapterName}/communities`;
          }
        },

        "chapter_assignusers":function (params,queryParams) {
          let dynamicParams=params||{};
          if(_.has(dynamicParams,"subChapterId")){
            return `/admin/chapters/${dynamicParams.clusterId}/${dynamicParams.chapterId}/${dynamicParams.subChapterId}/${dynamicParams.subChapterName}/assignusers`;
          }
        },

        "community_Community_Details":function (params,queryParams) {
          let dynamicParams=params||{};
          if(_.has(dynamicParams,"communityId")){
            return `/admin/community/${dynamicParams.communityId}/communityDetails`;
          }
        },

        // "community_assignusers":function (params,queryParams) {
        //   let dynamicParams=params||{};
        //   if(_.has(dynamicParams,"communityId")){
        //     return `/admin/community/${dynamicParams.communityId}/assignusers`;
        //   }
        // }
      }
      let menuLinkHandler=menuLinkHandlerConfig[path];
          if(menuLinkHandler){
            let link=menuLinkHandler(params,queryParams);
            return link;
          }
      return "";
    }*/

    if (menu != undefined) {
      let subMenuHide=menu.hideSubMenu;
      console.log(menu.subMenu)
      //if subMenu has subMenusId then we need to fetch the subMenus for that mapping Id
      const subMenusId=menu.subMenusId;
      const subMenuMappingId=menu.subMenuMappingId;
      if (subMenusId){
        menu = find(menu.subMenusId, menuConfig);
      }

      let tabMenu = [];
      if(!subMenuHide){
        tabMenu= menu.subMenu;
      }


      tabOptions = tabMenu.map(function (option,index) {
        let activeClass="";
        let disabledClass = "";
        if(option.uniqueId===path){
          activeClass = 'active_btn'
        }

        if(option.isDisabled){
          disabledClass = 'disabled_item'
        }

        if(subMenuMappingId&&subMenuMappingId===option.uniqueId){
          activeClass = 'active_btn'
        }

        let isDynamicLink=option.dynamicLink||false;
        let isDisabled = option.isDisabled || false;
        let menuLink=option.link;
        if(isDynamicLink){
          menuLink=dynamicLinkHandler(option.uniqueId,params,queryParams);
        }
        return (
          <li key={index} className={`swiper-slide ${disabledClass}`}>
            <div className={`moolya_btn ${activeClass} `}
                 onClick={this.subMenuClick}><a href={menuLink}
                                                className={"moolya_btn moolya_btn_in"}>  {option.name} </a></div>
          </li>
        )
      });
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

