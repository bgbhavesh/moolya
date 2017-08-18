/**
 * Created by pankaj on 20/6/17.
 */
import gql from "graphql-tag";
import {appClient} from "../../core/appConnection";

export async function fetchInternalTask(status) {
  const result = await appClient.query({
    query: gql`
      query($status:[String]) {
        fetchMyInternalTask(status:$status) {
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
  const id = result.data.fetchMyInternalTask;
  return id
}
