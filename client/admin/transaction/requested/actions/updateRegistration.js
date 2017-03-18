import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateRegistrationActionHandler(registrationDetails) {
  let registrationId = registrationDetails.registrationId;
  const result = await client.mutate({
    mutation: gql`
    mutation  ($registrationId:String,$registrationDetails:registrationDetails){
        updateRegistrationInfo(
          registrationId:$registrationId,
          registrationDetails:$registrationDetails
        )
      }
    `,
    variables: {
      registrationId:registrationId,
      registrationDetails:registrationDetails
    }
  })
  const id = result.data.updateRegistration;
  return id
}
