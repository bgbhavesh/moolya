import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateAddressTypeActionHandler(Details)
{

  const result = await client.mutate({
    mutation: gql`
        mutation ($_id:String, $addressType: addressTypeObject){
            updateAddressType(
                _id:$_id,
                addressType:$addressType
            ) 
         }
        `,
    variables: {
      _id:Details._id,
      addressType: Details
    }
  })
  console.log(result)
  const id = result.data.updateAddressType;
  return id
}
