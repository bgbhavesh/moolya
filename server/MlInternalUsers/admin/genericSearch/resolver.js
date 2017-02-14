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

  if(args.module=="department"){
    data= MlDepartments.find({},findOptions).fetch();
    totalRecords=MlDepartments.find({},findOptions).count();
  }

  if(args.module=="subDepartment"){
    data= MlSubDepartments.find({},findOptions).fetch();
    totalRecords=MlSubDepartments.find({},findOptions).count();
  }
  if(args.module=="permission"){
    data= MlPermissions.find({},findOptions).fetch();
    totalRecords=MlPermissions.find({},findOptions).count();
  }
  if(args.module=="countries"){
    data= MlCountries.find({},findOptions).fetch();
    totalRecords=MlCountries.find({},findOptions).count();
  }


  return {'totalRecords':totalRecords,'data':data};
}

MlResolver.MlUnionResolver['SearchResult']= {
  __resolveType(data, context, info){

    if (data.countryId) {
      return 'Cluster';
    }

    if (data.chapterName) {
      return 'Chapter';
    }

    if (data.departmentName) {
      return 'Department';
    }

    if (data.subDepartmentName) {
      return 'SubDepartment';
    }
    if (data.permissionName) {
      return 'Permissions';
    }
    if (data.countryCode) {
      return 'Countries';
    }

    return null;
  }
}
