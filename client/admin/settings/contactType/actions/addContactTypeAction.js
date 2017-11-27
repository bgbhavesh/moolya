import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function addContactTypeActionHandler(Details) {
  /* const result = await client.mutate({
    mutation: gql`
        mutation ($contactType:contactTypeObject){
            createContactType(
                contactType: $contactType
            )
         }
        `,
    variables: {
      contactType: Details
    }
  }) */

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
    mutation  ($masterData:MasterSettingsRequest){
        createMasterSetting(
          moduleName:"MASTERSETTINGS",
          actionName:"CREATE",
          type:CONTACTTYPE,
          masterData:$masterData
        ) 
      }
    `,
    variables: {
      masterData: { contactTypeInfo, isActive }
    }
  })
  const id = result.data.createMasterSetting;
  return id
}
