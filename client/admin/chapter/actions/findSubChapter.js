import gql from 'graphql-tag'
import {client} from '../../core/apolloConnection';

export async function findSubChapterActionHandler(subChapterId) {
  let did = subChapterId
  const result = await client.query({
    query: gql`
     query  ($id: String){
        fetchSubChapter(_id:$id){     
        clusterId
        chapterId
        }
      }
    `,
    variables: {
      id: did
    },
    fetchPolicy: 'cache-first'
  })
  const id = result.data.fetchSubChapter;
  return id
}
