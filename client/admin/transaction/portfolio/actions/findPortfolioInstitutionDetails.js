import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';
import _ from "underscore";



export async function fetchInstitutionDetailsHandler(portfoliodetailsId, key) {
  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!, $key:String) {
              fetchInstitutionDetails(portfoliodetailsId:$portfoliodetailsId, key:$key){
                  aboutUs{
                      logo{
                        fileName,
                        fileUrl
                      }
                      institutionDescription,
                      annotatorId,
                      isLogoPrivate,
                      isDescriptionPrivate,
                      privateFields{
                          keyName,
                          booleanKey
                      }
                  },
                  rating{
                      rating,
                      isRatingPrivate,
                      privateFields{
                          keyName,
                          booleanKey
                      }
                  },
                  serviceProducts{
                      spDescription,
                      isDescriptionPrivate,
                      privateFields{
                          keyName,
                          booleanKey
                      }
                  },
                  information{
                      informationDescription,
                      isDescriptionPrivate,
                      privateFields{
                          keyName,
                          booleanKey
                      }
                  },
                  clients{
                      companyName,
                      isCompanyNamePrivate,
                      logo{
                          fileName,
                          fileUrl
                      },
                      clientDescription,
                      isDescriptionPrivate,
                      makePrivate,
                      index,
                      privateFields{
                          keyName,
                          booleanKey
                      }
                  },
                  memberships{
                    membershipDescription,
                    privateFields{
                        keyName,
                        booleanKey,
                        tabName
                    }
                  },
                  
                  compliances{
                     complianceDescription, 
                     privateFields{
                        keyName,
                        booleanKey,
                        tabName
                     }
                  },
                  
                  licenses{
                     licenseDescription, 
                     privateFields{
                        keyName,
                        booleanKey,
                        tabName
                     }
                  }
                  
                  lookingFor{
                      lookingForName,
                      lookingForId,
                      lookingDescription,
                      index
                      privateFields{
                          keyName
                          booleanKey
                          index
                          tabName
                      }
                      makePrivate
                  }
                  
                  awardsRecognition{
                      awardName
                      awardId
                      year
                      awardsDescription
                      logo{
                        fileName
                        fileUrl
                      }
                      index
                      makePrivate
                      privateFields{
                          keyName
                          booleanKey
                      }
                  }
                  
                  intrapreneurRecognition{
                      intrapreneurName
                      year
                      intrapreneurDescription
                      logo{
                        fileName
                        fileUrl
                      }
                      index
                      privateFields{
                          keyName
                          booleanKey
                      }
                      makePrivate
                  }
                  
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
                  }
                  
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
                  }
                  
                  achievements{
                      achievementName
                      isAchievementNamePrivate
                      achievementDescription
                      isAchievementDescriptionPrivate
                      logo{
                          fileName
                          fileUrl
                        }
                      index
                      privateFields{
                          keyName,
                          booleanKey
                      }
                      makePrivate
                  }
                  
                  policy{
                      institutionPolicyDescription,
                      institutionPolicyDescriptionPrivate,
                      privateFields{
                          keyName,
                          booleanKey
                      }
                  }
                  evolution{
                      institutionEvolutionDescription,
                      institutionEvolutionDescriptionPrivate,
                      privateFields{
                          keyName,
                          booleanKey
                      }
                  }
                  institutionIncubators{
                     institutionIncubatorsDescription, 
                     isInstitutionIncubatorsPrivate,
                     privateFields{
                        keyName,
                        booleanKey
                     }
                  }
                  sectorsAndServices{
                     sectorsAndServicesDescription, 
                     isSectorsAndServicesPrivate,
                     privateFields{
                        keyName,
                        booleanKey
                     }
                  }
                  listOfIncubators{
                     listOfIncubatorsDescription, 
                     isListOfIncubatorsPrivate,
                     privateFields{
                        keyName,
                        booleanKey
                     }
                  },
                  
                   researchAndDevelopment{
                      researchAndDevelopmentName
                      isResearchAndDevelopmentNamePrivate
                      researchAndDevelopmentDescription
                      isResearchAndDevelopmentDescriptionPrivate
                      logo{
                          fileName
                          fileUrl
                        }
                      index
                      privateFields{
                          keyName,
                          booleanKey
                      }
                      makePrivate
                  }
                  partners {
                    title
                    firstName
                    isFirstNamePrivate
                    lastName
                    isLastNamePrivate
                    designation
                    isDesignationPrivate
                    partnerCompanyName
                    isCompanyNamePrivate
                    duration
                    isDurationPrivate
                    yearsOfExperience
                    isYearsOfExperiencePrivate
                    qualification
                    aboutPartner
                    isQualificationPrivate
                    isAboutPartnerPrivate
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
                    privateFields{
                      keyName,
                      booleanKey
                    }
                    makePrivate
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


// export async function findStartupManagementActionHandler(portfoliodetailsId) {
//
//   const result = await client.query({
//     query: gql`
//           query ($portfoliodetailsId: String!) {
//             fetchStartupPortfolioManagement(portfoliodetailsId: $portfoliodetailsId) {
//                title
//                isTitlePrivate
//                firstName
//                isFirstNamePrivate
//                lastName
//                isLastNamePrivate
//                middleName
//                isMiddleNamePrivate
//                qualification
//                isQualificationPrivate
//                certification
//                isCertificationPrivate
//                profilePic
//                isProfilePicPrivate
//                gender
//                isGenderPrivate
//                designation
//                isDesignationPrivate
//                yearsOfExperience
//                isYOEPrivate
//                joiningDate
//                isJoiningDatePrivate
//                firstJobJoiningDate
//                isFJJDPrivate
//                universities
//                isUniversitiesPrivate
//                awards
//                isAwardsPrivate
//                linkedInUrl
//                isLinkedInUrlPrivate
//                about
//                isAboutPrivate
//                 logo{
//                   fileName
//                   fileUrl
//                 }
//                 index
//             }
//           }
//
//       `,
//     variables: {
//       portfoliodetailsId: portfoliodetailsId
//     },
//     forceFetch: true
//   })
//   console.log(result)
//   const id = result.data.fetchStartupPortfolioManagement;
//   let managementArray = [];
//   managementArray = _.map(id, function (row) {
//     return _.omit(row, ['__typename'])
//   });
//   // let data = _.omit(id,'__typename')
//   // return data
//   return managementArray;
// }

export async function fetchDetailsInstitutionActionHandler(portfoliodetailsId) {
  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!) {
            fetchInstitutionPortfolioAboutUs(portfoliodetailsId: $portfoliodetailsId) {
                aboutUs{
                  institutionDescription,
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
            }
          }

      `,
    variables: {
      portfoliodetailsId: portfoliodetailsId
    },
    forceFetch: true
  })

  const data = result.data.fetchInstitutionPortfolioAboutUs;
  /*let data = _.omit(id,'__typename');*/
  let aboutUsArray = {}
  aboutUsArray["aboutUs"] = _.omit(data.aboutUs, '__typename');
  aboutUsArray["clients"] = _.map(data.clients, function (row) {
    return _.omit(row, ['__typename'])
  });
  aboutUsArray["serviceProducts"] = _.omit(data.serviceProducts, '__typename');
  aboutUsArray["information"] = _.omit(data.information, '__typename');
  aboutUsArray["rating"] = _.omit(data.rating, '__typename');

  return aboutUsArray
}

export async function fetchInstitutionPortfolioData(portfoliodetailsId, connection) {

  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!) {
            fetchInstitutionPortfolioData(portfoliodetailsId: $portfoliodetailsId) {
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
  const id = result.data.fetchInstitutionPortfolioData;
  let reportsArray = {}
  reportsArray["balanceSheet"] = _.map(id.balanceSheet, function (row) {
    return _.omit(row, ['__typename'])
  });
  reportsArray["profitAndLoss"] = _.map(id.profitAndLoss, function (row) {
    return _.omit(row, ['__typename'])
  });
  reportsArray["quaterlyReport"] = _.map(id.quaterlyReport, function (row) {
    return _.omit(row, ['__typename'])
  });
  reportsArray["yearlyReport"] = _.map(id.yearlyReport, function (row) {
    return _.omit(row, ['__typename'])
  });
  reportsArray["halfYearlyReport"] = _.map(id.halfYearlyReport, function (row) {
    return _.omit(row, ['__typename'])
  });
  reportsArray["annualReport"] = _.map(id.annualReport, function (row) {
    return _.omit(row, ['__typename'])
  });
  reportsArray["cashFlow"] = _.map(id.cashFlow, function (row) {
    return _.omit(row, ['__typename'])
  });
  reportsArray["shareHoldings"] = _.map(id.shareHoldings, function (row) {
    return _.omit(row, ['__typename'])
  });
  reportsArray["ratio"] = _.map(id.ratio, function (row) {
    return _.omit(row, ['__typename'])
  });
  reportsArray["capitalStructure"] = _.map(id.capitalStructure, function (row) {
    return _.omit(row, ['__typename'])
  });

  /*return chartsArray
   let data = _.omit(id, '__typename')*/
  return reportsArray
  // return id
}

export async function fetchInstitutionPortfolioReports(portfoliodetailsId, connection) {

  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!) {
            fetchInstitutionPortfolioCSRReports(portfoliodetailsId: $portfoliodetailsId) {
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
  const id = result.data.fetchInstitutionPortfolioCSRReports;
  let reportsArray = {}
  reportsArray["balanceSheet"] = _.map(id.balanceSheet, function (row) {
    return _.omit(row, ['__typename'])
  });
  reportsArray["profitAndLoss"] = _.map(id.profitAndLoss, function (row) {
    return _.omit(row, ['__typename'])
  });
  reportsArray["quaterlyReport"] = _.map(id.quaterlyReport, function (row) {
    return _.omit(row, ['__typename'])
  });
  reportsArray["yearlyReport"] = _.map(id.yearlyReport, function (row) {
    return _.omit(row, ['__typename'])
  });
  reportsArray["halfYearlyReport"] = _.map(id.halfYearlyReport, function (row) {
    return _.omit(row, ['__typename'])
  });
  reportsArray["annualReport"] = _.map(id.annualReport, function (row) {
    return _.omit(row, ['__typename'])
  });
  reportsArray["cashFlow"] = _.map(id.cashFlow, function (row) {
    return _.omit(row, ['__typename'])
  });
  reportsArray["shareHoldings"] = _.map(id.shareHoldings, function (row) {
    return _.omit(row, ['__typename'])
  });
  reportsArray["ratio"] = _.map(id.ratio, function (row) {
    return _.omit(row, ['__typename'])
  });
  reportsArray["capitalStructure"] = _.map(id.capitalStructure, function (row) {
    return _.omit(row, ['__typename'])
  });

  /*return chartsArray
  let data = _.omit(id, '__typename')*/
  return reportsArray
  // return id
}

export async function fetchInstitutionChartsDetailsActionHandler(portfoliodetailsId) {
  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!) {
            fetchInstitutePortfolioCharts(portfoliodetailsId: $portfoliodetailsId) {
               
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

  const data = result.data.fetchInstitutePortfolioCharts;
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
