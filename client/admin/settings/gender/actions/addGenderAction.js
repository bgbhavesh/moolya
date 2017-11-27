import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function addGenderActionHandler(Details) {
  const genderName = Details.genderName || null;
  const genderDisplayName = Details.genderDisplayName || null;
  const aboutGender = Details.aboutGender || null;
  const isActive = Details.isActive;
  const genderUploadIcon = Details.genderUploadIcon || null;
  const genderInfo = {
    genderName, genderDisplayName, aboutGender, genderUploadIcon
  };
  const result = await client.mutate({
    mutation: gql`
    mutation ($masterData:MasterSettingsRequest){
        createMasterSetting(moduleName:"MASTER_SETTINGS",actionName:"CREATE",type:GENDER,masterData:$masterData) 
      }
    `,
    variables: {
      masterData: { genderInfo, isActive }
    }
  })
  const id = result.data.createMasterSetting;
  return id
}
