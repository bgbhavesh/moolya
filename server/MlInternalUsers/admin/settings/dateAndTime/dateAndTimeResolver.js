import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver.updateDateAndTime = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    const id = args._id;
    // let updatedResponse= MlGlobalSettings.update(id, {$set: args.dateAndTime});
    const updatedResponse = mlDBController.update('MlGlobalSettings', id, args.dateAndTime, { $set: true }, context)
    return updatedResponse
  }
}
MlResolver.MlQueryResolver.findDateAndTime = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    const id = args._id;
    // let response= MlGlobalSettings.findOne({"_id":id});
    const response = mlDBController.findOne('MlGlobalSettings', { _id: id }, context)

    return response;
  }
}
MlResolver.MlMutationResolver.createDateAndTime = (obj, args, context, info) => {
  // if(MlGlobalSettings.find({_id:args.dateAndTime._id}).count() > 0){
  if (mlDBController.find('MlGlobalSettings', { _id: args.dateAndTime._id }, context).count() > 0) {
    const code = 409;
    return new MlRespPayload().errorPayload('Already Exist', code);
  }
  // let id = MlGlobalSettings.insert(args.dateAndTime);
  const id = mlDBController.insert('MlGlobalSettings', args.dateAndTime, context)
  if (id) {
    const code = 200;
    const result = { dateAndTimeId: id }
    const response = JSON.stringify(new MlRespPayload().successPayload(result, code));
    return response
  }
}
// MlResolver.MlQueryResolver['fetchDocumentsType'] = (obj, args, context, info) => {
//   let result=MlDocumentTypes.find({isActive:true}).fetch()||[];
//   return result;
// }

MlResolver.MlQueryResolver.findDateFormat = (obj, args, context, info) => {
  // TODO : Authorization
  const response = MlDateFormats.find({}).fetch() || [];
  return response;
}

MlResolver.MlQueryResolver.findTimeFormat = (obj, args, context, info) => {
  // TODO : Authorization
  const response = MlTimeFormats.find({}).fetch() || [];
  return response;
}

MlResolver.MlQueryResolver.findWeekDays = (obj, args, context, info) => {
  // TODO : Authorization
  const response = MlWeekDays.find({}).fetch() || [];
  return response;
}

