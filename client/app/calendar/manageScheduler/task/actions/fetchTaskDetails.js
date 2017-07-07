/**
 * Created by Mukhil on 21/6/17.
 */
import gql from 'graphql-tag'
import {appClient} from '../../../../core/appConnection';

export async function fetchTaskDetailsActionHandler (name) {
  const result = await appClient.query({
    query: gql`
query ($name: String) {
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
    },
  });
  console.log(result)
  const taskDetails = result.data.fetchTaskDetails;
  return taskDetails
}
