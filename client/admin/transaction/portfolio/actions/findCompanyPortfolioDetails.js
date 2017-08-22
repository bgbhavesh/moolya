import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';
import _ from "underscore";


export async function fetchDetailsCompanyActionHandler(portfoliodetailsId) {
  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!) {
            fetchCompanyPortfolioAboutUs(portfoliodetailsId: $portfoliodetailsId) {
                aboutUs{
                      logo{
                        fileName,
                        fileUrl
                      }
                      companyDescription,
                      annotatorId,
                      isLogoPrivate,
                      isCompanyDescriptionPrivate,
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
                      isSPDescriptionPrivate,
                      privateFields{
                          keyName,
                          booleanKey
                      }
                  },
                  information{
                      informationDescription,
                      isInformationDescriptionPrivate,
                      privateFields{
                          keyName,
                          booleanKey
                      }
                  },
                  clients{
                      clientName,
                      isClientNamePrivate,
                      logo{
                          fileName,
                          fileUrl
                      },
                      clientDescription,
                      isClientDescriptionPrivate,
                      makePrivate,
                      index,
                      privateFields{
                          keyName,
                          booleanKey
                      }
                  },
            }
          }

      `,
    variables: {
      portfoliodetailsId: portfoliodetailsId
    },
    forceFetch: true
  })

  const data = result.data.fetchCompanyPortfolioAboutUs;
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


export async function fetchCompanyDetailsHandler(portfoliodetailsId, key) {

  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!, $key:String) {
              fetchCompanyDetails(portfoliodetailsId:$portfoliodetailsId, key:$key){
                  aboutUs{
                      logo{
                        fileName,
                        fileUrl
                      }
                      companyDescription,
                      annotatorId,
                      isLogoPrivate,
                      isCompanyDescriptionPrivate,
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
                      isSPDescriptionPrivate,
                      privateFields{
                          keyName,
                          booleanKey
                      }
                  },
                  information{
                      informationDescription,
                      isInformationDescriptionPrivate,
                      privateFields{
                          keyName,
                          booleanKey
                      }
                  },
                  clients{
                      clientName,
                      isClientNamePrivate,
                      logo{
                          fileName,
                          fileUrl
                      },
                      clientDescription,
                      isClientDescriptionPrivate,
                      makePrivate,
                      index,
                      privateFields{
                          keyName,
                          booleanKey
                      }
                  },
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
                     about
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
                  awardsRecognition{
                      awardName
                      awardId
                      isAwardPrivate
                      year
                      isYearPrivate
                      awardsDescription
                      isAwardsDescriptionPrivate
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
                    membershipsDescription,
                    isMembershipsDescriptionPrivate,
                    privateFields{
                        keyName,
                        booleanKey
                    }
                  },
                  
                  compliances{
                     compliancesDescription, 
                     isCompliancesDescriptionPrivate,
                     privateFields{
                        keyName,
                        booleanKey
                     }
                  },
                  
                  licenses{
                     licensesDescription, 
                     isLicensesDescriptionPrivate,
                     privateFields{
                        keyName,
                        booleanKey
                     }
                  }
                  startupIncubators{
                     startupIncubatorsDescription, 
                     isStartupIncubatorsPrivate,
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

  var response = result.data.fetchCompanyDetails;
  return response;

}



export async function fetchCompanyPortfolioData(portfoliodetailsId, connection) {

  const result = await connection.query({
    query: gql`
          query ($portfoliodetailsId: String!) {
            fetchCompanyPortfolioData(portfoliodetailsId: $portfoliodetailsId) {
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
  const id = result.data.fetchCompanyPortfolioData;
  let data = _.omit(id, '__typename')
  return data
  // return id
}

export async function fetchDetailsCompanyChartsActionHandler(portfoliodetailsId) {
  const result = await client.query({
    query: gql`
          query ($portfoliodetailsId: String!) {
            fetchCompanyPortfolioCharts(portfoliodetailsId: $portfoliodetailsId) {
               
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

  const data = result.data.fetchCompanyPortfolioCharts;
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
