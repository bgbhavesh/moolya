import MlResolver from '../mlAdminResolverDef'
import MlRespPayload from '../../../commons/mlPayload'



MlResolver.MlMutationResolver['createRegistration'] = (obj, args, context, info) => {
  console.log(args);

/*  let id = MlSubDepartments.insert({...args.subDepartment});
  if(id){
    let code = 200;
    let result = {subDepartmentId: id}
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }*/
}

