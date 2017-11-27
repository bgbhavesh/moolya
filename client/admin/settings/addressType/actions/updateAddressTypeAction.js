import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function updateAddressTypeActionHandler(Details) {
  const _id = Details.id;
  const addressName = Details.addressName || null;
  const aboutAddress = Details.aboutAddress || null;
  const addressDisplayName = Details.addressDisplayName || null;
  const isActive = Details.isActive;
  const addressTypeInfo = { addressName, aboutAddress, addressDisplayName };
  const result = await client.mutate({
    mutation: gql`
    mutation ($masterData:MasterSettingsRequest){
        updateMasterSetting(moduleName:"MASTER_SETTINGS",actionName:"UPDATE",type:ADDRESSTYPE, masterData:$masterData) 
      }
    `,
    variables: {
      masterData: { addressTypeInfo, isActive, _id }
    }
  })
  const id = result.data.updateMasterSetting;
  return id
}
