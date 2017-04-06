import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';


MlResolver.MlQueryResolver['fetchMoolyaBasedDepartmentAndSubDepartment'] = (obj, args, context, info) => {
  let list = [];
  let resp = mlDBController.find('MlDepartments', {
    $and: [
      {"depatmentAvailable.cluster": {$in: ["all", args.clusterId]}}
    ]
  }, context).fetch()
  resp.map(function (department) {
    let subDepartments = MlSubDepartments.find({"departmentId": department._id}).fetch();
    subDepartments.map(function (subDepartment) {
      let deptAndSubDepartment = null
      deptAndSubDepartment ={departmentId:department._id,departmentName:department.departmentName,subDepartmentId:subDepartment._id,subDepartmentName:subDepartment.subDepartmentName,isMoolya:department.isMoolya,isActive:department.isActive}
      list.push(deptAndSubDepartment)
    })
  })

  return list;
}
