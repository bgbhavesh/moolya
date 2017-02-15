import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateStateActionHandler(StateDetails) {
  let stateId = StateDetails.id;
  let stateName = StateDetails.name;
  let countryCode = StateDetails.countryCode;
  // let displayName = StateDetails.displayName;
  let isActive = StateDetails.isActive;

  let stateDetails = {
      name: StateDetails.name,
      countryId:StateDetails.countryId,
      countryCode:StateDetails.countryCode,
      isActive:StateDetails.isActive
  }

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
      state:stateDetails
    }
  })
  console.log(result)
  const id = result.data.updateState;
  return id
}
