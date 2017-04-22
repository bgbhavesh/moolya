/**
 * Created by venkatsrinag on 21/4/17.
 */
import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver['createTechnology'] = (obj, args, context, info) => {
  if(args && args.technologyMasterData){
    try{
      let ret = MlTechnologies.insert({...args.technologyMasterData})
      if(ret){
        let response = new MlRespPayload().successPayload("Technology Created Successfully", 200);
        return response;
      }
      else{
        let response = MlRespPayload.errorPayload("Error in Creating an Asset", 400);
        return response;
      }
    }
    catch (e){
      let response = MlRespPayload.errorPayload(e.message, 400);
      return response;
    }

  }
}

MlResolver.MlMutationResolver['updateSelectedTechnology'] = (obj, args, context, info) => {
  if(args && args.technologyId && args.technologyMasterData){
    try{
      let resp = MlTechnologies.update({_id: args.technologyId}, {$set: args.technologyMasterData}, {upsert: true})
      if(resp){
        let response = new MlRespPayload().successPayload("Asset Created Successfully", 200);
        return response;
      }
      else{
        let response = new MlRespPayload.errorPayload("Error in Creating an Asset", 400);
        return response;
      }
    }
    catch (e){
      let response = new MlRespPayload.errorPayload(e.message, 400);
      return response;
    }
  }
}

MlResolver.MlQueryResolver['findTechnology'] = (obj, args, context, info) => {
  if(args && args.technologyId){
    return MlTechnologies.findOne({"_id":args.technologyId})
  }
}
