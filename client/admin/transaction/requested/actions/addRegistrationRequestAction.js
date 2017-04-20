import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function addReqgistrationRequestInfo(requestDetails) {
  let transaction = {}
  transaction = requestDetails;
  const result = await client.mutate({
    mutation: gql`
      mutation($transaction:TransactionsInput){
          createTransaction(transaction:$transaction) {
            success
            code
            result
          }
          
        }
    `,
    variables: {
      transaction
    }
  })
  const id = result.data.createTransaction;
  return id
}
