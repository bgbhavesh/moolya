import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateGenderActionHandler(Details)
{

  const result = await client.mutate({
    mutation: gql`
        mutation ($_id:String, $gender: genderObject){
            updateGender(
                _id:$_id,
                gender: $gender
            ) 
         }
        `,
    variables: {
      _id: Details._id,
      gender: Details
    }
  })
  console.log(result)
  const id = result.data.updateGender;
  return id
}
