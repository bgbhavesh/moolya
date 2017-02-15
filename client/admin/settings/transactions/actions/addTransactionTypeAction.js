import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function addTransactionActionHandler(TransactionDetails) {
  let transactionName = TransactionDetails.transactionName;
  let transactionDisplayName = TransactionDetails.transactionDisplayName;
  let transactionDescription = TransactionDetails.transactionDescription;
  let isActive = TransactionDetails.isActive;
  const result = await client.mutate({
    mutation: gql`
    mutation  ($transactionName: String, $transactionDisplayName: String, $transactionDescription: String,$isActive: Boolean){
        CreateTransaction(
          transactionName: $transactionName,
          transactionDisplayName: $transactionDisplayName,
         transactionDescription: $transactionDescription,
          isActive :$isActive
        ) 
      }
    `,
    variables: {
      transactionName,
      transactionDisplayName,
      transactionDescription,
      isActive
    }
  })
  const id = result.data.CreateTransaction;
  return id
}
