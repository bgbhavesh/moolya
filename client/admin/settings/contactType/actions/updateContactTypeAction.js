import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function updateContactTypeActionHandler(Details) {
  /* const result = await client.mutate({
    mutation: gql`
        mutation ($_id:String, $contactType: contactTypeObject){
            updateContactType(
                _id:$_id,
                contactType:$contactType
            )
         }
        `,
    variables: {
      _id:Details._id,
      contactType: Details
    }
  }) */
  const _id = Details._id;
  const contactName = Details.contactName;
  const contactDisplayName = Details.contactDisplayName;
  const aboutContact = Details.aboutContact;
  const contactUploadIcon = Details.contactUploadIcon;
  const isActive = Details.isActive;
  const contactTypeInfo = {
    contactName, contactDisplayName, aboutContact, contactUploadIcon
  };
  const result = await client.mutate({
    mutation: gql`
    mutation ($masterData:MasterSettingsRequest){
        updateMasterSetting(moduleName:"MASTER_SETTINGS",actionName:"UPDATE",type:CONTACTTYPE,masterData:$masterData) 
      }
    `,
    variables: {
      masterData: { contactTypeInfo, isActive, _id }
    }
  })
  const id = result.data.updateMasterSetting;
  return id
}
