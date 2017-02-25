import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findGenderActionHandler(Id)
{
  let did=Id;
  const result = await client.query({
    query: gql`
    query  ($id: String){
        findGender(_id:$id){
              genderName
              genderDisplayName
              aboutGender
              genderUploadIcon
              _id
              isActive
        }
      }
    `,
    variables: {
      id:did
    },
    forceFetch:true
  })
  const id = result.data.findGender;
  return id
}
