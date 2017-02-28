import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateTaxationActionHandler(TaxationDetails) {
  let id=TaxationDetails.id;
  let taxation=TaxationDetails.taxation;
  const result = await client.mutate({
    mutation: gql`
    mutation  ($id: String, $taxation: taxationInput){
        updateTaxation(
          id:$id,
          taxation: $taxation
          ) 
      }
    `,
    variables: {
      id,
      taxation
    }
  })
  let tid = result;
  return tid
}
