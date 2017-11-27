import gql from 'graphql-tag'
import { client } from '../../core/apolloConnection';
import { omit, each, map } from 'lodash'

/**
 * @Note: "communityId" added for the communityAdmin auth errors
 * */

export async function findSubChapterActionHandler(ClusterId, ChapterId, subChapterId, communityId) {
  const clusterId = ClusterId
  const chapterId = ChapterId
  const did = subChapterId
  const result = await client.query({
    query: gql`
    query  ($clusterId: String, $chapterId: String, $subChapterId: String, $communityId: String){
        fetchSubChapter(clusterId:$clusterId, chapterId:$chapterId, subChapterId:$subChapterId, communityId: $communityId){
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
          isBespokeRegistration
          isBespokeWorkFlow
          associatedObj{
            isActive
            subChapters{
              subChapterId
              chapterId
            }
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
          objective {
            description
            status
          }
          contactDetails {
            contactPersonRole,
            addressTypeId
            addressTypeName
            contactNumber
            emailId,
            buildingNumber,
            street,
            landmark,
            area,
            cityId,
            stateId,
            countryId,
            pincode,
            latitude,
            longitude,
            status,
          }
        }
    }
    `,
    variables: {
      clusterId,
      chapterId,
      subChapterId: did,
      communityId
    },
    forceFetch: true
  })
  const id = result.data.fetchSubChapter;
  const data = omit(id, '__typename')
  if (!data.isDefaultSubChapter) {
    const objAry = []
    each(data.associatedObj, (item, say) => {
      const value = omit(item, '__typename')
      value.type = 'backendUser'
      value.disabled = true
      value.backendUser = omit(value.backendUser, '__typename')
      value.externalUser = omit(value.externalUser, '__typename')
      value.subChapters = map(value.subChapters, row => omit(row, '__typename'))
      objAry.push(value)
    })
    data.associatedObj = objAry
  }
  return data
}
