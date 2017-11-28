
import MlResolver from '../../../../commons/mlResolverDef'
import { createcluster } from '../../clusters/clusterResolver'
import MlRespPayload from '../../../../commons/mlPayload'

MlResolver.MlQueryResolver.fetchCountries = (obj, args, context, info) => {
  // let result=MlCountries.find({},{sort: {country:1,displayName:1}}).fetch();
  // let result=MlCountries.find().fetch();
  const result = mlDBController.find('MlCountries', {}, context, { sort: { country: 1, displayName: 1 } }).fetch()
  const code = 200;
  const response = JSON.stringify(new MlRespPayload().successPayload(result, code));
  return result
}
MlResolver.MlQueryResolver.fetchCountry = (obj, args, context, info) => {
  let country = null;
  if (args.countryId) {
    // country =  MlCountries.findOne({"_id":args.countryId});
    country = mlDBController.findOne('MlCountries', { _id: args.countryId }, context);
  }
  return country || null;
}
MlResolver.MlQueryResolver.fetchCountriesSearch = (obj, args, context, info) =>
  // return MlCountries.find({}).fetch();
  mlDBController.find('MlCountries', {}, context).fetch()


MlResolver.MlMutationResolver.updateCountry = (obj, args, context, info) => {
  const cluster = args.cluster;
  const isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    const code = 401;
    const response = new MlRespPayload().errorPayload('Not Authorized', code);
    return response;
  }

  // let country = MlCountries.findOne({_id: args.countryId});
  const country = mlDBController.findOne('MlCountries', { _id: args.countryId }, context)
  if (country) {
    for (key in args.country) {
      country[key] = args.country[key]
    }
    // let resp = MlCountries.update({_id:args.countryId}, {$set:country}, {upsert:true})
    const resp = mlDBController.update('MlCountries', args.countryId, country, { $set: true }, context)
    if (resp) {
      // let cluster = MlClusters.findOne({"countryId":args.countryId});
      let cluster = mlDBController.findOne('MlClusters', { countryId: args.countryId }, context)
      if (cluster) {
        let status = {};
        if (country.isActive) {
          status = {
            code: 101,
            description: 'Work In Progress'
          }
        } else {
          status = {
            code: 110,
            description: 'Inactive'
          }
        }
        // let Args = {clusterId:cluster._id, cluster:{isActive:country.isActive}};
        MlResolver.MlMutationResolver.upsertCluster(obj, {
          clusterId: cluster._id,
          cluster: {
            isActive: country.isActive, about: country.about, clusterName: country.country, status
          },
          moduleName: 'CLUSTER',
          actionName: 'UPDATE'
        }, context, info)
      } else {
        cluster = {
          countryId: args.countryId,
          clusterCode: country.countryCode,
          countryName: country.country,
          clusterName: country.country,
          displayName: country.displayName,
          countryFlag: country.url,
          about: country.about,
          email: '',
          showOnMap: false,
          isActive: false,
          status: {
            code: 100,
            description: 'To Be Assigned'
          }
        }
        MlResolver.MlMutationResolver.createCluster(obj, { cluster, moduleName: 'CLUSTER', actionName: 'CREATE' }, context, info)
      }
      const code = 200;
      const result = { country: resp }
      const response = new MlRespPayload().successPayload(result, code);
      return response
    }
  }
}

MlResolver.MlQueryResolver.fetchCountriesAPI = (obj, args, context, info) => {
  const result = MlCountries.find({}, { sort: { country: 1, displayName: 1 } }).fetch();
  // let result=MlCountries.find().fetch();
  const code = 200;
  const response = JSON.stringify(new MlRespPayload().successPayload(result, code));
  return result
}


MlResolver.MlQueryResolver.fetchCountryCode = (obj, args, context, info) => {
  if (args.clusterId) {
    const clusterData = MlClusters.findOne({ _id: args.clusterId });
    const result = MlCountries.findOne({ _id: clusterData.countryId });
    // let result=MlCountries.find().fetch();
    const code = 200;
    const response = JSON.stringify(new MlRespPayload().successPayload(result, code));
    return result
  }
}

