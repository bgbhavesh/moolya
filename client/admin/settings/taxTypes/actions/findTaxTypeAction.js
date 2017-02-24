import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findTaxTypeActionHandler(TaxTypeId) {
  let did=TaxTypeId
  const result = await client.query({
    query: gql`
    query  ($id: String){
        FindTax(_id:$id){
         id:_id
        taxName
        taxDisplayName
        isActive
        aboutTax
      }
      }
    `,
    variables: {
      id:did
    },
    forceFetch:true
  })
  const id = result.data.FindTax;
  return id
}
