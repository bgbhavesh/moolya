import gql from "graphql-tag";
import {client} from "../../core/apolloConnection";

export async function findAll_Roles(userId) {
  const result = await client.query({
    query: gql`
    query ($userId: String) {
        fetchUserRoles(userId: $userId) {
          roleId
          roleName
          isChapterAdmin
          validFrom
          validTo
          isActive
          clusterId
          chapterId
          subChapterId
          communityId
          
          departmentId
          departmentName
          subDepartmentId
          subDepartmentName
        }
      }
    `,
    variables: {
      userId: userId
    },
    forceFetch: true
  })
  const did = result.data.fetchUserRoles;
  return did
}


// query ($userId: String, $clusterId: String) {
//   fetchChapterBasedRoles(userId: $userId, clusterId: $clusterId) {
//     isDefault
//     clusterId
//     isChapterAdmin
//     userRoles {
//       roleId
//       clusterId
//       chapterId
//       validFrom
//       validTo
//       subChapterId
//       communityId
//       isActive
//       hierarchyLevel
//       hierarchyCode
//       roleName
//     }
//   }
// }

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
