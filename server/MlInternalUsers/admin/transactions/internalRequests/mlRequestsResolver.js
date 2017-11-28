import MlResolver from '../../../../commons/mlResolverDef';
import MlRespPayload from '../../../../commons/mlPayload';
import mlHierarchyAssignment from '../../../admin/genericTransactions/impl/MlHierarchyAssignment'

MlResolver.MlMutationResolver.createRequestss = (obj, args, context, info) => {
  if (!args.requests.requestTypeId) {
    const code = 409;
    const response = new MlRespPayload().errorPayload('Request Type is mandatory!!!!', code);
    return response;
  }

  const clusterDetails = mlDBController.findOne('MlClusters', { _id: args.requests.cluster }, context) || {};
  args.requests.clusterName = clusterDetails.clusterName ? clusterDetails.clusterName : null;

  const chapterDetails = mlDBController.findOne('MlChapters', { _id: args.requests.chapter }, context) || {};
  args.requests.chapterName = chapterDetails.chapterName ? chapterDetails.chapterName : null;

  const subChapterDetails = mlDBController.findOne('MlSubChapters', { _id: args.requests.subChapter }, context) || {};
  args.requests.subChapterName = subChapterDetails.subChapterName ? subChapterDetails.subChapterName : null;

  const communityRecord = mlDBController.findOne('MlCommunity', { subChapterId: args.requests.subChapter, communityDefCode: args.requests.community }, context) || {};
  args.requests.communityId = communityRecord._id;

  const communityDetails = MlCommunityDefinition.findOne({ code: args.requests.community }) || {};
  args.requests.communityName = communityDetails.name;

  // Fix for Issue-1971
  if (args.requests && args.requests.community === 'all') {
    args.requests.communityName = 'All';
    args.requests.communityId = 'all';
  }

  const user = mlDBController.findOne('users', { _id: context.userId }, context)
  if (user) {
    args.requests.createdBy = user.profile.InternalUprofile.moolyaProfile.firstName ? user.profile.InternalUprofile.moolyaProfile.firstName : `${'' + ' '}${user.profile.InternalUprofile.moolyaProfile.lastName}` ? user.profile.InternalUprofile.moolyaProfile.lastName : '';
    args.requests.emailId = user.profile.email;
  }
  let deviceName,
    deviceId;
  if (context.browser.includes('Macintosh')) {
    deviceName = context.browser.split('1')[2].substring(4, 10);
    deviceId = context.ip;
  } else if (context.browser.includes('Linux')) {
    deviceName = 'Linux';
    deviceId = context.ip;
  } else {
    deviceName = 'Windows';
    deviceId = context.ip;
  }
  args.requests.deviceName = deviceName;
  args.requests.deviceId = deviceId;
  const requestDetails = MlRequestType.findOne({ _id: args.requests.requestTypeId }) || {};
  const transactionTypeName = requestDetails.transactionType ? requestDetails.transactionType : '';
  const transactionTypeId = requestDetails.transactionId ? requestDetails.transactionId : '';
  if (requestDetails.requestName) {
    args.requests.requestTypeName = requestDetails.requestName;
    args.requests.userId = context.userId;
    args.requests.transactionTypeName = transactionTypeName;
    args.requests.transactionTypeId = transactionTypeId;
    if (mlHierarchyAssignment.checkHierarchyExist(context.userId) === true) {
      orderNumberGenService.assignRequests(args.requests)
      const id = mlDBController.insert('MlRequests', args.requests, context)
      if (id) {
        const code = 200;
        const result = { requestId: id }
        const response = new MlRespPayload().successPayload(result, code);
        return response;
      }
    } else {
      const result = 'No Hierarchy available for user, contact Administrator'
      const response = new MlRespPayload().errorPayload(result);
      return response;
    }
  } else {
    const result = 'Request Type required'
    const response = new MlRespPayload().errorPayload(result);
    return response;
  }
}
MlResolver.MlQueryResolver.fetchRequestss = (obj, args, context, info) => {
  const requestType = args.requestType;
  const statuses = args.status;
  const requests = mlDBController.find('MlRequests', { status: { $in: statuses } }).fetch();
  return requests;
}

MlResolver.MlMutationResolver.updateRequestsStatus = (obj, args, context, info) => {
  const requestId = args.requestsId;
  const transaction = mlDBController.findOne('MlRequests', { requestId });
  let decision = false;
  if (args.status == 'WIP' || args.status == 'Approved' || args.status == 'Rejected') {
    decision = mlHierarchyAssignment.canWorkOnInternalRequest(requestId, 'MlRequests', context.userId)
  }
  if (decision === true) {
    const id = mlDBController.update('MlRequests', { requestId }, { status: args.status }, { $set: true }, context)
    if (id) {
      const code = 200;
      const result = { requestsId: id }
      const response = new MlRespPayload().successPayload(result, code);
      return response
    }
  } else {
    const code = 401;
    const result = { message: "User doesn't have privileges to act on this request" }
    const response = new MlRespPayload().errorPayload(result, code);
    return response;
  }
}

MlResolver.MlQueryResolver.fetchRequestsForApproval = (obj, args, context, info) => {
  if (args.transactionType) {
    // todo: conditions based on record id for steps like registration,portfolio
    // resolve userType:internal/external and send with response
    const transactionType = args.transactionType;
    const status = args.status
    const userId = context.userId;
    const requests = mlDBController.find('MlRequests', { status: 'Approved', userId }, context).fetch();
    return requests;
  }
  return null;
}


//
// MlResolver.MlMutationResolver['updateTransactionStatus'] = (obj, args, context, info) => {
//
//   let id = mlDBController.update('MlTransactions', {_id:args.transactionId},{status: args.status},  {$set: true},context)
//   if(id){
//     let code = 200;
//     let result = {transactionId : id}
//     let response = new MlRespPayload().successPayload(result, code);
//     return response
//   }
// }
