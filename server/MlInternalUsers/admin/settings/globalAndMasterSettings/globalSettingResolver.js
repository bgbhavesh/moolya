/**
 * Created by mohammed.mohasin on 04/03/17.
 */
import MlResolver from '../../../../commons/mlResolverDef'
import MlGlobalSettingRepo from './repository/mlGlobalSettingRepo';
import MlRespPayload from '../../../../commons/mlPayload'
import MlAdminUserContext from '../../../../mlAuthorization/mlAdminUserContext'

MlResolver.MlQueryResolver['fetchGlobalSettings'] = (obj, args, context, info) => {
  // TODO : Authorization
  let userProfile = new MlAdminUserContext().userProfileDetails(context.userId) || {};
  let clusterId = userProfile && userProfile.defaultProfileHierarchyRefId ? userProfile.defaultProfileHierarchyRefId : '';
     // return MlGlobalSettings.find({}).fetch();
     return mlDBController.find('MlGlobalSettings', {hierarchyRefId:clusterId}, context).fetch();
}


MlResolver.MlMutationResolver['updateGlobalSetting'] = (obj, args, context, info) => {
  // TODO : Authorization
     let globalSettingRecord=new MlGlobalSettingRepo(context.userId).updateGlobalSetting(args, context);
     return globalSettingRecord;
}

MlResolver.MlQueryResolver['findTimeZones'] = (obj, args, context, info) => {
  //ommited args clusterId
  let userProfile = new MlAdminUserContext().userProfileDetails(context.userId) || {};
  let clusterId = userProfile && userProfile.defaultProfileHierarchyRefId ? userProfile.defaultProfileHierarchyRefId : '';
  let response
  if(clusterId){
    if(clusterId === "all") {
      let timeZones = mlDBController.find("MlTimeZones", {}, context).fetch();
      return timeZones
    }else {
      let cluster = mlDBController.findOne("MlClusters", {"_id": clusterId}, context)
      if(cluster && cluster._id){
        let timeZones = mlDBController.find("MlTimeZones", {"countryCode": cluster.clusterCode}, context).fetch();
        if (timeZones) {
          timeZones.map(function (tz) {
            tz.timeZone = tz.timeZone+" "+tz.gmtOffset
          })
          let code = 200;
          let response = new MlRespPayload().successPayload('', code);
          return timeZones
        }
      }
    }

  }

  return [];
}
MlResolver.MlQueryResolver['findLanguages'] = (obj, args, context, info) => {
  let languages = mlDBController.find("MlLanguages", {}, context).fetch();
  return languages;
}
