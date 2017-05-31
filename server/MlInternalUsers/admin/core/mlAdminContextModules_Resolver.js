import MlResolver from '../../../commons/mlResolverDef'
import CoreModulesRepo from './repository/mlAdminContextModulesRepo';
import MlAdminContextQueryConstructor from './repository/mlAdminContextQueryConstructor';
import getQuery from "../genericSearch/queryConstructor";

let mergeQueries=function(userFilter,serverFilter){
  let query=userFilter||{};
  if (_.isEmpty(query)) {
    query = serverFilter||{};
  } else {
    query = {$and: [userFilter,serverFilter]};
  }
  return query;
}


MlResolver.MlQueryResolver['ContextSpecSearch'] = (obj, args, context, info) =>{
  var totalRecords=0;
  var findOptions = {};

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

  var moduleName=args.module;
  var action="READ";
  //to resolve the type in data _resolveType for Union
  context.module=args.module;

  //Authorization layer

  //Context Specific Search layer

  var contextQuery={};
  var queryCount;
  contextQuery=new MlAdminContextQueryConstructor(context.userId,{module:args.module,action:args.action}).contextQuery();
  // var bool = _.isEmpty(userFilterQuery)
  //if(!bool)
  //  queryCount = mergeQueries(contextQuery, userFilterQuery);
  //else
  //  queryCount = contextQuery;

  var result=null;
  var  requestParams=null;
  switch(moduleName){
    case "cluster":
      result=CoreModulesRepo.MlClusterRepo(args.context,userFilterQuery,contextQuery,findOptions, context);
      break;
    case "chapter":
      result=CoreModulesRepo.MlChapterRepo(args.context,userFilterQuery,contextQuery,findOptions, context);
      break;
    case "subChapter":
      result=CoreModulesRepo.MlSubChapterRepo(args.context,userFilterQuery,contextQuery,findOptions, context);
      break;
    case "community":
      result=CoreModulesRepo.MlCommunityRepo(args.context,userFilterQuery,contextQuery,findOptions, context);
      break;
    case "MASTERSETTINGS":
      requestParams=args.context;
      requestParams.userId=context.userId;
      result=CoreModulesRepo.MlMasterSettingsRepo(requestParams,userFilterQuery,contextQuery,findOptions, context);
      break;
    case "AUDIT_LOG":
      let auditParams=args.context;
      result=CoreModulesRepo.MlAuditLogRepo(auditParams,userFilterQuery,contextQuery,findOptions, context);
    case "hierarchySubChapters":
      result=CoreModulesRepo.MlHierarchySubChapterRepo(args.context,contextQuery,findOptions, context);
      break;
    case "registrationInfo":
      requestParams=args.context||{};
      requestParams.type='requested';
      result=CoreModulesRepo.MlRegistrationRepo(requestParams,userFilterQuery,contextQuery,findOptions, context);
      break;
    case "registrationApprovedInfo":
      requestParams=args.context||{};
      requestParams.type='approved';
      result=CoreModulesRepo.MlRegistrationRepo(requestParams,userFilterQuery,contextQuery,findOptions, context);
      break;
    case "portfolioRequests":
      requestParams=args.context||{};
      requestParams.type='requested';
      result=CoreModulesRepo.MlPortfolioRepo(requestParams,userFilterQuery,contextQuery,findOptions, context);
      break;
    case "portfolioApproved":
      requestParams=args.context||{};
      requestParams.type='approved';
      result=CoreModulesRepo.MlPortfolioRepo(requestParams,userFilterQuery,contextQuery,findOptions, context);
      break;
    case 'TransactionsLog':
      requestParams=args.context || {};
      // requestParams.type = _.map(requestParams, _.pick('activity'))
      result=CoreModulesRepo.MlTransactionLogRepo(requestParams,userFilterQuery,contextQuery,findOptions, context);
      break;
    case 'InteractionsLog':
      requestParams=args.context;
      requestParams.type=args.context.transactionTypeName
      result=CoreModulesRepo.MlTransactionLogRepo(requestParams,userFilterQuery,contextQuery,findOptions, context);
      break;
    case 'ConversationsLog':
      requestParams=args.context;
      requestParams.type=args.context.transactionTypeName
      result=CoreModulesRepo.MlTransactionLogRepo(requestParams,userFilterQuery,contextQuery,findOptions, context);
      break;
  }

  return {totalRecords:result.totalRecords||0,data:result.data||[]};
}

MlResolver.MlUnionResolver['ContextSpecSearchResult']= {
  __resolveType(data, context, info){

    var module=context.module||"";
    var resolveType='';
    switch(module) {
      case "cluster":resolveType= 'Cluster';break;
      case "chapter":resolveType= 'Chapter';break;
      case "subChapter":resolveType= 'SubChapter';break;
      case "community":resolveType= 'Community';break;
      case "MASTERSETTINGS":resolveType= 'MasterSettings';break;
      case "AUDIT_LOG":resolveType= 'AuditLogs';break;
      case "hierarchySubChapters":resolveType= 'SubChapter';break;
      case "registrationInfo":resolveType= 'RegistrationInfo';break;
      case "registrationApprovedInfo":resolveType= 'RegistrationInfo';break;
      case "portfolioRequests":resolveType= 'Portfoliodetails';break;
      case "portfolioApproved":resolveType= 'Portfoliodetails';break;
      case "TransactionsLog":resolveType='TransactionsLog';break;
      case "InteractionsLog":resolveType='TransactionsLog';break;
      case "ConversationsLog":resolveType='TransactionsLog';break;

    }

    if(resolveType){
      return resolveType;
    }else{
      return 'GenericType';
    }
  }
}
