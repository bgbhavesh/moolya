import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateContactTypeActionHandler(Details)
{

  const result = await client.mutate({
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
  })
  console.log(result)
  const id = result.data.updateContactType;
  return id
}
