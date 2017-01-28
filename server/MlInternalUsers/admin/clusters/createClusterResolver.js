import MlResolver from '../mlAdminResolverDef'


MlResolver.MlMutationResolver['createCluster'] = (_,{countryId,displayName,about,link,email,showOnMap},context) =>{
   //Check Cluster exists
   if(MlClusters.find(countryId)){
     throw new Error("Entry found in DB");
   }else{
     MlClusters.insert({ countryId,displayName,about,link,email,showOnMap });
   }
   return "Success";
}
