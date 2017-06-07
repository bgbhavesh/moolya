/**
 * Created by vishwadeep on 6/6/17.
 */

import MlResolver from "../../../commons/mlResolverDef";
import MlRespPayload from "../../../commons/mlPayload";

MlResolver.MlMutationResolver['createOfficeTransaction'] = (obj, args, context, info) => {
  var ret = "";
  try {
    if (args.myOffice) {
      let officeTransaction = args.officeTransaction;
      officeTransaction['userId'] = context.userId;
      ret = mlDBController.insert('MlOfficeTransaction', officeTransaction, context)
      if (!ret) {
        let code = 400;
        let response = new MlRespPayload().successPayload("Failed To Create Office Transaction", code);
        return response;
      }
    }
  }
  catch (e) {
    let code = 400;
    let response = new MlRespPayload().successPayload(e.message, code);
    return response;
  }

  let code = 200;
  let response = new MlRespPayload().successPayload(ret, code);
  return response;
}

MlResolver.MlQueryResolver['findOfficeTransaction'] = (obj, args, context, info) => {
  if(!args.officeTransactionId){
    let code = 400;
    let response = new MlRespPayload().successPayload("Office transaction id is required", code);
    return response;
  }
  let pipeline = [
    {'$match':{_id:args.officeTransactionId}},
    {'$project' : { trans: '$$ROOT'}},
    {'$lookup':{ from: 'users', localField: 'trans.userId', foreignField: '_id', as: 'user'}},
    {'$unwind':'$user'},
    {'$project':{ trans:1, user: { name : '$user.profile.displayName', email : '$user.username', mobile : '$user.profile.mobileNumber' } }},
    {'$lookup':{ from: 'mlMyOffice', localField: 'trans.officeId', foreignField: '_id', as: 'office'}},
    {'$unwind':'$office'}
  ];
  let result = mlDBController.aggregate('MlOfficeTransaction', pipeline);
  let code = 200;
  let response = new MlRespPayload().successPayload(result, code);
  return response;
}
