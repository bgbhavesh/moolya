/** ************************************************************
 * Date: 5 Jul, 2017
 * Programmer: Mukhil <mukhil.padnamanabhan@raksan.in>
 * Description : This will manage the actions of service cards
 * JavaScript XML file mlFindService.jsx
 * *************************************************************** */


/**
 * Imports libs and components
 */
import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function fetchShareDetails (shareId) {
  const result = await client.query({
    query: gql`
query ($sharedId: String) {
  fetchSharedLibraryDetails(sharedId: $sharedId) {
     users{
      userId
      profileId
     }  
      files{
        url
        fileName
        fileType
        libraryDocumentId
     }
      sharedEndDate
      sharedStartDate
      isSignedUrl
      isDownloadable
  }
}
    `,
    variables: {
      shareId
    },
    forceFetch: true
  });
  const shareDetails = result.data.fetchTaskDetails;
  return shareDetails
}

