import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findDeptRolesActionHandler(department) {
  let departmentId=department
  const result = await client.query({
    query: gql`
       query  ($departmentId: String){
         fetchRolesForDepartment(departmentId:$departmentId) {
           _id
           roleName
           displayName
           roleType           
           isActive
            teamStructureAssignment {
              isAssigned
              assignedLevel
              reportingRole
            }
         } 
        }
    `,
    variables: {
      departmentId
    },
    forceFetch:true
  })
  const id = result.data.fetchRolesForDepartment;
  return id
}
