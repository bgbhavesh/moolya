import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function addBackendUserActionHandler(userObjectDetails) {
let user=userObjectDetails
  const result = await client.mutate({
    mutation: gql`
       mutation  ($user: userObject!){
        createUser(          
          user :$user         
        )
      }
    `,
    variables: {
      user
    }
  })
  const id = result.data.createUser;
  return id
}
