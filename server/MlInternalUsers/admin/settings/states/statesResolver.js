

import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import MlAdminUserContext from '../../../../mlAuthorization/mlAdminUserContext'

const _ = require('lodash');

MlResolver.MlQueryResolver.fetchState = (obj, args, context, info) => {
  let state = null;
  if (args.stateId) {
    state = MlStates.findOne({ _id: args.stateId });
    state.countryName = MlCountries.findOne({ _id: state.countryId }).country;
  }
  return state || null;
}

MlResolver.MlMutationResolver.updateState = (obj, args, context, info) => {
  const isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    const code = 401;
    const response = new MlRespPayload().errorPayload('Not Authorized', code);
    return response;
  }
  const state = MlStates.findOne({ _id: args.stateId });
  if (state) {
    for (key in args.state) {
      state[key] = args.state[key]
    }
    const resp = MlStates.update({ _id: args.stateId }, { $set: state }, { upsert: true })
    if (resp) {
      const code = 200;
      const result = { state: resp }
      const response = new MlRespPayload().successPayload(result, code);
      return response
    }
  }
}
MlResolver.MlQueryResolver.FetchActiveStates = (obj, args, context, info) => {
  const userProfile = new MlAdminUserContext().getDefaultCountry(context.userId);
  if (userProfile.countryId) {
    const resp = MlStates.find({ countryId: userProfile.countryId, isActive: true }).fetch()
    return resp;
  }
};

MlResolver.MlQueryResolver.FetchStates = (obj, args, context, info) => {
  const resp = MlStates.find({ isActive: true }).fetch()
  return resp;
}


MlResolver.MlQueryResolver.FetchActiveStatesForCluster = (obj, args, context, info) => {
  /*  let states = MlStates.find({"isActive":true}).fetch()
    states.push({"name" : "All","_id" : "all"});
    return states; */
  const clusters = args.clusters;
  let states = [];
  if (clusters && clusters.length > 0) {
    if (clusters.length == 1 && clusters[0] == 'all') {
      states = MlStates.find({ isActive: true }).fetch() || [];
      states.push({ name: 'All', _id: 'all' });
    } else {
      clusters.map((clusterId) => {
        clusterDetails = MlClusters.findOne({ _id: clusterId })
        activeStates = MlStates.find({ $and: [{ countryId: clusterDetails.countryId, isActive: true }] }).fetch();
        if (activeStates && activeStates.length > 0) {
          states = states.concat(activeStates)
        }
      })
      states.push({ name: 'All', _id: 'all' });
    }
  }

  return states;
};


MlResolver.MlQueryResolver.fetchStatesPerCountry = (obj, args, context, info) => {
  if (args.countryId) {
    const resp = MlStates.find({ countryId: args.countryId, isActive: true }).fetch()
    return resp;
  }
};

MlResolver.MlQueryResolver.fetchStatesPerCountryWithAll = (obj, args, context, info) => {
  if (args.countryId) {
    const resp = MlStates.find({ countryId: args.countryId, isActive: true }).fetch();
    resp.push({
      _id: 'all',
      name: 'All'
    })
    return resp;
  }
};
