import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';
import  _ from 'lodash'

export async function findFinalApprovalRoleActionHandler(department,subDepartment,cluster) {
  const result = await client.query({
    query: gql`
      query  ($departmentId: String,$subDepartmentId:String,$clusterId:String){
         fetchFinalApprovalRole(departmentId:$departmentId,subDepartmentId:$subDepartmentId,clusterId:$clusterId) {
          _id
          finalApproval{
            department
            subDepartment
            role
            isChecked
          }
         } 
        }
    `,
    variables: {
      departmentId:department,
      subDepartmentId:subDepartment,
      clusterId:cluster
    },
    forceFetch:true
  })
  var id = result.data.fetchFinalApprovalRole;
  var data = _.omit(id, '__typename')
  data.finalApproval = _.omit(data.finalApproval, '__typename')
  return data
}
