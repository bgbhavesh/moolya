
import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateRoleActionHandler(roleDetails) {
  let id=roleDetails.id;
  let role=roleDetails.roleObject
  const result = await client.mutate({
    mutation: gql`
   mutation  ($id:String!, $role: roleObject!){
       updateRole(
       id: $id,
       role: $role,
       )
   }
   `,
    variables: {
      id,
      role
    }
  })
  console.log(result)
  const res = result;
  return res
}

