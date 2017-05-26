/**
 * Created by vishwadeep on 18/5/17.
 */
import gql from 'graphql-tag'
import {client} from '../../core/apolloConnection';

export async function findChapterActionHandler(chapterId) {
  let findChapterId = chapterId
  const result = await client.query({
    query: gql`
    query  ($chapterId : String){
        fetchChapter(chapterId: $chapterId){
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
      chapterId: findChapterId
    },
    forceFetch: true
  })
  const id = result.data.fetchChapter;
  return id
}
