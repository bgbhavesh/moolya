import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateStusForTransactionActionHandler(requestsInfo,statusInfo) {
  let status = statusInfo
    let requestsId=requestsInfo

  const result = await client.mutate({
    mutation: gql`
         mutation($transactionId:String,$status:String){
        updateRequestsStatus(transactionId:$transactionId,status:$status) {
          success
          code
          result
        }
      }
    `,
    variables: {
      status,
      requestsId
    }
  })
  const id = result.data.updateRequestsStatus;
  return id
}
