/**
 * Created by Mukhil on 21/6/17.
 */
import gql from 'graphql-tag'
import { appClient } from '../../../../core/appConnection';

export async function fetchTaskDetailsActionHandler(name) {
  const result = await appClient.query({
    query: gql` query ($name: String) {
      fetchTaskDetails(name: $name) {
        displayName
        noOfSession
        sessionFrequency
        duration {
          hours
          minutes
        }
        session {
          sessionId
          duration {
            hours
            minutes
          }
          activities
        }
      }
    }
    `,
    variables: {
      name
    }
  });
  const taskDetails = result.data.fetchTaskDetails;
  const task = _.omit(taskDetails, '__typename')
  task.duration = _.omit(task.duration, '__typename')
  task.payment = _.omit(task.payment, '__typename')
  const sessionArray = [];
  _.each(task.session, (item, say) => {
    const value = _.omit(item, '__typename')
    sessionArray.push(value);
  });
  task.session = sessionArray;
  const attachmentsArray = [];
  _.each(task.attachments, (item, say) => {
    const value = _.omit(item, '__typename')
    attachmentsArray.push(value)
  });
  task.attachments = attachmentsArray;
  return task;
}

export async function fetchTasksInBookingActionHandler(id) {
  const result = await appClient.query({
    query: gql` query ($id: [String]) {
      fetchTasksInBooking(id: $id) {
        _id
        displayName
        noOfSession
        sessionFrequency
        duration {
          hours
          minutes
        }
        session {
          sessionId
          duration {
            hours
            minutes
          }
          activities
        }
      }
    }
    `,
    variables: {
      id
    }
  });
  const tasks = result.data.fetchTasksInBooking;
  return tasks;
}
