import MlResolver from "../mlAdminResolverDef";
import MlRespPayload from "../../../commons/mlPayload";


MlResolver.MlMutationResolver['createTransaction'] = (obj, args, context, info) => {

  if(!args.transaction.requestTypeId){
    let code = 409;
    let response = new MlRespPayload().errorPayload("Registration Type is mandatory!!!!",code);
    return response;
  }
  let requestDetails = MlRequestType.findOne({"_id":args.transaction.requestTypeId})|| {};
  args.transaction.requestTypeName=requestDetails.requestName;
  args.transaction.transactionTypeName=requestDetails.transactionType;
  args.transaction.transactionTypeId=requestDetails.transactionId;
  let transactionDetails=args.transaction
  let id = mlDBController.insert('MlTransactions', args.transaction, context)
  if(id){
    let code = 200;
    let result = {transactionId : id}
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
}

MlResolver.MlMutationResolver['createRegistrationTransaction'] = (obj, args, context, info) => {
    let transaction={};
  let transact = MlTransactionTypes.findOne({"_id":"registration"})|| {};
  transaction.transactionTypeName=transact.transactionName;
  transaction.transactionTypeId=transact._id;
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
  transaction.allocation = allocation;

  let id = mlDBController.insert('MlTransactions',transaction, context)
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
    let transactionType=args.process;
    let userId = context.userId;
    let transactions=mlTransactionsListRepo.fetchTransactions(transactionType,userId);
    return transactions;
  }
  return null;
}
