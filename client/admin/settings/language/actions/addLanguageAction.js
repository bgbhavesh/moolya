import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function addLanguageActionHandler(Details)
{
  const result = await client.mutate({
    mutation: gql`
        mutation ($language:languageObject){
            createLanguage(
                language: $language
            ) 
         }
        `,
    variables: {
      language: Details
    }
  })
  console.log(result)
  const id = result.data.createLanguage;
  return id
}
