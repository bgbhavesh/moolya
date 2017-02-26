import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findContactTypeActionHandler(Id)
{
  let did=Id;
  const result = await client.query({
    query: gql`
    query  ($id: String){
        findContactType(_id:$id){
              contactName
              aboutContact
              contactDisplayName
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
  const id = result.data.findContactType;
  return id
}
