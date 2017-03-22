import gql from "graphql-tag";
import {client} from "../../../core/apolloConnection";

export async function updateBackendUserActionHandler(updateUserObject) {
  let userId=updateUserObject.userId;
  let user=updateUserObject.userObject

   const result = await client.mutate({
   mutation: gql`
   mutation  ($userId:String!, $user: userObject!, $moduleName:String, $actionName:String){
   updateUser(
   userId: $userId,
   user: $user,
   moduleName:$moduleName,
   actionName:$actionName
   ){
      success,
      code,
      result
      } 
   }
   `,
   variables: {
     userId,
     user,
     moduleName:"USERS",
     actionName:"UPDATE"
   }
   })
  const id = result.data.updateUser;
  return id
}
