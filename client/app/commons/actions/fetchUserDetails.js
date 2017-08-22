
import gql from 'graphql-tag'
import {appClient} from '../../../app/core/appConnection';

export async function fetchUserDetailsHandler() {
  const result = await appClient.query({
    query: gql`
         query{
        findRegistrationInfoForUser {
       _id
       status
       isAllowRegisterAs
       firstName
       profileImage
       pendingRegId
          registrationInfo {
            firstName
            lastName
            contactNumber
            email
            userName
            countryId
            registrationType
            communityName
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
          portfolioId : _id
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

export async function requestPortfolioForGoLive(resId) {
  let portfoliodetailsId  = resId
  const result = await appClient.mutate({
    mutation: gql`
            mutation  ($portfoliodetailsId: String, ){
                requestForGoLive(portfoliodetailsId:$portfoliodetailsId){
                    success,
                    code,
                    result
                }  
            }
        `,
    variables: {
      portfoliodetailsId
    }
  })
  const response = result.data.requestForGoLive;
  return response
}
