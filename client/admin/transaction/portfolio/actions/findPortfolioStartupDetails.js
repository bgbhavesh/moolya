import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';
import _ from "underscore";

export async function findStartupManagementActionHandler(portfoliodetailsId) {

  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!) {
            fetchStartupPortfolioManagement(portfoliodetailsId: $portfoliodetailsId) {
               title
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
  console.log(result)
  const id = result.data.fetchStartupPortfolioManagement;
  let managementArray = [];
  managementArray=_.map(id, function (row) {return _.omit(row, ['__typename'])});
  // let data = _.omit(id,'__typename')
  // return data
  return managementArray;
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
                rating{
                  rating
                }
                clients{
                  description
                  isDescriptionPrivate
                  companyName
                  companyId
                  isCompanyNamePrivate
                  logo{
                    fileName
                    fileUrl
                  }
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
                  assetTypeId
                  quantity
                  description
                  isAssetTypePrivate
                  isQuantityTypePrivate
                  isDescriptionPrivate
                  makePrivate
                  logo{
                    fileName
                    fileUrl
                  }
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
                  logo{
                    fileName
                    fileUrl
                  }
                }
                technologies{
                  technology
                  technologyId
                  isTechnologyPrivate
                  description
                  isDescriptionPrivate
                  makePrivate
                  logo{
                    fileName
                    fileUrl
                  }
                }
                legalIssue{
                  description
                  isDescriptionPrivate
                }
                rating{
                  rating
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
  aboutUsArray["rating"]=_.omit(data.rating,'__typename');

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
                logo{
                    fileName
                    fileUrl
                  }
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
                typeId,
                isTypePrivate
                description
                isDescriptionPrivate
                logo{
                    fileName
                    fileUrl
                  }
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
                  awardId
                  index
                  isAwardPrivate
                  year
                  isYearPrivate
                  description
                  isDescriptionPrivate
                  logo{
                    fileName
                    fileUrl
                  }
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
export async function fetchStartupPortfolioMemberships(portfoliodetailsId) {

  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!) {
            fetchStartupPortfolioMemberships(portfoliodetailsId: $portfoliodetailsId) {
                  description
                  isDescriptionPrivate
            }
          }

      `,
    variables: {
      portfoliodetailsId: portfoliodetailsId
    },
    forceFetch: true
  })
  const id = result.data.fetchStartupPortfolioMemberships;
  let data = _.omit(id,'__typename')
  return data
  // return id
}
export async function fetchStartupPortfolioCompliances(portfoliodetailsId) {

  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!) {
            fetchStartupPortfolioCompliances(portfoliodetailsId: $portfoliodetailsId) {
                  description
                  isDescriptionPrivate
            }
          }

      `,
    variables: {
      portfoliodetailsId: portfoliodetailsId
    },
    forceFetch: true
  })
  const id = result.data.fetchStartupPortfolioCompliances;
  let data = _.omit(id,'__typename')
  return data
  // return id
}
export async function fetchStartupPortfolioLicenses(portfoliodetailsId) {

  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!) {
            fetchStartupPortfolioLicenses(portfoliodetailsId: $portfoliodetailsId) {
                  description
                  isDescriptionPrivate
            }
          }

      `,
    variables: {
      portfoliodetailsId: portfoliodetailsId
    },
    forceFetch: true
  })
  const id = result.data.fetchStartupPortfolioLicenses;
  let data = _.omit(id,'__typename')
  return data
  // return id
}
