/**
 * Created by mohammed.mohasin on 04/03/17.
 */
import MlResolver from '../../../../commons/mlResolverDef'
import MlGlobalSettingRepo from './repository/mlGlobalSettingRepo';
import MlRespPayload from '../../../../commons/mlPayload'
import MlAdminUserContext from '../../../../mlAuthorization/mlAdminUserContext'

MlResolver.MlQueryResolver.fetchGlobalSettings = (obj, args, context, info) => {
  // TODO : Authorization
  const userProfile = new MlAdminUserContext().userProfileDetails(context.userId) || {};
  const clusterId = userProfile && userProfile.defaultProfileHierarchyRefId ? userProfile.defaultProfileHierarchyRefId : '';
  const result = mlDBController.findOne('MlGlobalSettings', { hierarchyRefId: clusterId }, context) || {};
  // return MlGlobalSettings.find({}).fetch();
  const cluster = mlDBController.findOne('MlClusters', { _id: clusterId }, context)
  if (cluster) {
    const countryCode = cluster.clusterCode
    const countryCapital = mlDBController.findOne('MlCountries', { countryCode }, context) || {}
    if (!result.regionalInfo) {
      result.regionalInfo = {};
    }
    result.regionalInfo.capitalName = countryCapital.capital
    result.regionalInfo.regionalFlag = cluster.countryFlag
  }
  return [result];
}


MlResolver.MlMutationResolver.updateGlobalSetting = (obj, args, context, info) => {
  // TODO : Authorization
  const globalSettingRecord = new MlGlobalSettingRepo(context.userId).updateGlobalSetting(args, context);
  return globalSettingRecord;
}

MlResolver.MlQueryResolver.findTimeZones = (obj, args, context, info) => {
  // ommited args clusterId
  const userProfile = new MlAdminUserContext().userProfileDetails(context.userId) || {};
  const clusterId = userProfile && userProfile.defaultProfileHierarchyRefId ? userProfile.defaultProfileHierarchyRefId : '';
  let response
  if (clusterId) {
    if (clusterId === 'all') {
      const timeZones = mlDBController.find('MlTimeZones', {}, context).fetch();
      return timeZones
    }
    const cluster = mlDBController.findOne('MlClusters', { _id: clusterId }, context)
    if (cluster && cluster._id) {
      const timeZones = mlDBController.find('MlTimeZones', { countryCode: cluster.clusterCode }, context).fetch();
      if (timeZones) {
        timeZones.map((tz) => {
          tz.timeZone = `${tz.timeZone} ${tz.gmtOffset}`
        })
        const code = 200;
        const response = new MlRespPayload().successPayload('', code);
        return timeZones
      }
    }
  }

  return [];
}
MlResolver.MlQueryResolver.findRounding = (obj, args, context, info) => {
  const userProfile = new MlAdminUserContext().userProfileDetails(context.userId) || {};
  const clusterId = userProfile && userProfile.defaultProfileHierarchyRefId ? userProfile.defaultProfileHierarchyRefId : '';
  if (clusterId) {
    const cluster = mlDBController.findOne('MlClusters', { _id: clusterId }, context)
    if (cluster && cluster.clusterCode) {
      const roundings = mlDBController.find('MlCurrencyType', { countryCode: cluster.clusterCode }, context).fetch();
      if (roundings) {
        const code = 200;
        const response = new MlRespPayload().successPayload('', code);
        return roundings
      }
    }
  }
}
MlResolver.MlQueryResolver.findCurrencyNames = (obj, args, context, info) => {
  const userProfile = new MlAdminUserContext().userProfileDetails(context.userId) || {};
  const clusterId = userProfile && userProfile.defaultProfileHierarchyRefId ? userProfile.defaultProfileHierarchyRefId : '';
  if (clusterId) {
    const cluster = mlDBController.findOne('MlClusters', { _id: clusterId }, context)
    if (cluster && cluster.clusterCode) {
      const currencyName = mlDBController.find('MlCurrencyType', { countryCode: cluster.clusterCode }, context).fetch();
      if (currencyName) {
        const code = 200;
        const result = []
        const response = new MlRespPayload().successPayload('', code);
        currencyName.map((currency) => {
          const json = {
            regionalCurrencyName: currency.currencyName,
            _id: currency._id
          }
          result.push(json)
        })

        return result
      }
    }
  }
}

MlResolver.MlQueryResolver.findLanguages = (obj, args, context, info) => {
  const userProfile = new MlAdminUserContext().userProfileDetails(context.userId) || {};
  const clusterId = userProfile && userProfile.defaultProfileHierarchyRefId ? userProfile.defaultProfileHierarchyRefId : '';
  if (clusterId) {
    const languages = mlDBController.find('MlMasterSettings', { hierarchyRefId: clusterId }, context).fetch();
    if (languages) {
      const response = []
      // data = languages.languageInfo
      languages.map((lang) => {
        if (lang.languageInfo) {
          const json = {
            lang_code: lang.languageInfo.languageName,
            language_name: lang.languageInfo.languageName
          }
          response.push(json)
        }
      })
      return response;
    }
  }
}
