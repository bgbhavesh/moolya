import MlResolver from '../mlAdminResolverDef'
import CoreModulesRepo from './repository/mlAdminContextModulesRepo';
import MlAdminContextQueryConstructor from './repository/mlAdminContextQueryConstructor';
import getQuery from "../genericSearch/queryConstructor";
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

  //'filter' applied by user
  let userFilterQuery={};
  if (args.fieldsData){
    userFilterQuery = getQuery.searchFunction(args);
  }
  if(args.sortData){
    let sortObj = getQuery.sortFunction(args);
    findOptions.sort=sortObj||{};
  }

  let moduleName=args.module;
  let action="READ";
  //Authorization layer

  //Context Specific Search layer

  let contextQuery={};
  contextQuery=new MlAdminContextQueryConstructor(context.userId,{module:args.module,action:args.action}).contextQuery();
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
    case "MASTER_SETTINGS":
      let requestParams=args.context;
      requestParams.userId=context.userId;
      result=CoreModulesRepo.MlMasterSettingsRepo(requestParams,userFilterQuery,contextQuery,findOptions);

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

    if(data.hierarchyLevel&&data.type){
      return 'MasterSettings';
    }

    return null;
  }
}
