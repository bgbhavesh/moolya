/**
 * Created by pankaj on 8/7/17.
 */
import gql from "graphql-tag";
import {appClient} from "../../core/appConnection";

export async function fetchSelfCreatedInternalTask(status) {
  const result = await appClient.query({
    query: gql`
      query($status:[String]) {
        fetchSelfCreatedInternalTask(status:$status) {
          _id
          name
          type
          status
        }
      }
    `,
    variables:{
      status:status
    },
    forceFetch: true
  })
  const id = result.data.fetchSelfCreatedInternalTask;
  return id
}
