import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function addNumericalFormatActionHandler(Details)
{
  const result = await client.mutate({
    mutation: gql`
        mutation ($numericalFormat:numericalFormatObject){
            createNumericalFormat(
                numericalFormat: $numericalFormat
            ) 
         }
        `,
    variables: {
      numericalFormat: Details
    }
  })
  console.log(result)
  const id = result.data.createNumericalFormat;
  return id
}
