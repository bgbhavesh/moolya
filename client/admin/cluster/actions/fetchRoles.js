
import gql from 'graphql-tag'
import {client} from '../../core/apolloConnection';


export async function findRoles(roleIds) {
  // let ids=userId
  const result = await client.query({
    query: gql`
    query($roleIds: [String]){
            fetchAllAssignedRoles(roleIds:$roleIds)
          }
    `,
    variables: {
      roleIds:roleIds
    },
    forceFetch:true
  })
  const did = result.data.fetchAllAssignedRoles;
  return did
}
