import MlResolver from "../../../commons/mlResolverDef";
import MlRespPayload from "../../../commons/mlPayload";
import mlTransactionsListRepo from './mlTransactionsListRepo';
import mlHierarchyAssignment from '../../admin/genericTransactions/impl/MlHierarchyAssignment'


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
  args.transaction.transactionCreatedDate= new Date();
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
  var params = args.params;
  let transaction = mlDBController.findOne(collection, {"transactionId": args.transactionId}, context)
  //get user details iterate through profiles match with role and get department and update allocation details.
  let hierarchyDesicion = mlHierarchyAssignment.assignTransaction(args.transactionId,collection,context.userId,params.user)
  if(hierarchyDesicion === true){
    let user = mlDBController.findOne('users', {_id: params.user}, context)

    let date=new Date();
    let allocation={
      assignee            : user.username,
      assigneeId          : user._id,
      assignedDate        : date,
      department          : params.department,
      departmentId        : params.department,
      subDepartment       : params.subDepartment,
      subDepartmentId     : params.subDepartment,
    }
    //find hierarchy
    let hierarchy = mlHierarchyAssignment.findHierarchy(params.cluster,params.department,params.subDepartment,params.role)

    let id =mlDBController.update(collection, {transactionId:args.transactionId},{allocation:allocation,status:"Pending",userId:params.user,hierarchy:hierarchy._id,transactionUpdatedDate:date}, {$set: true},context)
    if(id){
      let code = 200;
      let result = {transactionId : id}
      let response = new MlRespPayload().successPayload(result, code);
      return response
    }
  }else{
    let code = 400;
    let result = {message:"Not available in hierarchy"}
    let response = new MlRespPayload().errorPayload(result, code);
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
  let hierarchyDesicion = mlHierarchyAssignment.canSelfAssignTransaction(args.transactionId,collection,context.userId)
  if(hierarchyDesicion === true) {
    let user = mlDBController.findOne('users', {_id: context.userId}, context)
    let userprofiles = user.profile.InternalUprofile.moolyaProfile.userProfiles
    let userProfile = _.find(userprofiles, function (item) {
      return item.isDefault == true
    });
    let roles = userProfile.userRoles
    roleDetails = roles[0]
    let date = new Date();
    let allocation = {
      assignee: user.username,
      assigneeId: user._id,
      assignedDate: date,
      department: roleDetails.departmentName,
      departmentId: roleDetails.departmentId,
      subDepartment: roleDetails.subDepartmentName,
      subDepartmentId: roleDetails.subDepartmentId,
    }
    //find hierarchy
    let hierarchy = mlHierarchyAssignment.findHierarchy(roleDetails.clusterId, roleDetails.departmentId, roleDetails.subDepartmentId, roleDetails._id)
    let id = mlDBController.update(collection, {transactionId: args.transactionId}, {
      allocation: allocation,
      status: "Pending",
      userId: user._id,
      hierarchy: hierarchy._id,
      transactionUpdatedDate: date
    }, {$set: true}, context)
    if (id) {
      let code = 200;
      let result = {transactionId: id}
      let response = new MlRespPayload().successPayload(result, code);
      return response
    }
  }else{
    let code = 400;
    let result = {message:"Not available in hierarchy"}
    let response = new MlRespPayload().errorPayload(result, code);
    return response
  }
}

MlResolver.MlMutationResolver['unAssignTransaction'] = (obj, args, context, info) => {
  var collection = args.collection
  let transaction = mlDBController.findOne(collection, {"transactionId": args.transactionId}, context)
  let hierarchyDesicion = mlHierarchyAssignment.canUnAssignTransaction(args.transactionId,collection,context.userId)
  if(hierarchyDesicion === true){
    let date=new Date();
    let id =mlDBController.update(collection, {transactionId:args.transactionId},{allocation:"",status:"Pending",userId:"",hierarchy:"",transactionUpdatedDate:date}, {$set: true},context)
    if(id){
      let code = 200;
      let result = {transactionId : id}
      let response = new MlRespPayload().successPayload(result, code);
      return response
    }
  }else{
    let code = 400;
    let result = {message:"Not available in hierarchy"}
    let response = new MlRespPayload().errorPayload(result, code);
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

MlResolver.MlMutationResolver['createTransactionLog'] = (obj, args, context, info) => {
  // let transaction = mlDBController.findOne('MlTransactionsLog', {"userId": args.transactions.userId}, context)
  let date=new Date();
  args.transaction.userAgent = {};
  args.transaction.userAgent.ipAddress = context.ip;
  args.transaction.userAgent.browser = context.browser;
  context.userId = args.transaction.userId;
  let id = mlDBController.insert('MlTransactionsLog', args.transaction ,context)
  if(id){
    let code = 200;
    let result = {transactionId : id}
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
}
