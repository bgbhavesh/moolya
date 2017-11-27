import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function addAddressTypeActionHandler(addressDetails) {
  const addressName = addressDetails.addressName || null;
  const addressDisplayName = addressDetails.addressDisplayName || null;
  const aboutAddress = addressDetails.aboutAddress || null;
  const addressUploadIcon = addressDetails.addressUploadIcon || null;
  const isActive = addressDetails.isActive;
  const addressTypeInfo = {
    addressName, addressDisplayName, aboutAddress, addressUploadIcon
  };
  const result = await client.mutate({
    mutation: gql`
    mutation ($masterData:MasterSettingsRequest){
        createMasterSetting(moduleName:"MASTERSETTINGS",actionName:"CREATE",type:ADDRESSTYPE,masterData:$masterData) 
      }
    `,
    variables: {
      masterData: { addressTypeInfo, isActive }
    }
  })
  const id = result.data.createMasterSetting;
  return id
}
