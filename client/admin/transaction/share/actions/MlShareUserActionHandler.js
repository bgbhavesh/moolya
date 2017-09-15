import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function fetchSharedCalendarDetails (sharedId) {
  const result = await client.query({
    query: gql`
query ($sharedId: String) {
  fetchSharedCalendarDetails(sharedId: $sharedId) {
     users{
      userId
      profileId
      displayName
      profilePic
     }  
      files{
        url
        fileName
        fileType
        libraryDocumentId
     }
      sharedEndDate
      sharedStartDate
      isDownloadable
      createdAt
      ownerInfo {
        userId
        profileId
        email
        mobileNumber
        cluster
        chapter
        subChapter
        community
        name
      }
  }
}
    `,
    variables: {
      sharedId
    },
    forceFetch: true
  });
  const shareDetails = result.data.fetchSharedCalendarDetails;
  return shareDetails
}

