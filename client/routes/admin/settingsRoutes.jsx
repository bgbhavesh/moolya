import React from 'react';
import { render } from 'react-dom';
import {mount} from 'react-mounter';
import AdminLayout from '../../admin/layouts/AdminLayout'
import {adminSection} from "../admin/adminRoutes";
import MlDepartmentsList from "../../admin/settings/departments/component/MlDepartmentsList";
import MlSubDepartmentsList from "../../admin/settings/subDepartments/component/MlSubDepartmentsList";
import MlAddDepartment from '../../admin/settings/departments/component/MlAddDepartment'
import MlEditDepartment from '../../admin/settings/departments/component/MlEditDepartment'
import MlAddSubDepartment from '../../admin/settings/subDepartments/component/MlAddSubDepartment'
import MlEditSubDepartment from '../../admin/settings/subDepartments/component/MlEditSubDepartment'
/*import MlAddPermission from '../../admin/settings/permissions/component/MlAddPermission'*/
import MlAddProcessMapping from '../../admin/settings/processMapping/component/MlAddProcessMapping'
import MlProcessMappingList from '../../admin/settings/processMapping/component/MlProcessMappingList'
import MlEditProcessMapping from '../../admin/settings/processMapping/component/MlEditProcessMapping'
import MlEditPermission from '../../admin/settings/permissions/component/MlEditPermission'
import MlAddRequestType from '../../admin/settings/requestTypes/component/MlAddRequestType'
import MlRequestTypeList from '../../admin/settings/requestTypes/component/MlRequestTypeList'
import MlEditRequestType from  '../../admin/settings/requestTypes/component/MlEditRequestType'
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
import MlEditDocumentType from '../../admin/settings/documentTypes/component/MlEditDocumentType'
import MlDocumentFormatsList from '../../admin/settings/documentFormats/component/MlDocumentFormatsList'
import MlAddDocumentFormat from '../../admin/settings/documentFormats/component/MlAddDocumentFormat'
import MlEditDocumentFormat from '../../admin/settings/documentFormats/component/MlEditDocumentFormat'
import MlAddKycCategory from  '../../admin/settings/kycCategory/component/MlAddKycCategory'
import MlKycCategoriesList from '../../admin/settings/kycCategory/component/MlKycCategoriesList'
import MlEditKycCategory from '../../admin/settings/kycCategory/component/MlEditKycCategory'
import MlDocumentMappingList from '../../admin/settings/documentMapping/component/MlDocumentMappingList'
import MlAddDocumentMapping from '../../admin/settings/documentMapping/component/MlAddDocumentMapping'
import MlEditDocumentMapping from '../../admin/settings/documentMapping/component/MlEditDocumentMapping'

/*import MlRoleTypeList from '../../admin/settings/roleTypes/component/MlRoleTypeList'*/
import MlAddRole from '../../admin/settings/roleTypes/component/MlAddRole'
import MlEditRoleType from '../../admin/settings/roleTypes/component/MlEditRoleType'
import MlAddTransaction from '../../admin/settings/transactions/component/MlAddTransactionType'
import MlTransactionTypeList from '../../admin/settings/transactions/component/MlTransactionTypeList'
import MlEditTransactionType from '../../admin/settings/transactions/component/MlEditTransactionType'
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
import MlAddTaxType from '../../admin/settings/taxTypes/component/MlAddTaxType'
import MlTaxTypeList from '../../admin/settings/taxTypes/component/MlTaxTypeList'
import MlEditTaxType from '../../admin/settings/taxTypes/component/MlEditTaxType'
import MlAddTaxation from '../../admin/settings/taxation/component/MlAddTaxation'
import MlTaxationList from '../../admin/settings/taxation/component/MlTaxationList'
import MlEditTaxation from '../../admin/settings/taxation/component/MlEditTaxation'
import MlAddTitle from '../../admin/settings/title/component/MlAddTitle'
import MlTitleList from '../../admin/settings/title/component/MlTitleList'
import MlEditTitle from '../../admin/settings/title/component/MlEditTitle'
/*import MlAddRegional from '../../admin/settings/regional/component/MlAddRegional'
import MlRegionalsList from '../../admin/settings/regional/component/MlRegionalsList'
import MlEditRegional from '../../admin/settings/regional/component/MlEditRegionl'*/
import MlRegional from '../../admin/settings/regional/component/MlRegional'
import MlAddLanguage from '../../admin/settings/language/component/MlAddLanguage'
import MlLanguagesList from '../../admin/settings/language/component/MlLanguagesList'
import MlEditLanguage from '../../admin/settings/language/component/MlEditLanguage'
import MlAddDateAndTime from '../../admin/settings/dateAndTime/component/MlAddDateAndTime'
import MlDateAndTimeList from '../../admin/settings/dateAndTime/component/MlDateAndTimeList'
import MlEditDateAndTime from '../../admin/settings/dateAndTime/component/MlEditDateAndTime'
import MlAddAddressType from '../../admin/settings/addressType/component/MlAddAddressType'
import MlAddressTypeList from '../../admin/settings/addressType/component/MlAddressTypeList'
import MlEditAddressType from '../../admin/settings/addressType/component/MlEditAddressType'
import MlNumericalFormatList from '../../admin/settings/numericalFormats/component/MlNumericalFormatList'
import MlAddNumericalFormat from '../../admin/settings/numericalFormats/component/MlAddNumericalFormat'
import MlEditNumericalFormat from '../../admin/settings/numericalFormats/component/MlEditNumericalFormat'
import MlAddSocialLinkType from '../../admin/settings/socialLinks/component/MlAddSocialLinkType'
import MlSocialLinksTypeList from '../../admin/settings/socialLinks/component/MlSocialLinksTypeList'
import MlEditSocialLinkType from  '../../admin/settings/socialLinks/component/MlEditSocialLinksType'
import MlAddGender from '../../admin/settings/gender/component/MlAddGender'
import MlGenderList from '../../admin/settings/gender/component/MlGenderList'
import MlEditGender from '../../admin/settings/gender/component/MlEditGender'

