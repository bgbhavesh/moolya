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
