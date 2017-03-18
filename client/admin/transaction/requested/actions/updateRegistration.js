import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateRegistrationActionHandler(registrationDetails) {
  let registrationId = registrationDetails.id;
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
      registrationDetails:registrationDetails.registrationDetail
    }
  })
  const id = result.data.updateRegistration;
  return id
}
