import MlResolver from '../mlAdminResolverDef'

MlResolver.MlQueryResolver['SearchQuery'] = (obj, args, context, info) =>{
      if(args.text=="Clusters"){
        return MlClusters.find().fetch();
      }

      if(args.text=="Chapters"){
        return MlChapters.find().fetch();
      }
      return null;
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
