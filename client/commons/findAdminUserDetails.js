
import gql from 'graphql-tag'


export async function findAdminUserDetails(userId, connection) {
  const id = userId
  var connection = connection || {};
  const result = await connection.query({
    query: gql`
        query($id: String){
            data:fetchUserDetails(userId:$id){
                alsoAssignedas,
                displayName,
                userName,
                deActive,
                genderType,
                profileImage
            }
        }
    `,
    variables: {
      id
    },
    forceFetch: true
  })
  const did = result.data.data;
  return did
}
