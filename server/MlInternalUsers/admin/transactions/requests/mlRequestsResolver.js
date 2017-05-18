import MlResolver from "../../../../commons/mlResolverDef";
import MlRespPayload from "../../../../commons/mlPayload";

MlResolver.MlMutationResolver['createRequestss'] = (obj, args, context, info) => {
  if(!args.requests.requestTypeId){
    let code = 409;
    let response = new MlRespPayload().errorPayload("Request Type is mandatory!!!!",code);
    return response;
  }
  let requestDetails = MlRequestType.findOne({"_id":args.requests.requestTypeId})|| {};
  if(requestDetails.requestName) {
    args.requests.requestTypeName = requestDetails.requestName;
    orderNumberGenService.assignRequests(args.requests)
    let id = mlDBController.insert('MlRequests', args.requests, context)
    if (id) {
      let code = 200;
      let result = {requestId: id}
      let response = new MlRespPayload().successPayload(result, code);
      return response;
    }
  }else{
    let result = "Request Types required "
      let response = new MlRespPayload().errorPayload(result);
    return response;
  }
}
MlResolver.MlQueryResolver['fetchRequestss'] = (obj, args, context, info) => {
  if (args.userId) {
    let requestType=args.requestType;
    let requests=mlDBController.find('MlRequests',({userId:args.userId  })).fetch();
    return requests;
  }
  return null
}


MlResolver.MlMutationResolver['updateRequestsStatus'] = (obj, args, context, info) => {

  let id = mlDBController.update('MlRequests', {requestId:args.requestsId},{status: args.status},  {$set: true},context)
  if(id){
    let code = 200;
    let result = {requestsId : id}
    let response = new MlRespPayload().successPayload(result, code);
    return response
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
