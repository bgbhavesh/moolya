import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function addDateAndTimeActionHandler(Details)
{
  const result = await client.mutate({
    mutation: gql`
        mutation ($dateAndTime:dateAndTimeObject){
            createDateAndTime(
                dateAndTime: $dateAndTime
            ) 
         }
        `,
    variables: {
      dateAndTime: Details
    }
  })
  console.log(result)
  const id = result.data.createDateAndTime;
  return id
}
