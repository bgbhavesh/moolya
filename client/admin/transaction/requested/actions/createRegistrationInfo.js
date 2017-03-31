import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function createRegistrationInfo(registrationDetails) {
  let registration = {}
  registration = registrationDetails;
  const result = await client.mutate({
    mutation: gql`
    mutation  ($registration: registrationInfoInput!, $moduleName:String!, $actionName:String!){
        createRegistration(
          registration : $registration,
          moduleName:$moduleName,
          actionName:$actionName,
        ) {
          success
          code
          result
        }
      }
    `,
    variables: {
      registration,
      moduleName:"REGISTRATION",
      actionName:"CREATE",
    }
  })
  const id = result.data.createRegistration;
  return id
}
