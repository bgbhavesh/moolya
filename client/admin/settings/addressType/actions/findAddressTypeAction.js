import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findAddressTypeActionHandler(Id)
{
  let did=Id;
  const result = await client.query({
    query: gql`
    query  ($id: String){
        findAddressType(_id:$id){
              addressName
              aboutAddress
              addressDisplayName
              _id
              isActive
        }
      }
    `,
    variables: {
      id:did
    },
    forceFetch:true
  })
  const id = result.data.findAddressType;
  return id
}
