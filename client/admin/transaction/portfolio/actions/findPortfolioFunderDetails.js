/**
 * Created by vishwadeep on 6/5/17.
 */

import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';
import _ from 'lodash'
export async function fetchfunderPortfolioAbout(portfoliodetailsId) {
  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!) {
            fetchFunderAbout(portfoliodetailsId: $portfoliodetailsId) {
                  firstName
                  isFirstNamePrivate
                  lastName
                  isLastNamePrivate
                  gender
                  isGenderPrivate
                  category
                  isCategoryPrivate
                  qualification
                  isQualificationPrivate
                  employmentStatus
                  isEmploymentStatusPrivate
                  professionalTag
                  isProfessionalTagPrivate
                  yearsOfExperience
                  isYearsOfExperiencePrivate
                  industry
                  isIndustryPrivate
                  profession
                  isProfessionPrivate
                  investmentFrom
                  investmentCount
                  isInvestmentCountPrivate
                  emailId
                  isEmailIdPrivate
                  mobileNumber
                  isMobileNumberPrivate
                  linkedinUrl
                  isLinkedinUrlPrivate
                  facebookUrl
                  isFacebookUrlPrivate
                  profilePic
                  investmentBudget {
                    from
                    isFromPrivate
                    to
                    isToPrivate
                  }
                  
                  
            }
          }
      `,
    variables: {
      portfoliodetailsId: portfoliodetailsId
    },
    forceFetch: true
  })
  const id = result.data.fetchFunderAbout;
  let data = _.omit(id,'__typename')
  data.investmentBudget =_.omit(data.investmentBudget,'__typename')
  return data
  // return id
}

export async function fetchfunderPortfolioPrincipal(portfoliodetailsId) {
  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!) {
            fetchFunderPrincipal(portfoliodetailsId: $portfoliodetailsId) {
                  title
                  firstName
                  isFirstNamePrivate
                  lastName
                  isLastNamePrivate
                  designation
                  isDesignationPrivate
                  companyName
                  duration
                  isDurationPrivate
                  yearsOfExperience
                  isYearsOfExperiencePrivate
                  qualification
                  aboutPrincipal
                  isQualificationPrivate
                  isAboutPrincipalPrivate
                  socialLinks{
                    socialLinkType
                    userId
                    isUserIdPrivate
                  }
                  index
                  logo{
                    fileUrl,
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
  const id = result.data.fetchFunderPrincipal;
  // let data = _.omit(id,'__typename')
  // return data
  return id
}

export async function fetchfunderPortfolioTeam(portfoliodetailsId) {
  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!) {
            fetchFunderTeam(portfoliodetailsId: $portfoliodetailsId) {
                  title
                  firstName
                  isFirstNamePrivate
                  lastName
                  isLastNamePrivate
                  designation
                  isDesignationPrivate
                  companyName
                  duration
                  isDurationPrivate
                  yearsOfExperience
                  isYearsOfExperiencePrivate
                  qualification
                  aboutTeam
                  isQualificationPrivate
                  isAboutTeamPrivate
                  socialLinks{
                    socialLinkType
                    userId
                    isUserIdPrivate
                  }
                  index
                  logo{
                    fileUrl,
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
  const id = result.data.fetchFunderTeam;
  // let data = _.omit(id,'__typename')
  // return data
  return id
}

export async function fetchfunderPortfolioInvestor(portfoliodetailsId) {
  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!) {
            fetchfunderPortfolioInvestor(portfoliodetailsId: $portfoliodetailsId) {
                  dateOfInvestment
                  isDateOfInvestmentPrivate
                  companyName
                  isCompanyNamePrivate
                  typeOfFundingId
                  typeOfFundingName
                  isTypeOfFundingPrivate
                  aboutInvestment
                  isAboutInvestmentPrivate
                  isPrivate
                  investmentAmount 
                  isInvestmentAmountPrivate 
                  index
            }
          }
      `,
    variables: {
      portfoliodetailsId: portfoliodetailsId
    },
    forceFetch: true
  })
  const id = result.data.fetchfunderPortfolioInvestor;
  // let data = _.omit(id,'__typename')
  // return data
  return id
}

export async function fetchfunderPortfolioSuccess(portfoliodetailsId) {
  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!) {
            fetchFunderSuccessStories(portfoliodetailsId: $portfoliodetailsId) {
              date
              isDatePrivate
              storyImage
              storyTitle
              isStoryTitlePrivate
              description
              isDescPrivate
              isPrivate
              isActive
              index
              logo{
                    fileName
                    fileUrl
                }
            }
          }
      `,
    variables: {
      portfoliodetailsId: portfoliodetailsId
    },
    forceFetch: true
  })
  const id = result.data.fetchFunderSuccessStories;
  return id
}

export async function fetchfunderPortfolioAreaInterest(portfoliodetailsId) {
  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!) {
            fetchFunderAreaOfInterest(portfoliodetailsId: $portfoliodetailsId) {
              industryTypeId
              industryTypeName
              domainType
              makePrivate
              subDomainId
              subDomainName
              isActive
              index
            }
          }
      `,
    variables: {
      portfoliodetailsId: portfoliodetailsId
    },
    forceFetch: true
  })
  const id = result.data.fetchFunderAreaOfInterest;
  return id
}

export async function fetchfunderPortfolioService(portfoliodetailsId) {
  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!) {
            fetchfunderPortfolioService(portfoliodetailsId: $portfoliodetailsId) {
                  dateOfService
                  industryType
                  conversationType
                  about
                  expectedInput
                  expectedOutput
                  mode
                  session
                  duration{
                    hours
                    minutes
                  }
                  attachments{
                    documentName
                    images
                  }
                  investmentAmount 
                  isInvestmentAmountPrivate 
                  index
            }
          }
      `,
    variables: {
      portfoliodetailsId: portfoliodetailsId
    },
    forceFetch: true
  })
  const id = result.data.fetchfunderPortfolioService;
  // let data = _.omit(id,'__typename')
  // return data
  return id
}
