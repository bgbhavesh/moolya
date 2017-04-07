import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function approvedStatusForUser(registration) {
  let registrationId=registration;
  const result = await client.mutate({
    mutation: gql`
     mutation($moduleName:String!,$actionName:String!,$registrationId:String!){
      ApprovedStatusForUser(moduleName:$moduleName,actionName:$actionName,registrationId:$registrationId) {
          success
          code
          result
        }
      }
    `,
    variables: {
      moduleName:"REGISTRATION",
      actionName:"UPDATE",
      registrationId:registrationId
    }
  })

  const id = result.data.ApprovedStatusForUser;

  return id
}
