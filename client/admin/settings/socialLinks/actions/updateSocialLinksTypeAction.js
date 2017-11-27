import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function updateSocialListsTypeActionHandler(Details) {
/*  const result = await client.mutate({
    mutation: gql`
        mutation ($_id:String, $socialLinksType: socialLinksTypeObject){
            updateSocialLinksType(
                _id:$_id,
                socialLinksType: $socialLinksType
            )
         }
        `,
    variables: {
      _id: Details._id,
      socialLinksType: Details
    }
  })
  console.log(result)
  const id = result.data.updateSocialLinksType;
  return id */

  const _id = Details._id;
  const socialName = Details.socialName;
  const socialDisplayName = Details.socialDisplayName;
  const aboutSocial = Details.aboutSocial;
  const socialUploadIcon = Details.socialUploadIcon;
  const isActive = Details.isActive;
  const socialLinksInfo = {
    socialName, socialDisplayName, aboutSocial, socialUploadIcon
  };
  const result = await client.mutate({
    mutation: gql`
    mutation ($masterData:MasterSettingsRequest){
        updateMasterSetting(moduleName:"MASTERSETTINGS",actionName:"UPDATE",type:SOCIALLINKS,masterData:$masterData) 
      }
    `,
    variables: {
      masterData: { socialLinksInfo, isActive, _id }
    }
  })
  const id = result.data.updateMasterSetting;
  return id
}
