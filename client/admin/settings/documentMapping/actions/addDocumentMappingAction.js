import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function addDocumentMappingActionHandler(roleDetails) {
  let role = roleDetails;
  const result = await client.mutate({
    mutation: gql`
    mutation  ($role: roleObject){
        createRole(
          role : $role
        )
      }
    `,
    variables: {
      role
    }
  })
  const id = result.data.createRole;
  return id
}
