/**
 * Created by vishwadeep on 6/6/17.
 */
import gql from "graphql-tag";
import {appClient} from "../../../../app/core/appConnection";

export async function findUserOfficeActionHandler() {
  const result = await appClient.query({
    query: gql`
          query{
              fetchMyOffice{
                userId
                officeId : _id
                totalCount
                principalUserCount
                officeLocation
                teamUserCount
              }  
          }
      `,
      forceFetch: true
  })
  const id = result.data.fetchMyOffice;
  return id
}
