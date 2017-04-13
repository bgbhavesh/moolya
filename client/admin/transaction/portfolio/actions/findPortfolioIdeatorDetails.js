/**
 * Created by venkatasrinag on 6/4/17.
 */
import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findIdeatorDetailsActionHandler(portfoliodetailsId) {

  const result = await client.query({
      query: gql`
          query ($portfoliodetailsId: String!) {
            fetchIdeatorPortfolioDetails(portfoliodetailsId: $portfoliodetailsId) {
              firstName
              isfirstNamePrivate
              lastName
              islastNamePrivate
              gender
              isGenderPrivate
              dateOfBirth
              isDateOfBirthPrivate
              qualification
              isQualificationPrivate
              employmentStatus
              isEmploymentStatusPrivate
              professionalTag
              isProfessionalTagPrivate
              yearsofExperience
              isYoePrivate
              industry
              isIndustryPrivate
              profession
              isProfessionPrivate
              employerName
              isEmployerNamePrivate
              mobileNumber
              isMobileNumberPrivate
              emailId
              isEmailIdPrivate
              facebookId
              isfacebookIdPrivate
              linkedInId
              islinkedInIdPrivate
              twitterId
              isTwitterIdPrivate
              gplusId
              isGplusIdPrivate
              profilePic
            }
          }

      `,
      variables: {
        portfoliodetailsId: portfoliodetailsId
      },
      forceFetch: true
  })
  console.log(result)
  const id = result.data.fetchIdeatorPortfolioDetails;
  return id
}

export async function findIdeatorProblemsAndSolutionsActionHandler(portfoliodetailsId) {

  const result = await client.query({
      query: gql`
          query ($portfoliodetailsId: String!) {
              fetchIdeatorPortfolioProblemsAndSolutions(portfoliodetailsId: $portfoliodetailsId) {
                  problemStatement
                  isProblemPrivate
                  problemImage {
                    fileUrl
                    fileName
                  }
                  solutionStatement
                  isSolutionPrivate
                  solutionImage {
                    fileUrl
                    fileName
                  }      
              }
          }
  
      `,
    variables: {
      portfoliodetailsId: portfoliodetailsId
    },
    forceFetch: true
  })
  console.log(result.data.fetchIdeatorPortfolioProblemsAndSolutions)
  const id = result.data.fetchIdeatorPortfolioProblemsAndSolutions;
  return id
}

export async function findIdeatorAudienceActionHandler(portfoliodetailsId) {

  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!) {
            fetchIdeatorPortfolioAudience(portfoliodetailsId: $portfoliodetailsId) {
                description
                isAudiencePrivate
                 audienceImages {
                    fileUrl
                    fileName
                  }
            }
          }

      `,
    variables: {
      portfoliodetailsId: portfoliodetailsId
    },
    forceFetch: true
  })
  console.log(result)
  const id = result.data.fetchIdeatorPortfolioAudience;
  return id
}
export async function findIdeatorLibraryActionHandler(portfoliodetailsId) {

  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!) {
            fetchIdeatorPortfolioLibrary(portfoliodetailsId: $portfoliodetailsId) {
              fileType
              portfolioId
              isActive
            }
          }

      `,
    variables: {
      portfoliodetailsId: portfoliodetailsId
    },
    forceFetch: true
  })
  console.log(result)
  const id = result.data.fetchIdeatorPortfolioLibrary;
  return id
}
export async function findIdeatorStrategyPlansActionHandler(portfoliodetailsId) {

  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!) {
            fetchIdeatorPortfolioStrategyAndPlanning(portfoliodetailsId: $portfoliodetailsId) {
              description
              isStrategyPlansPrivate
            }
          }

      `,
    variables: {
      portfoliodetailsId: portfoliodetailsId
    },
    forceFetch: true
  })
  console.log(result)
  const id = result.data.fetchIdeatorPortfolioStrategyAndPlanning;
  return id
}
export async function findIdeatorLookingForActionHandler(portfoliodetailsId) {

  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!) {
            fetchIdeatorPortfolioLookingFor(portfoliodetailsId: $portfoliodetailsId) {
              description
              isLookingForPrivate
            }
          }

      `,
    variables: {
      portfoliodetailsId: portfoliodetailsId
    },
    forceFetch: true
  })
  console.log(result)
  const id = result.data.fetchIdeatorPortfolioLookingFor;
  return id
}

export async function findIdeatorIntellectualPlanningTrademarkActionHandler(portfoliodetailsId) {

  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!) {
            fetchIdeatorPortfolioIntellectualPlanning(portfoliodetailsId: $portfoliodetailsId) {
              description
              isIntellectualPrivate
            }
          }

      `,
    variables: {
      portfoliodetailsId: portfoliodetailsId
    },
    forceFetch: true
  })
  console.log(result)
  const id = result.data.fetchIdeatorPortfolioIntellectualPlanning;
  return id
}



export async function findAnnotations(portfoliodetailsId, docId) {

  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!, $docId:String!) {
              fetchAnnotations(portfoliodetailsId: $portfoliodetailsId, docId:$docId) {
                    result
              }
          }
  
      `,
    variables: {
      portfoliodetailsId: portfoliodetailsId,
      docId:docId
    },
    forceFetch: true
  })
  const data = result.data.fetchAnnotations;
  return data
}
