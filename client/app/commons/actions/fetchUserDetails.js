
import gql from 'graphql-tag'
import {appClient} from '../../../app/core/appConnection';

export async function fetchUserDetailsHandler() {
  const result = await appClient.query({
    query: gql`
         query{
        findRegistrationInfoForUser {
       _id
          registrationInfo {
            firstName
            lastName
            contactNumber
            email
            userName
            countryId
            registrationType
          }
        }
      }
        `,
    forceFetch:true
  })

  const user = result.data.findRegistrationInfoForUser;
  return user;
}
