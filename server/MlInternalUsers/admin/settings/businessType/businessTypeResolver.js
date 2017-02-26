import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';

MlResolver.MlMutationResolver['CreateBusinessType'] = (obj, args, context, info) => {
  // TODO : Authorization
  let id = MlBusinessType.insert({...args});
  if (id) {
    let code = 200;
    let result = {businessTypeId: id}
    let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
    return response
  }
}

MlResolver.MlMutationResolver['UpdateBusinessType'] = (obj, args, context, info) => {
  // TODO : Authorization
  if (args._id) {
    var id= args._id;
    args=_.omit(args,'_id');
    let updatedResponse = MlBusinessType.update(id, {$set: args});
    return updatedResponse
  }
}

MlResolver.MlQueryResolver['FindBusinessType'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let response = MlBusinessType.findOne({"_id":id});
    return response;
  }
}


