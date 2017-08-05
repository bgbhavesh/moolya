import gql from 'graphql-tag'
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
  const teams = result.data.fetchActivitiesTeams;
  return teams;
}
