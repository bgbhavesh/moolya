import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function addPermissionActionHandler(RequestTypeDetails) {
  let requestName = RequestTypeDetails.requestName;
  let displayName = RequestTypeDetails.displayName;
  let requestDesc = RequestTypeDetails.requestDesc;
  let isActive = RequestTypeDetails.isActive;
  const result = await client.mutate({
    mutation: gql`
    mutation  ($requestName: String, $displayName: String, $requestDesc: String,$isActive: Boolean){
        CreateRequestType(
          requestName: $requestName,
          displayName: $displayName,
         requestDesc: $requestDesc,
          isActive :$isActive
        ) 
      }
    `,
    variables: {
      requestName,
      displayName,
      requestDesc,
      isActive
    }
  })
  const id = result.data.CreateRequestType;
  return id
}
