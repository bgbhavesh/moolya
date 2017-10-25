import gql from 'graphql-tag'
import {client} from '../../core/apolloConnection';
import {omit, each, map} from 'lodash'

/**
 * @Note: "communityId" added for the communityAdmin auth errors
 * */

export async function findSubChapterActionHandler(ClusterId, ChapterId, subChapterId, communityId) {
  let clusterId = ClusterId
  let chapterId = ChapterId
  let did = subChapterId
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
      clusterId: clusterId,
      chapterId: chapterId,
      subChapterId: did,
      communityId
    },
    forceFetch: true
  })
  var id = result.data.fetchSubChapter;
  var data = omit(id, '__typename')
  if(!data.isDefaultSubChapter){
    let objAry = []
    each(data.associatedObj,function (item,say) {
      let value = omit(item, '__typename')
      value.type= "backendUser"
      value.disabled = true
      value.backendUser = omit(value.backendUser, '__typename')
      value.externalUser = omit(value.externalUser, '__typename')
      value.subChapters = map(value.subChapters, function (row) {
        return omit(row,'__typename')
      })
      objAry.push(value)
    })
    data.associatedObj = objAry
  }
  return data
}
