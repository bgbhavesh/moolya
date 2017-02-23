import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function addTaxActionHandler(TaxTypeDetails) {
  let taxName = TaxTypeDetails.taxName;
  let taxDisplayName = TaxTypeDetails.taxDisplayName;
  let aboutTax = TaxTypeDetails.aboutTax;
  let isActive = TaxTypeDetails.isActive;
  const result = await client.mutate({
    mutation: gql`
    mutation  ($taxName: String, $taxDisplayName: String, $aboutTax: String,$isActive: Boolean){
        CreateTax(
          taxName: $taxName,
          taxDisplayName: $taxDisplayName,
          aboutTax: $aboutTax,
          isActive :$isActive
        ) 
      }
    `,
    variables: {
      taxName,
      taxDisplayName,
      aboutTax,
      isActive
    }
  })
  const id = result.data.CreateTax;
  return id
}
