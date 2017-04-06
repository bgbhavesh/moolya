import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findDeptRolesActionHandler(departmentId) {
  let did=departmentId
  const result = await client.query({
    query: gql`
       query  ($departmentId: String){
         fetchRolesForDepartment(departmentId:$departmentId) {
           _id
           roleName
           displayName
           roleType           
           isActive
         } 
        }
    `,
    variables: {
      $departmentId:did
    },
    forceFetch:true
  })
  const id = result.data.fetchRolesForDepartment;
  return id
}
