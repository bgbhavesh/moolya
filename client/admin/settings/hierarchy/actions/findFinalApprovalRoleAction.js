import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findFinalApprovalRoleActionHandler(department,subDepartment,cluster) {
  const result = await client.query({
    query: gql`
      query  ($departmentId: String,$subDepartmentId:String,$clusterId:String){
         fetchFinalApprovalRole(departmentId:$departmentId,subDepartmentId:$subDepartmentId,clusterId:$clusterId) {
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
  const id = result.data.fetchFinalApprovalRole;
  return id
}
