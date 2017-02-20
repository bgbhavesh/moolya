import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findRoleActionHandler(roleId) {
  let did=roleId
  const result = await client.query({
    query: gql`
    query  ($id: String){
        findRole(id:$id){
          roleName
          displayName
          roleType
          userType
          about
          assignRoles{
            cluster
            chapter
            subChapter
            department
            subDepartment
            isActive
          }
          modules{
            moduleId
            actions{
              actionId
            }
          }
          isActive
      }
      }
    `,
    variables: {
      id:did
    },
    forceFetch:true
  })
  const id = result.data.findRole;
  return id
}
