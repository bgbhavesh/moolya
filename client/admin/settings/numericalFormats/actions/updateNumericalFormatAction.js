import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateNumericalFormatActionHandler(Details)
{

  const result = await client.mutate({
    mutation: gql`
        mutation ($_id:String, $numericalFormat: numericalFormatObject){
            updateNumericalFormat(
                _id:$_id,
                numericalFormat:$numericalFormat
            ) 
         }
        `,
    variables: {
      _id:Details._id,
      numericalFormat: Details
    }
  })
  console.log(result)
  const id = result.data.updateNumericalFormat;
  return id
}
