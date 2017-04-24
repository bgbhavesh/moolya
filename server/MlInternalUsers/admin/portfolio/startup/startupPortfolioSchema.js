/**
 * Created by venkatasrinag on 3/4/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef';

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
    type startupManagementOutput{
       title :String
       logo : String
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
    }
    
    type imagesTypeSchema{
        fileUrl   : String,
        fileName  : String
    }
    
    type clientsOutput{
        companyName:String,
        isCompanyNamePrivate:Boolean,
        logo:imagesTypeSchema,
        description:String,
        isDescriptionPrivate:Boolean,
        makePrivate:Boolean
    }
    
    type branchesOutput{
        addressType:String,
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
        makePrivate:Boolean
        
    }
    
    type assetsOutput{
        assetType:String,
        isAssetTypePrivate:Boolean,
        quantity:String,
        isQuantityTypePrivate:Boolean,
        description:String,
        isDescriptionPrivate:Boolean,
        makePrivate:Boolean
    }
    
    type technologiesOutput{
        technology:String,
        description:String,
        isTechnologyPrivate:Boolean,
        isDescriptionPrivate:Boolean,
        makePrivate:Boolean
    }
    
    type investorOutput{
        name:String,
        fundingType:String,
        investmentAmount:String,
        description:String,
        isNamePrivate:Boolean,
        isInvestmentAmountPrivate:Boolean,
        isDescriptionPrivate:Boolean,
        makePrivate:Boolean
    }
    
    type lookingForOutput{
        type:String,
        isTypePrivate:Boolean,
        description:String,
        isDescriptionPrivate:Boolean
        makePrivate:Boolean
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
          award:String
          isAwardPrivate:Boolean
          year:String
          isYearPrivate:Boolean
          description:String
          isDescriptionPrivate:Boolean
          makePrivate:Boolean
    }

    type membershipsOutput{
        description:String, 
        isIntellectualPrivate :Boolean
    }
    
    type compliancesOutput{
        description:String,
        isLookingForPrivate:Boolean
    }
    
    type licensesOutput{
        fileType:String,
        portfolioId:String,
        isActive:Boolean
    }
   type chartsOutput{
        fileType:String,
        portfolioId:String,
        isActive:Boolean
    }
    type startupPortfolioAboutUsOutput{
        portfolioDetailsId  : String
        aboutUs             : aboutUsOutput
        serviceProducts     : serviceProductsOutput
        information         : informationOutput
        technologies        : [technologiesOutput]
        assets              : [assetsOutput]
        branches            : [branchesOutput]
        clients             : [clientsOutput]
        legalIssue          : legalIssueOutput
    }
    
    input startupManagement{
       title :String
       logo : String
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
    }
    input logo{
      fileName : String,
      fileUrl:String
    }
    input clients{
        companyName:String,
        isCompanyNamePrivate:Boolean,
        logo:logo,
        description:String,
        isDescriptionPrivate:Boolean,
        makePrivate:Boolean
    }
    
    input branches{
        addressType:String,
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
        makePrivate:Boolean
    }
    
    input assets{
        assetType:String,
        isAssetTypePrivate:Boolean,
        quantity:String,
        isQuantityTypePrivate:Boolean,
        description:String,
        isDescriptionPrivate:Boolean,
        makePrivate:Boolean
    }
    
    input technologies{
        technology:String,
        description:String,
        isTechnologyPrivate:Boolean,
        isDescriptionPrivate:Boolean,
        makePrivate:Boolean
    }
    
    input investor{
        name:String,
        fundingType:String,
        investmentAmount:String,
        investorImage:String,
        description:String,
        isNamePrivate:Boolean,
        isInvestorImagePrivate:Boolean,
        isInvestmentAmountPrivate:Boolean,
        isDescriptionPrivate:Boolean,
        makePrivate:Boolean
    }
    
    input lookingFor{
        type:String,
        isTypePrivate:Boolean,
        description:String,
        isDescriptionPrivate:Boolean
        makePrivate:Boolean
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
        problemStatement    : String,
        isProblemPrivate    : Boolean,
        problemImage        : [imageFilesInputSchema],
        solutionStatement   : String,
        isSolutionPrivate   : Boolean,
        solutionImage       : [imageFilesInputSchema]
    }
    
    input aboutUs{
        logo      : [imageFilesInputSchema]
        description : String
        annotatorId : String
        isLogoPrivate :Boolean
        isDescriptionPrivate : Boolean
    }
    
    input awardsRecognition{
          award:String
          isAwardPrivate:Boolean
          year:String
          isYearPrivate:Boolean
          description:String
          isDescriptionPrivate:Boolean
          makePrivate:Boolean
    }

    input memberships{
        description:String, 
        isIntellectualPrivate :Boolean
    }
    
    input compliances{
        description:String,
        isLookingForPrivate:Boolean
    }
    
    input licenses{
        fileType:String,
        portfolioId:String,
        isActive:Boolean
    }
   input charts{
        fileType:String,
        portfolioId:String,
        isActive:Boolean
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
    
    type Query{
        fetchStartupPortfolioAboutUs(portfoliodetailsId:String!):startupPortfolioAboutUsOutput
        fetchStartupPortfolioManagement(portfoliodetailsId:String!):[startupManagementOutput]
        fetchStartupPortfolioInvestor(portfoliodetailsId:String!):[investorOutput]
        fetchStartupPortfolioLookingFor(portfoliodetailsId:String!):[lookingForOutput]
        fetchStartupPortfolioAwards(portfoliodetailsId:String!):[awardsRecognitionOutput]
        fetchPortfolioMenu(image: String, link: String, communityType: String, templateName: String, id: String, isLink: Boolean, isMenu: Boolean): portfolioMenu
    }
    
    type Mutation{
        createStartupPortfolio(portfolio:startupPortfolio):response
        updateStartupPortfolio(portfoliodetailsId:String,portfolio:startupPortfolio, indexArray:[String]):response
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], startupPortfolioSchema]);
