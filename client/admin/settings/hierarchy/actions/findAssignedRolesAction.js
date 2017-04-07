import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findAssignedRolesActionHandler(departmentId,type) {
  let did=departmentId
  const result = await client.query({
    query: gql`
        query ($departmentId: String,$type:String){
         fetchAssignedRoles(departmentId:$departmentId,type:$type) {
             _id
             roleName
             displayName
             roleType
             teamStructureAssignment{
                isAssigned
                assignedLevel
                reportingRole
             }      
         } 
        }
    `,
    variables: {
      $departmentId:did,
      type : type
    },
    forceFetch:true
  })
  const id = result.data.fetchRolesForDepartment;
  return id
}
