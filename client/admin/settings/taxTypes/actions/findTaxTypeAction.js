import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function findTaxTypeActionHandler(TaxTypeId) {
  const did = TaxTypeId
  const result = await client.query({
    query: gql`
    query  ($id: String){
        findMasterSetting(_id:$id){
         id:_id
        isActive
         taxTypeInfo {
                 taxName
                 aboutTax
                 taxDisplayName
               }
      }
      }
    `,
    variables: {
      id: did
    },
    forceFetch: true
  })
  const masterSetting = result.data.findMasterSetting || {};
  const { taxName, aboutTax, taxDisplayName } = masterSetting.taxTypeInfo || {};
  if (result) {
    return {
      isActive: masterSetting.isActive, taxName, aboutTax, taxDisplayName
    };
  }
  return {};
}
