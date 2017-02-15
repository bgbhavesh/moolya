import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateUserTypeActionHandler(UserTypeDetails) {
  let _id=UserTypeDetails.id;
  let userTypeName = UserTypeDetails.userTypeName;
  let displayName = UserTypeDetails.displayName;
  let userTypeDesc = UserTypeDetails.userTypeDesc;
  let isActive = UserTypeDetails.isActive
  const result = await client.mutate({
    mutation: gql`
    mutation  ($_id:String, $userTypeName: String, $displayName: String, $userTypeDesc: String,$isActive: Boolean){
        UpdateUserType(
          _id: $_id,
          userTypeName: $userTypeName,
          displayName: $displayName,
          userTypeDesc: $userTypeDesc,
          isActive :$isActive
        ) 
      }
    `,
    variables: {
      _id,
      userTypeName,
      displayName,
      userTypeDesc,
      isActive
    }
  })
  console.log(result)
  const id = result;
  return id
}
