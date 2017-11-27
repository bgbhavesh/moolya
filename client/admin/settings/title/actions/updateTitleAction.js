import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function updateTitleActionHandler(TitleDetails) {
  const _id = TitleDetails.id;
  const titleName = TitleDetails.titleName || null;
  const titleDisplayName = TitleDetails.titleDisplayName || null;
  const aboutTitle = TitleDetails.aboutTitle || null;
  const isActive = TitleDetails.isActive;
  const titleInfo = { titleName, titleDisplayName, aboutTitle };
  const result = await client.mutate({
    mutation: gql`
    mutation ($masterData:MasterSettingsRequest){
        updateMasterSetting(moduleName:"MASTER_SETTINGS",actionName:"UPDATE",type:TITLE,masterData:$masterData) 
      }
    `,
    variables: {
      masterData: { titleInfo, isActive, _id }
    }
  })
  const id = result.data.updateMasterSetting;
  return id
}
