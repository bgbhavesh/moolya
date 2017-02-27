import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';

MlResolver.MlMutationResolver['createTaxation'] = (obj, args, context, info) => {
  // TODO : Authorization
  let id = MlTaxation.insert({...args.taxation});
  if (id) {
    let code = 200;
    let result = {taxationId: id}
    let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
    return response
  }
}

MlResolver.MlMutationResolver['updateTaxation'] = (obj, args, context, info) => {
  // TODO : Authorization
  if (args.id) {
    var id= args.id;
    args=_.omit(args,'_id');
    let updatedResponse = MlTaxation.update(id, {$set: args.taxation});
    return updatedResponse
  }
}

MlResolver.MlQueryResolver['fetchTaxation'] = (obj, args, context, info) => {
  // TODO : Authorization
  if (args._id) {
    var id= args._id;
    let response = MlTaxation.findOne({"_id":id});
    return response;
  }
}


