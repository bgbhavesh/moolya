import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';
import _ from "underscore";



export async function fetchInstitutionDetailsHandler(portfoliodetailsId, key) {
  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!, $key:String) {
              fetchInstitutionDetails(portfoliodetailsId:$portfoliodetailsId, key:$key){
                  
                  memberships{
                    membershipDescription,
                    privateFields{
                        keyName,
                        booleanKey
                    }
                  },
                  
                  compliances{
                     complianceDescription, 
                     privateFields{
                        keyName,
                        booleanKey
                     }
                  },
                  
                  licenses{
                     licenseDescription, 
                     privateFields{
                        keyName,
                        booleanKey
                     }
                  }
              }
          }
      `,
    variables: {
      portfoliodetailsId: portfoliodetailsId,
      key: key
    },
    forceFetch: true
  })

  var response = result.data.fetchInstitutionDetails;
  return response;
}


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
                index
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
  managementArray = _.map(id, function (row) {
    return _.omit(row, ['__typename'])
  });
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
                  startupDescription,
                  logo{
                    fileName,
                    fileUrl
                  }
                  isLogoPrivate,
                  isDescriptionPrivate,
                  annotatorId
                }
                rating{
                  rating,
                  isRatingPrivate,
                  privateFields{
                      keyName,
                      booleanKey
                  }
                }
                clients{
                  companyName
                  isCompanyNamePrivate
                  clientDescription
                  isDescriptionPrivate
                  logo{
                    fileName
                    fileUrl
                  }
                  makePrivate
                  index
                }
                serviceProducts{
                  spDescription
                  isDescriptionPrivate
                }
                information{
                  informationDescription
                  isDescriptionPrivate
                }
                assets{
                  assetTypeName
                  assetTypeId
                  quantity
                  assetDescription
                  isAssetTypePrivate
                  isQuantityTypePrivate
                  isDescriptionPrivate
                  makePrivate
                  logo{
                    fileName
                    fileUrl
                  }
                  index
                }
                branches{
                  addressTypeId
                  branchName
                  isNamePrivate
                  branchPhoneNumber
                  isPhoneNumberPrivate
                  branchAddress1
                  isAddressOnePrivate
                  branchAddress2
                  isAddressTwoPrivate
                  branchLandmark
                  isLandmarkPrivate
                  branchArea
                  isAreaPrivate
                  branchCity
                  cityId
                  isCityPrivate
                  branchState
                  stateId
                  isStatePrivate
                  branchCountry
                  countryId
                  isCountryPrivate
                  addressImage
                  makePrivate
                  branchLogo{
                    fileName
                    fileUrl
                  }
                  index
                }
                technologies{
                  technologyName
                  technologyId
                  isTechnologyPrivate
                  technologyDescription
                  isDescriptionPrivate
                  makePrivate
                  logo{
                    fileName
                    fileUrl
                  }
                  index
                }
                legalIssue{
                  legalDescription
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
  aboutUsArray["aboutUs"] = _.omit(data.aboutUs, '__typename');
  aboutUsArray["clients"] = _.map(data.clients, function (row) {
    return _.omit(row, ['__typename'])
  });
  aboutUsArray["serviceProducts"] = _.omit(data.serviceProducts, '__typename');
  aboutUsArray["information"] = _.omit(data.information, '__typename');
  aboutUsArray["branches"] = _.map(data.branches, function (row) {
    return _.omit(row, ['__typename'])
  });
  aboutUsArray["technologies"] = _.map(data.technologies, function (row) {
    return _.omit(row, ['__typename'])
  });
  aboutUsArray["legalIssue"] = _.omit(data.legalIssue, '__typename');
  aboutUsArray["assets"] = _.map(data.assets, function (row) {
    return _.omit(row, ['__typename'])
  });
  aboutUsArray["rating"] = _.omit(data.rating, '__typename');

  return aboutUsArray
}

export async function findStartupInvestorDetailsActionHandler(portfoliodetailsId) {

  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!) {
            fetchStartupPortfolioInvestor(portfoliodetailsId: $portfoliodetailsId) {
                name
                fundingTypeId
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
                index
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
                lookingForName,
                typeId,
                isTypePrivate
                description
                isDescriptionPrivate
                logo{
                    fileName
                    fileUrl
                  }
                index
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
  return id
}

export async function fetchStartupPortfolioAwards(portfoliodetailsId) {
  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!) {
            fetchStartupPortfolioAwards(portfoliodetailsId: $portfoliodetailsId) {
                  awardId
                  awardName
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
  return id
}

export async function fetchStartupPortfolioData(portfoliodetailsId, connection) {

  const result = await connection.query({
    query: gql`
          query ($portfoliodetailsId: String!) {
            fetchStartupPortfolioData(portfoliodetailsId: $portfoliodetailsId) {
                  balanceSheet{
                    fileUrl
                    fileName
                   } 
                  profitAndLoss{
                    fileUrl
                    fileName
                   } 
                  quaterlyReport{
                    fileUrl
                    fileName
                   } 
                  yearlyReport{
                    fileUrl
                    fileName
                   } 
                  halfYearlyReport{
                    fileUrl
                    fileName
                   } 
                  annualReport{
                    fileUrl
                    fileName
                   } 
                  cashFlow{
                    fileUrl
                    fileName
                   } 
                  shareHoldings{
                    fileUrl
                    fileName
                   } 
                  capitalStructure{
                    fileUrl
                    fileName
                   } 
                  ratio{
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
  const id = result.data.fetchStartupPortfolioData;
  let data = _.omit(id, '__typename')
  return data
  // return id
}

export async function fetchDetailsStartupChartsActionHandler(portfoliodetailsId) {
  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!) {
            fetchStartupPortfolioCharts(portfoliodetailsId: $portfoliodetailsId) {
               
                employmentOfCompanyChart{
                    eofAbout
                    eofFromMonth
                    eofFromYear
                    eofToMonth
                    eofToYear
                    eofNumberOfEmployment
                    index
                }
                profitRevenueLiabilityChart{
                    prlEntityType
                    prlFromMonth
                    prlFromYear
                    prlToMonth
                    prlToYear
                    pelValueType
                    prlValue
                    prlabout
                    index
                }
                reviewOfCompanyChart{
                    rofYear
                    rofValue
                    rofAbout
                    index
                }
                employeeBreakupDepartmentChart{
                    ebdFromMonth
                    ebdFromYear
                    ebdToMonth
                    ebdToYear
                    ebdDepartment
                    ebdNumberOfEmployment
                    ebdAbout
                    ebdDepartmentName
                    index
                }
            }
          }

      `,
    variables: {
      portfoliodetailsId: portfoliodetailsId
    },
    forceFetch: true
  })

  const data = result.data.fetchStartupPortfolioCharts;
  /*let data = _.omit(id,'__typename');*/
  let chartsArray = {}
  chartsArray["employmentOfCompanyChart"] = _.map(data.employmentOfCompanyChart, function (row) {
    return _.omit(row, ['__typename'])
  });
  chartsArray["profitRevenueLiabilityChart"] = _.map(data.profitRevenueLiabilityChart, function (row) {
    return _.omit(row, ['__typename'])
  });
  chartsArray["reviewOfCompanyChart"] = _.map(data.reviewOfCompanyChart, function (row) {
    return _.omit(row, ['__typename'])
  });
  chartsArray["employeeBreakupDepartmentChart"] = _.map(data.employeeBreakupDepartmentChart, function (row) {
    return _.omit(row, ['__typename'])
  });

  return chartsArray
}
