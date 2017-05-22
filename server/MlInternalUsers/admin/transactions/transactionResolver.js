import MlResolver from "../../../commons/mlResolverDef";
import MlRespPayload from "../../../commons/mlPayload";
import mlTransactionsListRepo from './mlTransactionsListRepo'

MlResolver.MlMutationResolver['createTransaction'] = (obj, args, context, info) => {

  if(!args.transaction.requestTypeId){
    let code = 409;
    let response = new MlRespPayload().errorPayload("Request Type is mandatory!!!!",code);
    return response;
  }
  let requestDetails = MlRequestType.findOne({"_id":args.transaction.requestTypeId})|| {};
  args.transaction.requestTypeName=requestDetails.requestName;
  args.transaction.transactionTypeName=requestDetails.transactionType;
  args.transaction.transactionTypeId=requestDetails.transactionId;
  args.transaction.userId=context.userId;
  orderNumberGenService.assignTransationRequest(args.transaction)
  let transactionDetails=args.transaction
  let id = mlDBController.insert('MlTransactions', args.transaction, context)
  if(id){
    let code = 200;
    let result = {transactionId : id}
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
}

MlResolver.MlMutationResolver['updateTransactionStatus'] = (obj, args, context, info) => {
  var collection = args.collection
  let id = mlDBController.update(collection, {_id:args.transactionId},{status: args.status},  {$set: true},context)
  if(id){
    let code = 200;
    let result = {transactionId : id}
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
}


MlResolver.MlMutationResolver['assignTransaction'] = (obj, args, context, info) => {

  var collection = args.collection
  let transaction = mlDBController.findOne(collection, {"transactionId": args.transactionId}, context)
  //get user details iterate through profiles match with role and get department and update allocation details.
  let user = mlDBController.findOne('users', {_id: args.assignedUserId}, context)
  let userprofiles=user.profile.InternalUprofile.moolyaProfile.userProfiles
  let userProfile = _.find(userprofiles, function (item) {
    return item.isDefault == true
  });
  let roles=userProfile.userRoles
  roleDetails = roles[0]
  let date=new Date();
  let allocation={
    assignee            : user.username,
    assigneeId          : user._id,
    assignedDate        : date,
    department          : roleDetails.departmentName,
    departmentId        : roleDetails.departmentId,
    subDepartment       : roleDetails.subDepartmentName,
    subDepartmentId     : roleDetails.subDepartmentId,
  }
  //find hierarchy
  let hierarchy = mlDBController.findOne('MlHierarchyAssignments', {
    parentDepartment: roleDetails.departmentId,
    parentSubDepartment: roleDetails.subDepartmentId,
    clusterId:userProfile.clusterId
  }, context, {teamStructureAssignment: {$elemMatch: {roleId: roleDetails._id}}})
  //update hierarchy from hierarchy result

  let id =mlDBController.update(collection, {transactionId:args.transactionId},{allocation:allocation,status:"Pending",userId:user._id,hierarchy:"TBD",transactionUpdatedDate:date}, {$set: true},context)
  if(id){
    let code = 200;
    let result = {transactionId : id}
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
}

MlResolver.MlQueryResolver['fetchTransactions']=(obj, args, context, info) => {
  if (args.transactionType) {
    //todo: conditions based on record id for steps like registration,portfolio
    //resolve userType:internal/external and send with response
    let transactionType=args.transactionType;
    let status=args.status
    let userId = context.userId;
    let transactions=mlTransactionsListRepo.fetchTransactions(transactionType,userId,status);
    return transactions;
  }
  return null;
}

MlResolver.MlMutationResolver['createRegistrationTransaction'] = (obj, args, context, info) => {
  let transaction={};
  let transact = MlTransactionTypes.findOne({"_id":args.transactionType})|| {};
  transaction.transactionTypeName=transact.transactionName;
  transaction.transactionTypeId=transact._id;
  transaction.status="Pending";
  orderNumberGenService.assignTransationRequest(transaction)
  let id = mlDBController.insert('MlTransactions',transaction, context)
  if(id){
    let code = 200;
    let result = transaction.requestId
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
}

MlResolver.MlMutationResolver['updateRegistrationTransaction'] = (obj, args, context, info) => {
  let transaction = MlTransactions.findOne({"requestId":args.transactionInfo.requestId})|| {};
  let date=new Date();
 transaction.cluster=args.transactionInfo.cluster;
  transaction.chapter=args.transactionInfo.chapter;
  transaction.transactionUpdatedDate=date.date;
  let id =mlDBController.update('MlTransactions', {requestId:args.transactionInfo.requestId},{'cluster':args.transactionInfo.cluster,'chapter':args.transactionInfo.chapter,'transactionUpdatedDate':date.date}, {$set: true},context)
  if(id){
    let code = 200;
    let result = {transactionId : id}
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
}

MlResolver.MlMutationResolver['selfAssignTransaction'] = (obj, args, context, info) => {
  var collection = args.collection
  let transaction = mlDBController.findOne(collection, {"transactionId": args.transactionId}, context)
  //get user details iterate through profiles match with role and get department and update allocation details.
  let user = mlDBController.findOne('users', {_id: args._id}, context)
  let userprofiles=user.profile.InternalUprofile.moolyaProfile.userProfiles
  let userProfile = _.find(userprofiles, function (item) {
    return item.isDefault == true
  });
  let roles=userProfile.userRoles
  roleDetails = roles[0]
  let date=new Date();
  let allocation={
    assignee            : user.username,
    assigneeId          : user._id,
    assignedDate        : date,
    department          : roleDetails.departmentName,
    departmentId        : roleDetails.departmentId,
    subDepartment       : roleDetails.subDepartmentName,
    subDepartmentId     : roleDetails.subDepartmentId,
  }
  //find hierarchy
  let hierarchy = mlDBController.findOne('MlHierarchyAssignments', {
    parentDepartment: roleDetails.departmentId,
    parentSubDepartment: roleDetails.subDepartmentId,
    clusterId:"All"
  }, context, {teamStructureAssignment: {$elemMatch: {roleId: roleDetails._id}}})

  context.userId = user._id;
  context.browser = 'Registration API'
  context.url="https://moolya.in"
  context.ip="10.0.1.127"
  let id =mlDBController.update(collection, {transactionId:args.transactionId},{allocation:allocation,status:"Pending",userId:user._id,hierarchy:hierarchy._id,transactionUpdatedDate:date}, {$set: true},context)
  if(id){
    let code = 200;
    let result = {transactionId : id}
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
}

MlResolver.MlMutationResolver['unAssignTransaction'] = (obj, args, context, info) => {
  var collection = args.collection
  let transaction = mlDBController.findOne(collection, {"transactionId": args.transactionId}, context)
  let date=new Date();
  let id =mlDBController.update(collection, {transactionId:args.transactionId},{allocation:"",status:"Pending",userId:"",hierarchy:"",transactionUpdatedDate:date}, {$set: true},context)
  if(id){
    let code = 200;
    let result = {transactionId : id}
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
}

MlResolver.MlQueryResolver['fetchTransactionsLog']=(obj, args, context, info) => {
  if (args.userId) {
    let userId = args.userId;
    let transactions=mlDBController.find('MlTransactionsLog',{userId:userId}).fetch();
    return transactions;
  }
  return null;
}

// MlResolver.MlMutationResolver['createTransactionLog'] = (obj, args, context, info) => {
//   let transaction = mlDBController.findOne('MlTransactionsLog', {"userId": context.userId}, context)
//   let date=new Date();
//   let id =mlDBController.update('MlTransactionsLog', {userId:context.userId},{action:args.transaction.action}, {$set: true},context)
//   if(id){
//     let code = 200;
//     let result = {transactionId : id}
//     let response = new MlRespPayload().successPayload(result, code);
//     return response
//   }
// }
