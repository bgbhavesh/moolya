/**
 * Created by mohammed.mohasin on 9/6/17.
 */
import gql from 'graphql-tag'

import {appClient} from '../../core/appConnection';

export async function connectActionHandler(details) {
  const result = await appClient.mutate({
    mutation: gql`
          mutation  ($resourceId:String!,$resourceType:String!){
              connectionRequest(resourceId:$resourceId,resourceType:$resourceType){
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
  const id = result.data.connectionRequest;
  return id;
}



