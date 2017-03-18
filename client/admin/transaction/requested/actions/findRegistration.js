import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findRegistrationActionHandler(registrationId) {
  let regId = registrationId
  const result = await client.query({
    query: gql`
    query($id: String){
        findRegistrationInfo(registrationId:$id){
          userType
          firstName
          lastName
          countryName
          cityName
          email
          registrationType
        	userName
          password
          accountType
          companyName
          companyUrl
          deviceName
          deviceNumber
          ipAddress
          ipLocation    
        }
      }
    `,
    variables: {
      id: regId
    },
    forceFetch: true
  })
  const id = result.data.findRegistrationInfo;
  return id
}
