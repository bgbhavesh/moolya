import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver['updateDateAndTime'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let updatedResponse= MlGlobalSettings.update(id, {$set: args.dateAndTime});
    return updatedResponse
  }

}
MlResolver.MlQueryResolver['findDateAndTime'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let response= MlGlobalSettings.findOne({"_id":id});
    return response;
  }

}
MlResolver.MlMutationResolver['createDateAndTime'] = (obj, args, context, info) =>{
  if(MlGlobalSettings.find({_id:args.dateAndTime._id}).count() > 0){
    let code = 409;
    return new MlRespPayload().errorPayload("Already Exist", code);
  }
  let id = MlGlobalSettings.insert(args.dateAndTime);
  if(id){
    let code = 200;
    let result = {dateAndTimeId: id}
    let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
    return response
  }
}
// MlResolver.MlQueryResolver['fetchDocumentsType'] = (obj, args, context, info) => {
//   let result=MlDocumentTypes.find({isActive:true}).fetch()||[];
//   return result;
// }


