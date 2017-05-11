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

  let id = mlDBController.update('MlTransactions', {_id:args.transactionId},{status: args.status},  {$set: true},context)
  if(id){
    let code = 200;
    let result = {transactionId : id}
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
}


MlResolver.MlMutationResolver['assignRegistrationTransaction'] = (obj, args, context, info) => {
  let transaction = MlTransactions.findOne({"requestId":args.transactionId})|| {};
  //find hierarchy
  let hierarchy = mlDBController.findOne('MlHierarchyAssignments', {
    parentDepartment: args.params.department,
    parentSubDepartment: args.params.subDepartment,
    clusterId:args.params.cluster
  }, context, {teamStructureAssignment: {$elemMatch: {roleId: args.params.role}}})
  //update hierarchy from hierarchy result
  transaction.hierarchy=hierarchy._id

  //get user details iterate through profiles match with role and get department and update allocation details.
  let user = mlDBController.findOne('users', {_id: args.params.user}, context)
  let userprofile=user.profile.InternalUprofile.moolyaProfile.userProfiles
  userProfileRoles = _.find(userprofile, function (item) {
    return item.clusterId == args.params.cluster
  });
  let roles=userProfileRoles.userRoles
    roleDetails=_.find(roles, function (item) {
      return item.roleId == args.params.role
    });
  let date=new Date();
  let allocation={
    assignee            : user.username,
    assigneeId          : args.params.user,
    assignedDate        : date.date,
    department          : roleDetails.departmentName,
    departmentId        : roleDetails.departmentId,
    subDepartment       : roleDetails.subDepartmentName,
    subDepartmentId     : roleDetails.subDepartmentId,
  }
  transaction.userId=args.params.user
  transaction.status="Pending"
  transaction.allocation = allocation;
  transaction.transactionUpdatedDate=date.date;
  let id =mlDBController.update('MlTransactions', {_id:args.params.transactionId},{transaction},{multi:true}, {$set: true},context)
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
 /* transaction.cluster=args.transactionInfo.cluster;
  transaction.chapter=args.transactionInfo.chapter;
  transaction.transactionUpdatedDate=date.date;*/
  let id =mlDBController.update('MlTransactions', {requestId:args.transactionInfo.requestId},{'cluster':args.transactionInfo.cluster,'chapter':args.transactionInfo.chapter,'transactionUpdatedDate':date.date}, {$set: true},context)
  if(id){
    let code = 200;
    let result = {transactionId : id}
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
}

MlResolver.MlMutationResolver['selfAssignTransaction'] = (obj, args, context, info) => {
  let transaction = MlTransactions.findOne({"requestId":args.transactionId})|| {};
  //find hierarchy
 /* let hierarchy = mlDBController.findOne('MlHierarchyAssignments', {
    parentDepartment: args.params.department,
    parentSubDepartment: args.params.subDepartment,
    clusterId:args.params.cluster
  }, context, {teamStructureAssignment: {$elemMatch: {roleId: args.params.role}}})
  //update hierarchy from hierarchy result
  transaction.hierarchy=hierarchy._id
*/
  //get user details iterate through profiles match with role and get department and update allocation details.
  let user = mlDBController.findOne('users', {_id: context.userId}, context)
  let userprofile=user.profile.InternalUprofile.moolyaProfile.userProfiles
  userProfileRoles = _.find(userprofile, function (item) {
    return item.clusterId == args.params.cluster
  });
  let roles=userProfileRoles.userRoles
  roleDetails=_.find(roles, function (item) {
    return item.roleId == args.params.role
  });
  let date=new Date();
  let allocation={
    assignee            : user.username,
    assigneeId          : args.params.user,
    assignedDate        : date.date,
    department          : roleDetails.departmentName,
    departmentId        : roleDetails.departmentId,
    subDepartment       : roleDetails.subDepartmentName,
    subDepartmentId     : roleDetails.subDepartmentId,
  }
  transaction.userId=args.params.user
  transaction.status="Pending"
  transaction.allocation = allocation;
  transaction.transactionUpdatedDate=date.date;
  let id =mlDBController.update('MlTransactions', {_id:args.params.transactionId},{transaction},{multi:true}, {$set: true},context)
  if(id){
    let code = 200;
    let result = {transactionId : id}
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
}

MlResolver.MlMutationResolver['unAssignTransaction'] = (obj, args, context, info) => {
  let transaction = MlTransactions.findOne({"requestId":args.transactionId})|| {};
  //find hierarchy
  /* let hierarchy = mlDBController.findOne('MlHierarchyAssignments', {
   parentDepartment: args.params.department,
   parentSubDepartment: args.params.subDepartment,
   clusterId:args.params.cluster
   }, context, {teamStructureAssignment: {$elemMatch: {roleId: args.params.role}}})
   //update hierarchy from hierarchy result
   transaction.hierarchy=hierarchy._id
   */
  //get user details iterate through profiles match with role and get department and update allocation details.
  let user = mlDBController.findOne('users', {_id: context.userId}, context)
  let userprofile=user.profile.InternalUprofile.moolyaProfile.userProfiles
  userProfileRoles = _.find(userprofile, function (item) {
    return item.clusterId == args.params.cluster
  });
  let roles=userProfileRoles.userRoles
  roleDetails=_.find(roles, function (item) {
    return item.roleId == args.params.role
  });
  let date=new Date();
  let allocation={
    assignee            : user.username,
    assigneeId          : args.params.user,
    assignedDate        : date.date,
    department          : roleDetails.departmentName,
    departmentId        : roleDetails.departmentId,
    subDepartment       : roleDetails.subDepartmentName,
    subDepartmentId     : roleDetails.subDepartmentId,
  }
  transaction.userId=args.params.user
  transaction.status="Pending"
  transaction.allocation = allocation;
  transaction.transactionUpdatedDate=date.date;
  let id =mlDBController.update('MlTransactions', {_id:args.params.transactionId},{transaction},{multi:true}, {$set: true},context)
  if(id){
    let code = 200;
    let result = {transactionId : id}
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
}
