/**
 * Created by pankaj on 20/6/17.
 */
import gql from "graphql-tag";
import {appClient} from "../../core/appConnection";

export async function fetchAllOfficeMembers(resourceType) {
  const result = await appClient.query({
    query: gql`
      query {
        fetchAllOfficeMembersWithUserId {
          _id
          name
          userId
          profileImage
        }
      }
    `,
    forceFetch: true
  })
  const id = result.data.fetchAllOfficeMembersWithUserId;
  return id
}
