import gql from 'graphql-tag'
import {appClient} from '../../../core/appConnection';

export async function createActivityActionHandler (Details) {
  const result = await appClient.mutate({
    mutation: gql`
    mutation($Details: activity){
        createActivity(Details:$Details){
        success
        code
        result
      }
      }
    `,
    variables: {
      Details
    }
  });
  const activities = result.data.createActivity;
  return activities
}


export async function updateStep2DetailsActionHandler(step2) {
  const result = await appClient.mutate({
    mutation: gql`
    mutation($step2: step2Activity){
        updateStep2Activity(step2:$step2){
        success
        code
        result
      }
      }
    `,
    forceFetch:true,
    variables: {
      step2
    }
  });
  console.log(result)
  const teamMembers = result.data.updateStep2Activity;
  return teamMembers
}


export async function getTeamUsersActionHandler(Attributes) {
  const result = await appClient.query({
    query: gql`
query ($Attributes: TeamName) {
  getTeamUsers(Attributes: $Attributes) {
    name
  }
}
    `,
    forceFetch:true,
    variables: {
      Attributes
    }
  });
  console.log(result)
  const teamMembers = result.data.getTeamUsers;
  return teamMembers
}
