import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';
import _ from 'lodash'

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
      processTransactionId
    },
    forceFetch: true
  })
  const stages = result.data.fetchProcessSetup;
  const ary = [];
  _.each(stages.processSteps, (item, say) => {
    const value = _.omit(item, '__typename')
    const minAry = []
    _.each(value.stageActions, (valueThis, key) => {
      const actionRm = _.omit(valueThis, '__typename')
      minAry.push(actionRm)
    })
    value.stageActions = minAry
    ary.push(value)
  })
  const data = { processSteps: ary }
  return data
}
