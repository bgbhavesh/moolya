import React from 'react';
import { render } from 'react-dom';
import {mount} from 'react-mounter';
import AdminLayout from '../../admin/layouts/AdminLayout'
import loginActions,{loginActionHandler} from '../../login/actions/loginActions'
import MoolyaAdminViewContainer from '../../commons/containers/adminview/AdminViewContainer'
import  MlClusterDetails from '../../admin/cluster/components/MlClusterDetails'
import MlSubChapterDetails from '../../admin/subChapter/components/MlSubChapterDetails'
import MlDashboard from '../../admin/dashboard/component/MlDashboard'
import MlAddCommunityFormComponent from '../../admin/community/components/MlAddCommunityFormComponent'
import MlAsignInternalUsers from'../../admin/internalUsers/components/MlassignInternalUsers'
import MlDepartmentsList from "../../admin/settings/departments/component/MlDepartmentsList";
import MlSubDepartmentsList from "../../admin/settings/subDepartments/component/MlSubDepartmentsList";
import MlAddDepartment from '../../admin/settings/departments/component/MlAddDepartment'
import MlEditDepartment from '../../admin/settings/departments/component/MlEditDepartment'
import MlAddSubDepartment from '../../admin/settings/subDepartments/component/MlAddSubDepartment'
import MlEditSubDepartment from '../../admin/settings/subDepartments/component/MlEditSubDepartment'
import MlAddPermission from '../../admin/settings/permissions/component/MlAddPermission'
import MlEditPermission from '../../admin/settings/permissions/component/MlEditPermission'
import MlAddRequestType from '../../admin/settings/requestTypes/component/MlAddRequestType'
import MlRequestTypeList from '../../admin/settings/requestTypes/component/MlRequestTypeList'
import MlEditRequestType from  '../../admin/settings/requestTypes/component/MlEditRequestType'
import  MlPermissionList from '../../admin/settings/permissions/component/MlPermissionsList'
import MlCountriesList from "../../admin/settings/countries/component/MlCountriesList";
import MlEditCountry from "../../admin/settings/countries/component/MlEditCountry";
import MlStatesList from "../../admin/settings/states/component/MlStatesList";
import MlEditState from "../../admin/settings/states/component/MlStateEdit";
import MlCitiesList from "../../admin/settings/cities/component/MlCitiesList";
import MlEditCity from "../../admin/settings/cities/component/MlEditCity";
import MlMyProfile from '../../admin/profile/component/MlMyprofile'
import MlUserTypeList from '../../admin/settings/userTypes/component/MlUserTypeList'
import MlEditUserType from '../../admin/settings/userTypes/component/MlEditUserType'
import MlDocumentTypesList from '../../admin/settings/documentTypes/component/MlDocumentTypesList'
import MlAddDocumentType from '../../admin/settings/documentTypes/component/MlAddDocumentType'
import MlDocumentFormatsList from '../../admin/settings/documentFormats/component/MlDocumentFormatsList'
import MlAddDocumentFormat from '../../admin/settings/documentFormats/component/MlAddDocumentFormat'
import MlAddKycCategory from  '../../admin/settings/kycCategory/component/MlAddKycCategory'
import MlKycCategoriesList from '../../admin/settings/kycCategory/component/MlKycCategoriesList'

/*import MlRoleTypeList from '../../admin/settings/roleTypes/component/MlRoleTypeList'*/
import MlAddRole from '../../admin/settings/roleTypes/component/MlAddRole'
import MlEditRoleType from '../../admin/settings/roleTypes/component/MlEditRoleType'
import MlAddTransaction from '../../admin/settings/transactions/component/MlAddTransactionType'
import MlTransactionTypeList from '../../admin/settings/transactions/component/MlTransactionTypeList'
import MlEditTransactionType from '../../admin/settings/transactions/component/MlEditTransactionType'
import MlChapterView from '../../admin/chapter/components/MlChapter'
import MlSubChapterView from '../../admin/dashboard/component/MlSubChapterList'
import MlAddTemplate from '../../admin/settings/template/component/MlAddTemplateType'
import MlTemplateTypeList from '../../admin/settings/template/component/MlTemplateTypeList'
import MlEditTemplateType from '../../admin/settings/template/component/MlEditTemplateType'
import  MlAddBackendUser from  '../../admin/settings/backendUsers/component/MlAddBackendUser'
import MlEditBackendUser from '../../admin/settings/backendUsers/component/MlEditBackendUser'
import MlBackendUserList from '../../admin/settings/backendUsers/component/MlBackendUserList'
import {mlClusterDashboardListConfig,mlClusterDashboardMapConfig} from "../../admin/dashboard/config/mlClusterDashboardConfig";
import {mlChapterMapConfig, mlChapterListConfig} from '../../admin/chapter/config/mlChapterConfig'
import {mlSubChapterListConfig} from '../../admin/subChapter/config/mlSubChapterConfig'

