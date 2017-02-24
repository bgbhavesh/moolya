/**
 * Created by venkatasrinag on 25/2/17.
 */
import gql from 'graphql-tag'
import {client} from '../../core/apolloConnection';

export async function fetchAssignUsersActionHandler(clusterId, chapterId, subChapterId, communityId) {
  let clusterid = clusterId,
  chapterid = chapterId,
  subChapterid = subChapterId,
  communityid = communityId;
  const result = await client.query({
    query: gql`
      query ($clusterId:String, $chapterId:String, $subChapterId:String, $communityId:String) {
        data: fetchAssignedUsers(clusterId:$clusterId, chapterId:$chapterId, subChapterId:$subChapterId, communityId:$communityId) 
        {
            _id,
            username
        }
      }
    `,
    variables: {
      clusterId:clusterid,
      chapterId:chapterid,
      subChapterId:subChapterid,
      communityId:communityid,
    },
    forceFetch:true
  })
  const id = result.data.data;
  return id
}
