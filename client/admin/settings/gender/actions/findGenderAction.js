import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function findGenderActionHandler(Id) {
  const did = Id;
  const result = await client.query({
    query: gql`
    query  ($id: String){
        findMasterSetting(_id:$id){
        _id:_id
        isActive
        genderInfo{
             genderName
             aboutGender
             genderDisplayName
             genderUploadIcon
        }
      }
      }
    `,
    variables: {
      id: did
    },
    forceFetch: true
  });
  const masterSetting = result.data.findMasterSetting || {};
  const {
    genderName, aboutGender, genderDisplayName, genderUploadIcon
  } = masterSetting.genderInfo || {};
  if (result) {
    return {
      isActive: masterSetting.isActive, genderName, aboutGender, genderDisplayName, genderUploadIcon, _id: masterSetting._id
    };
  }
  return {};
}
