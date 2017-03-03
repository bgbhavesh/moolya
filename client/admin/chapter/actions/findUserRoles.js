
import gql from 'graphql-tag'
import {client} from '../../core/apolloConnection';


export async function findUserAssignedRoles(userId) {
  let id=userId
  const result = await client.query({
    query: gql`
    query  ($id: String){
        fetchUserRoles(userId:$id){
          roleId
          clusterId
          chapterId
          validFrom
          validTo
          subChapterId
          communityId
          isActive
          hierarchyLevel
          hierarchyCode
      }
      }
    `,
    variables: {
      id
    },
    forceFetch:true
  })
  const did = result.data.fetchUserRoles;
  return did
}
