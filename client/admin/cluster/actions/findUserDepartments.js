/**
 * Created by venkatasrinag on 20/2/17.
 */
import gql from 'graphql-tag'
import { client } from '../../core/apolloConnection';


export async function findUserDepartmentypeActionHandler(userId, clusterId) {
  const did = userId;
  const clusterid = clusterId;
  const result = await client.query({
    query: gql`
      query ($id: String, $clusterId:String) {
        data: fetchUserDepSubDep(userId: $id, clusterId:$clusterId) 
        {
            department,
            departmentName,
            subDepartment,
            subDepartmentName,
            isAvailiable
        }
      }
    `,
    variables: {
      id: did,
      clusterId: clusterid
    },
    forceFetch: true
  })
  const id = result.data.data;
  return id
}


export async function checkDefaultRole(userId) {
  const result = await client.query({
    query: gql`
      query ($userId: String) {
        checkDefaultRole(userId: $userId) {
            isDefault
            clusterId
            clusterName
            clusterFlag
            userRoles{
              isActive
              clusterId
            }
        }
      }
    `,
    variables: {
      userId
    },
    forceFetch: true
  })
  const id = result.data.checkDefaultRole;
  return id
}

