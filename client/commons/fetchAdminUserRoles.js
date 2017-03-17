import gql from "graphql-tag";
import {client} from "../admin/core/apolloConnection";

export async function fetchAdminUserRoles(userId) {
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
