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
              privateFields{
                keyName,
                booleanKey
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
  const id = result.data.fetchIdeatorPortfolioDetails;
  let data = _.omit(id,'__typename')
  return data
}
export async function findIdeatorIdeasActionHandler(ideaId) {
  const result = await client.query({
    query: gql`
          query ($ideaId: String!) {
            fetchIdeatorPortfolioIdeas(ideaId: $ideaId) {
              _id
              title
              portfolioId
              description
              isIdeasTitlePrivate
              isIdeasPrivate
              isActive
              privateFields{
                keyName,
                booleanKey
              }
            }
          }

      `,
    variables: {
      ideaId: ideaId
    },
    forceFetch: true
  })
  const id
    = result.data.fetchIdeatorPortfolioIdeas;
  let data = _.omit(id, '__typename')
  console.log(data)
  return data
}

export async function findIdeatorProblemsAndSolutionsActionHandler(portfoliodetailsId) {
  const result = await client.query({
      query: gql`
          query ($portfoliodetailsId: String!) {
              data:fetchIdeatorDetails(portfoliodetailsId: $portfoliodetailsId, key:"problemSolution") {
                  problemSolution{
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
                      privateFields{
                        keyName,
                        booleanKey
                      }
                  }      
              }
          }
  
      `,
    variables: {
      portfoliodetailsId: portfoliodetailsId
    },
    forceFetch: true
  })
  const id = result.data.data && result.data.data.problemSolution;
  let data = _.omit(id, '__typename')
  return data
}

export async function findIdeatorAudienceActionHandler(portfoliodetailsId) {
  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!) {
            data:fetchIdeatorDetails(portfoliodetailsId: $portfoliodetailsId, key:"audience") {
                audience{
                  audienceDescription
                  isAudiencePrivate
                  audienceImages {
                      fileUrl
                      fileName
                  }
                  
                  privateFields{
                    keyName,
                    booleanKey
                  }
                  
                }
            }
          }

      `,
    variables: {
      portfoliodetailsId: portfoliodetailsId
    },
    forceFetch: true
  })
  const id = result.data.data && result.data.data.audience;
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
            data:fetchIdeatorDetails(portfoliodetailsId: $portfoliodetailsId, key:"strategyAndPlanning") {
              strategyAndPlanning{
                spDescription
                isStrategyPlansPrivate
                privateFields{
                  keyName,
                  booleanKey
                }
              }
              
            }
          }

      `,
    variables: {
      portfoliodetailsId: portfoliodetailsId
    },
    forceFetch: true
  })
  const id = result.data.data && result.data.data.strategyAndPlanning;
  let data = _.omit(id, '__typename')
  return data
}
export async function findIdeatorLookingForActionHandler(portfoliodetailsId) {

  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!) {
            data:fetchIdeatorDetails(portfoliodetailsId: $portfoliodetailsId, key:"lookingFor") {
              lookingFor{
                lookingForDescription
                isLookingForPrivate
                privateFields{
                  keyName,
                  booleanKey
                }
              }
            }
          }

      `,
    variables: {
      portfoliodetailsId: portfoliodetailsId
    },
    forceFetch: true
  })
  const id = result.data.data && result.data.data.lookingFor;
  let data = _.omit(id, '__typename')
  return data
}

export async function findIdeatorIntellectualPlanningTrademarkActionHandler(portfoliodetailsId) {

  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!) {
            data:fetchIdeatorDetails(portfoliodetailsId: $portfoliodetailsId, key:"intellectualPlanning") {
              intellectualPlanning{
                IPdescription
                isIntellectualPrivate
                privateFields{
                  keyName,
                  booleanKey
                }
              }
            }
          }

      `,
    variables: {
      portfoliodetailsId: portfoliodetailsId
    },
    forceFetch: true
  })
  const id = result.data.data && result.data.data.intellectualPlanning;
  let data = _.omit(id, '__typename')
  return data
}


