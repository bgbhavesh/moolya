import MlResolver from "../../../../commons/mlResolverDef";
import MlRespPayload from "../../../../commons/mlPayload";
import mlHierarchyAssignment from '../../../admin/genericTransactions/impl/MlHierarchyAssignment'

MlResolver.MlMutationResolver['createRequestss'] = (obj, args, context, info) => {
  if(!args.requests.requestTypeId){
    let code = 409;
    let response = new MlRespPayload().errorPayload("Request Type is mandatory!!!!",code);
    return response;
  }

    let clusterDetails = mlDBController.findOne('MlClusters', {_id: args.requests.cluster},context) || {};
    args.requests.clusterName=clusterDetails.clusterName?clusterDetails.clusterName:null;

    let chapterDetails = mlDBController.findOne('MlChapters', {_id: args.requests.chapter},context) || {};
    args.requests.chapterName=chapterDetails.chapterName?chapterDetails.chapterName:null;

    let subChapterDetails = mlDBController.findOne('MlSubChapters', {_id: args.requests.subChapter},context) || {};
    args.requests.subChapterName=subChapterDetails.subChapterName?subChapterDetails.subChapterName:null;

    let communityRecord = mlDBController.findOne('MlCommunity', {subChapterId: args.requests.subChapter,communityDefCode: args.requests.community},context) || {};
    args.requests.communityId = communityRecord._id;

    let communityDetails = MlCommunityDefinition.findOne({"code":args.requests.community})|| {};
    args.requests.communityName = communityDetails.name;

    if(Meteor.users.findOne({_id : context.userId}))
    {
      args.requests.createdBy = Meteor.users.findOne({_id: context.userId}).username
    }

  let requestDetails = MlRequestType.findOne({"_id":args.requests.requestTypeId})|| {};
  if(requestDetails.requestName) {
    args.requests.requestTypeName = requestDetails.requestName;
    args.requests.userId = context.userId;
    orderNumberGenService.assignRequests(args.requests)
    let id = mlDBController.insert('MlRequests', args.requests, context)
    if (id) {
      let code = 200;
      let result = {requestId: id}
      let response = new MlRespPayload().successPayload(result, code);
      return response;
    }
  }else{
    let result = "Request Type required "
      let response = new MlRespPayload().errorPayload(result);
    return response;
  }
}
MlResolver.MlQueryResolver['fetchRequestss'] = (obj, args, context, info) => {
    let requestType=args.requestType;
    let statuses = args.status;
  let requests=mlDBController.find('MlRequests',{status:{$in:statuses}}).fetch();
    return requests;
}

MlResolver.MlMutationResolver['updateRequestsStatus'] = (obj, args, context, info) => {
  let requestId = args.requestsId;
  let transaction = mlDBController.findOne("MlRequests", {requestId: requestId});
  let decision = false;
  if(args.status == "WIP" || args.status == "Approved"){
    decision = mlHierarchyAssignment.canWorkOnInternalRequest(requestId,"MlRequests",context.userId)
  }
  if( decision === false ){
    let code = 401;
    let result = {message : "User not available in hierarchy"}
    let response = new MlRespPayload().errorPayload(result, code);
    return response;
  }else{
    let id = mlDBController.update('MlRequests', {requestId:requestId},{status: args.status},  {$set: true},context)
    if(id){
      let code = 200;
      let result = {requestsId : id}
      let response = new MlRespPayload().successPayload(result, code);
      return response
    }
  }
}

MlResolver.MlQueryResolver['fetchRequestsForApproval']=(obj, args, context, info) => {
  if (args.transactionType) {
    //todo: conditions based on record id for steps like registration,portfolio
    //resolve userType:internal/external and send with response
    let transactionType=args.transactionType;
    let status=args.status
    let userId = context.userId;
    let requests=mlDBController.find('MlRequests',{status:"Approved", userId:userId},context).fetch();
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
