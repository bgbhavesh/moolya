import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findNumericalFormatActionHandler(Id)
{
  let did=Id;
  const result = await client.query({
    query: gql`
    query  ($id: String){
        findNumericalFormat(_id:$id){
          _id
          numberOfDigitsAfterDecimal
          measurementSystem
          currencyFormat
          currencySymbol
          valueSeparator
        }
      }
    `,
    variables: {
      id:did
    },
    forceFetch:true
  })
  const id = result.data.findNumericalFormat;
  return id
}
