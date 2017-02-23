import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findLanguageActionHandler(Id)
{
  let did=Id;
  const result = await client.query({
    query: gql`
    query  ($id: String){
        findLanguage(_id:$id){
          languageName
          languageDisplayName
          aboutLanguage
          _id
          isActive
        }
      }
    `,
    variables: {
      id:did
    },
    forceFetch:true
  })
  const id = result.data.findLanguage;
  return id
}
