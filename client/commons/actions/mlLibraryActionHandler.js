import gql from 'graphql-tag'

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

export async function fetchLibrary(userId, connection) {
  const result = await connection.query({
    query: gql`
    query($userId : String){
  fetchLibrary(userId: $userId) {
      userId
      fileName
      fileUrl
      fileType
      isPrivate
      libraryType
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

export async function updateLibraryData(files, connection) {
  const result = await connection.mutate({
    mutation: gql`
   mutation ($files: String) {
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

export async function updatePrivacyDetails(detailsInput, connection) {
  const result = await connection.mutate({
    mutation: gql`
      mutation($detailsInput:privateData){
        updatePrivacyDetails(detailsInput:$detailsInput) {
          success
          code
          result
        }
      }
    `,
    variables: {
      detailsInput
    },
    forceFetch: true
  });
  const id = result.data.updatePrivacyDetails;
  return id;
}
