/**
 * Created by vishwadeep on 6/6/17.
 */

import MlResolver from "../../../commons/mlResolverDef";
import MlRespPayload from "../../../commons/mlPayload";

MlResolver.MlMutationResolver['createOfficeTransaction'] = (obj, args, context, info) => {
  var ret = "";
  try {
    if (args.officeTransaction) {
      let officeTransaction = args.officeTransaction;
      officeTransaction['userId'] = context.userId;
      officeTransaction['dateTime']= new Date()
      orderNumberGenService.assignOfficeTransaction(args.officeTransaction)
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
