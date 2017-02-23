import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateRegionalActionHandler(Details)
{
  let regionalId=Details._id;


  const result = await client.mutate({
    mutation: gql`
        mutation ($_id:String, $regional:regionalObject){
            updateRegional(
                _id:$_id,
                regional: $regional
            ) 
         }
        `,
    variables: {
      _id:regionalId,
      regional:Details
    }
  })
  console.log(result)
  const id = result.data.updateRegional;
  return id
}
