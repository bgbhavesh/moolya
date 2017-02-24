import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateSocialListsTypeActionHandler(Details)
{

  const result = await client.mutate({
    mutation: gql`
        mutation ($_id:String, $socialLinksType: socialLinksTypeObject){
            updateSocialLinksType(
                _id:$_id,
                socialLinksType: $socialLinksType
            ) 
         }
        `,
    variables: {
      _id: Details._id,
      socialLinksType: Details
    }
  })
  console.log(result)
  const id = result.data.updateSocialLinksType;
  return id
}
