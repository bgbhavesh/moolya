/**
 * Created by mohammed.mohasin on 2/5/17.
 */
import gql from 'graphql-tag'
import {appClient} from '../../core/appConnection';

export async function fetchExternalUserProfilesActionHandler() {
  const result = await appClient.query({
    query: gql`
    query{
      fetchUserProfiles {
        registrationId
        countryName
        countryId
        cityName
        cityId
        mobileNumber
        clusterId
        clusterName
        chapterId
        chapterName
        subChapterId
        subChapterName
        communityId
        communityName
        communityType
        communityName
        communityDefCode
        communityDefName
        communityType
              
        isDefault
        isActive
        accountType
        isProfileActive
        optional
        userType
        identityType
      }
    }
    `,
    forceFetch:true
  })
  const data = result.data&&result.data.fetchUserProfiles?result.data.fetchUserProfiles:[];
  return data;
}
