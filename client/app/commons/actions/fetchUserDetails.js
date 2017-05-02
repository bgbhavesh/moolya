
import gql from 'graphql-tag'
import {appClient} from '../../../app/core/appConnection';

export async function fetchUserDetailsHandler() {
  const result = await appClient.query({
    query: gql`
         query{
        findRegistrationInfoForUser {
          registrationInfo {
            firstName
            lastName
            contactNumber
            email
            userName
          }
        }
      }
        `,
    forceFetch:true
  })

  const user = result.data.findRegistrationInfoForUser;
  return user;
}
