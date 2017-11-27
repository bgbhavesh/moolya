import gql from 'graphql-tag';
import { appClient } from '../../core/appConnection';

export async function approvedStatusForUser(registration) {
  const registrationId = registration;
  const result = await appClient.mutate({
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
      moduleName: 'REGISTRATION',
      actionName: 'UPDATE',
      registrationId
    }
  })

  const id = result.data.ApprovedStatusForUser;

  return id
}
