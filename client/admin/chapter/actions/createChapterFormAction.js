import gql from 'graphql-tag'
import { client } from '../../core/apolloConnection';

export async function createChapterActionHandler(chapterDetails) {
  const clusterId = chapterDetails.clusterName;
  const chapterName = chapterDetails.chapterName;
  const diplayName = chapterDetails.displayName;
  const about = chapterDetails.about;
  const link = chapterDetails.chapterImage;
  const state = chapterDetails.state;
  const email = chapterDetails.email;
  const showOnMap = chapterDetails.ismapShow;
  const isActive = chapterDetails.status
  const result = await client.mutate({
    mutation: gql`
    mutation createChapter ($clusterId:String,$chapterName:String,$diplayName:String,$about:String,$link:String,$state: String,$email:String,$showOnMap:Boolean,$isActive:Boolean) {
      createChapter (clusterId: $clusterId,chapterName: $chapterName,diplayName: $diplayName, about: $about,link:$link, state:$state, email: $email,showOnMap: $showOnMap,isActive: $isActive)
          
    }
    `,
    variables: {
      clusterId,
      chapterName,
      diplayName,
      about,
      link,
      state,
      email,
      showOnMap,
      isActive
    }
  })
  const id = result.data.createChapter;
  return id
}
