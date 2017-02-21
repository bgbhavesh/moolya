import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateStateActionHandler(StateDetails) {
  let stateId = StateDetails.id;

  const result = await client.mutate({
    mutation: gql`
    mutation updateState($stateId:String, $state: stateObject){
      updateState(
        stateId:$stateId,
        state: $state
      ) 
      }
    `,
    variables: {
      stateId:stateId,
      state:StateDetails
    }
  })
  console.log(result)
  const id = result.data.updateState;
  return id
}
