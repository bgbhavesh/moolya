import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function updateRequestTypeActionHandler(RequestTypeDetails) {
  const _id = RequestTypeDetails.id;
  const requestName = RequestTypeDetails.requestName;
  const displayName = RequestTypeDetails.displayName;
  const requestDesc = RequestTypeDetails.requestDesc;
  const isActive = RequestTypeDetails.isActive;
  const transactionType = RequestTypeDetails.transactionType;
  const result = await client.mutate({
    mutation: gql`
    mutation  ($_id:String,$requestName: String, $displayName: String, $requestDesc: String,$isActive: Boolean, $moduleName:String, $actionName:String){
        UpdateRequestType(
          _id:$_id
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
      _id,
      requestName,
      displayName,
      requestDesc,
      isActive,
      transactionType,
      moduleName: 'REQUEST',
      actionName: 'UPDATE'
    }
  })
  const id = result.data.UpdateRequestType;
  return id
}
