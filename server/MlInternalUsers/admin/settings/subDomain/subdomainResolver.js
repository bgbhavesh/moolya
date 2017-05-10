/**
 * Created by venkatsrinag on 21/4/17.
 */
import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver['createSubDomain'] = (obj, args, context, info) => {
  if(args && args.SubDomainMasterData){
    try{
      let ret = MlSubDomain.insert({...args.SubDomainMasterData})
      if(ret){
        let response = new MlRespPayload().successPayload("Sub Domain Created Successfully", 200);
        return response;
      }
      else{
        let response = new MlRespPayload().errorPayload("Error in Creating Sub Domain", 400);
        return response;
      }
    }
    catch (e){
      let response = new  MlRespPayload().errorPayload(e.message, 401);
      return response;
    }

  }
}

MlResolver.MlMutationResolver['updateSelectedSubDomain'] = (obj, args, context, info) => {
  if(args && args.SubDomainId && args.SubDomainMasterData){
    // try{
      let resp = MlSubDomain.update({_id: args.SubDomainId}, {$set: args.SubDomainMasterData}, {upsert: true})
      if(resp){
        let response = new MlRespPayload().successPayload("Sub Domain Created Successfully", 200);
        return response;
      }
      else{
        let response = new MlRespPayload().errorPayload("Error in Creating Sub Domain", 400);
        return response;
      }
    // }
    // catch (e){
    //   let response = new MlRespPayload().errorPayload(e.message, 400);
    //   return response;
    // }
  }
}

MlResolver.MlQueryResolver['findSubDomain'] = (obj, args, context, info) => {
  if(args && args.SubDomainId){
    return MlSubDomain.findOne({"_id":args.SubDomainId})
  }
}


MlResolver.MlQueryResolver['fetchIndustryDomain'] = (obj, args, context, info) => {
  return MlSubDomain.find({industryId:args.industryId, isActive : true}).fetch();
}
