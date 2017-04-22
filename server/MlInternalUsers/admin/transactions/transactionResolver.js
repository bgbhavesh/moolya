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

  let transact = MlTransactionTypes.findOne({"_id":"registration"})|| {};
  args.transaction.transactionTypeName=transact.transactionType;
  args.transaction.transactionTypeId=transact.transactionId;
  let transactionDetails=args.transaction
  //find hierarchy
  let hierarchy = mlDBController.find('MlHierarchyAssignments', {
    parentDepartment: args.department,
    parentSubDepartment: args.subDepartment,
    clusterId:args.cluster
  }, context, {teamStructureAssignment: {$elemMatch: {roleId: args.params.role}}}).fetch();
  //update hierarchy from hierarchy result

  //get user details iterate through profiles match with role and get department and update allocation details.
  let user = mlDBController.findOne('users', {_id: args.params.user}, context)

  /*let allocation{
    assignee            : String
    assigneeId          : String
    assignedDate        : Date
    department          : String
    departmentId        : String
    subDepartment       : String
    subDepartmentId     : String
  }*/
  args.transaction.allocation = allocation;

  let id = mlDBController.insert('MlTransactions', args.transaction, context)
  if(id){
    let code = 200;
    let result = {transactionId : id}
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
}

/*MlResolver.MlQueryResolver['fetchTransactions']=(obj, args, context, info) => {
  if (args.transactionType) {
    //todo: conditions based on record id for steps like registration,portfolio
    //resolve userType:internal/external and send with response
    let transactionType=args.process;
    let userId = context.userId;
    let transactions=mlTemplateAssignmentRepo.fetchTransactions(transactionType,userId);
    return transactions;
  }
  return null;
}*/
