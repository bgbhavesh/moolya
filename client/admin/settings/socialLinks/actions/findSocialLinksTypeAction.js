import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findSocialLinksTypeActionHandler(Id)
{
  let did=Id;
  const result = await client.query({
    query: gql`
    query  ($id: String){
        findSocialLinksType(_id:$id){
              socialName
              aboutSocial
              socialDisplayName
              socialUploadIcon
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
  const id = result.data.findSocialLinksType;
  return id
}
