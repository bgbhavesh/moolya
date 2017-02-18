import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver['CreateTransaction'] = (obj, args, context, info) => {
  // TODO : Authorization
  let id = MlTransactions.insert(args);
  if (id) {
    let code = 200;
    let result = {transactionId: id}
    let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
    return response
  }
}
MlResolver.MlMutationResolver['UpdateTransaction'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let updatedResponse= MlTransactions.update(id, {$set: args});

    return updatedResponse
  }

}
MlResolver.MlQueryResolver['FindTransaction'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let response= MlTransactions.findOne({"_id":id});
    return response;
  }

}


