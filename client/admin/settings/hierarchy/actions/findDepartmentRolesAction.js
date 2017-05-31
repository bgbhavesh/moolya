import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findDeptRolesActionHandler(department,subDepartmentId,cluster) {
  const result = await client.query({
    query: gql`
       query  ($departmentId: String,$subDepartmentId: String,$clusterId:String){
         fetchRolesForDepartment(departmentId:$departmentId,subDepartmentId:$subDepartmentId,clusterId:$clusterId) {
           _id
           roleName
           displayName
           roleType           
           isActive     
           isHierarchyAssigned       
         } 
        }
    `,
    variables: {
      departmentId:department,
      subDepartmentId:subDepartmentId,
      clusterId:cluster
    },
    forceFetch:true
  })
  const id = result.data.fetchRolesForDepartment;
  return id
}
