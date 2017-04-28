/**
 * Created by rajatshekhar on 27/4/17.
 */
import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver['createFundingType'] = (obj, args, context, info) => {
  if(args && args.fundingType){
    try{
      let ret = MlFundingTypes.insert({...args.fundingType})
      if(ret){
        let response = new MlRespPayload().successPayload("Funding Type Created Successfully", 200);
        return response;
      }
      else{
        let response = new MlRespPayload().errorPayload("Error in Creating an Asset", 400);
        return response;
      }
    }
    catch (e){
      let response = new  MlRespPayload().errorPayload(e.message, 400);
      return response;
    }

  }
}

MlResolver.MlMutationResolver['updateFundingType'] = (obj, args, context, info) => {
  if(args && args.fundingTypeId && args.fundingType){
    try{
      let resp = MlFundingTypes.update({_id: args.fundingTypeId}, {$set: args.fundingType}, {upsert: true})
      if(resp){
        let response = new MlRespPayload().successPayload("Asset Created Successfully", 200);
        return response;
      }
      else{
        let response = new MlRespPayload().errorPayload("Error in Creating an Asset", 400);
        return response;
      }
    }
    catch (e){
      let response = new MlRespPayload().errorPayload(e.message, 400);
      return response;
    }
  }
}

MlResolver.MlQueryResolver['fetchFundingType'] = (obj, args, context, info) => {
  if(args && args.fundingTypeId){
    return MlFundingTypes.findOne({"_id":args.fundingTypeId})
  }
}


MlResolver.MlQueryResolver['fetchFundingTypes'] = (obj, args, context, info) => {
  return MlFundingTypes.find({isActive : true}).fetch();
}
