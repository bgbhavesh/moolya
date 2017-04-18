/**
 * Created by venkatasrinag on 6/4/17.
 */
import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';
import _ from 'lodash'

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
  let data = _.omit(id,'__typename')
  return data
}
export async function findIdeatorIdeasActionHandler(portfoliodetailsId) {
  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!) {
            fetchIdeatorPortfolioIdeas(portfoliodetailsId: $portfoliodetailsId) {
                title
                description
                isIdeasTitlePrivate
                isIdeasPrivate
                isActive
            }
          }

      `,
    variables: {
      portfoliodetailsId: portfoliodetailsId
    },
    forceFetch: true
  })
  const id = result.data.fetchIdeatorPortfolioIdeas;
  let data = _.omit(id, '__typename')
  console.log(data)
  return data
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
  const id = result.data.fetchIdeatorPortfolioProblemsAndSolutions;
  let data = _.omit(id, '__typename')
  return data
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
  const id = result.data.fetchIdeatorPortfolioAudience;
  let data = _.omit(id, '__typename')
  console.log(data)
  return data
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
  const id = result.data.fetchIdeatorPortfolioStrategyAndPlanning;
  let data = _.omit(id, '__typename')
  return data
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
  const id = result.data.fetchIdeatorPortfolioLookingFor;
  let data = _.omit(id, '__typename')
  return data
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
  const id = result.data.fetchIdeatorPortfolioIntellectualPlanning;
  let data = _.omit(id, '__typename')
  return data
}

