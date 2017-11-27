import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function updateEmailTypeActionHandler(Details) {
  /* const result = await client.mutate({
    mutation: gql`
        mutation ($_id:String, $emailType: emailTypeObject){
            updateEmailType(
                _id:$_id,
                emailType:$emailType
            )
         }
        `,
    variables: {
      _id:Details._id,
      emailType: Details
    }
  })
  console.log(result)
  const id = result.data.updateEmailType;
  return id */
  const _id = Details._id;
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
    mutation ($masterData:MasterSettingsRequest){
        updateMasterSetting(moduleName:"MASTER_SETTINGS",actionName:"UPDATE",type:EMAILTYPE,masterData:$masterData) 
      }
    `,
    variables: {
      masterData: { emailTypeInfo, isActive, _id }
    }
  })
  const id = result.data.updateMasterSetting;
  return id
}
