import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function updateLanguageActionHandler(LanguageDetails) {
  const _id = LanguageDetails.id;
  const languageName = LanguageDetails.languageName || null;
  const languageDisplayName = LanguageDetails.languageDisplayName || null;
  const aboutLanguage = LanguageDetails.aboutLanguage || null;
  const isActive = LanguageDetails.isActive;
  const languageInfo = { languageName, languageDisplayName, aboutLanguage };
  const result = await client.mutate({
    mutation: gql`
    mutation ($masterData:MasterSettingsRequest){
        updateMasterSetting(moduleName:"MASTER_SETTINGS",actionName:"UPDATE",type:LANGUAGE,masterData:$masterData) 
      }
    `,
    variables: {
      masterData: { languageInfo, isActive, _id }
    }
  })
  const id = result.data.updateMasterSetting;
  return id
}