adminSection = FlowRouter.group({
  prefix: "/admin",
  name: 'admin',
  triggersEnter: [function(context, redirect) {
    console.log('running /adminPrefix trigger');
    if (!Meteor.userId()) {
      FlowRouter.go('/login')
    }
  }]
});

adminSection.route('/', {
  action: function() {
    FlowRouter.go("/admin/dashboard");
  },
  triggersEnter: [function(context, redirect) {
    console.log('running /admin trigger');
  }]
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
    mount(AdminLayout,{adminContent:<MoolyaAdminViewContainer mapConfig={mlClusterDashboardMapConfig} />})
  }
});
adminSection.route('/cluster/clusters', {
  name: 'cluster',
  action(){
    mount(AdminLayout,{adminContent:<MoolyaAdminViewContainer />})
  }
});
adminSection.route('/cluster/clusterDetails/:clusterId', {
  name: 'cluster',
  action(params){
    mount(AdminLayout,{adminContent:< MlClusterDetails params={params.clusterId}/>})
  }
});
adminSection.route('/chapter', {
  name: 'chapter',
  action(){
    mount(AdminLayout,{adminContent:<MlChapterView mapConfig={mlChapterMapConfig} listConfig={mlChapterListConfig} />})
  }
});
adminSection.route('/chapters/:chapterId', {
  name: 'chapter',
  action(params){
    mount(AdminLayout,{adminContent:<MlSubChapterView params={params.chapterId} listConfig={mlSubChapterListConfig} />})
  }
});
adminSection.route('/chapter/subChapterDetails/:subChapterId', {
  name: 'subChapterDetails',
  action(params){
    mount(AdminLayout,{adminContent:< MlSubChapterDetails params={params.subChapterId}/>})
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
  name: 'settings_DepartmentList',
  action(){
    mount(AdminLayout,{adminContent:< MlDepartmentsList />})
  }
});
adminSection.route('/settings/addDepartment', {
  name: 'settings_AddDepartment',
  action(){
    mount(AdminLayout,{adminContent:< MlAddDepartment/>})
  }
});
adminSection.route('/settings/editDepartment/:id', {
  name: 'settings_EditDepartment',
  action(params){
    mount(AdminLayout,{adminContent:< MlEditDepartment config={params.id}/>})
  }
});
adminSection.route('/settings/subDepartmentsList', {
  name: 'settings_SubDepartmentList',
  action(){
    mount(AdminLayout,{adminContent:< MlSubDepartmentsList/>})
  }
});
adminSection.route('/settings/addSubDepartment', {
  name: 'settings_AddSubDepartments',
  action(){
    mount(AdminLayout,{adminContent:< MlAddSubDepartment/>})
  }
});
adminSection.route('/settings/editSubDepartment/:id', {
  name: 'settings_EditSubDepartments',
  action(params){
    mount(AdminLayout,{adminContent:< MlEditSubDepartment config={params.id}/>})
  }
});
adminSection.route('/settings/permissionList', {
  name: 'settings_PermissionList',
  action(){
    mount(AdminLayout,{adminContent:< MlPermissionList/>})
  }
});
adminSection.route('/settings/addPermission', {
  name: 'settings_AddPermissions',
  action(){
    mount(AdminLayout,{adminContent:<MlAddPermission />})
  }
});
adminSection.route('/settings/editPermission/:id', {
  name: 'settings_EditPermissions',
  action(params){
    mount(AdminLayout,{adminContent:<MlEditPermission config={params.id} />})
  }
});
adminSection.route('/settings/rolesList', {
  name: 'settings_roles',
  action(){
    /*mount(AdminLayout,{adminContent:< MlAsignInternalUsers/>})*/
    mount(AdminLayout,{adminContent:< MlAddRole/>})
  }
});
adminSection.route('/settings/backendUserList', {
  name: 'settings_BackendUserList',
  action(){
    mount(AdminLayout,{adminContent:< MlBackendUserList/>})
  }
});
adminSection.route('/settings/addBackendUser', {
  name: 'settings_AddBackendUser',
  action(){
    mount(AdminLayout,{adminContent:< MlAddBackendUser/>})
  }
});
adminSection.route('/settings/editBackendUser/:id', {
  name: 'settings_EditBackendUser',
  action(params){
    mount(AdminLayout,{adminContent:< MlEditBackendUser config={params.id}/>})
  }
});

adminSection.route('/settings/requestTypeList', {
  name: 'settings_RequestTypeList',
  action(){
    mount(AdminLayout,{adminContent:< MlRequestTypeList/>})
  }
});
adminSection.route('/settings/addRequestType', {
  name: 'settings_AddRequestType',
  action(){
    mount(AdminLayout,{adminContent:<MlAddRequestType />})
  }
});
adminSection.route('/settings/editRequestType/:id', {
  name: 'settings_EditRequestType',
  action(params){
    mount(AdminLayout,{adminContent:<MlEditRequestType config={params.id} />})
  }
});
adminSection.route('/settings/filtersList', {
  name: 'settings_filters',
  action(){
    mount(AdminLayout,{adminContent:< MlAsignInternalUsers/>})
  }
});
adminSection.route('/settings/countriesList', {
  name: 'settings_CountriesList',
  action(){
    mount(AdminLayout,{adminContent:< MlCountriesList/>})
  }
});
adminSection.route('/settings/editCountry/:id', {
  name: 'settings_EditCountry',
  action(params){
    mount(AdminLayout,{adminContent:< MlEditCountry config={params.id} />})
  }
});
adminSection.route('/settings/statesList', {
  name: 'settings_StatesList',
  action(){
    mount(AdminLayout,{adminContent:< MlStatesList/>})
  }
});
adminSection.route('/settings/editState/:id', {
  name: 'settings_EditState',
  action(params){
    mount(AdminLayout,{adminContent:< MlEditState config={params.id} />})
  }
});
adminSection.route('/settings/citiesList', {
  name: 'settings_CitiesList',
  action(){
    mount(AdminLayout,{adminContent:< MlCitiesList/>})
  }
});
adminSection.route('/settings/editCity/:id', {
  name: 'settings_EditCity',
  action(params){
    mount(AdminLayout,{adminContent:< MlEditCity config={params.id} />})
  }
});

adminSection.route('/myprofile', {
  name: 'myprofile',
  action(){
    mount(AdminLayout,{adminContent:< MlMyProfile/>})
  }
});
adminSection.route('/settings/userTypeList', {
  name: 'settings_UserTypeList',
  action(){
    mount(AdminLayout,{adminContent:< MlUserTypeList/>})
  }
});
adminSection.route('/settings/editUserType/:id', {
  name: 'settings_EditUserType',
  action(params){
    mount(AdminLayout,{adminContent:< MlEditUserType  config={params.id}/>})
  }
});
adminSection.route('/settings/roleTypeList', {
  name: 'settings_RoleTypeList',
  action(){
   /* mount(AdminLayout,{adminContent:< MlRoleTypeList/>})*/
    mount(AdminLayout,{adminContent:< MlAddRole/>})
  }
});
adminSection.route('/settings/editRoleType/:id', {
  name: 'settings_EditRoleType',
  action(params){
    mount(AdminLayout,{adminContent:< MlEditRoleType  config={params.id}/>})
  }
});
adminSection.route('/settings/transactionTypeList', {
  name: 'settings_TransactionTypeList',
  action(){
    mount(AdminLayout,{adminContent:< MlTransactionTypeList/>})
  }
});
adminSection.route('/settings/addTransactionType', {
  name: 'settings_AddTransactionType',
  action(){
    mount(AdminLayout,{adminContent:<MlAddTransaction />})
  }
});
adminSection.route('/settings/editTransactionType/:id', {
  name: 'settings_EditTransactionType',
  action(params){
    mount(AdminLayout,{adminContent:<MlEditTransactionType config={params.id} />})
  }
});
adminSection.route('/settings/documentTypeList', {
  name: 'settings_DocumentTypeList',
  action(){
    mount(AdminLayout,{adminContent:< MlDocumentTypesList/>})
  }
});
adminSection.route('/settings/addDocumentType', {
  name: 'settings_AddDocumentType',
  action(){
    mount(AdminLayout,{adminContent:< MlAddDocumentType/>})
  }
});
adminSection.route('/settings/documentFormatList', {
  name: 'settings_DocumentFormatList',
  action(){
    mount(AdminLayout,{adminContent:< MlDocumentFormatsList/>})
  }
});
adminSection.route('/settings/addDocumentFormat', {
  name: 'settings_AddDocumentFormat',
  action(){
    mount(AdminLayout,{adminContent:< MlAddDocumentFormat/>})
  }
});
adminSection.route('/settings/kycCategoryList', {
  name: 'settings_KycCategoryList',
  action(){
    mount(AdminLayout,{adminContent:< MlKycCategoriesList/>})
  }
});
adminSection.route('/settings/addKycCategory', {
  name: 'settings_AddKycCategory',
  action(){
    mount(AdminLayout,{adminContent:< MlAddKycCategory/>})
  }
});
adminSection.route('/settings/templateTypeList', {
  name: 'settings_TemplateTypeList',
  action(){
    mount(AdminLayout,{adminContent:< MlTemplateTypeList/>})
  }
});
adminSection.route('/settings/addTemplateType', {
  name: 'settings_AddTemplateType',
  action(){
    mount(AdminLayout,{adminContent:<MlAddTemplate />})
  }
});
adminSection.route('/settings/editTemplateType/:id', {
  name: 'settings_EditTemplateType',
  action(params){
    mount(AdminLayout,{adminContent:<MlEditTemplateType config={params.id} />})
  }
});
