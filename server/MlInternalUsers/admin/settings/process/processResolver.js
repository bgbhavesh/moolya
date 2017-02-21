
import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
/*
MlResolver.MlQueryResolver['fetchProcess'] = (obj, args, context, info) =>{
  return MlProcessMapping.findOne({name});
}*/

MlResolver.MlMutationResolver['createProcess'] = (obj, args, context, info) =>{
    let process = args.process;

    if(MlProcessMapping.find({processId:process.processId}).count() > 0){
        let code = 409;
        return new MlRespPayload().errorPayload("Already Exist", code);
    }
    let id = MlProcessMapping.insert(args.process);
    if(id){
        let code = 200;
        let result = {roleId: id}
        let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
        return response
    }
    return "true";
}
MlResolver.MlQueryResolver['findProcess'] = (obj, args, context, info) => {  // TODO : Authorization

  if (args.id) {
    var id= args.id;
    let response= MlProcessMapping.findOne({"_id":id});
    return response;
  }

}

MlResolver.MlMutationResolver['updateProcess'] = (obj, args, context, info) => {
  // TODO : Authorization
  if (args.id) {
    var id= args.id;
    let updatedResponse= MlProcessMapping.update(id, {$set: args.process});
    return updatedResponses
  }

}
