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
    
    type clientsOutput{
        title:String,
        description:String,
        isTitlePublic:Boolean,
        isDescriptionPublic:Boolean
    }
    
    type branchesOutput{
        title:String,
        description:String,
        isTitlePublic:Boolean,
        isDescriptionPublic:Boolean
    }
    
    type assetsOutput{
        title:String,
        description:String,
        isTitlePublic:Boolean,
        isDescriptionPublic:Boolean
    }
    
    type technologiesOutput{
        title:String,
        description:String,
        isTitlePublic:Boolean,
        isDescriptionPublic:Boolean
    }
    
    type investorOutput{
        title:String,
        description:String,
        isTitlePublic:Boolean,
        isDescriptionPublic:Boolean
    }
    
    type lookingForOutput{
        title:String,
        description:String,
        isTitlePublic:Boolean,
        isDescriptionPublic:Boolean
    }
    

    type informationOutput{
        title:String,
        description:String,
        isTitlePublic:Boolean,
        isDescriptionPublic:Boolean
    }
    
    type serviceProductsOutput{
        firstName:String,
        isfirstNamePrivate:Boolean
        lastName:String
    }
    
    type imageFilesInputSchemaOutput{
       fileUrl: String,
       fileName:String
     }
     
    type ratingOutput{
        problemStatement    : String,
        isProblemPrivate    : Boolean,
        problemImage        : [imageFilesInputSchemaOutput],
        solutionStatement   : String,
        isSolutionPrivate   : Boolean,
        solutionImage       : [imageFilesInputSchemaOutput]
    }
    
    type aboutUsOutput{
        logo : String
        description : String
        annotatorId : String
        isLogoPrivate :Boolean
        isDescriptionPrivate : Boolean
    }
    
    type awardsRecognisitionOutput{
        description:String,
        isStrategyPlansPrivate:Boolean
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
    type startupPortfolioOutput{
        portfolioDetailsId  : String
        licenses            : licensesOutput
        compliances         : compliancesOutput
        memberships         : membershipsOutput
        awardsRecognisition : awardsRecognisitionOutput
        aboutUs             : aboutUsOutput
        rating              : ratingOutput
        serviceProducts     : serviceProductsOutput
        information         : informationOutput
        lookingFor          : lookingForOutput
        investor            : investorOutput
        technologies        : technologiesOutput
        assets              : assetsOutput
        branches            : branchesOutput
        clients             : clientsOutput
        management          : [startupManagementOutput]
        charts              : chartsOutput
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
    
    input clients{
        title:String,
        description:String,
        isTitlePublic:Boolean,
        isDescriptionPublic:Boolean
    }
    
    input branches{
        title:String,
        description:String,
        isTitlePublic:Boolean,
        isDescriptionPublic:Boolean
    }
    
    input assets{
        title:String,
        description:String,
        isTitlePublic:Boolean,
        isDescriptionPublic:Boolean
    }
    
    input technologies{
        title:String,
        description:String,
        isTitlePublic:Boolean,
        isDescriptionPublic:Boolean
    }
    
    input investor{
        title:String,
        description:String,
        isTitlePublic:Boolean,
        isDescriptionPublic:Boolean
    }
    
    input lookingFor{
        title:String,
        description:String,
        isTitlePublic:Boolean,
        isDescriptionPublic:Boolean
    }
    

    input information{
        title:String,
        description:String,
        isTitlePublic:Boolean,
        isDescriptionPublic:Boolean
    }
    
    input serviceProducts{
        firstName:String,
        isfirstNamePrivate:Boolean
        lastName:String
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
        logo : String
        description : String
        annotatorId : String
        isLogoPrivate :Boolean
        isDescriptionPrivate : Boolean
    }
    
    input awardsRecognisition{
        description:String,
        isStrategyPlansPrivate:Boolean
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
        awardsRecognisition : awardsRecognisition
        aboutUs             : aboutUs
        rating              : rating
        serviceProducts     : serviceProducts
        information         : information
        lookingFor          : lookingFor
        investor            : investor
        technologies        : technologies
        assets              : assets
        branches            : branches
        clients             : clients 
        management          : [startupManagement]
        charts              : charts
    }
    
    type Query{
        fetchStartupPortfolioManagement(portfoliodetailsId:String!):[startupManagementOutput]
        fetchPortfolioMenu(image: String, link: String, communityType: String, templateName: String, id: String, isLink: Boolean, isMenu: Boolean): portfolioMenu
    }
    
    type Mutation{
        createStartupPortfolio(portfolio:startupPortfolio):response
        updateStartupPortfolio(portfoliodetailsId:String,portfolio:startupPortfolio, indexArray:[String]):response
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], startupPortfolioSchema]);
