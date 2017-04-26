import gql from 'graphql-tag';
import {client} from '../../core/apolloConnection';

export async function getContactDetails(userId) {
  const result = await client.query({
    query: gql`
    query ($userId: String, $moduleName: String, $actionName: String) {
  fetchAddressBookInfo(userId: $userId, moduleName: $moduleName, actionName: $actionName) {
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
      addressCountry
      addressPinCode
    }
    emailInfo {
      emailIdType
      emailIdTypeName
      emailId
    }
    contactInfo {
      numberType
      numberTypeName
      countryCode
      contactNumber
    }
  }
}`,
    variables: {
      userId:userId,
      moduleName:"PROFILE",
      actionName:"GET"
    },
    forceFetch:true
  })

  const id = result.data.fetchAddressBookInfo;

  return id
}
