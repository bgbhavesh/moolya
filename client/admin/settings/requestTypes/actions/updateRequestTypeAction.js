import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateRequestTypeActionHandler(RequestTypeDetails) {
  let _id=RequestTypeDetails.id;
  let requestName = RequestTypeDetails.requestName;
  let displayName = RequestTypeDetails.displayName;
  let requestDesc = RequestTypeDetails.requestDesc;
  let isActive = RequestTypeDetails.isActive
  const result = await client.mutate({
    mutation: gql`
    mutation  ($_id:String,$requestName: String, $displayName: String, $requestDesc: String,$isActive: Boolean){
        UpdateRequestType(
          _id:$_id
          requestName: $requestName,
          displayName: $displayName,
          requestDesc: $requestDesc,
          isActive :$isActive
        ) 
      }
    `,
    variables: {
      _id,
      requestName,
      displayName,
      requestDesc,
      isActive
    }
  })
  console.log(result)
  const id = result;
  return id
}
