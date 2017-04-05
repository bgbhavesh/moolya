import _ from 'lodash';
import MlAdminUserContext from '../../../../mlAuthorization/mlAdminUserContext'


let mergeQueries=function(userFilter,serverFilter){
  let query=userFilter||{};


  // Apply the server side selector. Both must be met, so we join
  // them using $and, allowing both selectors to have
  // the same keys.
    if (_.isEmpty(query)) {
      query = serverFilter||{};
    } else {
      query = {$and: [userFilter,serverFilter]};
    }
    return query;
}
export default CoreModulesRepo={
  //contextQuery is restriction of data based on user

  MlClusterRepo:(requestParams,contextQuery,fieldsProj, context)=>{
    //TODO:User Data Context Query
    //Filter as applied by user.
    // let contextQuery=contextQuery||{};
    let query=contextQuery;

    let countriesId=[]; 
    let activeCluster = [];
    // let activeCountries = MlCountries.find({isActive:true}).fetch();
    let activeCountries = mlDBController.find('MlCountries', {isActive:true}, context).fetch();
    activeCountries.map(function(country){ 
      countriesId.push(country._id);
     })
    // let Clusters= MlClusters.find(query,fieldsProj).fetch();
    let Clusters = mlDBController.find('MlClusters', query, context, fieldsProj).fetch();
    countriesId.map(function (id){
      Clusters.map(function(cluster){
        if(cluster.countryId == id){
          activeCluster.push(cluster);
        }
      })
    })
    const data = activeCluster;
    // const data= MlClusters.find(query,fieldsProj).fetch();
    // const totalRecords=MlClusters.find(query,fieldsProj).count();
    const totalRecords = mlDBController.find('MlClusters', query, context, fieldsProj).count();

    return {totalRecords:totalRecords,data:data};
  },
  MlChapterRepo:(requestParams,contextQuery,fieldsProj, context)=>{
    //TODO:User Data Context Query
    let query=contextQuery;
    //User selection filter.
    let clusterId=requestParams&&requestParams.clusterId&&requestParams.clusterId!='all'?requestParams.clusterId:null;
    if(clusterId){
        query={"clusterId":clusterId};
    }

    if(contextQuery && contextQuery._id && contextQuery._id.length > 0){
          if(_.indexOf(contextQuery._id, "all") < 0)
              query = { _id: {$in : contextQuery._id}}
    }

    let citiesId=[];
    let activeChapters = [];
    // let activeCities = MlCities.find({isActive:true}).fetch();
    let activeCities = mlDBController.find('MlCities', {isActive:true}, context).fetch();
    activeCities.map(function(city){
      citiesId.push(city._id);
    })
    // let Chapters = MlChapters.find(query,fieldsProj).fetch();
    let Chapters = mlDBController.find('MlChapters', query, context, fieldsProj).fetch();
    citiesId.map(function (id){
      Chapters.map(function(chapter){
        if(chapter.cityId == id){
          activeChapters.push(chapter);
        }
      })
    })
    const data = activeChapters;
    // const totalRecords=MlChapters.find(query,fieldsProj).count();
    const totalRecords = mlDBController.find('MlChapters', query, context, fieldsProj).count();
    return {totalRecords:totalRecords,data:data};

  },
  MlSubChapterRepo:(requestParams,contextQuery,fieldsProj, context)=>{
    //TODO:User Data Context Query
    //Filter as applied by user.
    // let contextQuery=contextQuery||{};
    let query=contextQuery;
    //User selection filter.
    let chapterId=requestParams&&requestParams.chapterId?requestParams.chapterId:null;
    if(chapterId){
      query={"chapterId":chapterId};
    }

    // if(contextQuery && contextQuery._id && contextQuery._id.length > 0)
    //   query = { _id: {$in : contextQuery._id}}

    // const data= MlSubChapters.find(query,fieldsProj).fetch();
    const data = mlDBController.find('MlSubChapters', query, context, fieldsProj).fetch();
    // const totalRecords=MlChapters.find(query,fieldsProj).count();
    const totalRecords = mlDBController.find('MlChapters', query, context, fieldsProj).count();
    return {totalRecords:totalRecords,data:data};

  },
  MlCommunityRepo:(requestParams,contextQuery,fieldsProj, context)=>{
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

  }
}
