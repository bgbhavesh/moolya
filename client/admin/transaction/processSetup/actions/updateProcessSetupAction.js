import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

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

// export async function updateProcessTransactionActionHandler(data, details)
// {
//   let tId = data._id;
//   let process = {
//     userId:data.userId,
//     username:data.username,
//     processTransactionId:data._id,
//     processSteps:details
//   }
//   const result = await client.mutate({
//     mutation: gql`
//     mutation ($processTransactionId:String, $processSetup:processSetup){
//         updateProcessSetup(processTransactionId:$processTransactionId, processSetup:$processSetup) {
//             success
//             code
//             result
//         }
//       }
//     `,
//     variables: {
//       processTransactionId:tId,
//       processSetup:process
//     }
//   })
//   const id = result.data.updateProcessSetup;
//   return id
// }
