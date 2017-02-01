import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {mount} from 'react-mounter';
import AdminLayout from '../../admin/dashboard/layouts/AdminLayout'
import loginActions,{loginActionHandler} from '../../login/actions/loginActions'
import AdminLayoutConnection from '../../commons/containers/adminLayout/mainConnection'
import MoolyaAdminViewContainer from '../../commons/containers/adminview/AdminViewContainer'
adminSection = FlowRouter.group({
  prefix: "/admin"
});
adminSection.route('/dashboard', {
  name: 'dashboard',
  action(){
   /* mount(AdminLayout,{adminHeader:<MoolyaHeader module="dashboard" tabOptions={tabOptions}/>,adminLeftNav:<LeftNavConnection navOptions={navOptions} imageField="image" linkField="link" nameField="name"/>,adminView:<MoolyaAdminViewContainer clusterListOptions={clusterListOptions} listRouterPath="listRouterPath" nameField="nameField" imageLink="imageLink" statusField="statusField"  footerOptions={footerOptions} routerPath="route" imagePath="imagefield"/>})*/
  mount(AdminLayout,{adminContent:<MoolyaAdminViewContainer/>})
  }
});
  adminSection.route('/dashboard/clusters', {
  name: 'dashboard_clusters',
  action(){
    mount(AdminLayout,{adminContent:<MoolyaAdminViewContainer/>})
  }
});
adminSection.route('/cluster', {
  name: 'cluster',
  action(){
    mount(AdminLayout,{adminContent:<MoolyaAdminViewContainer/>})
  }
});
adminSection.route('/cluster/clusters', {
  name: 'cluster',
  action(){
    mount(AdminLayout,{adminContent:<MoolyaAdminViewContainer />})
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

