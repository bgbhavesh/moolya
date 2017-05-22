import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateTransactionLogActionHandler() {
  pid = pid;
  const result = await client.mutate({
    mutation: gql`
  mutation ($transaction: TransactionsLogInput) {
  createTransactionLog(transaction: $transaction) {
    success
    code
    result
  }
}

   `,
    variables: {
    transactions:{
      "action":logout,
      "createdAt":new Date()
    }
    }
  })
  const id = result.data.createTransactionLog;
  return id
}
