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


export async function updateActivityActionHandler(activityId,Details) {
  const result = await appClient.mutate({
    mutation: gql`
    mutation($activityId:String, $Details:activity){
        updateActivity(activityId:$activityId,Details:$Details){
        success
        code
        result
      }
      }
    `,
    variables: {
      activityId,
      Details
    }
  });
  console.log(result)
  const teamMembers = result.data.updateActivity;
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

export async function getUserProfileActionHandler() {
  const result = await appClient.query({
    query: gql`
query  {
  getUserProfiles{
    profileId
    communityName
    displayName
    profileImage
  }
}
    `
  });
  console.log(result)
  const users = result.data.getUserProfiles;
  return users
}

export async function getActivityActionHandler() {
  const result = await appClient.query({
    query: gql`
query  {
  fetchActivity{
    profileId
    communityName
    displayName
    profileImage
  }
}
    `
  });
  console.log(result)
  const users = result.data.fetchActivity;
  return users
}
