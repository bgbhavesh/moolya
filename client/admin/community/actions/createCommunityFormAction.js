import gql from 'graphql-tag'
import {client} from '../../core/apolloConnection';

export async function createCommunityActionHandler(communityDetails) {
  let name = communityDetails.communityName;
  let displayName = communityDetails.displayName;
  let cluster = communityDetails.selectCluster;
  let chapter = communityDetails.selectChapter
  let link = 'c:/fakepath/img1.png';
  let showOnMap = communityDetails.ismapShow;
  let about = communityDetails.about;
  let isActive = communityDetails.status
  const result = await client.mutate({
    mutation: gql`
    mutation createCommunity ($name:String,$displayName:String,$cluster:String,$chapter:String, $about:String,$link:String,$showOnMap:Boolean,$isActive:Boolean) {
      createCommunity (name: $name,displayName: $displayName,cluster:$cluster,chapter:$chapter about: $about,link:$link, showOnMap: $showOnMap,isActive: $isActive)
          
    }
    `,
    variables: {
      name,
      displayName,
      cluster,
      chapter,
      about,
      link,
      showOnMap,
      isActive
    }
  })
  console.log(result)
  const id = result.data.createCommunity;
  return id
}
