
import gql from 'graphql-tag'
import {client} from '../admin/core/apolloConnection';


export async function findAdminUserDetails(userId) {
  let id=userId
  const result = await client.query({
    query: gql`
        query($id: String){
            data:fetchUserDetails(userId:$id){
                alsoAssignedas,
                displayName,
                userName,
                deActive
            }
        }
    `,
    variables: {
      id
    },
    forceFetch:true
  })
  const did = result.data.data;
  return did
}
