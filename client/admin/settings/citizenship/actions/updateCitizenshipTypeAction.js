import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateCitizenshipTypeActionHandler(CitizenshipType) {
  let _id=CitizenshipType.id;
  let citizenshipTypeName = CitizenshipType.citizenshipTypeName;
  let citizenshipTypeDisplayName = CitizenshipType.citizenshipTypeDisplayName;
  let about = CitizenshipType.about;
  let isActive = CitizenshipType.isActive
  const result = await client.mutate({
    mutation: gql`
    mutation  ($_id:String,$citizenshipTypeName: String, $citizenshipTypeDisplayName: String, $about: String,$isActive: Boolean){
        UpdateCitizenship(
          _id:$_id
          citizenshipTypeName: $citizenshipTypeName,
          citizenshipTypeDisplayName: $citizenshipTypeDisplayName,
          about: $about,
          isActive :$isActive
        ) 
      }
    `,
    variables: {
      _id,
      citizenshipTypeName,
      citizenshipTypeDisplayName,
      about,
      isActive
    }
  })
  const id = result;
  return id
}
