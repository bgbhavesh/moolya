import React from 'react';
import { render } from 'react-dom';
import {mount} from 'react-mounter';
import AdminLayout from '../../admin/layouts/AdminLayout'
import loginActions,{loginActionHandler} from '../../login/actions/loginActions'
import MoolyaAdminViewContainer from '../../commons/containers/adminview/AdminViewContainer'
import  MlAddClusterFormComponent from '../../admin/cluster/components/MoolyaAddClusterAction'
import MlAddChapterFormComponent from '../../admin/chapter/components/MlAddChapterFormComponent'
import MlDashboard from '../../admin/dashboard/component/MlDashboard'
import MlAddCommunityFormComponent from '../../admin/community/components/MlAddCommunityFormComponent'
import MlAsignInternalUsers from'../../admin/internalUsers/components/MlassignInternalUsers'
import MlAddDepartment from '../../admin/settings/departments/component/MlAddDepartment'
import MlEditDepartment from '../../admin/settings/departments/component/MlEditDepartment'
import MlAddSubDepartment from '../../admin/settings/subDepartments/component/MlAddSubDepartment'
import MlEditSubDepartment from '../../admin/settings/subDepartments/component/MlEditSubDepartment'
import {mlClusterDashboardListConfig,mlClusterDashboardMapConfig} from "../../admin/dashboard/config/mlClusterDashboardConfig";
adminSection = FlowRouter.group({
  prefix: "/admin"
});
adminSection.route('/dashboard', {
  name: 'dashboard',
  action(){
   /* mount(AdminLayout,{adminHeader:<MoolyaHeader module="dashboard" tabOptions={tabOptions}/>,adminLeftNav:<LeftNavConnection navOptions={navOptions} imageField="image" linkField="link" nameField="name"/>,adminView:<MoolyaAdminViewContainer clusterListOptions={clusterListOptions} listRouterPath="listRouterPath" nameField="nameField" imageLink="imageLink" statusField="statusField"  footerOptions={footerOptions} routerPath="route" imagePath="imagefield"/>})*/
  mount(AdminLayout,{adminContent:<MlDashboard mapConfig={mlClusterDashboardMapConfig} listConfig={mlClusterDashboardListConfig} />})
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
adminSection.route('/cluster/addCluster', {
  name: 'cluster',
  action(){
    mount(AdminLayout,{adminContent:< MlAddClusterFormComponent/>})
  }
});
adminSection.route('/chapter', {
  name: 'chapter',
  action(){
    mount(AdminLayout,{adminContent:< MlAddChapterFormComponent/>})
  }
});
adminSection.route('/community', {
  name: 'community',
  action(){
    mount(AdminLayout,{adminContent:< MlAddCommunityFormComponent/>})
  }
});
adminSection.route('/internalusers', {
  name: 'community',
  action(){
    mount(AdminLayout,{adminContent:< MlAsignInternalUsers/>})
  }
});

adminSection.route('/settings/departmentsList', {
  name: 'settings_departments',
  action(){
    mount(AdminLayout,{adminContent:< MlAsignInternalUsers/>})
  }
});
adminSection.route('/settings/addDepartment', {
  name: 'settings_departments',
  action(){
    mount(AdminLayout,{adminContent:< MlAddDepartment/>})
  }
});
adminSection.route('/settings/editDepartment', {
  name: 'settings_departments',
  action(){
    mount(AdminLayout,{adminContent:< MlEditDepartment/>})
  }
});
adminSection.route('/settings/subDepartmentsList', {
  name: 'settings_subDepartments',
  action(){
    mount(AdminLayout,{adminContent:< MlAsignInternalUsers/>})
  }
});
adminSection.route('/settings/addSubDepartment', {
  name: 'settings_subDepartments',
  action(){
    mount(AdminLayout,{adminContent:< MlAddSubDepartment/>})
  }
});
adminSection.route('/settings/editSubDepartment', {
  name: 'settings_subDepartments',
  action(){
    mount(AdminLayout,{adminContent:< MlEditSubDepartment/>})
  }
});
adminSection.route('/settings/permissionList', {
  name: 'settings_permission',
  action(){
    mount(AdminLayout,{adminContent:< MlAsignInternalUsers/>})
  }
});
adminSection.route('/settings/rolesList', {
  name: 'settings_roles',
  action(){
    mount(AdminLayout,{adminContent:< MlAsignInternalUsers/>})
  }
});
adminSection.route('/settings/internalUsersList', {
  name: 'settings_internalUsers',
  action(){
    mount(AdminLayout,{adminContent:< MlAsignInternalUsers/>})
  }
});
adminSection.route('/settings/requestTypesList', {
  name: 'settings_requestTypes',
  action(){
    mount(AdminLayout,{adminContent:< MlAsignInternalUsers/>})
  }
});
adminSection.route('/settings/filtersList', {
  name: 'settings_filters',
  action(){
    mount(AdminLayout,{adminContent:< MlAsignInternalUsers/>})
  }
});
adminSection.route('/settings/countriesList', {
  name: 'settings_countries',
  action(){
    mount(AdminLayout,{adminContent:< MlAsignInternalUsers/>})
  }
});
adminSection.route('/settings/statesList', {
  name: 'settings_states',
  action(){
    mount(AdminLayout,{adminContent:< MlAsignInternalUsers/>})
  }
});
adminSection.route('/settings/citiesList', {
  name: 'settings_cities',
  action(){
    mount(AdminLayout,{adminContent:< MlAsignInternalUsers/>})
  }
});

adminSection.route('/login', {
  name: 'admin',
    action(){
        mount(MlLoginLayout, {content:<MlLoginContent formSubmit={loginActionHandler.onLoginFormSubmit}/>})
    }
});


