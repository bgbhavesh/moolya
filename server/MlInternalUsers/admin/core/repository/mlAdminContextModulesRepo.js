import _ from 'lodash';

export default CoreModulesRepo={
  //contextQuery is restriction of data based on user

  MlClusterRepo:(requestParams,contextQuery,fieldsProj)=>{
    //TODO:User Data Context Query
    //Filter as applied by user.
    // let contextQuery=contextQuery||{};
    let query={isActive:true};
    const data= MlClusters.find(query,fieldsProj).fetch();
    const totalRecords=MlClusters.find(query,fieldsProj).count();

    return {totalRecords:totalRecords,data:data};
  },
  MlChapterRepo:(requestParams,contextQuery,fieldsProj)=>{

    //TODO:User Data Context Query
    //Filter as applied by user.
   // let contextQuery=contextQuery||{};
    let query={isActive:true};
    //User selection filter.
    let clusterId=requestParams&&requestParams.clusterId?requestParams.clusterId:null;
    if(clusterId){
        query={"clusterId":clusterId,isActive:true};
    }

    const data= MlChapters.find(query,fieldsProj).fetch();
    const totalRecords=MlChapters.find(query,fieldsProj).count();

    return {totalRecords:totalRecords,data:data};
  },
  MlSubChapterRepo:(requestParams,contextQuery,fieldsProj)=>{
    //TODO:User Data Context Query
    //Filter as applied by user.
    // let contextQuery=contextQuery||{};
    let query={isActive:true};
    //User selection filter.
    let chapterId=requestParams&&requestParams.chapterId?requestParams.chapterId:null;
    if(chapterId){
      query={"chapterId":chapterId,isActive:true};
    }

    const data= MlSubChapters.find(query,fieldsProj).fetch();
    const totalRecords=MlChapters.find(query,fieldsProj).count();

    return {totalRecords:totalRecords,data:data};

  },
  MlCommunityRepo:(requestParams,contextQuery,fieldsProj)=>{
    //TODO:User Data Context Query
    //Filter as applied by user.
    // let contextQuery=contextQuery||{};
    let query={isActive:true};
    //User selection filter.
    let subChapterId=requestParams&&requestParams.subChapterId?requestParams.subChapterId:null;
    if(subChapterId){
      query={"subChapterId":subChapterId,isActive:true};
    }

    const data= MlCommunity.find(query,fieldsProj).fetch();
    const totalRecords=MlCommunity.find(query,fieldsProj).count();

    return {totalRecords:totalRecords,data:data};

  }


}
