import gql from 'graphql-tag'
import {client} from '../../core/apolloConnection';

export async function createCommunityActionHandler(communityDetails) {
  // let name = communityDetails.communityName;
  // let displayName = communityDetails.communityDisplayName;
  // let cluster = communityDetails.clusterId;
  // let chapter = communityDetails.chapterId
  // let link = 'c:/fakepath/img1.png';
  // let showOnMap = communityDetails.showOnMap;
  // let about = communityDetails.communityDescription;
  // let isActive = communityDetails.isActive
  const result = await client.mutate({
    mutation: gql`
    mutation ($communityInput:communityInput){
            createCommunity(
                community:$communityInput
            ) 
         }
    `,
    variables: {
      communityInput : communityDetails
    }
  })
  console.log(result)
  const id = result.data.createCommunity;
  return id
}
