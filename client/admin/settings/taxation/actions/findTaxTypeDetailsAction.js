import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findTaxTypeDetailsActionHandler() {
  const result = await client.query({
    query: gql`
      query{
           FetchTax {
             taxName
             taxDisplayName
             aboutTax
             _id
             isActive
           }
      }
    `,
    forceFetch:true
  })
  const id = result.data.FetchTax;
  return id
}
