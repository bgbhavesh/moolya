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
    if(data.docCategoryName){
      return 'DocumentMapping'
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

    if(data.industryName){
      return 'Industry'
    }
    return null;
  }
}
