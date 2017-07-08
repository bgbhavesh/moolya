/**
 * Created by venkatsrinag on 3/5/17.
 */
import gql from 'graphql-tag'
import {appClient} from '../../../app/core/appConnection';

export async function createIdeaActionHandler(ideaDetails) {
    let idea = ideaDetails
    const result = await appClient.mutate({
        mutation: gql`
            mutation ($idea: idea) {
                createIdea(idea: $idea) {
                    success,
                    result,
                    code
                }
            }
        `,
      forceFetch:true,
      variables:{
          idea
      }
    })
    const id = result.data.createIdea;
    return id
}


export async function fetchIdeaActionHandler(portfolioId) {
    const result = await appClient.query({
        query: gql`
            query($portfolioId:String){
                fetchIdeas(portfolioId:$portfolioId) {
                    _id
                    portfolioId
                    title
                    isIdeaTitlePrivate
                    description
                    isIdeaPrivate
                    userId
                    isActive
                }
            }
        `,
      variables:{
        portfolioId:  portfolioId
      },
        forceFetch:true
    })
    const ideas = result.data.fetchIdeas;
    return ideas
}
export async function fetchIdeators() {
  const result = await appClient.query({
    query: gql`
            query{
                fetchIdeators {
                    ideas {
                      _id
                      isActive
                      isIdeaPrivate
                      isIdeaTitlePrivate
                      title
                      description
                      portfolioId
                    }
                    accountType
                    chapterName
                    userId
                    name
                }
            }
        `,
    forceFetch:true
  })
  const ideas = result.data.fetchIdeators;
  return ideas
}

export async function fetchIdeaByPortfolioId(portfolioId) {
  const result = await appClient.query({
    query: gql`
            query($portfolioId:String){
                fetchIdeaByPortfolioId(portfolioId:$portfolioId) {
                      _id
                      isActive
                      isIdeaPrivate
                      isIdeaTitlePrivate
                      title
                      description
                      portfolioId
                }
            }
        `,
    variables:{
      portfolioId:portfolioId
    },
    forceFetch:true
  })
  const ideas = result.data.fetchIdeaByPortfolioId;
  return ideas
}

export async function createLibrary(detailsInput) {
  const result = await appClient.mutate({
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

export async function fetchLibrary(userId) {
  const result = await appClient.query({
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
//

export async function getAllowableDocumentFormats(format) {
  const result = await appClient.query({
    query: gql`
query {
  fetchAllowableFormats{
   docFormatName
  }
}
        `,
    variables:{
      format
    }
  })
  const id = result.data.fetchAllowableFormats;
  return id
}


export async function updatePrivacyDetails(index,element,type) {
  let x = element;
  element = x[index];
  console.log(element)
  const result = await appClient.mutate({
    mutation: gql`
   mutation ($detailsInput: privateData) {
  updatePrivacyDetails(detailsInput: $detailsInput) {
    success
    code
    result
  }
}
`,
    variables:{
      detailsInput: {
        index,
        element,
        type

}
    }
  })
  const id = result.data.updatePrivacyDetails;
  return id
}

