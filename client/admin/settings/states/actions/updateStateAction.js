import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateStateActionHandler(StateDetails) {
  let stateId = StateDetails.id;
  let state = StateDetails.name;
  let countryCode = StateDetails.countryCode;
  // let displayName = StateDetails.displayName;
  let isActive = StateDetails.isActive;

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
      countryId:stateId,
      country:StateDetails
    }
  })
  console.log(result)
  const id = result.data.updateState;
  return id
}
