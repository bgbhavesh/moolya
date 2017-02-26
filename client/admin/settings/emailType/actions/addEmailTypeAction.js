import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function addEmailTypeActionHandler(Details)
{
  const result = await client.mutate({
    mutation: gql`
        mutation ($emailType:emailTypeObject){
            createEmailType(
                emailType: $emailType
            ) 
         }
        `,
    variables: {
      emailType: Details
    }
  })
  console.log(result)
  const id = result.data.createEmailType;
  return id
}
