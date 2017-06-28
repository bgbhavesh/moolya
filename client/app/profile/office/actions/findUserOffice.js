/**
 * Created by vishwadeep on 6/6/17.
 */
import gql from "graphql-tag";
import {appClient} from "../../../../app/core/appConnection";

export async function findUserOfficeActionHandler() {
  const result = await appClient.query({
    query: gql`
          query{
              fetchOfficeSC{
                userId
                officeId
                totalusercount
                principalcount
                teamMembercount
                isRegistrationApproved
              }  
          }
      `,
      forceFetch: true
  })
  const id = result.data.fetchOfficeSC;
  return id
}
// fetchOffice
// officeId : _id

// include this one
// officeLocation
