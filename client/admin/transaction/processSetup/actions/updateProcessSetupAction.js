import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';
import _ from 'lodash'

export async function updateProcessSetupActionHandler(data, details)
{
  let tId = data._id;
  let process = {
    userId:data.userId,
    username:data.username,
    processTransactionId:data._id,
    processSteps:details
  }
  const result = await client.mutate({
    mutation: gql`
    mutation ($processTransactionId:String, $processSetup:processSetup){
        updateProcessSetup(processTransactionId:$processTransactionId, processSetup:$processSetup) {
            success
            code
            result
        }
      }
    `,
    variables: {
      processTransactionId:tId,
      processSetup:process
    }
  })
  const id = result.data.updateProcessSetup;
  return id
}

export async function updateProcessTransaction(transId, data) {

  const result = await client.mutate({
    mutation: gql`
        mutation ($processTransactionId:String, $processTransactions: processTransactions) {
        updateProcessTransaction(processTransactionId:$processTransactionId, processTransactions: $processTransactions) {
          success
          code
          result
        }
      }
    `,
    variables: {
      processTransactionId: transId,
      processTransactions:data
    },
    forceFetch:true
  });
  console.log(result);
  const id = result.data.updateProcessTransaction;
  return id
}
