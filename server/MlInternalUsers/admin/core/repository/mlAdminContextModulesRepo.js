import _ from 'lodash';
import MlAdminUserContext from '../../../../mlAuthorization/mlAdminUserContext'
import MlAdminContextQueryConstructor from './mlAdminContextQueryConstructor';
let mergeQueries=function(userFilter,serverFilter)
{
  let query=userFilter||{};
    if (_.isEmpty(query)) {
      query = serverFilter||{};
    } else {
      query = {$and: [userFilter,serverFilter]};
    }
    return query;
}
let CoreModules = {
  MlClusterRepo:(requestParams,userFilterQuery,contextQuery,fieldsProj, context)=>{
      var resultantQuery = mergeQueries(contextQuery, userFilterQuery);
      //let query=contextQuery;
      let countriesId=[]; 
      let activeCluster = [];
      let activeCountries = mlDBController.find('MlCountries', {isActive:true}, context, {sort:{country: 1}}).fetch();
      activeCountries.map(function(country){ 
        countriesId.push(country._id);
       })
      let Clusters = mlDBController.find('MlClusters', resultantQuery, context, fieldsProj).fetch();
      countriesId.map(function (id){
        Clusters.map(function(cluster){
          if(cluster.countryId == id){
            activeCluster.push(cluster);
          }
        })
      })
      const data = activeCluster;
      const totalRecords = mlDBController.find('MlClusters', resultantQuery, context, fieldsProj).count();
      return {totalRecords:totalRecords,data:data};
  },
  MlChapterRepo:(requestParams,userFilterQuery,contextQuery,fieldsProj, context)=>{
      var resultantQuery = mergeQueries(contextQuery, userFilterQuery);
      //let query=contextQuery;
      let clusterId=requestParams&&requestParams.clusterId&&requestParams.clusterId!='all'?requestParams.clusterId:null;
      if(clusterId){
        resultantQuery={"clusterId":clusterId};
          if(!_.isEmpty(contextQuery) && _.indexOf(contextQuery._id, "all") < 0){
            resultantQuery = mergeQueries(resultantQuery,{ _id: {$in : contextQuery._id}});
          }
      }

      let citiesId=[];
      let activeChapters = [];
      let activeCities = mlDBController.find('MlCities', {isActive:true}, context,  {sort:{name: 1}} ).fetch();
          activeCities.map(function(city){
            citiesId.push(city._id);
      })
      let Chapters = MlChapters.find(resultantQuery, fieldsProj).fetch();
      citiesId.map(function (id){
        Chapters.map(function(chapter){
          if(chapter.cityId == id){
            activeChapters.push(chapter);
          }
        })
      })
      const data = activeChapters;
      const totalRecords=MlChapters.find(resultantQuery,fieldsProj).count();
      return {totalRecords:totalRecords,data:data};
  },
  MlSubChapterRepo:(requestParams,userFilterQuery,contextQuery,fieldsProj, context)=>{
     var resultantQuery = mergeQueries(contextQuery, userFilterQuery);
      //let query=contextQuery;
      let chapterId=requestParams&&requestParams.chapterId?requestParams.chapterId:null;
      let clusterId=requestParams&&requestParams.clusterId?requestParams.clusterId:null;
      if(chapterId){
        resultantQuery={"chapterId":chapterId};
          if(!_.isEmpty(contextQuery) && _.indexOf(contextQuery._id, "all") < 0){
            resultantQuery = mergeQueries(resultantQuery,{ _id: {$in : contextQuery._id}});
          }
      }
      const data= MlSubChapters.find(resultantQuery,fieldsProj).fetch();
      const totalRecords = mlDBController.find('MlChapters', resultantQuery, context, fieldsProj).count();
      return {totalRecords:totalRecords,data:data};
  },
  MlCommunityRepo:(requestParams,userFilterQuery,contextQuery,fieldsProj, context)=>{
    //TODO:User Data Context Query
    //Filter as applied by user.
    // let contextQuery=contextQuery||{};
    let query={};
    //User selection filter.
    let subChapterId=requestParams&&requestParams.subChapterId?requestParams.subChapterId:null;
    if(subChapterId){
      query={"subChapterId":subChapterId};
    }

    // const data= MlCommunity.find(query,fieldsProj).fetch();
    const data = mlDBController.find('MlCommunity', query, context, fieldsProj).fetch();
    // const totalRecords = MlCommunity.find(query,fieldsProj).count();
    const totalRecords = mlDBController.find('MlCommunity', query, context, fieldsProj).count();
    return {totalRecords:totalRecords,data:data};

  },
  MlMasterSettingsRepo:(requestParams,userFilterQuery,contextQuery,fieldsProj, context)=>{
    //TODO:User Data Context Query
    //Filter as applied by user.
    // let contextQuery=contextQuery||{};
    let serverQuery={};
    let query={};
    //User selection filter.
    let settingsType=requestParams&&requestParams.settingsType?requestParams.settingsType:null;
    let userId=requestParams&&requestParams.userId?requestParams.userId:null;
     //as it is cluster level settings
    let userProfile=new MlAdminUserContext().userProfileDetails(userId);
    let hierarchyRedId=userProfile.defaultProfileHierarchyRefId;
    serverQuery={"hierarchyRefId":hierarchyRedId,type:settingsType};

    query=mergeQueries(userFilterQuery,serverQuery);
    // const data= MlMasterSettings.find(query,fieldsProj).fetch();
    const data = mlDBController.find('MlMasterSettings', query, context, fieldsProj).fetch();
    // const totalRecords=MlMasterSettings.find(query,fieldsProj).count();
    const totalRecords = mlDBController.find('MlMasterSettings', query, context, fieldsProj).count();

    return {totalRecords:totalRecords,data:data};

  },

  MlAuditLogRepo:(requestParams,userFilterQuery,contextQuery,fieldsProj, context)=>{
    if(!fieldsProj.sort){
      fieldsProj.sort={timeStamp: -1}
    }
    let serverQuery={};
    let query = {};
    requestParams=requestParams?requestParams:null;
    // let reqArray=requestParams.moduleName.split(',');
    // serverQuery={moduleName:{$in:reqArray}}
    query=mergeQueries(userFilterQuery,serverQuery);
    const data  = MlAudit.find(query ,fieldsProj).fetch();
    const totalRecords = mlDBController.find('MlAudit', query, context, fieldsProj).count();

    return {totalRecords:totalRecords,data:data};

  },

  MlHierarchySubChapterRepo:(requestParams,contextQuery,fieldsProj, context)=>{
    let query={};
    //User selection filter.
    let clusterId=requestParams&&requestParams.clusterId?requestParams.clusterId:null;
    if(clusterId){
      query={"clusterId":clusterId};
    }
    const data = mlDBController.find('MlSubChapters', query, context, fieldsProj).fetch();
    const totalRecords = mlDBController.find('MlSubChapters', query, context, fieldsProj).count();
    return {totalRecords:totalRecords,data:data};

  },
  MlRegistrationRepo:function(requestParams,userFilterQuery,contextQuery,fieldsProj, context){
    var type=requestParams&&requestParams.type?requestParams.type:"";
    var contextFieldMap={'clusterId':'registrationInfo.clusterId','chapterId':'registrationInfo.chapterId','subChapterId':'registrationInfo.subChapterId','communityId':'registrationInfo.communityId'};
    var resultantQuery=MlAdminContextQueryConstructor.updateQueryFieldNames(contextQuery,contextFieldMap);
        //construct context query with $in operator for each fields
        resultantQuery=MlAdminContextQueryConstructor.constructQuery(resultantQuery,'$in');
    var serverQuery ={};
    switch(type){
      //custom restriction for registration
      case 'requested':
        serverQuery={'status':{'$in':['Pending','Rejected']}};
        break;
      case 'approved':
        serverQuery={'status':"Approved"};
    }
    //todo: internal filter query should be constructed.
    //resultant query with $and operator
    resultantQuery=MlAdminContextQueryConstructor.constructQuery(_.extend(userFilterQuery,resultantQuery,serverQuery),'$and');

      var result=[];
      var data= MlRegistration.find(resultantQuery,fieldsProj).fetch()||[];
      var totalRecords=MlRegistration.find(resultantQuery,fieldsProj).count();
        data.map(function (doc,index) {
        let object ;
        object = doc.registrationInfo;
        object._id = doc._id;
        object.registrationStatus =doc.status;
       // object.canAssign = false;
       // object.canUnAssign = false;
        result.push(object);
      });
      data = result;
      return {totalRecords:totalRecords,data:data};
  },
  MlPortfolioRepo:function(requestParams,userFilterQuery,contextQuery,fieldsProj, context){
    var type=requestParams&&requestParams.type?requestParams.type:"";
    //construct context query with $in operator for each fields
    var resultantQuery=MlAdminContextQueryConstructor.constructQuery(contextQuery,'$in');
    var serverQuery ={};
    switch(type){
      //custom restriction for registration
      case 'requested':
       // serverQuery={'status':{'$in':['Pending','Rejected']}};
        break;
      case 'approved':
       // serverQuery={'status':"Approved"};
    }
    //todo: internal filter query should be constructed.
    //resultant query with $and operator
    resultantQuery=MlAdminContextQueryConstructor.constructQuery(_.extend(userFilterQuery,resultantQuery,serverQuery),'$and');

    var data= MlPortfolioDetails.find(resultantQuery,fieldsProj).fetch()||[];
    var totalRecords=MlPortfolioDetails.find(resultantQuery,fieldsProj).count();
    return {totalRecords:totalRecords,data:data};
  },
  MlTransactionLogRepo:(requestParams,userFilterQuery,contextQuery,fieldsProj, context)=>{
    if(!fieldsProj.sort){
      fieldsProj.sort={createdAt: -1}
    }
    const data = mlDBController.find('MlTransactionsLog', userFilterQuery, context, fieldsProj).fetch();
    const totalRecords = mlDBController.find('MlTransactionsLog', userFilterQuery, context,fieldsProj).count();
    return {totalRecords:totalRecords,data:data};

  }

}


export default CoreModulesRepo =  CoreModules;
