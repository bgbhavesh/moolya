import React from 'react';
import { render } from 'react-dom';
import {mount} from 'react-mounter';
import AdminLayout from '../../admin/layouts/AdminLayout'
import loginActions,{loginActionHandler} from '../../login/actions/loginActions'
import MoolyaAdminViewContainer from '../../commons/containers/adminview/AdminViewContainer'
import MlClusterDetails from '../../admin/cluster/components/MlClusterDetails'
import MlAssignBackendUsers from '../../admin/cluster/components/MlAssignBackendUsers'
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
/*import MlAddPermission from '../../admin/settings/permissions/component/MlAddPermission'*/
import MlAddProcessMapping from '../../admin/settings/processMapping/component/MlAddProcessMapping'
import MlProcessMappingList from '../../admin/settings/processMapping/component/MlProcessMappingList'
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
import MlRoleTypeList from '../../admin/settings/roleTypes/component/MlRoleTypeList'
import MlDocumentTypesList from '../../admin/settings/documentTypes/component/MlDocumentTypesList'
import MlAddDocumentType from '../../admin/settings/documentTypes/component/MlAddDocumentType'
import MlDocumentFormatsList from '../../admin/settings/documentFormats/component/MlDocumentFormatsList'
import MlAddDocumentFormat from '../../admin/settings/documentFormats/component/MlAddDocumentFormat'
import MlAddKycCategory from  '../../admin/settings/kycCategory/component/MlAddKycCategory'
import MlKycCategoriesList from '../../admin/settings/kycCategory/component/MlKycCategoriesList'
import MlDocumentMappingList from '../../admin/settings/documentMapping/component/MlDocumentMappingList'
import MlAddDocumentMapping from '../../admin/settings/documentMapping/component/MlAddDocumentMapping'

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
import MlAddBackendUser from  '../../admin/settings/backendUsers/component/MlAddBackendUser'
import MlEditBackendUser from '../../admin/settings/backendUsers/component/MlEditBackendUser'
import MlBackendUserList from '../../admin/settings/backendUsers/component/MlBackendUserList'
import MlIndustryTypeList from '../../admin/settings/industry/component/MlIndustryTypeList'
import MlAddIndustryType from '../../admin/settings/industry/component/MlAddIndustryType'
import MlEditIndustryType from '../../admin/settings/industry/component/MlEditIndustryType'
import MlSpecificationTypeList from '../../admin/settings/specifications/component/MlSpecificationsTypeList'
import MlAddSpecificationType from '../../admin/settings/specifications/component/MlAddSpecificationsType'
import MlEditSpecificationType from '../../admin/settings/specifications/component/MlEditSpecificationsType'
import MlProfessionTypeList from '../../admin/settings/profession/component/MlProfessionTypeList'
import MlAddProfessionType from '../../admin/settings/profession/component/MlAddProfessionType'
import MlEditProfessionType from '../../admin/settings/profession/component/MlEditProfessionType'
import MlEntityTypeList from '../../admin/settings/entity/component/MlEntityTypeList'
import MlAddEntityType from '../../admin/settings/entity/component/MlAddEntityType'
import MlEditEntityType from '../../admin/settings/entity/component/MlEditEntityType'
import MlStageOfCompanyTypeList from '../../admin/settings/stageOfCompany/component/MlStageOfCompanyTypeList'
import MlAddStageOfCompanyType from '../../admin/settings/stageOfCompany/component/MlAddStageOfCompanyType'
import MlEditStageOfCompanyType from '../../admin/settings/stageOfCompany/component/MlEditStageOfCompanyType'
import MlBusinessTypeList from '../../admin/settings/businessType/component/MlBusinessTypeList'
import MlAddBusinessType from '../../admin/settings/businessType/component/MlAddBusinessType'
import MlEditBusinessType from '../../admin/settings/businessType/component/MlEditBusinessType'
import MlCitizenshipTypeList from '../../admin/settings/citizenship/component/MlCitizenshipTypeList'
import MlAddCitizenshipType from '../../admin/settings/citizenship/component/MlAddCitizenshipType'
import MlEditCitizenshipType from '../../admin/settings/citizenship/component/MlEditCitizenshipType'
import MlLookingForTypeList from '../../admin/settings/lookingFor/component/MlLookingForTypeList'
import MlAddLookingForType from '../../admin/settings/lookingFor/component/MlAddLookingForType'
import MlEditLookingForType from '../../admin/settings/lookingFor/component/MlEditLookingForType'
import {mlClusterDashboardListConfig,mlClusterDashboardMapConfig} from "../../admin/dashboard/config/mlClusterDashboardConfig";
import {mlChapterMapConfig, mlChapterListConfig} from '../../admin/chapter/config/mlChapterConfig'
import {mlSubChapterListConfig} from '../../admin/subChapter/config/mlSubChapterConfig'
import {mlSubChapterDashboardListConfig} from '../../admin/dashboard/config/mlSubChapterDashboardConfig'

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

