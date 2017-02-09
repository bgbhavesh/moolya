import MlResolver from '../mlAdminResolverDef'

MlResolver.MlQueryResolver['SearchQuery'] = (obj, args, context, info) =>{
    let totalRecords=0;
  if(args.module=="cluster"){
    data= MlClusters.find().fetch();
    totalRecords=MlClusters.find().count();
  }

  if(args.module=="chapter"){
    data= MlChapters.find().fetch();
    totalRecords=MlChapters.find().count();
  }

  if(args.module=="department"){
    data= MlDepartments.find().fetch();
    totalRecords=MlDepartments.find().count();
  }

  if(args.module=="subDepartment"){
    data= MlSubDepartments.find().fetch();
    totalRecords=MlSubDepartments.find().count();
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

    return null;
  }
}
