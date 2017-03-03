import _ from 'lodash';

export default CoreModulesRepo={
  //contextQuery is restriction of data based on user

  MlClusterRepo:(requestParams,contextQuery,fieldsProj)=>{
    //TODO:User Data Context Query
    //Filter as applied by user.
    // let contextQuery=contextQuery||{};
    let query=contextQuery;
    const data= MlClusters.find(query,fieldsProj).fetch();
    const totalRecords=MlClusters.find(query,fieldsProj).count();

    return {totalRecords:totalRecords,data:data};
  },
  MlChapterRepo:(requestParams,contextQuery,fieldsProj)=>{

    //TODO:User Data Context Query
    //Filter as applied by user.
   // let contextQuery=contextQuery||{};
    let query=contextQuery;

    //User selection filter.
    let clusterId=requestParams&&requestParams.clusterId?requestParams.clusterId:null;
    if(clusterId){
        query={"clusterId":clusterId};
    }

    const data= MlChapters.find(query,fieldsProj).fetch();
    const totalRecords=MlChapters.find(query,fieldsProj).count();

    return {totalRecords:totalRecords,data:data};
  },
  MlSubChapterRepo:(requestParams,contextQuery,fieldsProj)=>{
    //TODO:User Data Context Query
    //Filter as applied by user.
    // let contextQuery=contextQuery||{};
    let query=contextQuery;
    //User selection filter.
    let chapterId=requestParams&&requestParams.chapterId?requestParams.chapterId:null;
    if(chapterId){
      query={"chapterId":chapterId};
    }

    const data= MlSubChapters.find(query,fieldsProj).fetch();
    const totalRecords=MlChapters.find(query,fieldsProj).count();

    return {totalRecords:totalRecords,data:data};

  },
  MlCommunityRepo:(requestParams,contextQuery,fieldsProj)=>{
    //TODO:User Data Context Query
    //Filter as applied by user.
    // let contextQuery=contextQuery||{};
    let query={};
    //User selection filter.
    let subChapterId=requestParams&&requestParams.subChapterId?requestParams.subChapterId:null;
    if(subChapterId){
      query={"subChapterId":subChapterId};
    }

    const data= MlCommunity.find(query,fieldsProj).fetch();
    const totalRecords=MlCommunity.find(query,fieldsProj).count();

    return {totalRecords:totalRecords,data:data};

  }


}
