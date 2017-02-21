import MlResolver from '../mlAdminResolverDef'
import CoreModulesRepo from './repository/mlAdminContextModulesRepo';

MlResolver.MlQueryResolver['ContextSpecSearch'] = (obj, args, context, info) =>{
  let totalRecords=0;
  let findOptions = {};

  // `offset` may be `null`
  if(args.offset && args.offset >0){
    findOptions.skip=args.offset;
  };

  // `limit` may be `null`
  if (args.limit&&args.limit > 0) {
    findOptions.limit = args.limit;
  }

  let moduleName=args.module;
  let action="READ";
  //Authorization layer

  //Context Specific Search layer
  const contextQuery={};
  let result=null;
  switch(moduleName){
    case "cluster":
      result=CoreModulesRepo.MlClusterRepo(args.context,contextQuery,findOptions);
      break;
    case "chapter":
      result=CoreModulesRepo.MlChapterRepo(args.context,contextQuery,findOptions);
      break;
    case "subChapter":
      result=CoreModulesRepo.MlSubChapterRepo(args.context,contextQuery,findOptions);
      break;
    case "community":
      result=CoreModulesRepo.MlCommunityRepo(args.context,contextQuery,findOptions);
      break;

  }

  return {totalRecords:result.totalRecords||0,data:result.data||[]};
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
