import MlResolver from '../mlAdminResolverDef'
import getQuery from "../genericSearch/queryConstructor";

MlResolver.MlQueryResolver['SearchQuery'] = (obj, args, context, info) =>{
    let totalRecords=0;
  const findOptions = {
              skip: args.offset
  };
  // `limit` may be `null`
  if (args.limit > 0) {
    findOptions.limit = args.limit;
  }

  let query={};
  if (args.fieldsData){
    query = getQuery.searchFunction(args);
  }
  if(args.sortData){
    let sortObj = getQuery.sortFunction(args);
    findOptions.sort=sortObj||{};
  }

  let action="READ";
  //Authorization layer

  if(args.module=="cluster"){
    data= MlClusters.find({},findOptions).fetch();
    totalRecords=MlClusters.find({},findOptions).count();
  }

  if(args.module=="chapter"){
    data= MlChapters.find({},findOptions).fetch();
    totalRecords=MlChapters.find({},findOptions).count();
  }
  if(args.module=="subChapter"){
    data= MlSubChapters.find({},findOptions).fetch();
    totalRecords=MlSubChapters.find({},findOptions).count();
  }

  if(args.module=="community"){
    data = MlCommunityDefinition.find({"isActive": true}).fetch();
    totalRecords=MlCommunityDefinition.find({"isActive": true}).count();
  }

  if(args.module=="department"){
    data= MlDepartments.find(query,findOptions).fetch();
    totalRecords=MlDepartments.find(query,findOptions).count();
  }

  if(args.module=="subDepartment"){
    data= MlSubDepartments.find(query,findOptions).fetch();
    totalRecords=MlSubDepartments.find(query,findOptions).count();
  }
  if(args.module=="request"){
    data= MlRequestType.find(query,findOptions).fetch();
    totalRecords=MlRequestType.find(query,findOptions).count();
  }
  if(args.module=="permission"){
    // data= MlPermissions.find(query,findOptions).fetch();
    // totalRecords=MlPermissions.find(query,findOptions).count();
  }
  if(args.module=="countries"){
    data= MlCountries.find(query,findOptions).fetch();
    totalRecords=MlCountries.find(query,findOptions).count();
  }
  if(args.module=="states"){
    let countries = MlCountries.find({"isActive": true}).fetch();
    let allIds=_.pluck(countries,'_id');
      data = MlStates.find({"countryId":{$in:allIds}},findOptions).fetch();
      totalRecords = MlStates.find({"countryId":{$in:allIds}},findOptions).count();
  }
  if(args.module=="cities"){
    let states = MlStates.find({"isActive": true}).fetch();
    let allIds=_.pluck(states,'_id');
    data = MlCities.find({"stateId":{$in:allIds}},findOptions).fetch();
    totalRecords = MlCities.find({"stateId":{$in:allIds}},findOptions).count();
  }
  if(args.module=="userType"){
    data= MlUserTypes.find(query,findOptions).fetch();
    totalRecords=MlUserTypes.find(query,findOptions).count();
  }
  if(args.module=="roleType"){
    data= MlRoleTypes.find(query,findOptions).fetch();
    totalRecords=MlRoleTypes.find(query,findOptions).count();
  }
  if(args.module=="documentType"){
    data= MlDocumentTypes.find(query,findOptions).fetch();
    totalRecords=MlDocumentTypes.find(query,findOptions).count();
  }
  if(args.module=="documentFormat"){
    data= MlDocumentFormats.find(query,findOptions).fetch();
    totalRecords=MlDocumentFormats.find(query,findOptions).count();
  }
  if(args.module=="kycCategory"){
    data= MlDocumentCategories.find(query,findOptions).fetch();
    totalRecords=MlDocumentCategories.find(query,findOptions).count();
  }
  if(args.module=="documentMapping"){
    data= MlDocumentMapping.find(query,findOptions).fetch();
    totalRecords=MlDocumentMapping.find(query,findOptions).count();
  }
  if(args.module=="transaction"){
    data= MlTransactions.find(query,findOptions).fetch();
    totalRecords=MlTransactions.find(query,findOptions).count();
  }
  if(args.module=="template"){
    data= MlTemplates.find(query,findOptions).fetch();
    totalRecords=MlTemplates.find(query,findOptions).count();
  }

  if(args.module == 'BackendUsers'){
      data = Meteor.users.find().fetch();
      totalRecords=Meteor.users.find({},findOptions).count();
  }
  if(args.module == 'roles'){
    data= MlRoles.find(query,findOptions).fetch();
    totalRecords=MlRoles.find(query,findOptions).count();
  }

  if(args.module=="industry"){
    data= MlIndustries.find(query,findOptions).fetch();
    totalRecords=MlIndustries.find(query, findOptions).count();
  }
  if(args.module=="specification"){
    data= MlSpecifications.find(query,findOptions).fetch();
    totalRecords=MlSpecifications.find(query,findOptions).count();
  }
  if(args.module=="profession"){
    data= MlProfessions.find(query,findOptions).fetch();
    totalRecords=MlProfessions.find(query,findOptions).count();
  }
  if(args.module=="entity"){
    data= MlEntity.find(query,findOptions).fetch();
    totalRecords=MlEntity.find(query,findOptions).count();
  }
  if(args.module=="stageOfCompany"){
    data= MlStageOfCompany.find(query,findOptions).fetch();
    totalRecords=MlStageOfCompany.find(query,findOptions).count();
  }
  if(args.module=="process"){
    data= MlProcessMapping.find(query,findOptions).fetch();
    totalRecords=MlProcessMapping.find(query,findOptions).count();
  }
  if(args.module=="businessType"){
    data= MlBusinessType.find(query,findOptions).fetch();
    totalRecords=MlBusinessType.find(query,findOptions).count();
  }
  if(args.module=="citizenship"){
    data= MlCitizenship.find(query,findOptions).fetch();
    totalRecords=MlCitizenship.find(query,findOptions).count();
  }
  if(args.module=="lookingFor"){
    data= MlLookingFor.find(query,findOptions).fetch();
    totalRecords=MlLookingFor.find(query,findOptions).count();
  }
  if(args.module=="EmployeeType"){
    data= MlGlobalSettings.find(query,findOptions).fetch();
    totalRecords=MlGlobalSettings.find(query,findOptions).count();
  }
  if(args.module=="tax"){
    data= MlGlobalSettings.find(query,findOptions).fetch();
    totalRecords=MlGlobalSettings.find(query,findOptions).count();
  }
  if(args.module=="taxation"){
    data= MlTaxation.find(query,findOptions).fetch();
    totalRecords=MlTaxation.find(query,findOptions).count();
  }
  if(args.module=="title"){
    data= MlGlobalSettings.find(query,findOptions).fetch();
    totalRecords=MlGlobalSettings.find(query,findOptions).count();
  }
  if(args.module=="regional"){
    data= MlGlobalSettings.find(query,findOptions).fetch();
    totalRecords=MlGlobalSettings.find(query,findOptions).count();
  }
  if(args.module=="language"){
    data= MlGlobalSettings.find(query,findOptions).fetch();
    totalRecords=MlGlobalSettings.find(query,findOptions).count();
  }
  if(args.module=="dateAndTime"){
    data= MlGlobalSettings.find(query,findOptions).fetch();
    totalRecords=MlGlobalSettings.find(query,findOptions).count();
  }
  if(args.module=="numericalFormat"){
    data= MlGlobalSettings.find(query, findOptions).fetch();
    totalRecords=MlGlobalSettings.find(query, findOptions).count();
  }
  if(args.module=="addressType"){
    data= MlGlobalSettings.find(query,findOptions).fetch();
    totalRecords=MlGlobalSettings.find(query,findOptions).count();
  }
  if(args.module=="CompanyType"){
    data= MlGlobalSettings.find(query,findOptions).fetch();
    totalRecords=MlGlobalSettings.find(query,findOptions).count();
  }
  if(args.module=="emailType"){
    data= MlGlobalSettings.find(query,findOptions).fetch();
    totalRecords=MlGlobalSettings.find(query,findOptions).count();
  }
  if(args.module=="contactType"){
    data= MlGlobalSettings.find(query,findOptions).fetch();
    totalRecords=MlGlobalSettings.find(query,findOptions).count();
  }
  if(args.module=="socialLinks"){
    data= MlGlobalSettings.find(query,findOptions).fetch();
    totalRecords=MlGlobalSettings.find(query,findOptions).count();
  }
  if(args.module=="gender"){
    data= MlGlobalSettings.find(query,findOptions).fetch();
    totalRecords=MlGlobalSettings.find(query,findOptions).count();
  }
  return {'totalRecords':totalRecords,'data':data};
}

