import gql from 'graphql-tag'
import {client} from '../../core/apolloConnection';

export async function findSubChapterActionHandler(subChapterId) {
  let did = subChapterId
  console.log('....................');
  console.log(did);

  // const result = await client.query({
  //   query: gql`
  //   query  ($id: String){
  //       fetchSubChapter(_id:$id){
  //       id:_id
  //       clusterName
  //       chapterName
  //       subChapterName
  //       subChapterDisplayName
  //       aboutSubChapter
  //       subChapterImageLink
  //       showOnMap
  //       isActive
  //       }
  //     }
  //   `,
  //   variables: {
  //     id: did
  //   },
  //   forceFetch: true
  // })
  // const id = result.data.fetchCluster;
  // return id
}
