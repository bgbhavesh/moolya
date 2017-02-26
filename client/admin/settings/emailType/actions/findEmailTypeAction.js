import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findEmailTypeActionHandler(Id)
{
  let did=Id;
  const result = await client.query({
    query: gql`
    query  ($id: String){
        findEmailType(_id:$id){
              emailName
              aboutEmail
              emailDisplayName
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
  const id = result.data.findEmailType;
  return id
}
