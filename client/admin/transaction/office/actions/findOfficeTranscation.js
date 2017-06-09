/**
 * Created by pankaj on 6/6/17.
 */
import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findOfficeTransactionHandler(TransId) {
  const result = await client.query({
    query: gql`
        query ($id: String) {
        findOfficeTransaction(officeTransactionId: $id) {
          success
          code
          result
        }
      }
    `,
    variables: {
      id:TransId
    },
    forceFetch:true
  })
  const id = result.data.findOfficeTransaction;
  return id
}
