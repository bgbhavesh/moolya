import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateTaxTypeActionHandler(TaxType) {
  let _id=TaxType.id;
  let taxName = TaxType.taxName;
  let taxDisplayName = TaxType.taxDisplayName;
  let aboutTax = TaxType.aboutTax;
  let isActive = TaxType.isActive
  const result = await client.mutate({
    mutation: gql`
    mutation  ($_id:String,$taxName: String, $taxDisplayName: String, $aboutTax: String,$isActive: Boolean){
        UpdateTax(
          _id:$_id
          taxName: $taxName,
          taxDisplayName: $taxDisplayName,
          aboutTax: $aboutTax,
          isActive :$isActive
        ) 
      }
    `,
    variables: {
      _id,
      taxName,
      taxDisplayName,
      aboutTax,
      isActive
    }
  })
  const id = result;
  return id
}