// @Created By Sireesha on 23-02-2017
// @For Cluster Admin Settings Employee Type
// @Importing Cluster Admin Setting Employee Type Components from parent directory

import MlEmployeeTypesList from '../../admin/settings/employeeTypes/components/MlEmployeeTypesList'
import MlAddEmployeeType from '../../admin/settings/employeeTypes/components/MlAddEmployeeType'
import MlEditEmployeeType from '../../admin/settings/employeeTypes/components/MlEditEmployeeType'

// @End

// @Created By Sireesha on 24-02-2017
// @For Cluster Admin Settings Company Type
// @Importing Cluster Admin Setting Company Type Components from parent directory

import MlCompanyTypesList from '../../admin/settings/companyTypes/components/MlCompanyTypesList'
import MlAddCompanyType from '../../admin/settings/companyTypes/components/MlAddCompanyType'
import MlEditCompanyType from '../../admin/settings/companyTypes/components/MlEditCompanyType'

// @End



// @Created By Sireesha on 24-02-2017
// @For Cluster Admin Settings Company Type
// @Importing Cluster Admin Setting Email Type Components from parent directory

import MlEmailTypesList from '../../admin/settings/emailType/components/MlEmailTypeList'
import MlAddEmailType from '../../admin/settings/emailType/components/MlAddEmailType'
import MlEditEmailType from '../../admin/settings/emailType/components/MlEditEmailType'

// @End

// @Created By Sireesha on 24-02-2017
// @For Cluster Admin Settings Company Type
// @Importing Cluster Admin Setting Contact Type Components from parent directory

import MlContactTypesList from '../../admin/settings/contactType/components/MlContactTypeList'
import MlAddContactType from '../../admin/settings/contactType/components/MlAddContactType'
import MlEditContactType from '../../admin/settings/contactType/components/MlEditContactType'

// @End





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

adminSection.route('/settings/processList', {
  name: 'settings_processList',
  action(){
    mount(AdminLayout,{adminContent:<MlProcessMappingList />})
  }
});
adminSection.route('/settings/addProcess', {
  name: 'settings_addProcess',
  action(){
    mount(AdminLayout,{adminContent:<MlAddProcessMapping />})
  }
});

