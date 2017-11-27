import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function addEmailTypeActionHandler(Details) {
/*  const result = await client.mutate({
    mutation: gql`
        mutation ($emailType:emailTypeObject){
            createEmailType(
                emailType: $emailType
            )
         }
        `,
    variables: {
      emailType: Details
    }
  })
  console.log(result)
  const id = result.data.createEmailType;
  return id */
  const emailName = Details.emailName;
  const emailDisplayName = Details.emailDisplayName;
  const aboutEmail = Details.aboutEmail;
  const emailUploadIcon = Details.emailUploadIcon;
  const isActive = Details.isActive;
  const emailTypeInfo = {
    emailName, emailDisplayName, aboutEmail, emailUploadIcon
  };
  const result = await client.mutate({
    mutation: gql`
    mutation  ($masterData:MasterSettingsRequest){
        createMasterSetting(
          moduleName:"MASTERSETTINGS",
          actionName:"CREATE",
          type:EMAILTYPE,
          masterData:$masterData
        ) 
      }
    `,
    variables: {
      masterData: { emailTypeInfo, isActive }
    }
  })
  const id = result.data.createMasterSetting;
  return id
}