adminSection.route('/dashboard/subChapters/:chapterId', {
  name: 'dashboard_subChapters',
  action(params){
    /* mount(AdminLayout,{adminHeader:<MoolyaHeader module="dashboard" tabOptions={tabOptions}/>,adminLeftNav:<LeftNavConnection navOptions={navOptions} imageField="image" linkField="link" nameField="name"/>,adminView:<MoolyaAdminViewContainer clusterListOptions={clusterListOptions} listRouterPath="listRouterPath" nameField="nameField" imageLink="imageLink" statusField="statusField"  footerOptions={footerOptions} routerPath="route" imagePath="imagefield"/>})*/
    mount(AdminLayout,{adminContent:<MlDashboard mapConfig={mlClusterDashboardMapConfig} listConfig={mlSubChapterDashboardListConfig} queryOptions={{"id":params.chapterId}}/>})
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

adminSection.route('/cluster/internal_users', {
  name: 'cluster',
  action(params){
      mount(AdminLayout,{adminContent:< MlAssignBackendUsers />})
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
    mount(AdminLayout,{adminContent:<MlDashboard params={params} mapConfig={mlClusterDashboardMapConfig} listConfig={mlSubChapterDashboardListConfig} /> })
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
    mount(AdminLayout,{adminContent:< MlProcessMappingList/>})
  }
});

adminSection.route('/settings/processList', {
  name: 'settings_AddProcess',
  action(){
    mount(AdminLayout,{adminContent:<MlProcessMappingList />})
  }
});
adminSection.route('/settings/addProcess', {
  name: 'settings_AddProcess',
  action(){
    mount(AdminLayout,{adminContent:<MlAddProcessMapping />})
  }
});
adminSection.route('/settings/processList', {
  name: 'settings_AddProcess',
  action(){
    mount(AdminLayout,{adminContent:<MlProcessMappingList />})
  }
});
adminSection.route('/settings/editPermission/:id', {
  name: 'settings_EditPermissions',
  action(params){
    mount(AdminLayout,{adminContent:<MlEditPermission config={params.id} />})
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
adminSection.route('/settings/rolesList', {
  name: 'settings_rolesList',
  action(){
   mount(AdminLayout,{adminContent:< MlRoleTypeList/>})

  }
});
adminSection.route('/settings/createRole', {
  name: 'settings_createRole',
  action(){
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
adminSection.route('/settings/documentMappingList', {
  name: 'settings_DocumentMappingList',
  action(){
    mount(AdminLayout,{adminContent:< MlDocumentMappingList/>})
  }
});
adminSection.route('/settings/addDocumentMapping', {
  name: 'settings_AddDocumentMapping',
  action(){
    mount(AdminLayout,{adminContent:< MlAddDocumentMapping/>})
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

adminSection.route('/settings/industryList', {
  name: 'settings_IndustryTypeList',
  action(){
    mount(AdminLayout,{adminContent:< MlIndustryTypeList/>})
  }
});
adminSection.route('/settings/addIndustry', {
  name: 'settings_AddIndustryType',
  action(){
    mount(AdminLayout,{adminContent:<MlAddIndustryType />})
  }
});
adminSection.route('/settings/editIndustry/:id', {
  name: 'settings_EditIndustryType',
  action(params){
    mount(AdminLayout,{adminContent:<MlEditIndustryType config={params.id} />})
  }
});
adminSection.route('/settings/specificationList', {
  name: 'settings_SpecificationTypeList',
  action(){
    mount(AdminLayout,{adminContent:< MlSpecificationTypeList/>})
  }
});
adminSection.route('/settings/addSpecification', {
  name: 'settings_AddSpecificationType',
  action(){
    mount(AdminLayout,{adminContent:< MlAddSpecificationType />})
  }
});
adminSection.route('/settings/editSpecification/:id', {
  name: 'settings_EditIndustryType',
  action(params){
    mount(AdminLayout,{adminContent:<MlEditSpecificationType config={params.id} />})
  }
});
adminSection.route('/settings/professionList', {
  name: 'settings_ProfessionTypeList',
  action(){
    mount(AdminLayout,{adminContent:< MlProfessionTypeList/>})
  }
});
adminSection.route('/settings/addProfession', {
  name: 'settings_AddProfessionType',
  action(){
    mount(AdminLayout,{adminContent:< MlAddProfessionType />})
  }
});
adminSection.route('/settings/editProfession/:id', {
  name: 'settings_EditProfessionType',
  action(params){
    mount(AdminLayout,{adminContent:<MlEditProfessionType config={params.id} />})
  }
});
adminSection.route('/settings/entityList', {
  name: 'settings_EntityTypeList',
  action(){
    mount(AdminLayout,{adminContent:< MlEntityTypeList/>})
  }
});
adminSection.route('/settings/addEntity', {
  name: 'settings_AddEntityType',
  action(){
    mount(AdminLayout,{adminContent:< MlAddEntityType />})
  }
});
adminSection.route('/settings/editEntity/:id', {
  name: 'settings_EditEntityType',
  action(params){
    mount(AdminLayout,{adminContent:<MlEditEntityType config={params.id} />})
  }
});
adminSection.route('/settings/stageOfCompanyList', {
  name: 'settings_StageOfCompanyTypeList',
  action(){
    mount(AdminLayout,{adminContent:< MlStageOfCompanyTypeList/>})
  }
});
adminSection.route('/settings/addStageOfCompany', {
  name: 'settings_AddStageOfCompanyType',
  action(){
    mount(AdminLayout,{adminContent:< MlAddStageOfCompanyType />})
  }
});
adminSection.route('/settings/editStageOfCompany/:id', {
  name: 'settings_EditStageOfCompanyType',
  action(params){
    mount(AdminLayout,{adminContent:<MlEditStageOfCompanyType config={params.id} />})
  }
});
adminSection.route('/settings/businessList', {
  name: 'settings_BusinessTypeList',
  action(){
    mount(AdminLayout,{adminContent:< MlBusinessTypeList/>})
  }
});
adminSection.route('/settings/addBusiness', {
  name: 'settings_AddBusinessType',
  action(){
    mount(AdminLayout,{adminContent:< MlAddBusinessType />})
  }
});
adminSection.route('/settings/editBusiness/:id', {
  name: 'settings_EditBusinessType',
  action(params){
    mount(AdminLayout,{adminContent:<MlEditBusinessType config={params.id} />})
  }
});
adminSection.route('/settings/citizenshipList', {
  name: 'settings_CitizenshipTypeList',
  action(){
    mount(AdminLayout,{adminContent:< MlCitizenshipTypeList/>})
  }
});
adminSection.route('/settings/addCitizenship', {
  name: 'settings_AddCitizenshipType',
  action(){
    mount(AdminLayout,{adminContent:< MlAddCitizenshipType />})
  }
});
adminSection.route('/settings/editCitizenship/:id', {
  name: 'settings_EditCitizenshipType',
  action(params){
    mount(AdminLayout,{adminContent:<MlEditCitizenshipType config={params.id} />})
  }
});
adminSection.route('/settings/lookingForList', {
  name: 'settings_LookingForTypeList',
  action(){
    mount(AdminLayout,{adminContent:< MlLookingForTypeList/>})
  }
});
adminSection.route('/settings/addLookingFor', {
  name: 'settings_AddLookingForType',
  action(){
    mount(AdminLayout,{adminContent:< MlAddLookingForType />})
  }
});
adminSection.route('/settings/editLookingFor/:id', {
  name: 'settings_EditLookingForType',
  action(params){
    mount(AdminLayout,{adminContent:<MlEditLookingForType config={params.id} />})
  }
});
