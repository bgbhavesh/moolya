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

    return null;
  }
}
