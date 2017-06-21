/**
 * Created by pankaj on 19/6/17.
 */
import gql from 'graphql-tag'
import {appClient} from '../../../../core/appConnection';

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
      }
    }
    `,
    variables: {
      profileId:profileId
    }
  });
  const activities = result.data.fetchActivities;
  return activities
}
