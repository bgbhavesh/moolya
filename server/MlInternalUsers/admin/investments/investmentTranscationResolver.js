/**
 * Created by venkatsrinag on 6/6/17.
 */
import MlResolver from '../../../commons/mlResolverDef'

MlResolver.MlQueryResolver['fetchProcessTransactions'] = (obj, args, context, info) =>{
}

MlResolver.MlQueryResolver['fetchProcessStages'] = (obj, args, context, info) =>{
}

MlResolver.MlQueryResolver['fetchProcessActions'] = (obj, args, context, info) =>{
}

MlResolver.MlQueryResolver['fetchProcessTransactionCustomerDetails'] = (obj, args, context, info) =>{
}

MlResolver.MlQueryResolver['fetchProcessSetup'] = (obj, args, context, info) =>{
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

MlResolver.MlMutationResolver['createProcessSetup'] = (obj, args, context, info) =>{
}

MlResolver.MlMutationResolver['updateProcessTransaction'] = (obj, args, context, info) =>{
}
