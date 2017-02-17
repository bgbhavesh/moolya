import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'

MlResolver.MlMutationResolver['createDepartment'] = (obj, args, context, info) => {
    if(MlDepartments.find({departmentName:args.department.departmentName}).count() > 0){
        let code = 409;
        return new MlRespPayload().errorPayload("Already Exist", code);
    }
    let id = MlDepartments.insert(args.department);
    if(id){
        let code = 200;
        let result = {clusterid: id}
        let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
        return response
    }
}

MlResolver.MlMutationResolver['updateDepartment'] = (obj, args, context, info) => {
    console.log(args)
    let department = MlDepartments.findOne({_id: args.departmentId});
    if(department)
    {
        for(key in args.department){
            cluster[key] = args.department[key]
        }
        let resp = MlDepartments.update({_id:args.departmentId}, {$set:department}, {upsert:true})
        if(resp){
            let code = 200;
            let result = {cluster: resp}
            let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
            return response
        }
    }

}

MlResolver.MlQueryResolver['fetchDepartments'] = (obj, args, context, info) => {
  let result=MlDepartments.find({isActive:true}).fetch()||[];
  return result;
}

MlResolver.MlQueryResolver['findDepartment'] = (obj, args, context, info) => {
  let resp = MlDepartments.findOne({_id: args.departmentId});
  return resp;
  // if(resp){
  //     let code = 200;
  //     let result = {department: resp}
  //     let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
  //     return response
  // }
}

MlResolver.MlQueryResolver['findDepartments'] = (obj, args, context, info) => {

}

