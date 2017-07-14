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
    type startupManagementOutput{
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
        isCityPrivate:Boolean,
        state:String,
        isStatePrivate:Boolean,
        country:String,
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
   type chartsOutput{
        fileType:String,
        portfolioId:String,
        isActive:Boolean
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
    }

      type EmploymentOfCompany{
      about: String
      fromMonth: String
      fromYear: String
      toMonth: String
      toYear: String
      numberOfEmployment: Int
      index: Int
    }
    type ProfitRevenueLiability{
      entityType: [String]
      fromMonth: Date
      fromYear: Date
      toMonth: Date
      toYear: Date
      valueType: [String]
      value: Int
    }
    type ReviewOfCompany{
      year: Date
      value: Int
      about: String
    }
    type EmployeeBreakupDepartment{
      fromMonth: Date
      fromYear: Date
      toMonth: Date
      toYear: Date
      department: [String]
      numberOfEmployment: Int
      about: String
    }
        
   type chartsOutput{
      employmentOfCompany:[EmploymentOfCompany]
      profitRevenueLiability:[ProfitRevenueLiability]
      reviewOfCompany:[ReviewOfCompany]
      employeeBreakupDepartment:[EmployeeBreakupDepartment]
    }
    
    
    
    input logo{
      fileName : String,
      fileUrl:String
    }
    
    input startupManagement{
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
        isCityPrivate:Boolean,
        state:String,
        isStatePrivate:Boolean,
        country:String,
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
      about: String
      fromMonth: String
      fromYear: String
      toMonth: String
      toYear: String
      numberOfEmployment: Int
      index : Int
    }
    input profitRevenueLiability{
      entityType: [String]
      fromMonth: String
      fromYear: String
      toMonth: String
      toYear: String
      valueType: [String]
      value: Int
    }
     input reviewOfCompany{
      year: Date
      value: Int
      about: String
    }
    input employeeBreakupDepartment{
      fromMonth: String
      fromYear: String
      toMonth: String
      toYear: String
      department: [String]
      numberOfEmployment: Int
      about: String
    }
    input charts{
        employmentOfCompany: [employmentOfCompany]
        profitRevenueLiability: [profitRevenueLiability]
        reviewOfCompany: [reviewOfCompany]
        employeeBreakupDepartment: [employeeBreakupDepartment]
    }
    input startupPortfolio{
        portfolioDetailsId  : String
        licenses            : licenses
        compliances         : compliances
        memberships         : memberships
        awardsRecognition : [awardsRecognition]
        aboutUs             : aboutUs
        rating              : rating
        serviceProducts     : serviceProducts
        information         : information
        lookingFor          : [lookingFor]
        investor            : [investor]
        technologies        : [technologies]
        assets              : [assets]
        branches            : [branches]
        clients             : [clients]
        management          : [startupManagement]
        charts              : charts
        legalIssue          : legalIssue
    }
    type startupPortfolioOutput{
        _id                  : String
        userId               : String
        communityType        : String
        portfolioDetailsId   : String
        aboutUs              : aboutUsOutput
    }
    
    type Query{
        fetchStartupPortfolioAboutUs(portfoliodetailsId:String!):startupPortfolioAboutUsOutput
        fetchStartupPortfolioMemberships(portfoliodetailsId:String!):membershipsOutput
        fetchStartupPortfolioCompliances(portfoliodetailsId:String!):compliancesOutput
        fetchStartupPortfolioLicenses(portfoliodetailsId:String!):licensesOutput
        fetchStartupPortfolioManagement(portfoliodetailsId:String!):[startupManagementOutput]
        fetchStartupPortfolioInvestor(portfoliodetailsId:String!):[investorOutput]
        fetchStartupPortfolioLookingFor(portfoliodetailsId:String!):[lookingForOutput]
        fetchStartupPortfolioAwards(portfoliodetailsId:String!):[awardsRecognitionOutput]
        fetchStartupPortfolioCharts(portfoliodetailsId:String):chartsOutput
        fetchStartupPortfolioChart(portfoliodetailsId:String,chartDetails: charts):[chartsOutput]
        fetchPortfolioMenu(image: String, link: String, communityType: String, templateName: String, id: String, isLink: Boolean, isMenu: Boolean): portfolioMenu
    }
    
    type Mutation{
        createStartupPortfolio(portfolio:startupPortfolio):response
        updateStartupPortfolio(portfoliodetailsId:String,portfolio:startupPortfolio):response
        createStartupPortfolioChart(portfoliodetailsId:String,chartDetails: charts): response
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], startupPortfolioSchema]);

let supportedApi = [
  {api:'fetchStartupPortfolioAboutUs', actionName:'READ', moduleName:"PORTFOLIO"},
  {api:'fetchStartupPortfolioMemberships', actionName:'READ', moduleName:"PORTFOLIO"},
  {api:'fetchStartupPortfolioCompliances', actionName:'READ', moduleName:"PORTFOLIO"},
  {api:'fetchStartupPortfolioLicenses', actionName:'READ', moduleName:"PORTFOLIO"},
  {api:'fetchStartupPortfolioManagement', actionName:'READ', moduleName:"PORTFOLIO"},
  {api:'fetchStartupPortfolioInvestor', actionName:'READ', moduleName:"PORTFOLIO"},
  {api:'fetchStartupPortfolioLookingFor', actionName:'READ', moduleName:"PORTFOLIO"},
  {api:'fetchStartupPortfolioAwards', actionName:'READ', moduleName:"PORTFOLIO"},
  {api:'fetchStartupPortfolioCharts', actionName:'READ', moduleName:"PORTFOLIO"},
  {api:'fetchStartupPortfolioChart', actionName:'READ', moduleName:"PORTFOLIO"},
  {api:'fetchPortfolioMenu', actionName:'READ', moduleName:"PORTFOLIO"},

  {api:'createStartupPortfolio', actionName:'CREATE', moduleName:"PORTFOLIO"},
  {api:'updateStartupPortfolio', actionName:'UPDATE', moduleName:"PORTFOLIO"},
  {api:'createStartupPortfolioChart', actionName:'UPDATE', moduleName:"PORTFOLIO"}
]
MlResolver.MlModuleResolver.push(supportedApi)
