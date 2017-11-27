import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function addSocialLinkTypeActionHandler(Details) {
/*  const result = await client.mutate({
    mutation: gql`
        mutation ($socialLinksType:socialLinksTypeObject){
            createSocialLinksType(
                socialLinksType: $socialLinksType
            )
         }
        `,
    variables: {
      socialLinksType: Details
    }
  })
  console.log(result)
  const id = result.data.createSocialLinksType;
  return id */

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
    mutation  ($masterData:MasterSettingsRequest){
        createMasterSetting(
          moduleName:"MASTER_SETTINGS",
          actionName:"CREATE",
          type:SOCIALLINKS,
          masterData:$masterData
        ) 
      }
    `,
    variables: {
      masterData: { socialLinksInfo, isActive }
    }
  })
  const id = result.data.createMasterSetting;
  return id
}
