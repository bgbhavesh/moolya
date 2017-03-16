import gql from 'graphql-tag'
import {client} from '../../core/apolloConnection';

export async function findAllChapter_Roles(userId, clusterId) {
  const result = await client.query({
    query: gql`
    query ($userId: String, $clusterId: String) {
        fetchChapterBasedRoles(userId: $userId, clusterId: $clusterId) {
          isDefault
          clusterId
          isChapterAdmin
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
  const did = result.data.fetchChapterBasedRoles;
  return did
}

// export async function findRoles(roleIds) {
//   // let ids=userId
//   const result = await client.query({
//     query: gql`
//     query($roleIds: [String]){
//             fetchAllAssignedRoles(roleIds:$roleIds)
//           }
//     `,
//     variables: {
//       roleIds:roleIds
//     },
//     forceFetch:true
//   })
//   const did = result.data.fetchAllAssignedRoles;
//   return did
// }