adminSection.route('/settings/editProcess/:id', {
  name: 'settings_editProcess',
  action(params){
    mount(AdminLayout,{adminContent:<MlEditProcessMapping config={params.id} />})
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
adminSection.route('/settings/editRole/:id', {
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
adminSection.route('/settings/editDocumentType/:id', {
  name: 'settings_EditDocumentType',
  action(params){
    mount(AdminLayout,{adminContent:<MlEditDocumentType config={params.id} />})
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
adminSection.route('/settings/editDocumentFormat/:id', {
  name: 'settings_EditDocumentFormat',
  action(params){
    mount(AdminLayout,{adminContent:<MlEditDocumentFormat config={params.id} />})
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
adminSection.route('/settings/editKycCategory/:id', {
  name: 'settings_EditKycCategory',
  action(params){
    mount(AdminLayout,{adminContent:<MlEditKycCategory config={params.id} />})
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
adminSection.route('/settings/editDocumentMapping/:id', {
  name: 'settings_EditDocumentMapping',
  action(params){
    mount(AdminLayout,{adminContent:<MlEditDocumentMapping config={params.id} />})
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
adminSection.route('/settings/regionalsList', {
  name: 'settings_RegionalsList',
  action(){
    mount(AdminLayout,{adminContent:< MlRegional/>})
  }
});
/*adminSection.route('/settings/addregional', {
  name: 'settings_AddRegional',
  action(){
    mount(AdminLayout,{adminContent:< MlAddRegional />})
  }
});
adminSection.route('/settings/editRegional/:id', {
  name: 'settings_EditRegional',
  action(params){
    mount(AdminLayout,{adminContent:<MlEditRegional config={params.id} />})
  }
});*/
adminSection.route('/settings/languagesList', {
  name: 'settings_LanguagesList',
  action(){
    mount(AdminLayout,{adminContent:< MlLanguagesList/>})
  }
});
adminSection.route('/settings/addLanguage', {
  name: 'settings_AddLanguage',
  action(){
    mount(AdminLayout,{adminContent:< MlAddLanguage />})
  }
});
adminSection.route('/settings/editLanguage/:id', {
  name: 'settings_EditLanguage',
  action(params){
    mount(AdminLayout,{adminContent:<MlEditLanguage config={params.id} />})
  }
});
adminSection.route('/settings/dateAndTimeList', {
  name: 'settings_DateAndTimeList',
  action(){
    mount(AdminLayout,{adminContent:< MlDateAndTimeList/>})
  }
});
adminSection.route('/settings/addDateAndTime', {
  name: 'settings_AddDateAndTime',
  action(){
    mount(AdminLayout,{adminContent:< MlAddDateAndTime />})
  }
});
adminSection.route('/settings/editDateAndTime/:id', {
  name: 'settings_EditDateAndTime',
  action(params){
    mount(AdminLayout,{adminContent:<MlEditDateAndTime config={params.id} />})
  }
});

adminSection.route('/settings/taxTypeList', {
  name: 'settings_TaxTypeList',
  action(){
    mount(AdminLayout,{adminContent:< MlTaxTypeList/>})
  }
});
adminSection.route('/settings/addTaxType', {
  name: 'settings_AddTaxType',
  action(){
    mount(AdminLayout,{adminContent:<MlAddTaxType />})
  }
});
adminSection.route('/settings/editTaxType/:id', {
  name: 'settings_EditTaxType',
  action(params){
    mount(AdminLayout,{adminContent:<MlEditTaxType config={params.id} />})
  }
});
adminSection.route('/settings/addTaxation', {
  name: 'settings_AddTaxation',
  action(){
    mount(AdminLayout,{adminContent:<MlAddTaxation />})
  }
});
adminSection.route('/settings/taxationList', {
  name: 'settings_TaxationList',
  action(){
    mount(AdminLayout,{adminContent:<MlTaxationList />})
  }
});
adminSection.route('/settings/editTaxation/:id', {
  name: 'settings_EditTaxation',
  action(params){
    mount(AdminLayout,{adminContent:<MlEditTaxation config={params.id} />})
  }
});
adminSection.route('/settings/titleList', {
  name: 'settings_TitleList',
  action(){
    mount(AdminLayout,{adminContent:< MlTitleList/>})
  }
});
adminSection.route('/settings/addTitle', {
  name: 'settings_AddTitle',
  action(){
    mount(AdminLayout,{adminContent:<MlAddTitle />})
  }
});
adminSection.route('/settings/editTitle/:id', {
  name: 'settings_EditTitle',
  action(params){
    mount(AdminLayout,{adminContent:<MlEditTitle config={params.id} />})
  }
});


// @Created By Sireesha on 23-02-2017
// @For Cluster Admin Settings Employee Type


/////////// for employee type create module
adminSection.route('/settings/addEmployeeType', {
  name: 'settings_AddEmployeeType',
  action(){
    mount(AdminLayout,{adminContent:< MlAddEmployeeType />})
  }
});
/////////// for employee type edit module
adminSection.route('/settings/editEmployeeType/:id', {
  name: 'settings_EditEmployeeType',
  action(params){
    mount(AdminLayout,{adminContent:<MlEditEmployeeType config={params.id} />})
  }
});
/////////// for list of employee types
adminSection.route('/settings/employeeTypesList', {
  name: 'settings_employeeTypesList',
  action(){
    mount(AdminLayout,{adminContent:< MlEmployeeTypesList/>})
  }
});

//  @End
adminSection.route('/settings/addressTypeList', {
  name: 'settings_AddressTypeList',
  action(){
    mount(AdminLayout,{adminContent:< MlAddressTypeList/>})
  }
});
adminSection.route('/settings/addAddressType', {
  name: 'settings_AddAddressType',
  action(){
    mount(AdminLayout,{adminContent:<MlAddAddressType />})
  }
});
adminSection.route('/settings/editAddressType/:id', {
  name: 'settings_EditAddressType',
  action(params){
    mount(AdminLayout,{adminContent:<MlEditAddressType config={params.id} />})
  }
});
adminSection.route('/settings/numericalFormatList', {
  name: 'settings_NumericalFormatList',
  action(){
    mount(AdminLayout,{adminContent:< MlNumericalFormatList/>})
  }
});
adminSection.route('/settings/addNumericalFormat', {
  name: 'settings_AddNumericalFormat',
  action(){
    mount(AdminLayout,{adminContent:<MlAddNumericalFormat />})
  }
});
adminSection.route('/settings/editNumericalFormat/:id', {
  name: 'settings_EditNumericalFormat',
  action(params){
    mount(AdminLayout,{adminContent:<MlEditNumericalFormat config={params.id} />})
  }
});
adminSection.route('/settings/socialLinkTypeList', {
  name: 'settings_SocialLinkTypeList',
  action(){
    mount(AdminLayout,{adminContent:< MlSocialLinksTypeList/>})
  }
});
adminSection.route('/settings/addSocialLinkType', {
  name: 'settings_AddSocialLinkType',
  action(){
    mount(AdminLayout,{adminContent:<MlAddSocialLinkType />})
  }
});
adminSection.route('/settings/editSocialLinkType/:id', {
  name: 'settings_EditSocialLinkType',
  action(params){
    mount(AdminLayout,{adminContent:<MlEditSocialLinkType config={params.id} />})
  }
});
adminSection.route('/settings/gendersList', {
  name: 'settings_GenderList',
  action(){
    mount(AdminLayout,{adminContent:< MlGenderList/>})
  }
});
adminSection.route('/settings/addGender', {
  name: 'settings_AddSocialLinkType',
  action(){
    mount(AdminLayout,{adminContent:<MlAddGender />})
  }
});
adminSection.route('/settings/editGender/:id', {
  name: 'settings_EditGender',
  action(params){
    mount(AdminLayout,{adminContent:<MlEditGender config={params.id} />})
  }
});

// @Created By Sireesha on 24-02-2017
// @For Cluster Admin Settings Company Type


/////////// for company type create module
adminSection.route('/settings/addCompanyType', {
  name: 'settings_AddCompanyType',
  action(){
    mount(AdminLayout,{adminContent:< MlAddCompanyType />})
  }
});
/////////// for employee type edit module
adminSection.route('/settings/editCompanyType/:id', {
  name: 'settings_EditCompanyType',
  action(params){
    mount(AdminLayout,{adminContent:<MlEditCompanyType config={params.id} />})
  }
});
/////////// for list of employee types
adminSection.route('/settings/companyTypesList', {
  name: 'settings_CompanyTypesList',
  action(){
    mount(AdminLayout,{adminContent:< MlCompanyTypesList/>})
  }
});

//  @End

// @Created By Sireesha on 24-02-2017
// @For Cluster Admin Settings Email Type


/////////// for company type create module
adminSection.route('/settings/addEmailType', {
  name: 'settings_AddEmailType',
  action(){
    mount(AdminLayout,{adminContent:< MlAddEmailType />})
  }
});
/////////// for employee type edit module
adminSection.route('/settings/editEmailType/:id', {
  name: 'settings_EditEmailType',
  action(params){
    mount(AdminLayout,{adminContent:<MlEditEmailType config={params.id} />})
  }
});
/////////// for list of employee types
adminSection.route('/settings/emailTypesList', {
  name: 'settings_EmailTypesList',
  action(){
    mount(AdminLayout,{adminContent:< MlEmailTypesList/>})
  }
});

//  @End

// @Created By Sireesha on 24-02-2017
// @For Cluster Admin Settings Email Type


/////////// for contact type create module
adminSection.route('/settings/addContactType', {
  name: 'settings_AddContactType',
  action(){
    mount(AdminLayout,{adminContent:< MlAddContactType />})
  }
});
/////////// for contact type edit module
adminSection.route('/settings/editContactType/:id', {
  name: 'settings_EditContactType',
  action(params){
    mount(AdminLayout,{adminContent:<MlEditContactType config={params.id} />})
  }
});
/////////// for list of contact types
adminSection.route('/settings/contactTypesList', {
  name: 'settings_ContactTypesList',
  action(){
    mount(AdminLayout,{adminContent:< MlContactTypesList/>})
  }
});

//  @End
