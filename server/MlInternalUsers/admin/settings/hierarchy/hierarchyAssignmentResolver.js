import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';

MlResolver.MlQueryResolver['fetchAssignedRolesHierarchy'] = (obj, args, context, info) => {
  let response;
  let levelCode = "";
  let department = mlDBController.findOne("MlDepartments", {"_id": args.departmentId}, context)
  if (department && department.isActive) {
    response= mlDBController.findOne('MlHierarchyAssignments', {
      $and: [
        {parentDepartment:args.departmentId},
        {parentSubDepartment:args.subDepartmentId},
        {"teamStructureAssignment.assignedLevel": {$in: [args.type]}}
      ]},context)
     }
     if(response){
       let teamStructureAssignment = response.teamStructureAssignment;
       let filteredSteps = [];
       teamStructureAssignment.map(function (step, key){
         if(step.assignedLevel==args.type){
           filteredSteps.push(step)
         }
       })
       response.teamStructureAssignment = filteredSteps;
       return response;
     }

}

MlResolver.MlQueryResolver['fetchFinalApprovalRole'] = (obj, args, context, info) => {
  let response;
  if (args.departmentId && args.subDepartmentId) {
    let department = mlDBController.findOne("MlDepartments", {"_id": args.departmentId}, context)
    if(department.isSystemDefined){
      response = mlDBController.findOne("MlHierarchyAssignments", {
        "parentDepartment": args.departmentId,
        "parentSubDepartment": args.subDepartmentId,
        "clusterId":"All"
      }, context)
    }else{
      response = mlDBController.findOne("MlHierarchyAssignments", {
        "parentDepartment": args.departmentId,
        "parentSubDepartment": args.subDepartmentId,
        "clusterId":args.clusterId
      }, context)
    }
  }
  return response;
}


MlResolver.MlMutationResolver['updateHierarchyAssignment'] = (obj, args, context, info) => {
  let response ;
  let hierarchy = args.hierarchy;
  if (hierarchy.id!=''&&hierarchy.id!=null) {
    let result =  mlDBController.update('MlHierarchyAssignments',hierarchy.id, hierarchy, {$set:true}, context)
    let code = 200;
    response = new MlRespPayload().successPayload(result, code);
  }else{
    let id = MlHierarchyAssignments.insert({...hierarchy});
    if (id) {
      let code = 200;
      let result = {appovalId: id}
      let response = new MlRespPayload().successPayload(result, code);
      return response
    }
  }
};
