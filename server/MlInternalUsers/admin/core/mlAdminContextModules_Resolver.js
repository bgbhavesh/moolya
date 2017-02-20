import MlResolver from '../mlAdminResolverDef'

MlResolver.MlQueryResolver['ContextSpecSearch'] = (obj, args, context, info) =>{
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

  //Context Specific Search layer
  const contextQuery={};


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
    data= MlDepartments.find({},findOptions).fetch();
    totalRecords=MlDepartments.find({},findOptions).count();
  }

  return {'totalRecords':totalRecords,'data':data};
}

MlResolver.MlUnionResolver['ContextSpecSearchResult']= {
  __resolveType(data, context, info){

    if (data.clusterCode) {
      return 'Cluster';
    }


    if (data.communityName) {
      return 'Community';
    }


    if (data.subChapterName&&!data.communityName) {
      return 'SubChapter';
    }

    if (data.chapterName&&!data.subChapterName&&!data.communityName) {
      return 'Chapter';
    }

    return null;
  }
}
