import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateStusForTransactionActionHandler(transactionInfo,statusInfo) {
  let status = statusInfo
    let transactionId=transactionInfo

  const result = await client.mutate({
    mutation: gql`
         mutation($transactionId:String,$status:String){
        updateTransactionStatus(transactionId:$transactionId,status:$status) {
          success
          code
          result
        }
      }
    `,
    variables: {
      status,
      transactionId
    }
  })
  const id = result.data.updateTransactionStatus;
  return id
}
