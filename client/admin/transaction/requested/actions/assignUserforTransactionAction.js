import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function assignUserForTransactionAction(paramDetails) {

 let params=paramDetails
  const result = await client.mutate({
    mutation: gql`
     mutation($params:assignmentParams){
    createRegistrationTransaction(params:$params){
      success
      code
      result
    }
  }
    `,
    variables: {
      params
    }
  })

  const id = result.data.createRegistrationTransaction;
  return id
}
