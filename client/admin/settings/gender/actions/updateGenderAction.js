import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function updateGenderActionHandler(Details) {
  const _id = Details._id;
  const genderName = Details.genderName || null;
  const genderDisplayName = Details.genderDisplayName || null;
  const aboutGender = Details.aboutGender || null;
  const isActive = Details.isActive;
  const genderUploadIcon = Details.genderUploadIcon || null;
  const genderInfo = {
    genderName, genderDisplayName, aboutGender, genderUploadIcon
  };
  console.log(_id);
  const result = await client.mutate({
    mutation: gql`
    mutation ($masterData:MasterSettingsRequest){
        updateMasterSetting(moduleName:"MASTER_SETTINGS",actionName:"UPDATE",type:GENDER,masterData:$masterData) 
      }
    `,
    variables: {
      masterData: { genderInfo, isActive, _id }
    }
  })
  const id = result.data.updateMasterSetting;
  return id
}
