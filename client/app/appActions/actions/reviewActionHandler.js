/**
 * Created by mohammed.mohasin on 9/6/17.
 */
import gql from 'graphql-tag'

import {appClient} from '../../core/appConnection';

export async function reviewActionHandler(details) {
  const result = await appClient.mutate({
    mutation: gql`
          mutation  ($resourceId: String!,$resourceType:String!,$message:String!){
              createReview(resourceId:$resourceId,resourceType:$resourceType,message:$message){
                  success,
                  code,
                  result
              }  
          }
      `,
    variables: {
      resourceId : details.resourceId,
      resourceType: details.resourceType,
      message:details.message
    }
  })
  var resp = result.data.createReview;
  if (resp.success) {
   return resp;
  }
  return null;
}



