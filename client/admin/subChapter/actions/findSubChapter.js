import gql from 'graphql-tag'
import {client} from '../../core/apolloConnection';

export async function findSubChapterActionHandler(ClusterId, ChapterId, subChapterId) {
  let clusterId = ClusterId
  let chapterId = ChapterId
  let did = subChapterId
  const result = await client.query({
    query: gql`
    query  ($clusterId: String, $chapterId: String, $subChapterId: String){
        fetchSubChapter(clusterId:$clusterId, chapterId:$chapterId, subChapterId:$subChapterId){
        id:_id
        clusterName
        chapterName
        subChapterName
        subChapterUrl
        isDefaultSubChapter
        subChapterDisplayName
        stateName
        aboutSubChapter
        subChapterImageLink
        subChapterEmail
        chapterId
        isEmailNotified
        showOnMap
        isActive
        associatedSubChapters
        isBespokeRegistration
        isBespokeWorkFlow
        internalSubChapterAccess {
          backendUser {
            canView
            canSearch
            canTransact
          }
          externalUser {
            canView
            canSearch
            canTransact
          }
        }
        moolyaSubChapterAccess {
          externalUser {
            canView
            canSearch
            canTransact
          }
    }
        }
      }
    `,
    variables: {
      clusterId:clusterId,
      chapterId:chapterId,
      subChapterId: did
    },
    forceFetch: true
  })
  const id = result.data.fetchSubChapter;
  return id
}
// backendUser {
//   canView
//   canSearch
//   canTransact
// }
