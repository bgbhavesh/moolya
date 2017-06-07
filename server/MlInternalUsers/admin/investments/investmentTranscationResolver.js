/**
 * Created by venkatsrinag on 6/6/17.
 */
import MlResolver from '../../../commons/mlResolverDef'

MlResolver.MlQueryResolver['fetchProcessTranscations'] = (obj, args, context, info) =>{
}

MlResolver.MlQueryResolver['fetchProcessStages'] = (obj, args, context, info) =>{
}

MlResolver.MlQueryResolver['fetchProcessActions'] = (obj, args, context, info) =>{
}

MlResolver.MlQueryResolver['fetchProcessTranscationCustomerDetails'] = (obj, args, context, info) =>{
}

MlResolver.MlQueryResolver['fetchProcessSetup'] = (obj, args, context, info) =>{
}

MlResolver.MlMutationResolver['createProcessTranscation'] = (obj, args, context, info) =>{
    if(args.portfoliodetails){
      try{
        ret = mlDBController.insert('MlProcessTranscations', portfolioDetails, context)
      }catch(e){
        let code = 409;
        let response = new MlRespPayload().errorPayload(e.message, code);
        return response;
      }

    }
}

MlResolver.MlMutationResolver['createProcessSetup'] = (obj, args, context, info) =>{
}

MlResolver.MlMutationResolver['updateProcessTranscation'] = (obj, args, context, info) =>{
}
