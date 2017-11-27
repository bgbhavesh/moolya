import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function addTaxActionHandler(TaxTypeDetails) {
  const taxName = TaxTypeDetails.taxName;
  const taxDisplayName = TaxTypeDetails.taxDisplayName;
  const aboutTax = TaxTypeDetails.aboutTax;
  const isActive = TaxTypeDetails.isActive;
  const taxTypeInfo = { taxName, taxDisplayName, aboutTax };
  const result = await client.mutate({
    mutation: gql`
    mutation ($masterData:MasterSettingsRequest){
        createMasterSetting(moduleName:"MASTER_SETTINGS",actionName:"CREATE",type:TAXTYPE,masterData:$masterData) 
      }
    `,
    variables: {
      masterData: { taxTypeInfo, isActive }
    }
  })
  const id = result.data.createMasterSetting;
  return id
}
