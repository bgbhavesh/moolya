import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findTransactionApprovalActionHandler(transactionTypeDetails) {
  let transactionType = transactionTypeDetails
  let status="Approved"
  const result = await client.query({
    query: gql`
      query($transactionType:String,$status:String){
  fetchTransactions(transactionType:$transactionType,status:$status) {
          _id
          userId
          status
          requestId
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
      transactionType,
      status
    },
    forceFetch: true
  })
  const id = result.data.fetchTransactions;
  return id
}

