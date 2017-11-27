import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function findLanguageActionHandler(Id) {
  const did = Id;
  const result = await client.query({
    query: gql`
       query  ($id: String){
        findMasterSetting(_id:$id){
         id:_id
        isActive
        languageInfo{
          languageName
          languageDisplayName
          aboutLanguage
        }
      }
      }
    `,
    variables: {
      id: did
    },
    forceFetch: true
  })
  const masterSetting = result.data.findMasterSetting || {};
  const { languageName, aboutLanguage, languageDisplayName } = masterSetting.languageInfo || {};
  if (result) {
    return {
      isActive: masterSetting.isActive, languageName, aboutLanguage, languageDisplayName
    };
  }
  return {};
}
