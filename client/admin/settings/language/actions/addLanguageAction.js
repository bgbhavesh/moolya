import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function addLanguageActionHandler(LangauageDetails) {
  const languageName = LangauageDetails.languageName || null;
  const languageDisplayName = LangauageDetails.languageDisplayName || null;
  const aboutLanguage = LangauageDetails.aboutLanguage || null;
  const isActive = LangauageDetails.isActive;
  const languageInfo = { languageName, languageDisplayName, aboutLanguage };
  const result = await client.mutate({
    mutation: gql`
    mutation ($masterData:MasterSettingsRequest){
        createMasterSetting(moduleName:"MASTER_SETTINGS",actionName:"CREATE",type:LANGUAGE,masterData:$masterData) 
      }
    `,
    variables: {
      masterData: { languageInfo, isActive }
    }
  })
  const id = result.data.createMasterSetting;
  return id
}
