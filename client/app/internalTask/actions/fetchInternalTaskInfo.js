/**
 * Created by pankaj on 21/6/17.
 */
import gql from "graphql-tag";
import {appClient} from "../../core/appConnection";

export async function fetchInternalTaskInfo(taskId) {
  const result = await appClient.query({
    query: gql`
      query($internalTaskId:String) {
        fetchInternalTaskById(internalTaskId:$internalTaskId) {
          _id
          attendee
          attendeeProfileId
          name
          stage
          resourceId
          attendees {
            userId
            profileId
          }
          docs
          status
          note
          mode
          client
          community {
            name
          }
          userInfo {
            id
            name
            profileUrl
          }
          createdAt
        }
      }
    `,
    variables:{
      internalTaskId:taskId
    },
    forceFetch: true
  })
  const id = result.data.fetchInternalTaskById;
  return id
}
