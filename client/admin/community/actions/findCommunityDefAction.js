import gql from 'graphql-tag'
import { client } from '../../core/apolloConnection';

export async function findCommunityDefActionHandler(Id) {
  const did = Id;
  const result = await client.query({
    query: gql`
    query  ($id: String){
        data:fetchCommunityDef(communityId:$id){
            name,
            displayName,
            communityImageLink,
            code,
            aboutCommunity,
            showOnMap,
            isActive,
            clusters,
            chapters,
            subchapters
        }
      }
    `,
    variables: {
      id: did
    },
    forceFetch: true
  })
  const id = result.data.data;
  return id
}
