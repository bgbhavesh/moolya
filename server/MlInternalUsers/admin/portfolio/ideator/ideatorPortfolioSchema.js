/**
 * Created by venkatasrinag on 3/4/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../../commons/mlSchemaDef';
import MlResolver from '../../../../commons/mlResolverDef'


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
    
    type ideatoraboutInfo{
        title:String
        description:String
        isTitlePublic:Boolean
        isDescriptionPublic:Boolean
    }
    
    type portfolioIdeatorDetailsInfo{
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
    type ideasObject{
        _id:String
        title:String,
        isIdeasTitlePrivate:Boolean,
        portfolioId:String
        description:String,
        isIdeasPrivate:Boolean,
        isActive:Boolean
    }
    
    type imagesTypeSchema{
        fileUrl   : String,
        fileName  : String
    }
    
     type problemSolutionInfo{
        problemStatement  : String,
        isProblemPrivate  : Boolean,
        problemImage      : [imagesTypeSchema]
        solutionStatement : String,
        isSolutionPrivate : Boolean,
        solutionImage     : [imagesTypeSchema]
    }
   
    type audienceInfo{
        description:String
        isAudiencePrivate:Boolean,
        audienceImages : [imagesTypeSchema]
    }
    
    type strategyplansInfo{
        description:String
        isStrategyPlansPrivate:Boolean
    }
    
    type intellectualplanningInfo{
        description:String
        isIntellectualPrivate :Boolean
    }
    
    type lookingforInfo{
        description:String
        isLookingForPrivate:Boolean
    }
    
    type libraryInfo{
        fileType:String
        portfolioId:String
        isActive:Boolean
    }
    
    type ideatorPortfolioDetails{
         _id            : String
         userId               : String
         communityType        : String
         portfolioDetailsId   : String
         ideatorabout : ideatoraboutInfo
         ideas:ideasObject
         portfolioIdeatorDetails    : portfolioIdeatorDetailsInfo
         problemSolution : problemSolutionInfo
         audience : audienceInfo
         strategyAndPlanning : strategyplansInfo
         intellectualPlanning : intellectualplanningInfo
         lookingFor : lookingforInfo
         library:libraryInfo
         
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
    
    input imageFilesInputSchema{
       fileUrl: String,
       fileName:String
     }
     
    input problemSolution{
        problemStatement    : String,
        isProblemPrivate    : Boolean,
        problemImage        : [imageFilesInputSchema],
        solutionStatement   : String,
        isSolutionPrivate   : Boolean,
        solutionImage       : [imageFilesInputSchema]
    }
    
    input audience{
        description:String,
        isAudiencePrivate:Boolean,
        audienceImages : [imageFilesInputSchema]
    }
    
    input strategyAndPlanning{
        description:String,
        isStrategyPlansPrivate:Boolean
    }
    input ideas{
        title:String,
        isIdeasTitlePrivate:Boolean,
        description:String,
        isIdeasPrivate:Boolean,
        isActive:Boolean
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
        ideas:ideas
        portfolioIdeatorDetails:portfolioIdeatorDetails,
        problemSolution:problemSolution,
        audience:audience,
        strategyAndPlanning:strategyAndPlanning,
        intellectualPlanning:intellectualPlanning,
        lookingFor:lookingFor,
        library:library
    }
    
    type commentsInfo{
       _id:String,
      annotatorId : String,
      portfolioId : String,
      comment : String,
      userId :String,
      userName : String,
      firstName:String,
      lastName:String,
      profileImage : String
      createdAt:Date
    }
    
     type annotationInfo{
      _id:String,
      portfolioId : String,
      referenceDocId : String,
      quote : String,
      userId :String,
      userName : String,
      isResolved:Boolean,
      isReopened:Boolean,
      createdAt:Date
    }
    
    type Idea{
        _id:String
        userId:String,
        portfolioId:String,
        title:String,
        isIdeaTitlePrivate:Boolean,
        description:String,
        isIdeaPrivate:Boolean,
        isActive:Boolean
    }
    
    input idea{
        title:String,
        isIdeaTitlePrivate:Boolean,
        description:String,
        isIdeaPrivate:Boolean,
        isActive:Boolean
    }
    
    type Query{
        fetchIdeatorPortfolioDetails(portfoliodetailsId:String!):portfolioIdeatorDetailsInfo
        fetchIdeatorPortfolioIdeas(ideaId:String!):ideasObject
        fetchIdeatorPortfolioProblemsAndSolutions(portfoliodetailsId:String!): problemSolutionInfo
        fetchIdeatorPortfolioAudience(portfoliodetailsId:String!): audienceInfo
        fetchIdeatorPortfolioLibrary(portfoliodetailsId:String!): libraryInfo
        fetchIdeatorPortfolioStrategyAndPlanning(portfoliodetailsId:String!): strategyplansInfo
        fetchIdeatorPortfolioIntellectualPlanning(portfoliodetailsId:String!): intellectualplanningInfo
        fetchIdeatorPortfolioLookingFor(portfoliodetailsId:String!): lookingforInfo
        fetchIdeatorPortfolioRequests:response
        fetchAnnotations(portfoliodetailsId:String!, docId:String!): response
        fetchComments(annotationId:String): [commentsInfo]
        fetchPortfolioMenu(image: String, link: String, communityType: String, templateName: String, id: String, isLink: Boolean, isMenu: Boolean): portfolioMenu
        fetchIdeas(portfolioId:String):[Idea]
    }
    
    type Mutation{
        createIdeatorPortfolio(portfolio:ideatorPortfolio):response
        createAnnotation(portfoliodetailsId:String, docId:String, quote:String): response
        createComment(annotatorId:String, portfolioId:String,comment:String): response
        updateAnnotation(userId:String, portfolioId:String, docId:String, annotationId:String): response
        updateIdeatorPortfolio(portfoliodetailsId:String, portfolio:ideatorPortfolio):response
        resolveComment(commentId:String): response
        reopenComment(commentId:String): response
        createIdea(idea:idea):response
        updateIdea(ideaId:String, idea:idea):response
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], ideatorPortfolioSchema]);

let supportedApi = [
  {api:'fetchIdeatorPortfolioDetails', actionName:'READ', moduleName:"PORTFOLIO"},
  {api:'fetchIdeatorPortfolioIdeas', actionName:'READ', moduleName:"PORTFOLIO"},
  {api:'fetchIdeatorPortfolioProblemsAndSolutions', actionName:'READ', moduleName:"PORTFOLIO"},
  {api:'fetchIdeatorPortfolioAudience', actionName:'READ', moduleName:"PORTFOLIO"},
  {api:'fetchIdeatorPortfolioLibrary', actionName:'READ', moduleName:"PORTFOLIO"},
  {api:'fetchIdeatorPortfolioStrategyAndPlanning', actionName:'READ', moduleName:"PORTFOLIO"},
  {api:'fetchIdeatorPortfolioIntellectualPlanning', actionName:'READ', moduleName:"PORTFOLIO"},
  {api:'fetchIdeatorPortfolioLookingFor', actionName:'READ', moduleName:"PORTFOLIO"},
  {api:'fetchIdeatorPortfolioRequests', actionName:'READ', moduleName:"PORTFOLIO"},
  {api:'fetchAnnotations', actionName:'READ', moduleName:"PORTFOLIO", isWhiteList:true},
  {api:'fetchComments', actionName:'READ', moduleName:"PORTFOLIO", isWhiteList:true},
  {api:'fetchPortfolioMenu', actionName:'READ', moduleName:"PORTFOLIO"},
  {api:'fetchIdeas', actionName:'READ', moduleName:"PORTFOLIO"},

  {api:'createIdeatorPortfolio', actionName:'CREATE', moduleName:"PORTFOLIO"},
  {api:'createAnnotation', actionName:'CREATE', moduleName:"PORTFOLIO", isWhiteList:true},
  {api:'createComment', actionName:'CREATE', moduleName:"PORTFOLIO", isWhiteList:true},
  {api:'createIdea', actionName:'CREATE', moduleName:"PORTFOLIO"},
  {api:'updateAnnotation', actionName:'UPDATE', moduleName:"PORTFOLIO", isWhiteList:true},
  {api:'updateIdeatorPortfolio', actionName:'UPDATE', moduleName:"PORTFOLIO"},
  {api:'updateIdea', actionName:'UPDATE', moduleName:"PORTFOLIO"},
  {api:'resolveComment', actionName:'UPDATE', moduleName:"PORTFOLIO", isWhiteList:true},
  {api:'reopenComment', actionName:'UPDATE', moduleName:"PORTFOLIO", isWhiteList:true},
]
MlResolver.MlModuleResolver.push(supportedApi)
