import { render } from 'react-dom';
import React, { Component, PropTypes } from 'react';
import getBreadCrumListBasedOnhierarchy from './actions/dynamicBreadCrumListHandler';

export default class VerticalBreadCrum extends Component {
  constructor(props){
    super(props);
    this.state={'breadCrumList':[]};
    this.getHierarchyDetails.bind(this);
    this.setBreadCrumHierarchyCallback.bind(this);
    return this;
  }

  componentDidMount()
  {
    this._isMounted=true;
    this.getHierarchyDetails();
  }

  componentWillUnmount(){
    this._isMounted=false;
  }

  setBreadCrumHierarchyCallback(list){
    if(this._isMounted) {
      if (list && _.isArray(list)) {
        this.setState({breadCrumList: list});
      } else {
        this.setState({breadCrumList:[]});
      }
    }
  }

  getHierarchyDetails() {
    let menuConfig =this.context.menu&&this.context.menu.menu?this.context.menu.menu:[];
    let breadCrum = null;
    if(this.props  && this.props.breadcrum){
      breadCrum = this.props.breadcrum;
      if(breadCrum.type === 'hierarchy'){
        let params = FlowRouter.current().params;
        getBreadCrumListBasedOnhierarchy(breadCrum.module, params, this.setBreadCrumHierarchyCallback.bind(this));
      }
      else if(breadCrum.type){
        let text = breadCrum.module;
        let result = text.replace(/([A-Z])/g, " $1");
        let finalResult = result.charAt(0).toUpperCase() + result.slice(1);
        let breadCrumObject = [
          {linkName: (breadCrum.type).charAt(0).toUpperCase() + (breadCrum.type).slice(1), linkId: breadCrum.type},
          {linkName: finalResult, linkId: "module"}
        ];
        if (breadCrum.subModule) {
          let text = breadCrum.subModule;
          let result = text.replace(/([A-Z])/g, " $1");
          let finalResult = result.charAt(0).toUpperCase() + result.slice(1);
          breadCrumObject.push({
            linkName: finalResult,
            linkId: "subModule"
          });
        }

        breadCrumObject = StaticBreadCrumListHandler(breadCrumObject,breadCrum , menuConfig);
        this.setBreadCrumHierarchyCallback(
          breadCrumObject
        );
      }
    }else{
      let breadCrumObject = StaticBreadCrumListHandlerWithNoBredcum();
      this.setBreadCrumHierarchyCallback(
        breadCrumObject
      );
    }
  }

