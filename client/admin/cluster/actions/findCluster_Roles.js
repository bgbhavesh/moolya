
import gql from 'graphql-tag'
import {client} from '../../core/apolloConnection';


export async function findCluster_Roles(userId, clusterId) {
  // let id=userId
  const result = await client.query({
    query: gql`
    query ($userId: String, $clusterId: String) {
        fetchClusterBasedRoles(userId: $userId, clusterId: $clusterId) {
          isDefault
          clusterId
          userRoles {
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
            roleName
          }
        }
      }
    `,
    variables: {
      userId:userId,
      clusterId:clusterId
    },
    forceFetch:true
  })
  const did = result.data.fetchClusterBasedRoles;
  return did
}
