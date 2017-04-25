import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function assignUserForTransactionAction(paramDetails,transactionTypeDetails) {

 let params=paramDetails
  let transactionType=transactionTypeDetails
  const result = await client.mutate({
    mutation: gql`
     mutation($params:assignmentParams,$transactionType:String){
    createRegistrationTransaction(params:$params,transactionType:$transactionType){
      success
      code
      result
    }
  }
    `,
    variables: {
      params,
      transactionType
    }
  })

  const id = result.data.createRegistrationTransaction;
  return id
}
