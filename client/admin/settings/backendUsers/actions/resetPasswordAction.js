import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function resetPasswordActionHandler(userDetails) {
  let userId=userDetails.userId;
  let password=userDetails.password

  const result = await client.mutate({
    mutation: gql`
   mutation  ($userId:String!, $password: String!, $moduleName:String, $actionName:String){
   resetPassword(
   userId: $userId,
   password: $password,
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
      password,
      moduleName:"USERS",
      actionName:"UPDATE"
    }
  })
  const id = result.data.resetPassword;
  return id
}
