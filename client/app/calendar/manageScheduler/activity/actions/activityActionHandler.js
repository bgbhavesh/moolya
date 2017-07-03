/**
 * Created by Mukhil on 19/6/17.
 */
import gql from 'graphql-tag'
import {appClient} from '../../../../core/appConnection';

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
    userId
    _id
    externalUserProfiles{
    profileId
    }
  }
}
    `,
    forceFetch:true,
    variables: {
      Attributes
    }
  });
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
    `,
    forceFetch:true
  });
  const users = result.data.getUserProfiles;
  return users
}

export async function getActivityActionHandler(id) {
  const activityId = id;
  const result = await appClient.query({
    query: gql`
query($activityId: String)  {
  fetchActivity(activityId:$activityId){
    userId
    profileId
    name
    deliverable
    displayName
    isInternal
    isExternal
    mode
    isServiceCardEligible
    industryTypes
    note
    imageLink
    duration{
     hours
     minutes
    }
    facilitationCharge{
     amount
     percentage
     derivedAmount
    }
    teams{
      branch
      userType
      users{
        name
        userId
      }
    }
    conversation
    payment{
      amount
      isDiscount
      discountType
      discountValue
      isTaxInclusive
      isPromoCodeApplicable
    }
    
  }
}
    `,
    variables: {
      activityId
    },
    forceFetch:true
  });
  const users = result.data.fetchActivity;
  return users
}

export async function fetchActivitiesActionHandler (profileId) {
  const result = await appClient.query({
    query: gql`
    query($profileId:String) {
      fetchActivities(profileId: $profileId) {
        displayName
        imageLink
        mode
        _id
        duration {
          hours
          minutes
        }
        teams{
      branch
      userType
      users{
        name
        userId
      }
    }
      }
    }
    `,
    variables: {
      profileId:profileId
    },
    forceFetch:true
  });
  const activities = result.data.fetchActivities;
  return activities
}



// export async function getActivityDataActionHandler() {
//   const result = await appClient.query({
//     query: gql`
// query  {
//   fetchActivityData{
//     profileId
//     communityName
//     displayName
//     profileImage
//   }
// }
//     `
//   });
//   console.log(result)
//   const users = result.data.fetchActivity;
//   return users
// }
