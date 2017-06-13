/**
 * Created by pankaj on 8/6/17.
 */
import gql from "graphql-tag";
import {appClient} from "../../../../app/core/appConnection";

export async function fetchOfficeMember(memberId) {
  const result = await appClient.query({
    query: gql`
          query($memberId:String){
              fetchOfficeMember(memberId:$memberId){
                 _id
                 userId
                 mobileNumber
                 emailId
                 name
                 joiningDate
                 communityType
                 isActive
                 isPrincipal
                 isIndependent
                 isInternalUserInteraction
                 isExternalUserInteraction
                 isFreeze
                 isRetire
              }
          }
      `,
    variables: {
      memberId: memberId
    },
    forceFetch: true
  });
  return result.data.fetchOfficeMember;
}