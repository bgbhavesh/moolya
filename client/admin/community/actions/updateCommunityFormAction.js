import gql from 'graphql-tag'
import {client} from '../../core/apolloConnection';

export async function updateCommunityActionHandler(comId,communityDetails) {
  // let name = communityDetails.communityName;
  // let displayName = communityDetails.communityDisplayName;
  // let cluster = communityDetails.clusterId;
  // let chapter = communityDetails.chapterId
  // let link = 'c:/fakepath/img1.png';
  // let showOnMap = communityDetails.showOnMap;
  // let about = communityDetails.communityDescription;
  // let isActive = communityDetails.isActive
  let did = comId;
  const result = await client.mutate({
    mutation: gql`
    mutation ($_id:String $communityDef:communityDefInput){
            updateCommunityDef(
                _id:$_id,
                communityDef:$communityDef
            ) 
         }
    `,
    variables: {
      _id : did,
      communityDef : communityDetails
    }
  })
  console.log(result)
  const id = result.data.updateCommunityDef;
  return id
}
