import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function assignUserForTransactionAction(paramDetails,transactionId,transactionTypeDetails) {

 let params=paramDetails
  let transactionType=transactionTypeDetails
  const result = await client.mutate({
    mutation: gql`
     mutation($params:assignmentParams,$transactionId:String,$transactionType:String){
    assignRegistrationTransaction(params:$params,transactionId:$transactionId,transactionType:$transactionType){
      success
      code
      result
    }
  }
    `,
    variables: {
      params,
      transactionId,
      transactionType
    }
  })

  const id = result.data.assignRegistrationTransaction;
  return id
}
