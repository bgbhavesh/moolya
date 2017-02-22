import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findRoleActionHandler(roleId) {
  let id=roleId
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
            moduleName
            validFrom
            validTo
            isActive          
            actions{
              actionId
            }
          }
          isActive
      }
      }
    `,
    variables: {
      id
    },
    forceFetch:true
  })
  const did = result.data.findRole;
  return did
}
