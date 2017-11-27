import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function updateTaxTypeActionHandler(TaxType) {
  const _id = TaxType.id;
  const taxName = TaxType.taxName;
  const taxDisplayName = TaxType.taxDisplayName;
  const aboutTax = TaxType.aboutTax;
  const isActive = TaxType.isActive
  const taxTypeInfo = { taxName, taxDisplayName, aboutTax };
  const result = await client.mutate({
    mutation: gql`
    mutation ($masterData:MasterSettingsRequest){
        updateMasterSetting(moduleName:"MASTER_SETTINGS",actionName:"UPDATE",type:TAXTYPE,masterData:$masterData) 
      }
    `,
    variables: {
      masterData: { taxTypeInfo, isActive, _id }
    }
  })
  const id = result.data.updateMasterSetting;
  return id
}
