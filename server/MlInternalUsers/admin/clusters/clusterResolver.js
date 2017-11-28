import MlResolver from '../../../commons/mlResolverDef'
import MlRespPayload from '../../../commons/mlPayload'
import MlAuthorization from '../../../mlAuthorization/mlAuthorization'
import geocoder from 'geocoder'
import MlEmailNotification from '../../../mlNotifications/mlEmailNotifications/mlEMailNotification'
import { filter } from 'lodash'


MlResolver.MlMutationResolver.createCluster = (obj, args, context, info) => {
  const isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    const code = 401;
    const response = new MlRespPayload().errorPayload('Not Authorized', code);
    return response;
  }

  const cluster = args.cluster;
  // if(MlClusters.find({countryId:cluster.countryId}).count() > 0){
  if (mlDBController.find('MlClusters', { countryId: cluster.countryId }, context).count() > 0) {
    const code = 409;
    return new MlRespPayload().errorPayload('Already Exist', code);
  }
  geocoder.geocode(cluster.clusterName, Meteor.bindEnvironment((err, data) => {
    if (err) {
      return 'Invalid Country Name';
    }
    cluster.latitude = data.results[0].geometry.location.lat;
    cluster.longitude = data.results[0].geometry.location.lng;
    try {
      // let id = MlClusters.insert(cluster);
      const id = mlDBController.insert('MlClusters', cluster, context)
      if (id) {
        MlResolver.MlMutationResolver.createCommunityAccess(obj, { clusterId: id, moduleName: 'CLUSTER', actionName: 'CREATE' }, context, info)

        const code = 200;
        const result = { clusterid: id }
        const response = JSON.stringify(new MlRespPayload().successPayload(result, code));
        return response
      }
    } catch (e) {
      throw new Error(`Error while creating Cluster ${e}`);
    }
  }), { key: Meteor.settings.private.googleApiKey });
}

MlResolver.MlMutationResolver.upsertCluster = (obj, args, context, info) => {
  const isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    const code = 401;
    const response = new MlRespPayload().errorPayload('Not Authorized', code);
    return response;
  }

  // let cluster = MlClusters.findOne({_id: args.clusterId});
  const cluster = mlDBController.findOne('MlClusters', { _id: args.clusterId }, context)
  if (cluster) {
    for (key in args.cluster) {
      cluster[key] = args.cluster[key]
    }
    if (cluster.isActive && cluster.showOnMap) {
      if (cluster.status && cluster.status.code != 111) {
        cluster.status = {
          code: 111,
          description: 'Active'
        }
      }
    } else if (cluster.isActive) {
      if (cluster.status && cluster.status.code != 101) {
        cluster.status = {
          code: 101,
          description: 'Work In Progress'
        }
      }
    } else if (cluster.status && cluster.status.code != 110) {
      cluster.status = {
        code: 110,
        description: 'Inactive'
      }
    }
    // let resp = MlClusters.update({_id:args.clusterId}, {$set:cluster}, {upsert:true})
    const resp = mlDBController.update('MlClusters', args.clusterId, cluster, { $set: true }, context)
    if (resp) {
      if (cluster && cluster.isEmailNotified) {
        if (args.clusterId) {
          MlEmailNotification.clusterVerficationEmail(args.clusterId, context);
        }
      }
    }
    if (resp) {
      const code = 200;
      const result = { cluster: resp }
      const response = new MlRespPayload().successPayload(result, code);
      return response
    }
  }
}

MlResolver.MlQueryResolver.fetchCluster = (obj, args, context, info) => {
  if (args.clusterId) {
    const id = args.clusterId;
    const response = mlDBController.findOne('MlClusters', { _id: id }, context)
    return response;
  }
}

MlResolver.MlMutationResolver.updateCluster = (obj, args, context, info) => {
  if (args.clusterId) {
    const id = args.clusterId;
    // let updatedResponse= MlClusters.update({_id:id}, {$set: args.clusterDetails});
    const updatedResponse = mlDBController.update('MlClusters', id, args.clusterDetails, { $set: true }, context)
    return updatedResponse
  }
}

/**
 * @Note [condition Extended]
 * for the case of non-moolya subChapters in the registerAs functionality from the app side
 * */
MlResolver.MlQueryResolver.fetchClustersForMap = (obj, args, context, info) => {
  let result = mlDBController.find('MlClusters', { isActive: true }, context).fetch() || [];
  if (args && args.subChapterId) {
    const subChapterDetails = mlDBController.findOne('MlSubChapters', { _id: args.subChapterId })
    if (subChapterDetails && !subChapterDetails.isDefaultSubChapter) {
      result = filter(result, { _id: subChapterDetails.clusterId });
    }
  }
  return result;
}

MlResolver.MlQueryResolver.fetchActiveClusters = (obj, args, context, info) => {
  let result = [];
  // let clusterData = MlClusters.find({isActive:true}).fetch()||[];
  const clusterData = mlDBController.find('MlClusters', { isActive: true }, context).fetch() || [];
  if (clusterData.length > 0) {
    result = clusterData;
    result.push({ countryName: 'All', _id: 'all' });
  }
  return result;
}

const createcluster = (cluster) => {
  // if(MlClusters.find({countryId:cluster.countryId}).count() > 0){
  if (mlDBController.find('MlClusters', { countryId: cluster.countryId }).count() > 0) {
    const code = 409;
    return new MlRespPayload().errorPayload('Already Exist', code);
  }
  // let id = MlClusters.insert(cluster);
  const id = mlDBController.insert('MlClusters', cluster)
  if (id) {
    const code = 200;
    const result = { clusterid: id }
    const response = JSON.stringify(new MlRespPayload().successPayload(result, code));
    return response
  }
}

module.exports = createcluster
