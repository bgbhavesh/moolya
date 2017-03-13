import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'

MlResolver.MlMutationResolver['createDepartment'] = (obj, args, context, info) => {
   /* let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
    if(!isValidAuth)
      return "Not Authorized"
*/
    let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
    if (!isValidAuth) {
      let code = 401;
      let response = new MlRespPayload().errorPayload("Not Authorized", code);
      return response;
    }
   /* if(MlDepartments.find({departmentName:args.department.departmentName}).count() > 0){
        let code = 409;
        return new MlRespPayload().errorPayload("Already Exist", code);
    }*/
    //MlDepartments.find( { $and: [ { depatmentAvailable.cluster : { $in: 1.99 } }, { price: { $exists: true } } ] } )

  if(args.department && args.department.depatmentAvailable){
    for(var i=0; i < args.department.depatmentAvailable.length; i++){
      var departmentExist =  MlDepartments.find( {
        $and : [
          { departmentName:args.department.departmentName },
          {"depatmentAvailable.cluster" :  {$in : ["all",args.department.depatmentAvailable[i].cluster]}},
          { "depatmentAvailable":{
            $elemMatch: {
              chapter: args.department.depatmentAvailable[i].chapter,
              subChapter:args.department.depatmentAvailable[i].subChapter,
            }} },
        ]
      } ).fetch()
     /* console.log("///////////////////////////");
      console.log(departmentExist);*/
      if(departmentExist.length>0){
        let code = 409;
        let response = new MlRespPayload().errorPayload("Already Exists!!!!", code);
        return response;
      }
    }
  }

    let id = MlDepartments.insert({...args.department});
    if(id){
        let code = 200;
        let result = {clusterid: id}
        let response = new MlRespPayload().successPayload(result, code);
        return response
    }
}

MlResolver.MlMutationResolver['updateDepartment'] = (obj, args, context, info) => {
    let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
    if (!isValidAuth) {
      let code = 401;
      let response = new MlRespPayload().errorPayload("Not Authorized", code);
      return response;
    }
    if(args.departmentId){
      let department = MlDepartments.findOne({_id: args.departmentId});
      let deactivate = args.department.isActive;
      if(department)
      {
        if(department.isSystemDefined){
          let code = 409;
          let response = new MlRespPayload().errorPayload("Cannot edit system defined department", code);
          return response;
        }else{
          let resp = MlDepartments.update({_id:args.departmentId}, {$set:args.department}, {upsert:true})
          //de-activate department should de-activate all subDepartments
          if(!deactivate){
            let subDepartments = MlSubDepartments.find({"departmentId": args.departmentId}).fetch();
            subDepartments.map(function (subDepartment) {
              subDepartment.isActive=false
              let deactivate = MlSubDepartments.update({_id:subDepartment._id}, {$set:subDepartment}, {upsert:true})
            })
          }
          if(resp){
            let code = 200;
            let result = {cluster: resp}
            let response = new MlRespPayload().successPayload(result, code);
            return response
          }
        }
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

MlResolver.MlQueryResolver['fetchActiveDepartment'] = (obj, args, context, info) => {
  let resp = MlDepartments.find({"isActive":true}).fetch();
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

MlResolver.MlQueryResolver['fetchMoolyaBasedDepartment'] = (obj, args, context, info) => {
  let resp = MlDepartments.find({isMoolya: args.isMoolya,isActive : true}).fetch();
  return resp;
}

MlResolver.MlQueryResolver['fetchNonMoolyaBasedDepartment'] = (obj, args, context, info) => {
  let resp = MlDepartments.find({isMoolya: args.isMoolya,isActive : true},{ depatmentAvailable: { $elemMatch: { subChapter: args.subChapter } }} ).fetch();
  return resp;
}
