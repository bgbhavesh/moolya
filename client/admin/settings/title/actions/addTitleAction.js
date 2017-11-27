import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function addTitleActionHandler(TitleDetails) {
  const titleName = TitleDetails.titleName || null;
  const titleDisplayName = TitleDetails.titleDisplayName || null;
  const aboutTitle = TitleDetails.aboutTitle || null;
  const isActive = TitleDetails.isActive;
  const titleInfo = { titleName, titleDisplayName, aboutTitle };
  const result = await client.mutate({
    mutation: gql`
    mutation ($masterData:MasterSettingsRequest){
        createMasterSetting(moduleName:"MASTER_SETTINGS",actionName:"CREATE",type:TITLE,masterData:$masterData) 
      }
    `,
    variables: {
      masterData: { titleInfo, isActive }
    }
  })
  const id = result.data.createMasterSetting;
  return id
}
