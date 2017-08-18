/**
 * Created by viswadeep on 18/8/17.
 */

import gql from "graphql-tag";
import {client} from "../../core/apolloConnection";

export async function deActivateUser(userId, isActive) {
  const result = await client.mutate({
    mutation: gql `
          mutation($userId: String, $isActive: Boolean){
              deActivateUser(userId:$userId, isActive: $isActive){
                  success,
                  code,
                  result
              }  
          }
      `,
    variables: {
      userId,
      isActive
    }
  })
  const id = result.data.deActivateUser;
  return id;
}
