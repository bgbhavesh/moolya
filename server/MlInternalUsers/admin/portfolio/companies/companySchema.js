/**
 * Created by venkatasrinag on 3/4/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../../commons/mlSchemaDef';
import MlResolver from '../../../../commons/mlResolverDef'


let startupPortfolioSchema = `

    type PortfolioMenu{
        image: String
        link: String
        name: String
        uniqueId:String
        isLink:Boolean
        isMenu:Boolean
        isDisabled:Boolean
        subMenu:[Menu]
        dynamicLink:Boolean
        subMenuMappingId:String
        subMenusId:String
        hideSubMenu:Boolean
        showInBreadCrum:Boolean
    }
    type portfolioMenu
    {
      name: String
      id:String
      menu:[PortfolioMenu]
    }
    type imagesTypeSchema{
        fileUrl   : String,
        fileName  : String
    }
    type managementOutput{
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
    
    type branchesOutput{
        addressTypeId:String,
        name:String,
        isNamePrivate:Boolean,
        phoneNumber:String,
        isPhoneNumberPrivate:Boolean,
        address1:String,
        isAddressOnePrivate:String,
        address2:String,
        isAddressTwoPrivate:Boolean,
        landmark:String,
        isLandmarkPrivate:Boolean,
        area:String,
        isAreaPrivate:Boolean,
        city:String,
        cityId:String,
        isCityPrivate:Boolean,
        state:String,
        stateId:String,
        isStatePrivate:Boolean,
        country:String,
        countryId:String,
        isCountryPrivate:Boolean,
        addressImage : String,
        isAddressImagePrivate:Boolean,
        logo:imagesTypeSchema,
        makePrivate:Boolean,
        index:Int
        
    }
    
    type assetsOutput{
        assetTypeId:String,
        assetTypeName:String,
        isAssetTypePrivate:Boolean,
        quantity:String,
        isQuantityTypePrivate:Boolean,
        description:String,
        isDescriptionPrivate:Boolean,
        logo:imagesTypeSchema,
        makePrivate:Boolean,
        index:Int
        
    }
    
    type technologiesOutput{
        technologyName:String,
        technologyId:String,
        description:String,
        isTechnologyPrivate:Boolean,
        isDescriptionPrivate:Boolean,
        logo:imagesTypeSchema,
        makePrivate:Boolean,
        index:Int
    }
    
    type investorOutput{
        name:String,
        fundingType:String,
        fundingTypeId:String,
        investmentAmount:String,
        description:String,
        isNamePrivate:Boolean,
        isInvestmentAmountPrivate:Boolean,
        isDescriptionPrivate:Boolean,
        logo:imagesTypeSchema,
        makePrivate:Boolean
        index: Int
    }
    
    type lookingForOutput{
        lookingForName:String,
        typeId:String,
        isTypePrivate:Boolean,
        description:String,
        isDescriptionPrivate:Boolean,
        logo:imagesTypeSchema,
        makePrivate:Boolean
        index: Int
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
     

    
    type legalIssueOutput{
        description:String,
        isDescriptionPrivate:Boolean
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
    
    
    type aboutUsOutput{
        logo      : [imagesTypeSchema]
        description : String
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
    type startupPortfolioAboutUsOutput{
        portfolioDetailsId  : String
        aboutUs             : aboutUsOutput
        rating              : ratingOutput
        serviceProducts     : serviceProductsOutput
        information         : informationOutput
        technologies        : [technologiesOutput]
        assets              : [assetsOutput]
        branches            : [branchesOutput]
        clients             : [clientsOutput]
        legalIssue          : legalIssueOutput
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
    
    
    
    input logo{
      fileName : String,
      fileUrl:String
    }
    
    input management{
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
    
    input branches{
        addressTypeId:String,
        name:String,
        isNamePrivate:Boolean,
        phoneNumber:String,
        isPhoneNumberPrivate:Boolean,
        address1:String,
        isAddressOnePrivate:String,
        address2:String,
        isAddressTwoPrivate:Boolean,
        landmark:String,
        isLandmarkPrivate:Boolean,
        area:String,
        isAreaPrivate:Boolean,
        city:String,
        cityId:String,
        isCityPrivate:Boolean,
        state:String,
        stateId:String,
        isStatePrivate:Boolean,
        country:String
        countryId:String,
        isCountryPrivate:Boolean,
        addressImage : String,
        isAddressImagePrivate:Boolean,
        logo:logo,
        makePrivate:Boolean,
        index:Int
    }
    
    input assets{
      assetTypeId:String,
      assetTypeName:String
      isAssetTypePrivate:Boolean,
      quantity:String,
      isQuantityTypePrivate:Boolean,
      description:String,
      isDescriptionPrivate:Boolean,
      logo:logo,
      makePrivate:Boolean,
      index:Int
    }
    
    input technologies{
       technologyId:String,
       technologyName:String,
        description:String,
        isTechnologyPrivate:Boolean,
        isDescriptionPrivate:Boolean,
        logo:logo,
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
    
    input lookingFor{
        lookingForName:String,
        typeId:String,
        isTypePrivate:Boolean,
        description:String,
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
        logo      : [imageFilesInputSchema]
        description : String
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
   
    input companyPortfolio{
        portfolioDetailsId  : String
        licenses            : licenses
        compliances         : compliances
        memberships         : memberships
        awardsRecognition : [awardsRecognition]
        aboutUs             : aboutUs
        rating              : rating
        serviceProducts     : serviceProducts
        information         : information
        clients             : [clients]
        management          : [management]
        employmentOfCompanyChart: [employmentOfCompany]
        reviewOfCompanyChart: [reviewOfCompany]
        profitRevenueLiabilityChart:  [profitRevenueLiability]
        employeeBreakupDepartmentChart: [employeeBreakupDepartment]
        legalIssue          : legalIssue
        data                : data
    }
    type companyPortfolioOutput{
        _id                  : String
        userId               : String
        communityType        : String
        portfolioDetailsId   : String
        aboutUs              : aboutUsOutput
    }
    
    type Query{
      
    }
    
    type Mutation{
        createCompanyPortfolio(portfolio:companyPortfolio):response
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], startupPortfolioSchema]);

let supportedApi = [

  {api:'createCompanyPortfolio', actionName:'CREATE', moduleName:"PORTFOLIO"},
]
MlResolver.MlModuleResolver.push(supportedApi)
