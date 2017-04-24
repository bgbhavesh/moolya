import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';
import _ from "underscore";

export async function findStartupManagementActionHandler(portfoliodetailsId) {

  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!) {
            fetchStartupPortfolioManagement(portfoliodetailsId: $portfoliodetailsId) {
               title
               logo
               isTitlePrivate
               firstName
               isFirstNamePrivate
               lastName
               isLastNamePrivate
               middleName
               isMiddleNamePrivate
               qualification
               isQualificationPrivate
               certification 
               isCertificationPrivate 
               profilePic 
               isProfilePicPrivate 
               gender 
               isGenderPrivate 
               designation 
               isDesignationPrivate
               yearsOfExperience 
               isYOEPrivate 
               joiningDate 
               isJoiningDatePrivate
               firstJobJoiningDate 
               isFJJDPrivate 
               universities 
               isUniversitiesPrivate
               awards 
               isAwardsPrivate
               linkedInUrl 
               isLinkedInUrlPrivate
               about 
               isAboutPrivate
            }
          }

      `,
    variables: {
      portfoliodetailsId: portfoliodetailsId
    },
    forceFetch: true
  })
  console.log(result)
  const id = result.data.fetchStartupPortfolioManagement;
  // let data = _.omit(id,'__typename')
  // return data
  return id
}

export async function fetchDetailsStartupActionHandler(portfoliodetailsId) {
  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!) {
            fetchStartupPortfolioAboutUs(portfoliodetailsId: $portfoliodetailsId) {
                aboutUs{
                  description
                  logo{
                    fileName
                    fileUrl
                  }
                  isLogoPrivate
                  isDescriptionPrivate
                  annotatorId
                }
                clients{
                  description
                  isDescriptionPrivate
                  companyName
                  isCompanyNamePrivate
                  makePrivate
                }
                serviceProducts{
                  description
                  isDescriptionPrivate
                }
                information{
                  description
                  isDescriptionPrivate
                }
                assets{
                  assetType
                  quantity
                  description
                  isAssetTypePrivate
                  isQuantityTypePrivate
                  isDescriptionPrivate
                  makePrivate
                }
                branches{
                  name
                  isNamePrivate
                  phoneNumber
                  isPhoneNumberPrivate
                  address1
                  isAddressOnePrivate
                  address2
                  isAddressTwoPrivate
                  landmark
                  isLandmarkPrivate
                  area
                  isAreaPrivate
                  city
                  isCityPrivate
                  state
                  isStatePrivate
                  country
                  isCountryPrivate
                  addressImage
                  makePrivate
                }
                technologies{
                  technology
                  isTechnologyPrivate
                  description
                  isDescriptionPrivate
                  makePrivate
                }
                legalIssue{
                  description
                  isDescriptionPrivate
                }
            }
          }

      `,
    variables: {
      portfoliodetailsId: portfoliodetailsId
    },
    forceFetch: true
  })

  const data = result.data.fetchStartupPortfolioAboutUs;
  /*let data = _.omit(id,'__typename');*/
  let aboutUsArray = {}
  aboutUsArray["aboutUs"]=_.omit(data.aboutUs,'__typename');
  aboutUsArray["clients"]=_.map(data.clients, function (row) {return _.omit(row, ['__typename'])});
  aboutUsArray["serviceProducts"]=_.omit(data.serviceProducts,'__typename');
  aboutUsArray["information"]=_.omit(data.information,'__typename');
  aboutUsArray["branches"]=_.map(data.branches, function (row) {return _.omit(row, ['__typename'])});
  aboutUsArray["technologies"]=_.map(data.technologies, function (row) {return _.omit(row, ['__typename'])});
  aboutUsArray["legalIssue"]=_.omit(data.legalIssue,'__typename');
  aboutUsArray["assets"]=_.map(data.assets, function (row) {return _.omit(row, ['__typename'])});

  return aboutUsArray
}

export async function findStartupInvestorDetailsActionHandler(portfoliodetailsId) {

  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!) {
            fetchStartupPortfolioInvestor(portfoliodetailsId: $portfoliodetailsId) {
                name
                fundingType
                investmentAmount
                
                description
                isNamePrivate
               
                isInvestmentAmountPrivate
                isDescriptionPrivate
                makePrivate
            }
          }

      `,
    variables: {
      portfoliodetailsId: portfoliodetailsId
    },
    forceFetch: true
  })
  const id = result.data.fetchStartupPortfolioInvestor;
  // let data = _.omit(id,'__typename')
  // return data
  return id
}

export async function fetchStartupPortfolioLookingFor(portfoliodetailsId) {

  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!) {
            fetchStartupPortfolioLookingFor(portfoliodetailsId: $portfoliodetailsId) {
                type,
                isTypePrivate
                description
                isDescriptionPrivate
                makePrivate
            }
          }

      `,
    variables: {
      portfoliodetailsId: portfoliodetailsId
    },
    forceFetch: true
  })
  const id = result.data.fetchStartupPortfolioLookingFor;
  // let data = _.omit(id,'__typename')
  // return data
  return id
}

export async function fetchStartupPortfolioAwards(portfoliodetailsId) {

  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!) {
            fetchStartupPortfolioAwards(portfoliodetailsId: $portfoliodetailsId) {
                  award
                  isAwardPrivate
                  year
                  isYearPrivate
                  description
                  isDescriptionPrivate
                  makePrivate
            }
          }

      `,
    variables: {
      portfoliodetailsId: portfoliodetailsId
    },
    forceFetch: true
  })
  const id = result.data.fetchStartupPortfolioAwards;
  // let data = _.omit(id,'__typename')
  // return data
  return id
}
