import _ from 'lodash';
import MlAdminUserContext from '../../../../../mlAuthorization/mlAdminUserContext'
export default class MlGlobalSettingRepo{
   constructor(userId){
      this.userId=userId;
   };



  updateGlobalSetting(requestParams){
    let settingsObj=null;
    check(requestParams.type,String);
    //fetch the User context
    let userProfile=new MlAdminUserContext().userProfileDetails(this.userId);

    //todo:dynamic handling of resource
     let cluster=MlClusters.findOne(userProfile.defaultProfileHierarchyRefId);
     let updateQuery={"hierarchyLevel":3,"hierarchyCode":"CLUSTER","hierarchyRefId":userProfile.defaultProfileHierarchyRefId,"hierarchyRefName":cluster.clusterName};

    switch(requestParams.type){
      case "DATEANDTIME":
        settingsObj={"type":"GLOBALSETTING","dateAndTimeInfo":requestParams.settingsData.dateAndTimeInfo};
        break;
      case "NUMERICAL":
        settingsObj={"type":"GLOBALSETTING","numericalInfo":requestParams.settingsData.numericalInfo};
        break;
      case "REGIONAL":
        settingsObj={"type":"GLOBALSETTING","regionalInfo":requestParams.settingsData.regionalInfo};
        break;
    }

     MlGlobalSettings.update(updateQuery,{$set:settingsObj},{upsert:true});
    return MlGlobalSettings.findOne(updateQuery)._id;
  }


}
