import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function addRegionalActionHandler(Details)
{

  const result = await client.mutate({
    mutation: gql`
        mutation ($regional: regionalObject){
            createRegional(
                regional: $regional
            ) 
         }
        `,
    variables: {
      regional: Details
    }
  })
  console.log(result)
  const id = result.data.createRegional;
  return id
}
