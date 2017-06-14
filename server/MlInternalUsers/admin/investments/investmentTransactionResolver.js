/**
 * Created by venkatsrinag on 6/6/17.
 */
import MlResolver from "../../../commons/mlResolverDef";
import MlRespPayload from "../../../commons/mlPayload";

MlResolver.MlQueryResolver['fetchProcessTransactions'] = (obj, args, context, info) =>{
}

MlResolver.MlQueryResolver['fetchProcessStages'] = (obj, args, context, info) =>{
    let processStage = mlDBController.find('MlProcessStages', {isActive:true}, context).fetch()
    if(processStage){
      return processStage
    }
  return {};
}

MlResolver.MlQueryResolver['fetchProcessActions'] = (obj, args, context, info) =>{
  let result = mlDBController.find('MlActions', {isActive: true}).fetch() || []
  return result
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

MlResolver.MlQueryResolver['fetchUserProcessSetup'] = (obj, args, context, info) => {
  if (context.userId) {
    console.log('server hit')
    let processSetup = mlDBController.findOne('MlProcessSetup', {userId: context.userId}, context)
    if (processSetup) {
      return processSetup
    }
  }
  return {};
}

MlResolver.MlMutationResolver['createProcessTransaction'] = (obj, args, context, info) =>{
    if(args.portfoliodetails){
      let ret;
      try{
        orderNumberGenService.assignProcessSetupTransaction(args.portfoliodetails)
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
          var process = mlDBController.findOne('MlProcessTransactions', {_id:args.processTransactionId}, context)
          var users = mlDBController.findOne('users', {_id:process.userId}, context)
          if(users)
          args.processSetup.username = users.username;

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
  var ret='';
  try{
    if(!args.processTransactions){
      let code = 400;
      let response = new MlRespPayload().successPayload("Invalid Request", code);
      return response;
    }
    let deviceDetails = {
      ipAddress : context.ip,
      deviceName : context.browser
    }
    args.processTransactions.deviceDetails = deviceDetails;
    ret = mlDBController.update('MlProcessTransactions', {_id:args.processTransactionId}, args.processTransactions, {$set:true}, context)
    if(!ret) {
      let code = 200;
      let response = new MlRespPayload().errorPayload('Error', code);
      return response;
    }
  }catch(e){
    let code = 400;
    let response = new MlRespPayload().errorPayload(e.message, code);
    return response;
  }
  let code = 200;
  let response = new MlRespPayload().successPayload('Payment link generated successfully'+ret, code);
  return response;
}
