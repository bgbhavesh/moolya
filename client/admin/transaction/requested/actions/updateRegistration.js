import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateRegistrationActionHandler(registrationDetails) {
  let registrationId = registrationDetails.registrationId;
  const result = await client.mutate({
    mutation: gql`
    mutation  ($registrationId:String,$registrationDetails:registrationInfoInput,$details:RegistrationDetailsInput){
        updateRegistrationInfo(
          registrationId:$registrationId,
          registrationDetails:$registrationDetails,
          details:$details
        ) {
          success
          code
          result
        }
      }
    `,
    variables: {
      registrationId:registrationId,
      registrationDetails:registrationDetails.registrationDetail,
      details:registrationDetails.details
    }
  })
  const id = result.data.updateRegistrationInfo;
  return id
}
