/**
 * Created by venkatasrinag on 3/4/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef';

let ideatorPortfolioSchema = `

    input portfoliodetails{
        transcationType:String,
        name:String,
        contactNumber:Int,
        communityType:String,
        cluster:String,
        chapter:String,
        subChapter:String,
        subscriptionType:String,
        source:String,
        createdBy:String,
        status:String,
        assignedTo:String,
        progress:String,
        isPublic:Boolean,
        isGoLive:Boolean,
        isActive:Boolean
    }

    input ideatorabout{
        title:String,
        description:String,
        isTitlePublic:String,
        isDescriptionPublic:String
    }
    
    input portfolioIdeatordetails{
        firstName:String,
        isfirstNamePublic:Boolean
        lastName:String,
        islastNamePublic:Boolean
        gender:String,
        isGenderPublic:Boolean
        qualification:String,
        isQualificationPublic:Boolean
        employmentStatus:String,
        isEmploymentStatusPublic:Boolean
        professionalTag:String,
        isProfessionalTag:Boolean
        yearsofExperience:String,
        isYoePublic:Boolean
        industry:String,
        isIndustryPublic:Boolean
        profession:String,
        isProfession:Boolean
        employerName:String,
        isEmployerNamePublic:Boolean
        mobileNumber:String,
        isMobileNumberPublic:Boolean
        emailId:String
        isEmailIdPublic:Boolean
    }
    
    input problemsolution{
        problemImage:String,
        problemStatment:String,
        solutions:String
    }
    
    input audience{
        description:String,
        image:String
    }
    
    input strategyplans{
        description:String
    }
    
    input intellectualplanning{
        description:String
    }
    
    input lookingfor{
        lookingFor:String
    }
    
    input library{
        fileType:String,
        portfolioId:String,
        isActive:Boolean
    }
  
    input ideatorPortfolio{
        portfolioDetails:portfoliodetails,
        ideatorabout:ideatorabout,
        portfolioIdeatorDetails:portfolioIdeatordetails,
        problemsolution:problemsolution,
        audience:audience,
        strategyplans:strategyplans,
        intellectualplanning:intellectualplanning,
        lookingfor:lookingfor,
        library:library
    }
    
    type Query{
        fetchIdeatorPortfolio(userId:String, communityId:String, portfolioId:String):response
        fetchIdeatorPortfolioRequests:response
        fetchAnnotations(userId:String, portfolioId:String, docId:String): response
        fetchComments(userId:String, portfolioId:String, docId:String): response
    }
    
    type Mutation{
        createIdeatorPortfolio(portfolio:ideatorPortfolio):response
        createIdeatorPortfolioRequest(userId:String, communityId:String, portfoliodetails:portfoliodetails):response
        createAnnotation(userId:String, portfolioId:String, docId:String): response
        createComment(userId:String, portfolioId:String, docId:String): response
        updateAnnotation(userId:String, portfolioId:String, docId:String, annotationId:String): response
        updateIdeatorPortfolio(portfolioId:String, userId:String, portfolio:ideatorPortfolio):response
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], ideatorPortfolioSchema]);
