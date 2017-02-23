import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateLanguageActionHandler(Details)
{

  const result = await client.mutate({
    mutation: gql`
        mutation ($_id:String, $language: languageObject){
            updateLanguage(
                _id:$_id,
                language:$language
            ) 
         }
        `,
    variables: {
      _id:Details._id,
      language: Details
    }
  })
  console.log(result)
  const id = result.data.updateLanguage;
  return id
}
