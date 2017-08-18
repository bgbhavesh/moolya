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
                  isRatingPrivate
                }
                clients{
                  companyName
                  isCompanyNamePrivate
                  description
                  isDescriptionPrivate
                  logo{
                    fileName
                    fileUrl
                  }
                  makePrivate
                  index
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
                  assetTypeName
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
                  index
                }
                branches{
                  addressTypeId
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
                  cityId
                  isCityPrivate
                  state
                  stateId
                  isStatePrivate
                  country
                  countryId
                  isCountryPrivate
                  addressImage
                  makePrivate
                  logo{
                    fileName
                    fileUrl
                  }
                  index
                }
                technologies{
                  technologyName
                  technologyId
                  isTechnologyPrivate
                  description
                  isDescriptionPrivate
                  makePrivate
                  logo{
                    fileName
                    fileUrl
                  }
                  index
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
  let data = _.omit(id, '__typename')
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
  let data = _.omit(id, '__typename')
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
  let data = _.omit(id, '__typename')
  return data
  // return id
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


export async function fetchStartupDetailsHandler(portfoliodetailsId, key) {

  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!, $key:String) {
              fetchStartupDetails(portfoliodetailsId:$portfoliodetailsId, key:$key){
                  management{
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
                     managmentAbout
                     isAboutPrivate
                      logo{
                        fileName
                        fileUrl
                      }
                      index
                      privateFields{
                          keyName,
                          booleanKey
                      }
                  },
                  investor{
                    investorName,
                    fundingType,
                    fundingTypeId,
                    investmentAmount,
                    investorDescription,
                    isNamePrivate,
                    isInvestmentAmountPrivate,
                    isDescriptionPrivate,
                    logo{
                      fileName,
                      fileUrl
                    },
                    makePrivate,
                    index
                    privateFields{
                        keyName,
                        booleanKey
                    }
                  },
                  awardsRecognition{
                      awardName
                      awardId
                      isAwardPrivate
                      year
                      isYearPrivate
                      awardsDescription
                      isDescriptionPrivate
                      logo{
                        fileName,
                        fileUrl
                      },
                      makePrivate,
                      index
                      privateFields{
                          keyName,
                          booleanKey
                      }
                  },
                  
                  lookingFor{
                      lookingForName,
                      typeId,
                      isTypePrivate,
                      lookingDescription,
                      isDescriptionPrivate,
                      logo{
                        fileName,
                        fileUrl
                      },
                      makePrivate,
                      index
                      privateFields{
                          keyName,
                          booleanKey
                      }
                  },
                  
                  memberships{
                    membershipDescription,
                    isDescriptionPrivate,
                    privateFields{
                        keyName,
                        booleanKey
                    }
                  },
                  
                  compliances{
                     complianceDescription, 
                     isDescriptionPrivate,
                     privateFields{
                        keyName,
                        booleanKey
                     }
                  },
                  
                  licenses{
                     licenseDescription, 
                     isDescriptionPrivate,
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

  var response = result.data.fetchStartupDetails;
  return response;

}
