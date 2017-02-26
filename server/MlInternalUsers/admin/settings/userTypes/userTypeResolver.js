import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';

MlResolver.MlMutationResolver['UpdateUserType'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
     args=_.omit(args,'_id');
    let updatedResponse= MlUserTypes.update(id, {$set: args});
    return updatedResponse
  }

}
MlResolver.MlQueryResolver['FindUserType'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let response= MlUserTypes.findOne({"_id":id});
    return response;
  }

}


