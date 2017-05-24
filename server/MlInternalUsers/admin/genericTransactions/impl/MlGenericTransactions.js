
/**
 * Created by muralidhar on 17/05/17.
 */
import MlResolver from "../../../../commons/mlResolverDef";
import MlRespPayload from "../../../../commons/mlPayload";

class MlGenericTransactions{


  assignTransaction(transactionType,transactionId,params) {
    let resp =MlResolver.MlMutationResolver['assignTransaction'] ("", {'params':params,'collection':this.collectionConfig().get(transactionType), 'transactionId':transactionId}, context, "")
    if(resp.success){
      return resp;
    }else{
      let code = 401;
      let result =  {message:"Not available in hierarchy"}
      let response = new MlRespPayload().errorPayload(result, code);
      console.log(response);
      return response;
    }
  }

  unAssignTransaction(transactionType,transactionId){
    let resp =MlResolver.MlMutationResolver['unAssignTransaction']  ("", {'collection':this.collectionConfig().get(transactionType), 'transactionId':transactionId}, context, "")
    if(resp.success){
      return resp;
    }else{
      let code = 401;
      let result =  {message:"Not available in hierarchy"}
      let response = new MlRespPayload().errorPayload(result, code);
      console.log(response);
      res.send(response);
    }
  }

  selfAssignTransaction(transactionType,transactionId){
    let resp = MlResolver.MlMutationResolver['selfAssignTransaction'] ("",{'collection':this.collectionConfig().get(transactionType), 'transactionId':transactionId},context, "");
    if(resp.success){
      return resp;
    }else{
      let code = 401;
      let result =  {message:"Not available in hierarchy"}
      let response = new MlRespPayload().errorPayload(result, code);
      console.log(response);
      res.send(response);
    }
  }

  updateTransactionStatus(transactionType,transactionId,status){
    let resp = MlResolver.MlMutationResolver['updateTransactionStatus'] ("",{'collection':this.collectionConfig().get(transactionType),'transactionId':transactionId,'status':status},context, "");
    if(!resp.success){
      return resp;
    }else{
      let code = 401;
      let result = {message:"Transaction Error"}
      let response = new MlRespPayload().errorPayload(result, code);
      console.log(response);
      res.send(response);
    }
  }

  collectionConfig(){
    let collection = new Map([["Registration", "MlRegistration"], ["Portfolio", "MlPortfolioDetails"],["InternalRequests","MlRequests"]]);
    return collection
  }

}

const mlGenericTransactions = new MlGenericTransactions();
Object.freeze(mlGenericTransactions);

export default mlGenericTransactions;

