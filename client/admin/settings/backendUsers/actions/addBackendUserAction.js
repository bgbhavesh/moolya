import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function addBackendUserActionHandler(userObjectDetails) {
let user=userObjectDetails
  const result = await client.mutate({
    mutation: gql`
       mutation  ($user: userObject!, $moduleName:String, $actionName:String){
        createUser(          
          user :$user,
          moduleName:$moduleName,
          actionName:$actionName
        )
      }
    `,
    variables: {
      user,
      moduleName:"USERS",
      actionName:"CREATE"
    }
  })
  const id = result.data.createUser;
  return id
}
