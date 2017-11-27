/**
 * Created by vishwadeep on 18/5/17.
 */
import gql from 'graphql-tag'
import { client } from '../../core/apolloConnection';

export async function findChapterActionHandler(clusterid, chapterId) {
  const clusterId = clusterid
  const findChapterId = chapterId
  const result = await client.query({
    query: gql`
    query  ($clusterId : String, $chapterId : String){
        fetchChapter(clusterId:$clusterId, chapterId: $chapterId){
          chapterId: _id
          clusterId
          clusterName
          chapterName
          stateName
          stateId
        }
      }
    `,
    variables: {
      clusterId,
      chapterId: findChapterId
    },
    forceFetch: true
  })
  const id = result.data.fetchChapter;
  return id
}