  //  getHierarchyDetails() {
  //    let breadCrum = this.props && this.props.breadcrum ? this.props.breadcrum : null;
  //    let breadCrumList = [];
  //    if (breadCrum && breadCrum.type === 'hierarchy') {
  //      let params = FlowRouter.current().params;
  //      getBreadCrumListBasedOnhierarchy(breadCrum.module, params, this.setBreadCrumHierarchyCallback.bind(this));
  //    } else if (breadCrum && breadCrum.type === 'setting') {
  //      let text = breadCrum.module;
  //      let result = text.replace(/([A-Z])/g, " $1");
  //      let finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  //      let breadCrumObject = [
  //        {linkName: 'Setting', linkId: "setting"},
  //        {linkName: finalResult, linkId: "module"}
  //      ];
  //      if (breadCrum.subModule) {
  //        let text = breadCrum.subModule;
  //        let result = text.replace(/([A-Z])/g, " $1");
  //        let finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  //        breadCrumObject.push({
  //          linkName: finalResult,
  //          linkId: "subModule"
  //        });
  //      }
  //      this.setBreadCrumHierarchyCallback(
  //        breadCrumObject
  //      );
  //    } else if (breadCrum && breadCrum.type === 'transaction') {
  //      let text = breadCrum.module;
  //      let result = text.replace(/([A-Z])/g, " $1");
  //      let finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  //      let breadCrumObject = [
  //        {linkName: 'Transaction', linkId: "transactions"},
  //        {linkName: finalResult, linkId: "module"}
  //      ];
  //      if (breadCrum.subModule) {
  //        let text = breadCrum.subModule;
  //        let result = text.replace(/([A-Z])/g, " $1");
  //        let finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  //        breadCrumObject.push({
  //          linkName: finalResult,
  //          linkId: "subModule"
  //        });
  //      }
  //      this.setBreadCrumHierarchyCallback(
  //        breadCrumObject
  //      );
  //    } else if (breadCrum && breadCrum.type === 'documents') {
  //      let text = breadCrum.module;
  //      let result = text.replace(/([A-Z])/g, " $1");
  //      let finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  //      let breadCrumObject = [
  //        {linkName: 'Documents', linkId: "documents"},
  //        {linkName: finalResult, linkId: "module"}
  //      ];
  //      if (breadCrum.subModule) {
  //        let text = breadCrum.subModule;
  //        let result = text.replace(/([A-Z])/g, " $1");
  //        let finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  //        breadCrumObject.push({
  //          linkName: finalResult,
  //          linkId: "subModule"
  //        });
  //      }
  //      this.setBreadCrumHierarchyCallback(
  //        breadCrumObject
  //      );
  //    } else if (breadCrum && breadCrum.type === 'users') {
  //      let text = breadCrum.module;
  //      let result = text.replace(/([A-Z])/g, " $1");
  //      let finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  //      let breadCrumObject = [
  //        {linkName: 'Users', linkId: "users"},
  //        {linkName: finalResult, linkId: "module"}
  //      ];
  //      if (breadCrum.subModule) {
  //        let text = breadCrum.subModule;
  //        let result = text.replace(/([A-Z])/g, " $1");
  //        let finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  //        breadCrumObject.push({
  //          linkName: finalResult,
  //          linkId: "subModule"
  //        });
  //      }
  //      this.setBreadCrumHierarchyCallback(
  //        breadCrumObject
  //      );
  //    } else if (breadCrum && breadCrum.type === 'packages') {
  //      let text = breadCrum.module;
  //      let result = text.replace(/([A-Z])/g, " $1");
  //      let finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  //      let breadCrumObject = [
  //        {linkName: 'Packages', linkId: "packages"},
  //        {linkName: finalResult, linkId: "module"}
  //      ];
  //      if (breadCrum.subModule) {
  //        let text = breadCrum.subModule;
  //        let result = text.replace(/([A-Z])/g, " $1");
  //        let finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  //        breadCrumObject.push({
  //          linkName: finalResult,
  //          linkId: "subModule"
  //        });
  //      }
  //      this.setBreadCrumHierarchyCallback(
  //        breadCrumObject
  //      );
  //    }
  //
  //
  //
  //   return breadCrumList;
  // }
   render(){
    let path = FlowRouter.current().route.name;
    let params = FlowRouter.current().params;
    let queryParams = FlowRouter.current().queryParams;
    let menu, tabOptions;
    let breadCrumList=[];
    /*menu = find(path,menuConfig,null,0);

    function find(uniqueId, menus,parentId,counter) {
      var i = 0, found;
      let parent=parentId;
      let listCounter=counter;
      for (; i < menus.length; i++) {
        if (menus[i].uniqueId === uniqueId) {
          var res = menus[i].uniqueId;
          //if(menus[i].showBreadcrum){
          /!*breadCrumList.push({"linkId":uniqueId,"linkUrl":menus[i].link,"linkName":menus[i].name,seq:counter});*!/
          //}
          counter++;
          return menus[i];
        } else if (_.isArray(menus[i].subMenu)) {
          found = find(uniqueId, menus[i].subMenu,menus[i].uniqueId,listCounter);
          if (found) {
            return menus[i].uniqueId
          }

        }
      }
    }*/
    //counter to check if its last link and use the class based on that
     let counter=0;
     let linksLength=this.state.breadCrumList.length;
    const list=  this.state.breadCrumList.map((prop,id) =>{
       ++counter;
      let lastLinkClass='';
      let linkUrl=prop.linkUrl;
       if(counter===linksLength){
         lastLinkClass='current';
       }
        return ( <li key={prop.linkId} className={lastLinkClass}><a href={linkUrl}>{prop.linkName}</a></li>);
   });
     if(linksLength>0){ list.push(<li key={'last'} className='timelineLast'></li>)};

    return(
      <div className="vTimeline">
        <ul>
          {list}
        </ul>
        {/*<ul>
          <li>India</li>
          <li>Telangana</li>
          <li className="current">Internal Users</li>
          <li className="timelineLast"></li>
        </ul>*/}
      </div>
    )
  }
}

function StaticBreadCrumListHandler(list, breadCrum, menu){
  let currentModule = {};
  if(breadCrum.type){
    menu.map((object)=>{
      if((object.uniqueId).includes(breadCrum.type)||(breadCrum.type).includes(object.uniqueId)){
        list[0].linkUrl = object.link;
        currentModule = object;
      }
    });
    if(breadCrum.subModule){
      currentModule.subMenu.map((object)=>{
        if((object.uniqueId).includes(breadCrum.module)){
          list[1].linkUrl = object.link;
        }
      });
    }
    let path = Object.assign(FlowRouter._current.path);
    var module = breadCrum.subModule || breadCrum.module;
    let pathHierarchy = path.split('/');
    for (let each of pathHierarchy){
      if(each.startsWith('edit')){
        let link = path.split('edit')[0]+module+'List';
        list[list.length-1].linkUrl=link;
        list.push({
          linkName : 'Edit '+list[list.length-1].linkName,
          linkUrl:''
        });
      } else if(each.startsWith('add')){
        let link = path.split('add')[0]+module+'List';
        list[list.length-1].linkUrl=link;
        list.push({
          linkName : 'Add '+list[list.length-1].linkName,
          linkUrl:''
        });
      } else if(each.startsWith('create')){
        let link = path.split('create')[0]+module+'List';
        list[list.length-1].linkUrl=link;
        list.push({
          linkName : 'Create '+list[list.length-1].linkName,
          linkUrl:''
        });
      }
    }
    // if(breadCrum.sub)
  }else{

  }

  return list;
}

function StaticBreadCrumListHandlerWithNoBredcum() {
  let list=[];


  return list;
}

VerticalBreadCrum.contextTypes = {
  menu: React.PropTypes.object
};