MlResolver.MlUnionResolver['SearchResult']= {
  __resolveType(data, context, info){

    if (data.countryCode && data.country) {
      return 'Countries';
    }
    if(data.name && data.countryId&&!data.stateId){
      return 'States';
    }

    if(data.name && data.stateId){
      return 'Cities';
    }

    if (data.countryId) {
      return 'Cluster';
    }

    if (data.chapterName) {
      return 'Chapter';
    }

    if (data.subChapterName) {
      return 'SubChapter';
    }

    if (data.aboutCommunity) {
      return 'Community';
    }

    if (data.departmentName) {
      return 'Department';
    }

    if (data.subDepartmentName) {
      return 'SubDepartment';
    }
    if(data.requestName){
      return 'Requests'
    }
    if (data.permissionName) {
      return 'Permissions';
    }

    if(data.userTypeName){
      return 'UserTypes'
    }
    if(data.roleTypeName){
      return 'RoleTypes'
    }
    if(data.docTypeName){
      return 'DocumentTypes'
    }
    if(data.docFormatName){
      return 'DocumentFormats'
    }
    if(data.docCategoryName){
      return 'KycCategories'
    }
    if(data.documentDisplayName){
      return 'DocumentOutput'
    }
    if(data.transactionName){
      return 'Transaction'
    }
    if(data.templateName){
      return 'Template'
    }

    if(data.username){
      return 'BackendUsers'
    }
    if(data.roleName){
      return 'Roles'
    }

    if(data.professionName){
      return 'Profession'
    }

    if(data.industryName){
      return 'Industry'
    }
    if(data.specificationName){
      return 'Specification'
    }
    if(data.entityName){
      return 'Entity'
    }
    if(data.stageOfCompanyName){
      return 'StageOfCompany'
    }
    if(data.businessTypeName){
      return 'BusinessType'
    }
    if(data.citizenshipTypeName){
      return 'Citizenship'
    }
    if(data.lookingForName){
      return 'LookingFor'
    }
    if(data.processId){
      return 'ProcessType'
    }
    if(data.employmentName){
      return 'EmployeeType'
    }
    if(data.taxName){
      return 'Tax'
    }
    if(data.taxationName){
      return 'taxation'
    }
    if(data.titleName){
      return 'Title'
    }

    if(data.regionalCurrencyName){
      return 'Regional'
    }
    if(data.languageName){
      return 'Language'
    }
    if(data.measurementSystem){
      return 'NumericalFormat'
    }
    if(data.addressName){
      return 'AddressType'
    }
    if(data.socialName){
      return 'SocialLinks'
    }
    if(data.genderName){
      return 'Gender'
    }
    if(data.timeFormat){
      return 'DateAndTime'
    }
    if(data.companyName){
      return 'CompanyType'
    }
    if(data.emailName){
      return 'EmailType'
    }
    if(data.contactName){
      return 'ContactType'
    }
    return null;
  }
}
