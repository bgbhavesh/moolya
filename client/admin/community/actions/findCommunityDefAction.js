import gql from 'graphql-tag'
import {client} from '../../core/apolloConnection';

export async function findCommunityDefActionHandler(Id)
{
  let did=Id;
  const result = await client.query({
    query: gql`
    query  ($id: String){
        fetchCommunityDef(_id:$id){
        name
        displayName
        communityImageLink
        code
        aboutCommunity
        clusters {
          id
        }
        chapters {
          id
        }
        _id      
        showOnMap
        isActive
        }
      }
    `,
    variables: {
      id:did
    },
    forceFetch:true
  })
  const id = result.data.fetchCommunityDef;
  return id
}
