import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function findAddressTypeActionHandler(Id) {
  const did = Id
  const result = await client.query({
    query: gql`
    query  ($id: String){
        findMasterSetting(_id:$id){
         id:_id
        isActive
        addressTypeInfo{
             addressName
             aboutAddress
             addressDisplayName
        }
      }
      }
    `,
    variables: {
      id: did
    },
    forceFetch: true
  });
  const masterSetting = result.data.findMasterSetting || {};
  const { addressName, aboutAddress, addressDisplayName } = masterSetting.addressTypeInfo || {};
  if (result) {
    return {
      isActive: masterSetting.isActive, addressName, aboutAddress, addressDisplayName
    };
  }
  return {};
}
