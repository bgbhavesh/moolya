import MlResolver from '../mlAdminResolverDef'


MlResolver.MlMutationResolver['createChapter'] = (_,{clusterId,chapterName,diplayName,about,link,state,email,showOnMap},context) =>{
   //Check Chapter exists
   if(MlChapters.find(clusterId)){
     throw new Error("Entry found in DB");
   }else{
     MlChapters.insert({ clusterId,chapterName,diplayName,about,link,state,email,showOnMap });
   }
   return "Success";
}
