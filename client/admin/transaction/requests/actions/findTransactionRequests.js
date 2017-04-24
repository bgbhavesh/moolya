import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findTransactionRequestActionHandler(transactionTypeDetails) {
  let transactionType = transactionTypeDetails
  const result = await client.query({
    query: gql`
      query($transactionType:String){
  fetchTransactions(transactionType:$transactionType) {
          _id
          transactionTypeName
          transactionTypeId
          requestTypeName
          requestTypeId
          requestDescription
          transactionAssignedBy
          transactionCompletedBy
          transactionCreatedDate
          transactionUpdatedDate
          hierarchy
        }
      }
    `,
    variables: {
  transactionType
    },
    forceFetch: true
  })
  const id = result.data.fetchTransactions;
  return id
}

