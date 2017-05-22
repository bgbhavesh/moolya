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
        isBespokeRegistration
        isBespokeWorkFlow
        internalSubChapterAccess {
          backendUser {
            canView
            canSearch
            canDiscover
          }
          externalUser {
            canView
            canSearch
            canDiscover
          }
        }
        moolyaSubChapterAccess {
          backendUser {
            canView
            canSearch
            canDiscover
          }
          externalUser {
            canView
            canSearch
            canDiscover
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
