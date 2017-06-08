import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function fetchProcessSetupHandler(processTransactionId) {
  const result = await client.query({
    query: gql`
          query ($processTransactionId: String) {
            fetchProcessSetup(processTransactionId: $processTransactionId) {
              processSteps{
                stageId 
                isActive
                stageActions{
                  actionId
                  actionType
                  isActive
                }
              }
              isActive
            }
          }
      `,
    variables: {
      processTransactionId: processTransactionId
    },
    forceFetch: true
  })
  const id = result.data.fetchProcessSetup;
  return id
}
