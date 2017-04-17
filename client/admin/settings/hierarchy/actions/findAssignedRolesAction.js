import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findAssignedRolesActionHandler(departmentId,subDepartmentId,type) {
  let did=departmentId
  let subdid = subDepartmentId
  const result = await client.query({
    query: gql`
       query ($hierarchyId:String,$departmentId: String,$subDepartmentId:String,$type:String){
         fetchAssignedRolesHierarchy(hierarchyId:$hierarchyId,departmentId:$departmentId,subDepartmentId:$subDepartmentId,type:$type) {
             _id
             teamStructureAssignment{
                 roleId
                 roleName
                 displayName
                 roleType             
                 isAssigned
                 assignedLevel
                 reportingRole
             }      
         } 
        }
    `,
    variables: {
      hierarchyId:'',
      departmentId:did,
      subDepartmentId:subdid,
      type : type
    },
    forceFetch:true
  })
  const id = result.data.fetchAssignedRolesHierarchy;
  return id
}
