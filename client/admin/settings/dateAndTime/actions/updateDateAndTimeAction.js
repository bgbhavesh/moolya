import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateDateAndTimeActionHandler(Details)
{

  const result = await client.mutate({
    mutation: gql`
        mutation ($_id:String, $dateAndTime: dateAndTimeObject){
            updateDateAndTime(
                _id:$_id,
                dateAndTime:$dateAndTime
            ) 
         }
        `,
    variables: {
      _id:Details._id,
      dateAndTime: Details
    }
  })
  console.log(result)
  const id = result.data.updateLanguage;
  return id
}
