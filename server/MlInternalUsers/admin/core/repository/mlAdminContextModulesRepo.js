import _ from "lodash";
import MlAdminUserContext from "../../../../mlAuthorization/mlAdminUserContext";
import MlAdminContextQueryConstructor from "./mlAdminContextQueryConstructor";
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

    if (!fieldsProj.sort) {
      fieldsProj.sort = {
        chapterName: 1
      }
    }

    let pipeline = [];
    let resultantQuery ={};
    let clusterId=requestParams&&requestParams.clusterId&&requestParams.clusterId!='all'?requestParams.clusterId:null;
    if(clusterId){
      if((!_.isEmpty(contextQuery)) && _.indexOf(contextQuery._id, "all") < 0){
        resultantQuery = {"clusterId":clusterId};
        if(Object.keys(userFilterQuery).length){
          resultantQuery = mergeQueries(resultantQuery, userFilterQuery);
        }
        pipeline.push({'$match':{ _id: {$in : contextQuery._id}}});
      } else {
        pipeline.push({'$match': {"clusterId":clusterId} });
        resultantQuery = userFilterQuery;
      }
    } else {
      resultantQuery = mergeQueries(userFilterQuery, contextQuery);
    }
    pipeline.push({$lookup:{from:'mlCities',localField:'cityId',foreignField:'_id',as:'cityInfo'}});
    pipeline.push({$match:{ 'cityInfo.isActive':true }});
    if(resultantQuery){
      pipeline.push({$match:resultantQuery});
    }
    if(fieldsProj.sort){
      pipeline.push({$sort:fieldsProj.sort});
    }
    if(fieldsProj.skip){
      pipeline.push({$skip:parseInt(fieldsProj.skip)});
    }
    if(fieldsProj.limit){
      pipeline.push({$limit:parseInt(fieldsProj.limit)});
    }
    let myAggregateCheck = mlDBController.aggregate('MlChapters',pipeline, context);
    const mytotalRecords=MlChapters.find(resultantQuery,fieldsProj).count();
    return {totalRecords:mytotalRecords,data:myAggregateCheck};
  },
  MlSubChapterRepo:(requestParams,userFilterQuery,contextQuery,fieldsProj, context)=>{
      var resultantQuery = mergeQueries(contextQuery, userFilterQuery);
      //let query=contextQuery;
      let chapterId=requestParams&&requestParams.chapterId?requestParams.chapterId:null;
      let clusterId=requestParams&&requestParams.clusterId?requestParams.clusterId:null;
      if(chapterId){
        // resultantQuery = mergeQueries(resultantQuery, {"chapterId":chapterId})
        resultantQuery=mergeQueries({"chapterId":chapterId}, userFilterQuery);
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

  MlAuditLogRepo: (requestParams, userFilterQuery, contextQuery, fieldsProj, context)=> {
    if (!fieldsProj.sort) {
      fieldsProj.sort = {timeStamp: -1}
    }
    let serverQuery = {};
    let query = {};
    requestParams = requestParams ? requestParams : null;
    let reqArray=requestParams.moduleName.split(',');
    serverQuery={moduleName:{$in:reqArray}}
    query = mergeQueries(userFilterQuery, serverQuery);
    const data = MlAudit.find(query, fieldsProj).fetch();
    const totalRecords = mlDBController.find('MlAudit', query, context, fieldsProj).count();

    return {totalRecords: totalRecords, data: data};
  },

  MlHierarchySubChapterRepo:(requestParams,contextQuery,fieldsProj, context)=>{
    let nonMoolyaQuery={};
    let moolyaQuery={};
    var processedData = []
    //User selection filter.
    let clusterId=requestParams&&requestParams.clusterId?requestParams.clusterId:null;
    if(clusterId){
      nonMoolyaQuery={"clusterId":clusterId,isDefaultSubChapter:false};
      moolyaQuery={"clusterId":clusterId,isDefaultSubChapter:true}
    }
    var nonMoolya = mlDBController.find('MlSubChapters', nonMoolyaQuery, context, fieldsProj).fetch();
    var moolya =  mlDBController.findOne('MlSubChapters', moolyaQuery, context, fieldsProj);
    if(moolya && moolya.isDefaultSubChapter === true){
      processedData.push(moolya)
      if(nonMoolya){
        nonMoolya.map(function (doc,id) {
          processedData.push(doc)
        })
      }
    }
    data = processedData
    var totalRecords = mlDBController.find('MlSubChapters', nonMoolyaQuery, context, fieldsProj).count();
    return {totalRecords:totalRecords+1,data:data};

  },
  MlInternalRequestRepo:function(requestParams,userFilterQuery,contextQuery,fieldsProj, context){
    var type=requestParams&&requestParams.type?requestParams.type:"";
    var contextFieldMap={'clusterId':'cluster','chapterId':'chapter','subChapterId':'subChapter','communityId':'communityId','communityCode':'community'};
    var resultantQuery=MlAdminContextQueryConstructor.updateQueryFieldNames(contextQuery,contextFieldMap);
    //construct context query with $in operator for each fields
    resultantQuery=MlAdminContextQueryConstructor.constructQuery(resultantQuery,'$in');
    var serverQuery ={};
    switch(type){
      //custom restriction for registration
      case 'requested':
        serverQuery={'status':{'$in':['Pending','WIP']}};
        break;
      case 'approved':
        serverQuery={'status':"Approved"};
    }
    //todo: internal filter query should be constructed.
    //resultant query with $and operator
    resultantQuery=MlAdminContextQueryConstructor.constructQuery(_.extend(userFilterQuery,resultantQuery,serverQuery),'$and');

    var data= MlRequests.find(resultantQuery,fieldsProj).fetch()||[];
    var totalRecords=MlRequests.find(resultantQuery,fieldsProj).count();
    return {totalRecords:totalRecords,data:data};
  },
  MlTemplatesAssignmentRepo:function(requestParams,userFilterQuery,contextQuery,fieldsProj, context){
    var contextFieldMap={'clusterId':'templateclusterId','chapterId':'templatechapterId','subChapterId':'templatesubChapterId','communityId':'communityId','communityCode':'templatecommunityCode'};
    var resultantQuery=MlAdminContextQueryConstructor.updateQueryFieldNames(contextQuery,contextFieldMap);
    //this is specific to template assignment
    //community is is not captured in template assignment
    _.omit(resultantQuery, ['communityId']);
    //add all for each option
    _.each(resultantQuery,function(r){if(_.isArray(r)){r.push('all');}});

    //construct context query with $in operator for each fields
    resultantQuery=MlAdminContextQueryConstructor.constructQuery(resultantQuery,'$in');

    if(!fieldsProj.sort){
      fieldsProj.sort={'createdDate': -1}
    }

    //todo: internal filter query should be constructed.
    //resultant query with $and operator
    resultantQuery=MlAdminContextQueryConstructor.constructQuery(_.extend(userFilterQuery,resultantQuery),'$and');
    var data= MlTemplateAssignment.find(resultantQuery,fieldsProj).fetch();
    var totalRecords=MlTemplateAssignment.find(resultantQuery,fieldsProj).count();
    return {totalRecords:totalRecords,data:data};
  },
  MlRegistrationRepo:function(requestParams,userFilterQuery,contextQuery,fieldsProj, context){
    var type=requestParams&&requestParams.type?requestParams.type:"";
    var contextFieldMap={'clusterId':'registrationInfo.clusterId','chapterId':'registrationInfo.chapterId','subChapterId':'registrationInfo.subChapterId','communityId':'registrationInfo.communityId','communityCode':'registrationInfo.registrationType'};
    var resultantQuery=MlAdminContextQueryConstructor.updateQueryFieldNames(contextQuery,contextFieldMap);
        //construct context query with $in operator for each fields
        resultantQuery=MlAdminContextQueryConstructor.constructQuery(resultantQuery,'$in');
    var serverQuery ={};
    switch(type){
      //custom restriction for registration
      case 'requested':
        serverQuery={'status':{'$in':['Yet To Start','WIP','Rejected']}};
        break;
      case 'approved':
        serverQuery={'status':"Approved"};
    }

    //To display the latest record based on date
    if(!fieldsProj.sort){
      fieldsProj.sort={'registrationInfo.registrationDate': -1}
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
        if(doc.allocation){
            object.assignedUser = doc.allocation.assignee
            object.userName = doc.allocation.assigneeId
        }else{
            object.assignedUser = "Un Assigned"
        }
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
       serverQuery={'status':"Approved"};
    }
    //todo: internal filter query should be constructed.
    //resultant query with $and operator
    resultantQuery=MlAdminContextQueryConstructor.constructQuery(_.extend(userFilterQuery,resultantQuery,serverQuery),'$and');

    var data= MlPortfolioDetails.find(resultantQuery,fieldsProj).fetch()||[];
    var totalRecords=MlPortfolioDetails.find(resultantQuery,fieldsProj).count();
    return {totalRecords:totalRecords,data:data};
  },
  MlTransactionLogRepo:(requestParams,userFilterQuery,contextQuery,fieldsProj, context)=>{
    var type=requestParams&&requestParams.transactionTypeName?requestParams.transactionTypeName:"";
    var serverQuery ={};
    let query={};
    if(!fieldsProj.sort){
      fieldsProj.sort={createdAt: -1}
    }
    switch(type){
      case 'interactions':
        serverQuery={'transactionTypeName': "interactions"};
        break;
      case 'system':
        serverQuery={'transactionTypeName': "system"};
        break;
      case 'conversations':
        serverQuery={'transactionTypeName': "conversations"};
        break;
    }
    var resultantQuery=MlAdminContextQueryConstructor.constructQuery(contextQuery,'$in');
    //todo: internal filter query should be constructed.
    //resultant query with $and operator
    resultantQuery=MlAdminContextQueryConstructor.constructQuery(_.extend(userFilterQuery,resultantQuery,serverQuery),'$and');

    const data = mlDBController.find('MlTransactionsLog', resultantQuery, context, fieldsProj).fetch();
    const totalRecords = mlDBController.find('MlTransactionsLog', resultantQuery, context,fieldsProj).count();
    return {totalRecords:totalRecords,data:data};

  }

}


export default CoreModulesRepo =  CoreModules;
