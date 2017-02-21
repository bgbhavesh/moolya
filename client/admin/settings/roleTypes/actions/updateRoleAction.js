
import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateRoleActionHandler(role) {
  let rid=role.id;
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
      rid,
      role
    }
  })
  console.log(result)
  const id = result;
  return id
}

