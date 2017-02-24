import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function addSocialLinkTypeActionHandler(Details)
{
  const result = await client.mutate({
    mutation: gql`
        mutation ($socialLinksType:socialLinksTypeObject){
            createSocialLinksType(
                socialLinksType: $socialLinksType
            ) 
         }
        `,
    variables: {
      socialLinksType: Details
    }
  })
  console.log(result)
  const id = result.data.createSocialLinksType;
  return id
}
