import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {mount} from 'react-mounter';
import MoolyaLeftNav from '../../commons/components/leftNavbar/MoolyaLeftNav'
import  MoolyaHeader from '../../commons/components/header/MoolyaHeader'
import AdminLayout from '../../admin/dashboard/layouts/AdminLayout'
import MoolyaLoginLayout from '../../login/layouts/login'
import MoolyaAdminViewContainer from '../../commons/containers/adminview/AdminViewContainer.jsx'
import loginActions,{loginActionHandler} from '../../login/actions/loginActions'
import AdminLayoutConnection from '../../commons/containers/adminLayout/mainConnection'
import MlSelect from '../../commons/components/select/MoolyaSelect'
import MoolyaAddCluster from '../../admin/cluster/components/MoolyaAddCluster'
adminSection = FlowRouter.group({
  prefix: "/admin"
});
adminSection.route('/dashboard', {
    // action(){
    //   mount(AdminLayout,{adminHeader:<MoolyaHeader module="dashboard" tabOptions={tabOptions}/>,adminLeftNav:<MoolyaLeftNav navOptions={navOptions} imageField="image" linkField="link" nameField="name"/>,adminView:<MoolyaAdminViewContainer clusterListOptions={clusterListOptions} nameField="name" imageLink="image" statusField="status"  footerOptions={footerOptions} routerPath="route" imagePath="imagefield"/>})
    // }
  name: 'dashboard',
  action(){
   /* mount(AdminLayout,{adminHeader:<MoolyaHeader module="dashboard" tabOptions={tabOptions}/>,adminLeftNav:<LeftNavConnection navOptions={navOptions} imageField="image" linkField="link" nameField="name"/>,adminView:<MoolyaAdminViewContainer clusterListOptions={clusterListOptions} listRouterPath="listRouterPath" nameField="nameField" imageLink="imageLink" statusField="statusField"  footerOptions={footerOptions} routerPath="route" imagePath="imagefield"/>})*/
  mount(AdminLayout,{adminContent:<AdminLayoutConnection/>})
  }
});
adminSection.route('/dashboard/clusters', {
  name: 'dashboard_clusters',
  action(){
    mount(AdminLayout,{adminContent:<AdminLayoutConnection/>})
  }
});
adminSection.route('/cluster', {
  name: 'cluster',
  action(){
    mount(AdminLayout,{adminContent:<AdminLayoutConnection/>})
  }
});
adminSection.route('/cluster/clusters', {
  name: 'cluster',
  action(){
    mount(AdminLayout,{adminContent:<AdminLayoutConnection/>})
  }
});
adminSection.route('/addCluster', {
  name: 'addCluster',
  action(){
    mount(AdminLayout,{adminContent:<MoolyaAddCluster/>})
  }
});

adminSection.route('/login', {
  name: 'admin',
    action(){
        mount(MlLoginLayout, {content:<MlLoginContent formSubmit={loginActionHandler.onLoginFormSubmit}/>})
    }
});
adminSection.route('/chapter', {
  name: 'chapter',
  action(){
    mount(AdminLayout,{adminContent:<MoolyaToaster/>})
  }
});

