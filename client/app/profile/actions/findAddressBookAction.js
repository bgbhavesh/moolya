/**
 * Created by viswadeep on 2/5/17.
 */
import gql from 'graphql-tag'
import {appClient} from '../../core/appConnection';

export async function findAddressBookActionHandler() {
  const result = await appClient.query({
    query: gql`
    query{
      findAddressBook {
        clusterId
        registrationId
        profileId
        emailInfo {
          emailId
          emailIdType
          emailIdTypeName
        }
        addressInfo {
          addressType
          addressTypeName
          name
          phoneNumber
          addressFlat
          addressLocality
          addressLandmark
          addressArea
          addressCity
          addressState
          addressStateId
          addressCountry
          addressCountryId
          addressPinCode
        }
        contactInfo {
          numberType
          numberTypeName
          countryCode
          contactNumber
        }
      }
    }
    `,
    forceFetch:true
  })
  const id = result.data.findAddressBook;
  return id
}


// {
//   findAddressBook{
//   success,
//     code,
//     result
// }
// }
