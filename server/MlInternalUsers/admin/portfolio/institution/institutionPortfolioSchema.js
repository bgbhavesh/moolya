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
    
    type institutionManagementOutput{
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
       managmentAbout : String
       isAboutPrivate:Boolean
       logo:imagesTypeSchema,
       index: Int
       privateFields:[PrivateKeys]
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
    
    type InstitutionPortfolio{
      memberships       : membershipsOutput,
      compliances       : compliancesOutput,
      licenses          : licensesOutput 
      lookingFor        : [lookingForOutput]
      
      management        : [institutionManagementOutput],
      data              : dataOutput,
      charts            : chartsOutput,
      awardsRecognition : [awardsRecognitionOutput],
      investor          : [investorOutput]    
    }
   
    
    input logo{
      fileName : String,
      fileUrl:String,
      isDefault:Boolean
    }
    
    input institutionManagement{
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
       managmentAbout : String
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
   
    input institutionPortfolio{
        portfolioDetailsId  : String
        licenses            : licenses
        compliances         : compliances
        memberships         : memberships
        lookingFor          : [lookingFor]
        awardsRecognition : [awardsRecognition]
        aboutUs             : aboutUs
        rating              : rating
        serviceProducts     : serviceProducts
        information         : information
        investor            : [investor]
        clients             : [clients]
        management          : [institutionManagement]
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
        
        fetchInstitutePortfolioCharts(portfoliodetailsId:String):chartsOutput   
        fetchInstitutePortfolioData(portfoliodetailsId:String):dataOutput
        fetchInstitutionDetails(portfoliodetailsId:String!, key:String):InstitutionPortfolio
    }
    
    type Mutation{
        createInstitutionPortfolio(portfolio:institutionPortfolio):response
        updateInstitutionPortfolio(portfoliodetailsId:String,portfolio:institutionPortfolio):response
        
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], institutePortfolioSchema]);

let supportedApi = [
  {api:'fetchInstitutionDetails', actionName:'READ', moduleName:"PORTFOLIO"},
  {api:'fetchInstitutePortfolioAboutUs', actionName:'READ', moduleName:"PORTFOLIO"},

  {api:'fetchInstitutePortfolioCharts', actionName:'READ', moduleName:"PORTFOLIO"},
  {api:'fetchInstitutePortfolioData', actionName:'READ', moduleName:"PORTFOLIO"},
  {api:'createInstitutionPortfolio', actionName:'CREATE', moduleName:"PORTFOLIO"},
  {api:'updateInstitutionPortfolio', actionName:'UPDATE', moduleName:"PORTFOLIO"},
  {api:'createInstitutePortfolioChart', actionName:'UPDATE', moduleName:"PORTFOLIO"}
]
MlResolver.MlModuleResolver.push(supportedApi)

/**
 * Note: graphql schema to be used multiple times hence using only onces
 * @lookingFor  : startup
 * @lookingForOutput : startup
 * @awardsRecognition : startup
 * @awardsRecognitionOutput : startup
 * @investor : startup
 * */
// {api:'fetchInstitutePortfolioAwards', actionName:'READ', moduleName:"PORTFOLIO"},
// fetchInstitutePortfolioAwards(portfoliodetailsId:String!):[awardsRecognitionOutput]
// fetchInstitutePortfolioManagement(portfoliodetailsId:String!):[instituteManagementOutput]
// {api:'fetchInstitutePortfolioManagement', actionName:'READ', moduleName:"PORTFOLIO"},
