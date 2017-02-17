import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateBackendUserActionHandler(updateUserObject) {
  let userId=updateUserObject.userId;
  let user=updateUserObject.userObject

   const result = await client.mutate({
   mutation: gql`
   mutation  ($userId:String!, $user: userObject!){
   updateUser(
   userId: $userId,
   user: $user,
   )
   }
   `,
   variables: {
     userId,
     user
   }
   })
  console.log(result)
  const id = result;
  return id
}
