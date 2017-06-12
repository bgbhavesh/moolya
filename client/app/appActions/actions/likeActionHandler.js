/**
 * Created by mohammed.mohasin on 9/6/17.
 */
import gql from 'graphql-tag'

import {appClient} from '../../core/appConnection';

export async function likeActionHandler(details) {
  const result = await appClient.mutate({
    mutation: gql`
          mutation  ($resourceId: String!,$resourceType:String!){
              likeRequest(resourceId:$resourceId,resourceType:$resourceType){
                  success,
                  code,
                  result
              }  
          }
      `,
    variables: {
      resourceId : details.resourceId,
      resourceType: details.resourceType
    }
  })
  const id = result.data.likeRequest;
  return id;
}

export default async function handleLikeAction(details){

    var resp = await likeActionHandler(details);
    return resp;
}



