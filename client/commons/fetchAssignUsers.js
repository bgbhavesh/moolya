/**
 * Created by venkatasrinag on 25/2/17.
 */
import gql from 'graphql-tag'
import {client} from '../admin/core/apolloConnection';

export async function fetchAssignUsersActionHandler(clusterId, chapterId, subChapterId, communityId, subChapterName) {
  let clusterid = clusterId,
  chapterid = chapterId,
  subChapterid = subChapterId,
  communityid = communityId,
  scName = subChapterName;
  const result = await client.query({
    query: gql`
       query ($clusterId:String, $chapterId:String, $subChapterId:String, $communityId:String, $subChapterName:String) {
        data: fetchAssignedUsers(clusterId:$clusterId, chapterId:$chapterId, subChapterId:$subChapterId, communityId:$communityId,subChapterName:$subChapterName ) 
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
      subChapterName:scName
    },
    forceFetch:true
  })
  const id = result.data.data;
  return id
}
