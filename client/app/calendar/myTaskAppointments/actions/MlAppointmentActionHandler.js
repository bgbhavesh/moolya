import gql from 'graphql-tag'
import _ from 'lodash';
import {appClient} from '../../../core/appConnection';

export async function fetchAllTaskActionHandler(profileId) {
  const result = await appClient.query({
    query: gql`
    query($profileId:String) {
      fetchTasks(profileId: $profileId) {
        taskId: _id
        displayName
      }
    }
    `,
    variables: {
      profileId
    },
    forceFetch: true
  });
  const tasks = result.data.fetchTasks;
  return tasks;
}

export async function fetchTaskActionHandler(taskId) {
  const result = await appClient.query({
    query: gql`
          query  ($taskId: String){
            fetchTaskForApointment(taskId: $taskId) {
              name
              displayName
              isInternal
              isExternal
              note
              noOfSession
              sessionFrequency
              duration {
                hours
                minutes
              }
              session{
                duration {
                  hours
                  minutes
                }
                sessionId
                activities {
                  id: _id
                  mode
                  name
                  displayName
                  duration {
                    hours
                    minutes
                  }
                }
              }
              attachments{
                name
                info
                isMandatory
              }
              payment{
                amount
                isDiscount
                discountType
                discountValue
                activitiesDerived
                activitiesDiscount
                activitiesAmount
                derivedAmount
              }
              isServiceCardEligible
              sessionFrequency
              isActive
            }
          }
      `,
    variables: {
      taskId
    },
    forceFetch: true
  })
  var resp = result.data.fetchTaskForApointment;
  let data = _.omit(resp, '__typename')
  data.duration = _.omit(data.duration, '__typename')
  data.payment = _.omit(data.payment, '__typename')
  let sessionArray = []
  _.each(data.session,function (item,say) {
    let value = _.omit(item, '__typename')
    value.duration = _.omit(value.duration, '__typename')
    sessionArray.push(value)
  })
  data.session = sessionArray
  let attachmentArray = []
  _.each(data.attachments,function (item,say) {
    let value = _.omit(item, '__typename')
    attachmentArray.push(value)
  })
  data.attachments = attachmentArray
  return data;
}

export async function fetchActivitiesTeamsActionHandler(taskId, sessionId) {
  const result = await appClient.query({
    query: gql`
    query($taskId: String, $sessionId: String) {
      fetchActivitiesTeams(taskId: $taskId, sessionId: $sessionId) {
        name
        duration {
          hours
          minutes
        }
        teams {
          resourceId
          resourceType
          users{
            userId
            profileId
            isMandatory
          }
        }
      }
    }
    `,
    variables: {
      taskId,
      sessionId
    },
    forceFetch: true
  });
  const resp = result.data.fetchActivitiesTeams;
  let data = _.omit(resp, '__typename')
  let activities = [];
  _.each(data,(activity) => {
    let activityData = _.omit(activity, '__typename');
    if (activity.teams && activity.teams.length > 0) {
      _.each(activity.teams,function (item,say) {
        let teamsArray = [];
        let value = _.omit(item, '__typename');
        let userArray = [];
        if (item.users && item.users.length > 0) {
          _.each(item.users,function (user,say) {
            let value = _.omit(user, '__typename')
            userArray.push(value)
          });
        }
        value.users = userArray;
        teamsArray.push(value)
        activityData.teams = teamsArray;
      });
    }
    activities.push(activityData);
  });
  return activities;
}

export async function getTeamUsersActionHandler(officeId) {
  const result = await appClient.query({
    query: gql`
      query ($officeId: String) {
        getTeamUsers(officeId: $officeId) {
          _id
          name
          userId
          profileId
          profileImage
        }
      }
    `,
    forceFetch:true,
    variables: {
      officeId:officeId
    }
  });
  const teamMembers = result.data.getTeamUsers;
  return teamMembers
}

export async function fetchOfficeActionHandler (Details) {
  const result = await appClient.query({
    query: gql`
    query{
      fetchOffice {
        _id
        officeName
        branchType
      }
    }`,
    variables: {
      Details
    }
  });
  const offices = result.data.fetchOffice;
  return offices
}

