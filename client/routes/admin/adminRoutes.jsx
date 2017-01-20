import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {mount} from 'react-mounter';
import MoolyaLeftNav from '../../commons/components/leftNavbar/LeftNav'
import  MoolyaHeader from '../../commons/components/header/Header'
import AdminLayout from '../../admin/dashboard/layouts/AdminLayout'
import MoolyaLoginLayout from '../../login/layouts/login'
import MoolyaAdminViewContainer from '../../commons/containers/adminview/AdminViewContainer.jsx'
import loginActions,{loginActionHandler} from '../../login/actions/loginActions'
import AdminLayoutConnection from '../../commons/containers/adminLayout/mainConnection'
adminSection = FlowRouter.group({
  prefix: "/admin"
});
adminSection.route('/dashboard', {
    // action(){
    //   mount(AdminLayout,{adminHeader:<MoolyaHeader module="dashboard" tabOptions={tabOptions}/>,adminLeftNav:<MoolyaLeftNav navOptions={navOptions} imageField="image" linkField="link" nameField="name"/>,adminView:<MoolyaAdminViewContainer clusterListOptions={clusterListOptions} nameField="name" imageLink="image" statusField="status"  footerOptions={footerOptions} routerPath="route" imagePath="imagefield"/>})
    // }
  action(){
   /* mount(AdminLayout,{adminHeader:<MoolyaHeader module="dashboard" tabOptions={tabOptions}/>,adminLeftNav:<LeftNavConnection navOptions={navOptions} imageField="image" linkField="link" nameField="name"/>,adminView:<MoolyaAdminViewContainer clusterListOptions={clusterListOptions} listRouterPath="listRouterPath" nameField="nameField" imageLink="imageLink" statusField="statusField"  footerOptions={footerOptions} routerPath="route" imagePath="imagefield"/>})*/
  mount(AdminLayout,{adminContent:<AdminLayoutConnection/>})
  }
});
adminSection.route('/cluster', {
  action(){
    mount(AdminLayout,{adminContent:<AdminLayoutConnection/>})
  }
});

adminSection.route('/login', {
    action(){
        mount(MlLoginLayout, {content:<MlLoginContent formSubmit={loginActionHandler.onLoginFormSubmit}/>})
    }
});
