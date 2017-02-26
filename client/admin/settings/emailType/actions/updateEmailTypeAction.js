import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateEmailTypeActionHandler(Details)
{

  const result = await client.mutate({
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
  return id
}
