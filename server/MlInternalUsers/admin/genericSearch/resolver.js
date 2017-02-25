import MlResolver from '../mlAdminResolverDef'

MlResolver.MlQueryResolver['SearchQuery'] = (obj, args, context, info) =>{
    let totalRecords=0;
  const findOptions = {
              skip: args.offset
  };
  // `limit` may be `null`
  if (args.limit > 0) {
    findOptions.limit = args.limit;
  }

  let moduleName=args.module;
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

  if(args.module=="department"){
    data= MlDepartments.find({},findOptions).fetch();
    totalRecords=MlDepartments.find({},findOptions).count();
  }

  if(args.module=="subDepartment"){
    data= MlSubDepartments.find({},findOptions).fetch();
    totalRecords=MlSubDepartments.find({},findOptions).count();
  }
  if(args.module=="request"){
    data= MlRequestType.find({},findOptions).fetch();
    totalRecords=MlRequestType.find({},findOptions).count();
  }
  if(args.module=="permission"){
    // data= MlPermissions.find({},findOptions).fetch();
    // totalRecords=MlPermissions.find({},findOptions).count();
  }
  if(args.module=="countries"){
    data= MlCountries.find({},findOptions).fetch();
    totalRecords=MlCountries.find({},findOptions).count();
  }
  if(args.module=="states"){
    data= MlStates.find({},findOptions).fetch();
    totalRecords=MlStates.find({},findOptions).count();
  }
  if(args.module=="cities"){
    data= MlCities.find({},findOptions).fetch();
    totalRecords=MlCities.find({},findOptions).count();
  }
  if(args.module=="userType"){
    data= MlUserTypes.find({},findOptions).fetch();
    totalRecords=MlUserTypes.find({},findOptions).count();
  }
  if(args.module=="roleType"){
    data= MlRoleTypes.find({},findOptions).fetch();
    totalRecords=MlRoleTypes.find({},findOptions).count();
  }
  if(args.module=="documentType"){
    data= MlDocumentTypes.find({},findOptions).fetch();
    totalRecords=MlDocumentTypes.find({},findOptions).count();
  }
  if(args.module=="documentFormat"){
    data= MlDocumentFormats.find({},findOptions).fetch();
    totalRecords=MlDocumentFormats.find({},findOptions).count();
  }
  if(args.module=="kycCategory"){
    data= MlDocumentCategories.find({},findOptions).fetch();
    totalRecords=MlDocumentCategories.find({},findOptions).count();
  }
  if(args.module=="documentMapping"){
    data= MlDocumentMapping.find({},findOptions).fetch();
    totalRecords=MlDocumentMapping.find({},findOptions).count();
  }
  if(args.module=="transaction"){
    data= MlTransactions.find({},findOptions).fetch();
    totalRecords=MlTransactions.find({},findOptions).count();
  }
  if(args.module=="template"){
    data= MlTemplates.find({},findOptions).fetch();
    totalRecords=MlTemplates.find({},findOptions).count();
  }

  if(args.module == 'BackendUsers'){
      data = Meteor.users.find().fetch();
      totalRecords=Meteor.users.find({},findOptions).count();
  }
  if(args.module == 'roles'){
    data= MlRoles.find({},findOptions).fetch();
    totalRecords=MlRoles.find({},findOptions).count();
  }

  if(args.module=="industry"){
    data= MlIndustries.find({},findOptions).fetch();
    totalRecords=MlIndustries.find({},findOptions).count();
  }
  if(args.module=="specification"){
    data= MlSpecifications.find({},findOptions).fetch();
    totalRecords=MlSpecifications.find({},findOptions).count();
  }
  if(args.module=="profession"){
    data= MlProfessions.find({},findOptions).fetch();
    totalRecords=MlProfessions.find({},findOptions).count();
  }
  if(args.module=="entity"){
    data= MlEntity.find({},findOptions).fetch();
    totalRecords=MlEntity.find({},findOptions).count();
  }
  if(args.module=="stageOfCompany"){
    data= MlStageOfCompany.find({},findOptions).fetch();
    totalRecords=MlStageOfCompany.find({},findOptions).count();
  }
  if(args.module=="process"){
    data= MlProcessMapping.find({},findOptions).fetch();
    totalRecords=MlProcessMapping.find({},findOptions).count();
  }
  if(args.module=="businessType"){
    data= MlBusinessType.find({},findOptions).fetch();
    totalRecords=MlBusinessType.find({},findOptions).count();
  }
  if(args.module=="citizenship"){
    data= MlCitizenship.find({},findOptions).fetch();
    totalRecords=MlCitizenship.find({},findOptions).count();
  }
  if(args.module=="lookingFor"){
    data= MlLookingFor.find({},findOptions).fetch();
    totalRecords=MlLookingFor.find({},findOptions).count();
  }
  if(args.module=="EmployeeType"){
    data= MlGlobalSettings.find({},findOptions).fetch();
    totalRecords=MlGlobalSettings.find({},findOptions).count();
  }
  if(args.module=="tax"){
    data= MlGlobalSettings.find({},findOptions).fetch();
    totalRecords=MlGlobalSettings.find({},findOptions).count();
  }
  if(args.module=="title"){
    data= MlGlobalSettings.find({},findOptions).fetch();
    totalRecords=MlGlobalSettings.find({},findOptions).count();
  }
  if(args.module=="regional"){
    data= MlGlobalSettings.find({},findOptions).fetch();
    totalRecords=MlGlobalSettings.find({},findOptions).count();
  }
  if(args.module=="language"){
    data= MlGlobalSettings.find({},findOptions).fetch();
    totalRecords=MlGlobalSettings.find({},findOptions).count();
  }
  if(args.module=="dateAndTime"){
    data= MlGlobalSettings.find({},findOptions).fetch();
    totalRecords=MlGlobalSettings.find({},findOptions).count();
  }
  if(args.module=="numericalFormat"){
    data= MlGlobalSettings.find({},findOptions).fetch();
    totalRecords=MlGlobalSettings.find({},findOptions).count();
  }
  if(args.module=="addressType"){
    data= MlGlobalSettings.find({},findOptions).fetch();
    totalRecords=MlGlobalSettings.find({},findOptions).count();
  }
  if(args.module=="CompanyType"){
    data= MlGlobalSettings.find({},findOptions).fetch();
    totalRecords=MlGlobalSettings.find({},findOptions).count();
  }
  if(args.module=="emailType"){
    data= MlGlobalSettings.find({},findOptions).fetch();
    totalRecords=MlGlobalSettings.find({},findOptions).count();
  }
  if(args.module=="contactType"){
    data= MlGlobalSettings.find({},findOptions).fetch();
    totalRecords=MlGlobalSettings.find({},findOptions).count();
  }
  if(args.module=="socialLinks"){
    data= MlGlobalSettings.find({},findOptions).fetch();
    totalRecords=MlGlobalSettings.find({},findOptions).count();
  }
  if(args.module=="gender"){
    data= MlGlobalSettings.find({},findOptions).fetch();
    totalRecords=MlGlobalSettings.find({},findOptions).count();
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
