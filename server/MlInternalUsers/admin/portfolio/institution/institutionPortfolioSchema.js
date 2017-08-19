/**
 * Created by venkatasrinag on 3/4/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../../commons/mlSchemaDef';
import MlResolver from '../../../../commons/mlResolverDef'


let institutePortfolioSchema = `
    type imagesTypeSchema{
        fileUrl   : String,
        fileName  : String,
        isDefault : Boolean
    }
    
    type instituteManagementOutput{
       title :String
       isTitlePrivate : Boolean
       firstName : String
       isFirstNamePrivate : Boolean
       lastName : String
       isLastNamePrivate : Boolean
       middleName : String
       isMiddleNamePrivate : Boolean
       qualification : String
       isQualificationPrivate :  Boolean
       certification : String
       isCertificationPrivate : Boolean
       profilePic : String
       isProfilePicPrivate : Boolean
       gender : String
       isGenderPrivate : Boolean
       designation : String
       isDesignationPrivate: Boolean
       yearsOfExperience : String
       isYOEPrivate : Boolean
       joiningDate : String
       isJoiningDatePrivate : Boolean
       firstJobJoiningDate : String
       isFJJDPrivate : Boolean
       universities :   String
       isUniversitiesPrivate: Boolean
       awards : String
       isAwardsPrivate : Boolean
       linkedInUrl : String
       isLinkedInUrlPrivate : Boolean
       about : String
       isAboutPrivate:Boolean
       logo:imagesTypeSchema,
       index: Int
    }
   
    
    type clientsOutput{
        companyName:String,
        isCompanyNamePrivate:Boolean,
        logo:imagesTypeSchema,
        description:String,
        isDescriptionPrivate:Boolean,
        makePrivate:Boolean,
        index:Int,
    }  
    

    type informationOutput{
       description:String,
       isDescriptionPrivate:Boolean
    }
    
    type serviceProductsOutput{
        description:String,
        isDescriptionPrivate:Boolean
    }
    
    type imageFilesInputSchemaOutput{
       fileUrl: String,
       fileName:String
     }   
    
    type aboutUsOutput{
        aboutImages      : [imagesTypeSchema]
        aboutTitle : String
        aboutDescription: String
        annotatorId : String
        isLogoPrivate :Boolean
        isDescriptionPrivate : Boolean
    }
    
    type awardsRecognitionOutput{
          awardName:String
          awardId:String
          isAwardPrivate:Boolean
          year:String
          isYearPrivate:Boolean
          description:String
          isDescriptionPrivate:Boolean
          logo:imagesTypeSchema,
          makePrivate:Boolean,
          index: Int
    }

    type membershipsOutput{
        description:String, 
        isDescriptionPrivate :Boolean
    }
    
    type compliancesOutput{
        description:String, 
        isDescriptionPrivate :Boolean
    }
    
    type licensesOutput{
        description:String, 
        isDescriptionPrivate :Boolean
    }
    
    type ratingOutput{,
        rating:String
        isRatingPrivate:Boolean
    }
    type institutePortfolioAboutUsOutput{
        portfolioDetailsId  : String
        aboutUs             : aboutUsOutput
        rating              : ratingOutput
        serviceProducts     : serviceProductsOutput
        information         : informationOutput
        clients             : [clientsOutput]
        data                : dataOutput
    }

   type EmploymentOfCompany{
      eofAbout: String
      eofFromMonth: String
      eofFromYear: String
      eofToMonth: String
      eofToYear: String
      eofNumberOfEmployment: Int
      index : Int
   }
    type ProfitRevenueLiability{
      prlEntityType: String
      prlFromMonth: String
      prlFromYear: String
      prlToMonth: String
      prlToYear: String
      pelValueType: String
      prlValue: Int
      prlabout:String
      index : Int
    }
    type ReviewOfCompany{
      rofYear: String
      rofValue: Int
      rofAbout: String
      index : Int
    }
    type EmployeeBreakupDepartment{
      ebdFromMonth: String
      ebdFromYear: String
      ebdToMonth: String
      ebdToYear: String
      ebdDepartment: String
      ebdNumberOfEmployment: Int
      ebdAbout: String
      index : Int
      ebdDepartmentName:String
    }
        
   type chartsOutput{
      employmentOfCompanyChart:[EmploymentOfCompany]
      profitRevenueLiabilityChart:[ProfitRevenueLiability]
      reviewOfCompanyChart:[ReviewOfCompany]
      employeeBreakupDepartmentChart:[EmployeeBreakupDepartment]
    }
    
    type dataOutput{
      balanceSheet: [imagesTypeSchema]
      profitAndLoss: [imagesTypeSchema]
      quaterlyReport: [imagesTypeSchema]
      yearlyReport: [imagesTypeSchema]
      halfYearlyReport: [imagesTypeSchema]
      annualReport: [imagesTypeSchema]
      cashFlow: [imagesTypeSchema]
      shareHoldings: [imagesTypeSchema]
      capitalStructure: [imagesTypeSchema]
      ratio: [imagesTypeSchema]
    }
    
    type InstitutePortfolio{
      management        : [instituteManagementOutput],
      data              : dataOutput,
      charts            : chartsOutput,
      awardsRecognition : [awardsRecognitionOutput],
      memberships       : membershipsOutput,
      compliances       : compliancesOutput,
      licenses          : licensesOutput      
   }
   
    
    input logo{
      fileName : String,
      fileUrl:String,
      isDefault:Boolean
    }
    
    input instituteManagement{
       title :String
       isTitlePrivate : Boolean
       firstName : String
       isFirstNamePrivate : Boolean
       lastName : String
       isLastNamePrivate : Boolean
       middleName : String
       isMiddleNamePrivate : Boolean
       qualification : String
       isQualificationPrivate :  Boolean
       certification : String
       isCertificationPrivate : Boolean
       profilePic : String
       isProfilePicPrivate : Boolean
       gender : String
       isGenderPrivate : Boolean
       designation : String
       isDesignationPrivate: Boolean
       yearsOfExperience : String
       isYOEPrivate : Boolean
       joiningDate : String
       isJoiningDatePrivate : Boolean
       firstJobJoiningDate : String
       isFJJDPrivate : Boolean
       universities :   String
       isUniversitiesPrivate: Boolean
       awards : String
       isAwardsPrivate : Boolean
       linkedInUrl : String
       isLinkedInUrlPrivate : Boolean
       about : String
       isAboutPrivate:Boolean
       logo:logo
       index: Int
    }
  
    input clients{
        companyName:String,
        isCompanyNamePrivate:Boolean,
        logo:logo,
        description:String,
        isDescriptionPrivate:Boolean,
        makePrivate:Boolean,
        index:Int
    }
   
    input investor{
        name:String,
        fundingType:String,
        fundingTypeId:String,
        investmentAmount:String,
        investorImage:String,
        description:String,
        isNamePrivate:Boolean,
        isInvestorImagePrivate:Boolean,
        isInvestmentAmountPrivate:Boolean,
        isDescriptionPrivate:Boolean,
        logo:logo,
        makePrivate:Boolean
        index: Int
    }
    

    input information{
        description:String,
        isDescriptionPrivate:Boolean
    }
    
    input serviceProducts{
        description:String,
        isDescriptionPrivate:Boolean
    }
    
    input legalIssue{
        description:String,
        isDescriptionPrivate:Boolean
    }
    
    input data{
      balanceSheet: [imageFilesInputSchema]
      profitAndLoss: [imageFilesInputSchema]
      quaterlyReport: [imageFilesInputSchema]
      yearlyReport: [imageFilesInputSchema]
      halfYearlyReport: [imageFilesInputSchema]
      annualReport: [imageFilesInputSchema]
      cashFlow: [imageFilesInputSchema]
      shareHoldings: [imageFilesInputSchema]
      capitalStructure: [imageFilesInputSchema]
      ratio: [imageFilesInputSchema]
    }
    
    input imageFilesInputSchema{
       fileUrl: String,
       fileName:String
     }
     
    input rating{
        rating:String
        isRatingPrivate:Boolean
    }
    
    input aboutUs{
        aboutImages      : [imageFilesInputSchema]
        aboutImages : String
        aboutDescription : String
        annotatorId : String
        isLogoPrivate :Boolean
        isDescriptionPrivate : Boolean
    }
    
    input awardsRecognition{
          awardName:String
          awardId:String
          isAwardPrivate:Boolean
          year:String
          isYearPrivate:Boolean
          description:String
          isDescriptionPrivate:Boolean
          makePrivate:Boolean
          logo : logo,
          index: Int
    }

    input memberships{
        description:String, 
        isDescriptionPrivate :Boolean
    }
    
    input compliances{
         description:String, 
        isDescriptionPrivate :Boolean
    }
    
    input licenses{
         description:String, 
        isDescriptionPrivate :Boolean
    }
    input employmentOfCompany{
      eofAbout: String
      eofFromMonth: String
      eofFromYear: String
      eofToMonth: String
      eofToYear: String
      eofNumberOfEmployment: Int
      index: Int
    }
    input profitRevenueLiability{
      prlEntityType: String
      prlFromMonth: String
      prlFromYear: String
      prlToMonth: String
      prlToYear: String
      pelValueType: String
      prlValue: Int
      prlabout:String
      index : Int
    }
    input reviewOfCompany{
      rofYear: String
      rofValue: Int
      rofAbout: String
      index : Int
    }
    input employeeBreakupDepartment{
      ebdFromMonth: String
      ebdFromYear: String
      ebdToMonth: String
      ebdToYear: String
      ebdDepartment: String
      ebdNumberOfEmployment: Int
      ebdAbout: String
      index : Int
    }
   
    input institutePortfolio{
        portfolioDetailsId  : String
        licenses            : licenses
        compliances         : compliances
        memberships         : memberships
        awardsRecognition : [awardsRecognition]
        aboutUs             : aboutUs
        rating              : rating
        serviceProducts     : serviceProducts
        information         : information
        investor            : [investor]
        clients             : [clients]
        management          : [instituteManagement]
        employmentOfCompanyChart: [employmentOfCompany]
        reviewOfCompanyChart: [reviewOfCompany]
        profitRevenueLiabilityChart:  [profitRevenueLiability]
        employeeBreakupDepartmentChart: [employeeBreakupDepartment]
        legalIssue          : legalIssue
        data                : data
    }
    type institutePortfolioOutput{
        _id                  : String
        userId               : String
        communityType        : String
        portfolioDetailsId   : String
        aboutUs              : aboutUsOutput
    }
    
    type Query{
        fetchInstitutePortfolioAboutUs(portfoliodetailsId:String!):institutePortfolioAboutUsOutput
        fetchInstitutePortfolioLicenses(portfoliodetailsId:String!):licensesOutput
        fetchInstitutePortfolioMemberships(portfoliodetailsId:String!):membershipsOutput
        fetchInstitutePortfolioCompliances(portfoliodetailsId:String!):compliancesOutput
        fetchInstitutePortfolioManagement(portfoliodetailsId:String!):[instituteManagementOutput]
        fetchInstitutePortfolioAwards(portfoliodetailsId:String!):[awardsRecognitionOutput]
        fetchInstitutePortfolioCharts(portfoliodetailsId:String):chartsOutput   
        fetchInstitutePortfolioData(portfoliodetailsId:String):dataOutput
        fetchInstituteDetails(portfoliodetailsId:String!, key:String):InstitutePortfolio
    }
    
    type Mutation{
        createInstitutionPortfolio(portfolio:institutePortfolio):response
        updateInstitutePortfolio(portfoliodetailsId:String,portfolio:institutePortfolio):response
        
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], institutePortfolioSchema]);

let supportedApi = [
  {api:'fetchInstitutePortfolioAboutUs', actionName:'READ', moduleName:"PORTFOLIO"},
  {api:'fetchInstitutePortfolioMemberships', actionName:'READ', moduleName:"PORTFOLIO"},
  {api:'fetchInstitutePortfolioCompliances', actionName:'READ', moduleName:"PORTFOLIO"},
  {api:'fetchInstitutePortfolioLicenses', actionName:'READ', moduleName:"PORTFOLIO"},
  {api:'fetchInstitutePortfolioManagement', actionName:'READ', moduleName:"PORTFOLIO"},
  {api:'fetchInstitutePortfolioAwards', actionName:'READ', moduleName:"PORTFOLIO"},
  {api:'fetchInstitutePortfolioCharts', actionName:'READ', moduleName:"PORTFOLIO"},
  {api:'fetchInstitutePortfolioData', actionName:'READ', moduleName:"PORTFOLIO"},
  {api:'fetchInstituteDetails', actionName:'READ', moduleName:"PORTFOLIO"},

  {api:'createInstitutionPortfolio', actionName:'CREATE', moduleName:"PORTFOLIO"},
  {api:'updateInstitutePortfolio', actionName:'UPDATE', moduleName:"PORTFOLIO"},
  {api:'createInstitutePortfolioChart', actionName:'UPDATE', moduleName:"PORTFOLIO"}
]
MlResolver.MlModuleResolver.push(supportedApi)
