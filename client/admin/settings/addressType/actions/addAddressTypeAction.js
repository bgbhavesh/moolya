import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function addAddressTypeActionHandler(Details)
{
  const result = await client.mutate({
    mutation: gql`
        mutation ($addressType:addressTypeObject){
            createAddressType(
                addressType: $addressType
            ) 
         }
        `,
    variables: {
      addressType: Details
    }
  })
  console.log(result)
  const id = result.data.createAddressType;
  return id
}
