import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function addTaxationActionHandler(TaxationDetails)
{
  let taxation=TaxationDetails
  const result = await client.mutate({
    mutation: gql`
        mutation ($taxation:taxationInput){
            createTaxation(
                taxation: $taxation
            ) 
         }
        `,
    variables: {
      taxation
    }
  })
  console.log(result)
  const id = result.data.createTaxation;
  return id
}
