import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function addContactTypeActionHandler(Details)
{
  const result = await client.mutate({
    mutation: gql`
        mutation ($contactType:contactTypeObject){
            createContactType(
                contactType: $contactType
            ) 
         }
        `,
    variables: {
      contactType: Details
    }
  })
  console.log(result)
  const id = result.data.createContactType;
  return id
}
