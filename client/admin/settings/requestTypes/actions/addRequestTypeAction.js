import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function addRequestActionHandler(RequestTypeDetails) {
  let requestName = RequestTypeDetails.requestName;
  let displayName = RequestTypeDetails.displayName;
  let requestDesc = RequestTypeDetails.requestDesc;
  let isActive = RequestTypeDetails.isActive;
  const result = await client.mutate({
    mutation: gql`
    mutation  ($requestName: String, $displayName: String, $requestDesc: String,$isActive: Boolean, $moduleName:String, $actionName:String){
        CreateRequestType(
          requestName: $requestName,
          displayName: $displayName,
          requestDesc: $requestDesc,
          isActive :$isActive,
          moduleName:$moduleName,
          actionName:$actionName
        ){
            success,
            code,
            result
        }  
      }
    `,
    variables: {
      requestName,
      displayName,
      requestDesc,
      isActive,
      moduleName:"REQUEST",
      actionName:"CREATE"
    }
  })
  const id = result.data.CreateRequestType;
  return id
}
