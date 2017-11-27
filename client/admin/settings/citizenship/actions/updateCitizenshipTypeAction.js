import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function updateCitizenshipTypeActionHandler(CitizenshipType) {
  const _id = CitizenshipType.id;
  const citizenshipTypeName = CitizenshipType.citizenshipTypeName;
  const citizenshipTypeDisplayName = CitizenshipType.citizenshipTypeDisplayName;
  const about = CitizenshipType.about;
  const isActive = CitizenshipType.isActive
  const result = await client.mutate({
    mutation: gql`
    mutation  ($_id:String,$citizenshipTypeName: String, $citizenshipTypeDisplayName: String, $about: String,$isActive: Boolean, $moduleName:String, $actionName:String){
        UpdateCitizenship(
          _id:$_id
          citizenshipTypeName: $citizenshipTypeName,
          citizenshipTypeDisplayName: $citizenshipTypeDisplayName,
          about: $about,
          isActive :$isActive,
          moduleName:$moduleName,
          actionName:$actionName
        ){
            success,
            code,
            result
        }  
      }
    `,
    variables: {
      _id,
      citizenshipTypeName,
      citizenshipTypeDisplayName,
      about,
      isActive,
      moduleName: 'CITIZENSHIP',
      actionName: 'UPDATE'
    }
  })
  const id = result.data.UpdateCitizenship;
  return id
}
