/**
 * Created by vishwadeep on 7/6/17.
 */
import gql from "graphql-tag";
import {appClient} from "../../../../app/core/appConnection";

export async function findOfficeAction(officeId) {
  const result = await appClient.query({
    query: gql`
          query($officeId:String){
              findOfficeDetail(officeId:$officeId){
                success
                code
                result
              }  
          }
      `,
    variables: {
      officeId: officeId
    },
    forceFetch: true
  })
  const id = result.data.findOfficeDetail;
  return id
}
