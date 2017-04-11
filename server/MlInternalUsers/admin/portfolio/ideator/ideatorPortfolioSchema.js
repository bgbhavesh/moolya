/**
 * Created by venkatasrinag on 3/4/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef';

let ideatorPortfolioSchema = `

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
    
    type PortfolioIdeatorDetails{
        firstName:String,
        isfirstNamePrivate:Boolean
        lastName:String,
        islastNamePrivate:Boolean
        gender:String,
        isGenderPrivate:Boolean,
        dateOfBirth:String,
        isDateOfBirthPrivate:Boolean,
        qualification:String,
        isQualificationPrivate:Boolean
        employmentStatus:String,
        isEmploymentStatusPrivate:Boolean
        professionalTag:String,
        isProfessionalTagPrivate:Boolean
        yearsofExperience:String,
        isYoePrivate:Boolean
        industry:String,
        isIndustryPrivate:Boolean
        profession:String,
        isProfessionPrivate:Boolean
        employerName:String,
        isEmployerNamePrivate:Boolean
        mobileNumber:String,
        isMobileNumberPrivate:Boolean
        emailId:String
        isEmailIdPrivate:Boolean
        facebookId:String
        isfacebookIdPrivate:Boolean
        linkedInId:String
        islinkedInIdPrivate:Boolean
        twitterId:String
        isTwitterIdPrivate:Boolean
        gplusId:String
        isGplusIdPrivate:Boolean
        profilePic:String
    }

    input ideatorabout{
        title:String,
        description:String,
        isTitlePublic:Boolean,
        isDescriptionPublic:Boolean
    }
    
    input portfolioIdeatorDetails{
        firstName:String,
        isfirstNamePrivate:Boolean
        lastName:String,
        islastNamePrivate:Boolean
        gender:String,
        isGenderPrivate:Boolean,
        dateOfBirth:String,
        isDateOfBirthPrivate:Boolean,
        qualification:String,
        isQualificationPrivate:Boolean
        employmentStatus:String,
        isEmploymentStatusPrivate:Boolean
        professionalTag:String,
        isProfessionalTagPrivate:Boolean
        yearsofExperience:String,
        isYoePrivate:Boolean
        industry:String,
        isIndustryPrivate:Boolean
        profession:String,
        isProfessionPrivate:Boolean
        employerName:String,
        isEmployerNamePrivate:Boolean
        mobileNumber:String,
        isMobileNumberPrivate:Boolean
        emailId:String
        isEmailIdPrivate:Boolean
        facebookId:String
        isfacebookIdPrivate:Boolean
        linkedInId:String
        islinkedInIdPrivate:Boolean
        twitterId:String
        isTwitterIdPrivate:Boolean
        gplusId:String
        isGplusIdPrivate:Boolean
        profilePic:String
    }
    
    input problemSolution{
        problemStatment   : String,
        isProblemPrivate   : Boolean,
        problemImage      : String
        solutionStatment  : String,
        isSolutionPrivate  : Boolean,
        solutionImage     : String
    }
    
    input audience{
        description:String,
        image:String
    }
    
    input strategyAndPlanning{
        description:String,
        isStrategyPlansPrivate:Boolean
    }
    
    input intellectualPlanning{
        description:String, 
        isIntellectualPrivate :Boolean
    }
    
    input lookingFor{
        description:String,
        isLookingForPrivate:Boolean
    }
    
    input library{
        fileType:String,
        portfolioId:String,
        isActive:Boolean
    }
  
    input ideatorPortfolio{
        portfolioDetailsId:String,
        ideatorabout:ideatorabout,
        portfolioIdeatorDetails:portfolioIdeatorDetails,
        problemSolution:problemSolution,
        audience:audience,
        strategyAndPlanning:strategyAndPlanning,
        intellectualPlanning:intellectualPlanning,
        lookingFor:lookingFor,
        library:library
    }
    
    type Query{
        fetchIdeatorPortfolioDetails(portfoliodetailsId:String!):PortfolioIdeatorDetails
        fetchIdeatorPortfolioRequests:response
        fetchAnnotations(userId:String, portfolioId:String, docId:String): response
        fetchComments(userId:String, portfolioId:String, docId:String): response
        fetchPortfolioMenu(image: String, link: String, communityType: String, templateName: String, id: String, isLink: Boolean, isMenu: Boolean): portfolioMenu
    }
    
    type Mutation{
        createIdeatorPortfolio(portfolio:ideatorPortfolio):response
        createAnnotation(userId:String, portfolioId:String, docId:String): response
        createComment(userId:String, portfolioId:String, docId:String): response
        updateAnnotation(userId:String, portfolioId:String, docId:String, annotationId:String): response
        updateIdeatorPortfolio(portfoliodetailsId:String, portfolio:ideatorPortfolio):response
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], ideatorPortfolioSchema]);
