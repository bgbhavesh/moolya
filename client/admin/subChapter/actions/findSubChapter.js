import gql from 'graphql-tag'
import {client} from '../../core/apolloConnection';

export async function findSubChapterActionHandler(subChapterId) {
  let did = subChapterId
  const result = await client.query({
    query: gql`
    query  ($id: String){
        fetchSubChapter(_id:$id){
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
      id: did
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
