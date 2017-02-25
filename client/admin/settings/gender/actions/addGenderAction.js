import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function addGenderActionHandler(Details)
{
  const result = await client.mutate({
    mutation: gql`
        mutation ($gender : genderObject){
            createGender(
                gender: $gender
            ) 
         }
        `,
    variables: {
      gender: Details
    }
  })
  console.log(result)
  const id = result.data.createGender;
  return id
}
