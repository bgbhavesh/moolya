import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findDeptRolesActionHandler(department,cluster) {
  const result = await client.query({
    query: gql`
       query  ($departmentId: String,$clusterId:String){
         fetchRolesForDepartment(departmentId:$departmentId,clusterId:$clusterId) {
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
      clusterId:cluster
    },
    forceFetch:true
  })
  const id = result.data.fetchRolesForDepartment;
  return id
}
