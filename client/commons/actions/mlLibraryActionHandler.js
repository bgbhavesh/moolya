import gql from 'graphql-tag'
import {appClient} from "../../app/core/appConnection";

export async function createLibrary(detailsInput, connection) {
  const result = await connection.mutate({
    mutation: gql`
   mutation ($detailsInput: libraryInput) {
  createLibrary(detailsInput: $detailsInput) {
    success
    code
    result
  }
}
`,
    variables:{
      detailsInput
    }
  })
  const id = result.data.createLibrary;
  return id
}

export async function updateLibrary(id,files, connection) {
  const result = await connection.mutate({
    mutation: gql`
   mutation ($files:libraryInput, $id: String) {
  updateLibrary(files:$files, id:$id) {
    success
    code
    result
  }
}
`,
    variables:{
      id,
      files
    }
  })
  const resultId = result.data.updateLibrary;
  return resultId
}

export async function fetchLibrary(userId, connection) {
  const result = await connection.query({
    query: gql`
    query($userId : String){
  fetchLibrary(userId: $userId) {
      _id
      userId
      fileName
      fileUrl
      fileType
      isPrivate
      libraryType
      inCentralLibrary
      portfolioReference{
        portfolioId
        isPrivate
      }
  }
}`,
    variables:{
      userId
    },
    forceFetch:true
  })
  const id = result.data.fetchLibrary;
  return id
}


export async function fetchLibraryBasedOnPortfolioIdHandler(portfolioId, connection) {
  const result = await connection.query({
    query: gql`
    query($portfolioId : String){
  fetchLibraryBasedOnPortfolioId(portfolioId: $portfolioId) {
      _id
      userId
      fileName
      fileUrl
      fileType
      isPrivate
      libraryType
      inCentralLibrary
      portfolioReference{
        portfolioId
        isPrivate
      }
  }
}`,
    variables:{
      portfolioId
    },
    forceFetch:true
  })
  const id = result.data.fetchLibraryBasedOnPortfolioId;
  return id
}


export async function getUserPermissionDetailsHandler(portfolioDetailsId,connection) {
  const result = await connection.query({
    query: gql`
    query($portfolioDetailsId: String){
  fetchCurrentUserPermissions(portfolioDetailsId:$portfolioDetailsId){
      isExploring
      action
  }
}`, forceFetch:true,
    variables : {
      portfolioDetailsId
    }
  })
  const id = result.data.fetchCurrentUserPermissions;
  return id
}

export async function fetchDataFromCentralLibrary(connection) {
  const result = await connection.query({
    query: gql`
    query{
  fetchDataFromCentralLibrary{
      _id
      userId
      fileName
      fileUrl
      fileType
      fileSize
      isPrivate
      libraryType
      inCentralLibrary
      portfolioReference{
        portfolioId
        isPrivate
      }
  }
}`, forceFetch:true
  })
  const id = result.data.fetchDataFromCentralLibrary;
  return id
}

export async function updateLibraryData(files, connection) {
  const result = await connection.mutate({
    mutation: gql`
   mutation ($files: privateData) {
  updateLibraryData(files:$files) {
    success
    code
    result
  }
}
`,
    variables:{
      files
    }
  })
  const id = result.data.updateLibraryData;
  return id
}

export async function putDataIntoTheLibrary(portfolioDetailsId, files, connection) {
  const result = await connection.mutate({
    mutation: gql`
      mutation($portfolioDetailsId: String, $files:file){
        putDataIntoTheLibrary(portfoliodetailsId:$portfolioDetailsId,files:$files) {
          success
          code
          result
        }
      }
    `,
    variables: {
      portfolioDetailsId,
      files
    },
    forceFetch: true
  });
  const id = result.data.putDataIntoTheLibrary;
  return id;
}

export async function updatePrivacyDetails(privateInput, connection) {
  const result = await connection.mutate({
    mutation: gql`
      mutation($privateInput:privacyInfo){
        updatePrivacyDetails(privateInput:$privateInput) {
          success
          code
          result
        }
      }
    `,
    variables: {
      privateInput
    },
    forceFetch: true
  });
  const id = result.data.updatePrivacyDetails;
  return id;
}

export async function storeSharedDetailsHandler(detailsInput) {
  const result = await appClient.mutate({
    mutation: gql`
      mutation($detailsInput: sharedInput){
        createSharedLibrary(detailsInput:$detailsInput) {
          success
          code
          result
        }
      }
    `,
    variables: {
      detailsInput
    }
  });
  const id = result.data.createSharedLibrary;
  return id;
}

export async function fetchConnections() {
  const result = await appClient.query({
    query: gql`
    query{
      fetchConnections {
        userId
        profileId
        displayName
        profileImage
      }
    }`,
    forceFetch:true
  })
  const id = result.data.fetchConnections;
  return id
}


export async function getSharedConnectionsActionHandler() {
  const result = await appClient.query({
    query: gql`
    query{
      getMySharedConnections {
        userId
        displayName
        profilePic
    }
  }`,
    forceFetch:true
  })
  const id = result.data.getMySharedConnections;
  return id
}

export async function fetchSharedLibraryHandler(userId) {
  const result = await appClient.query({
    query: gql`
    query($userId: String){
  fetchSharedLibrary(userId: $userId){
      file{
      url
      fileName
      fileType
      }
      isDownloadable
      daysToExpire
  }
}`,
    variables: {
      userId
    }, forceFetch: true
  });
  const id = result.data.fetchSharedLibrary;
  return id
}


