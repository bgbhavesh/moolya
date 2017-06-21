/**
 * Created by pankaj on 19/6/17.
 */
import gql from 'graphql-tag'
import {appClient} from '../../../../core/appConnection';

export async function fetchTasksActionHandler (profileId) {
  const result = await appClient.query({
    query: gql`
    query($profileId:String) {
      fetchTasks(profileId: $profileId) {
        taskId : _id
        displayName
      }
    }
    `,
    variables: {
      profileId:profileId
    },
    forceFetch: true
  });
  const activities = result.data.fetchTasks;
  return activities
}
