import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'

MlResolver.MlMutationResolver.createRegional = (obj, args, context, info) => {
  if (MlGlobalSettings.find({ regionalCurrencyName: args.regional.regionalCurrencyName }).count() > 0) {
    const code = 409;
    return new MlRespPayload().errorPayload('Already Exist', code);
  }
  const id = MlGlobalSettings.insert({ ...args.regional });
  if (id) {
    const code = 200;
    const result = { regionalId: id }
    const response = JSON.stringify(new MlRespPayload().successPayload(result, code));
    return response
  }
}
//
MlResolver.MlMutationResolver.updateRegional = (obj, args, context, info) => {
  const regional = MlGlobalSettings.findOne({ _id: args._id });
  if (regional) {
    /* for(key in args.department){
     cluster[key] = args.department[key]
     } */
    const resp = MlGlobalSettings.update({ _id: args._id }, { $set: args.regional }, { upsert: true })
    if (resp) {
      const code = 200;
      const result = { regional: resp }
      const response = JSON.stringify(new MlRespPayload().successPayload(result, code));
      return response
    }
  }
}
//
// MlResolver.MlQueryResolver['fetchDepartments'] = (obj, args, context, info) => {
//   let result=MlDepartments.find({isActive:true}).fetch()||[];
//   return result;
// }
//
MlResolver.MlQueryResolver.fetchRegional = (obj, args, context, info) => {
  const resp = MlGlobalSettings.findOne({ _id: args._id });
  return resp;
  if (resp) {
    const code = 200;
    const result = { regional: resp }
    const response = JSON.stringify(new MlRespPayload().successPayload(result, code));
    return response
  }
}
