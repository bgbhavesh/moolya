
import gql from 'graphql-tag'
import {appClient} from '../../../app/core/appConnection';

export async function fetchUserDetailsHandler() {
  const result = await appClient.query({
    query: gql`
         query{
        findRegistrationInfoForUser {
       _id
       status
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

export async function fetchPortfolioDetails() {
  const result = await appClient.query({
    query: gql`
         query{
        fetchPortfolioDetailsByUserId {
          _id
          communityType
          communityCode
        }
      }
        `,
    forceFetch:true
  })

  const user = result.data.fetchPortfolioDetailsByUserId;
  return user;
}
