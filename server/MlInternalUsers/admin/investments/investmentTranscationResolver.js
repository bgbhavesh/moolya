/**
 * Created by venkatsrinag on 6/6/17.
 */
import MlResolver from '../../../commons/mlResolverDef'
import MlRespPayload from "../../../commons/mlPayload";

MlResolver.MlQueryResolver['fetchProcessTransactions'] = (obj, args, context, info) =>{
}

MlResolver.MlQueryResolver['fetchProcessStages'] = (obj, args, context, info) =>{
}

MlResolver.MlQueryResolver['fetchProcessActions'] = (obj, args, context, info) =>{
}

MlResolver.MlQueryResolver['fetchProcessTransactionCustomerDetails'] = (obj, args, context, info) =>{
}

MlResolver.MlQueryResolver['fetchProcessSetup'] = (obj, args, context, info) =>{
  if(args.processTransactionId){
    let processSetup = mlDBController.findOne('MlProcessSetup', {processTransactionId:args.processTransactionId}, context)
    if(processSetup){
        return processSetup
    }
  }
  return {};
}

MlResolver.MlMutationResolver['createProcessTransaction'] = (obj, args, context, info) =>{
    if(args.portfoliodetails){
      let ret;
      try{
        ret = mlDBController.insert('MlProcessTransactions', args.portfoliodetails, context)
      }catch(e){
        let code = 409;
        let response = new MlRespPayload().errorPayload(e.message, code);
        return response;
      }
      let code = 200;
      let response = new MlRespPayload().successPayload(ret, code);
      return response;

    }
}

MlResolver.MlMutationResolver['updateProcessSetup'] = (obj, args, context, info) =>{
  if(args.processTransactionId){
    let ret;
    let processSetup = mlDBController.findOne('MlProcessSetup', {processTransactionId:args.processTransactionId}, context)

    if(processSetup){
        try{
          ret = mlDBController.update('MlProcessSetup', {processTransactionId:args.processTransactionId}, args.processSetup, {$set:true}, context)
        }catch(e){
          let code = 409;
          let response = new MlRespPayload().errorPayload(e.message, code);
          return response;
        }
    }else{
        try{
          ret = mlDBController.insert('MlProcessSetup', args.processSetup, context)
        }catch(e){
          let code = 409;
          let response = new MlRespPayload().errorPayload(e.message, code);
          return response;
        }
    }

    let code = 200;
    let response = new MlRespPayload().successPayload(ret, code);
    return response;

  }
}

MlResolver.MlMutationResolver['updateProcessTransaction'] = (obj, args, context, info) =>{
}
