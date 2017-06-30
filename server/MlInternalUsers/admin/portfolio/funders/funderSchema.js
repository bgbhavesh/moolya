/**
 * Created by venkatsrinag on 24/4/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../../commons/mlSchemaDef';
import MlResolver from '../../../../commons/mlResolverDef'

let FunderPortfolioSchema = `

    type SuccessStories{
        date:String,
        isDatePrivate : Boolean
        storyImage:String,
        storyTitle:String,
        isStoryTitlePrivate:Boolean,
        description:String,
        isDescPrivate:Boolean,
        isPrivate:Boolean,
        isActive:Boolean
        index: Int
        logo:imagesTypeSchema,
    }
    
     type imagesTypeSchema{
        fileUrl   : String,
        fileName  : String
    }
    
    type AreaOfInterest{
        industryTypeId:String,
        industryTypeName :String
        domainType:String,
        makePrivate:Boolean,
        isActive:Boolean
        subDomainId : String
        subDomainName :String
        index: Int
    }
    
    type SocialLinks{
        socialLinkType:String,
        userId:String,
        isUserIdPrivate:Boolean
    }
    
    type Team{
        title:String,
        firstName:String,
        isFirstNamePrivate:Boolean,
        lastName:String,
        isLastNamePrivate:Boolean,
        designation:String,
        isDesignationPrivate:Boolean,
        companyName:String,
        duration:String,
        isDurationPrivate:Boolean,
        yearsOfExperience:String,
        isYearsOfExperiencePrivate:Boolean,
        qualification:String,
        isQualificationPrivate:Boolean,
        aboutTeam:String,
        isAboutTeamPrivate:Boolean,
        socialLinks:[SocialLinks]
        index: Int,
        logo:imagesTypeSchema,
    }

    type Principal{
        title:String,
        firstName:String,
        isFirstNamePrivate:Boolean,
        lastName:String,
        isLastNamePrivate:Boolean,
        designation:String,
        isDesignationPrivate:Boolean,
        companyName:String,
        duration:String,
        isDurationPrivate:Boolean,
        yearsOfExperience:String,
        isYearsOfExperiencePrivate:Boolean,
        qualification:String,
        isQualificationPrivate:Boolean,
        aboutPrincipal:String,
        isAboutPrincipalPrivate:Boolean,
        socialLinks:[SocialLinks],
        index:Int,
        logo:imagesTypeSchema,
    }
    
    type Investments{
        dateOfInvestment:String,
        isDateOfInvestmentPrivate :Boolean
        companyName:String,
        isCompanyNamePrivate:Boolean,
        typeOfFundingId:String,
        typeOfFundingName : String,
        isTypeOfFundingPrivate:Boolean,
        aboutInvestment:String,
        isAboutInvestmentPrivate:Boolean,
        isPrivate:Boolean,
        investmentAmount :String,
        isInvestmentAmountPrivate :Boolean
        index: Int
    }
    type Duration{
        hours: String
        minutes: String
    }
    
    type Attachments {
        documentName: String
        images: [String]
    }
    
    type Services{
        dateOfService:String
        isDateOfServicePrivate :Boolean
        industryType:[String]
        conversationType:[String]
        about:String
        expectedInput : String
        expectedOutput:String
        mode:Boolean
        session:String
        duration:Duration
        attachments :[Attachments]
        isPrivate :Boolean
        index: Int
  }
    
    
    type Investmentbudget{
        from:String
        isFromPrivate:Boolean
        to:String
        isToPrivate:Boolean
    }
    type FunderAbout{
        firstName : String,
        isFirstNamePrivate:Boolean,
        lastName:String
        isLastNamePrivate:Boolean
        gender:String
        isGenderPrivate:Boolean
        category:String
        isCategoryPrivate:Boolean
        qualification:String
        isQualificationPrivate:Boolean
        employmentStatus:String
        isEmploymentStatusPrivate:Boolean
        professionalTag:String
        isProfessionalTagPrivate:Boolean
        yearsOfExperience:String
        isYearsOfExperiencePrivate:Boolean
        industry:String
        isIndustryPrivate:Boolean
        profession:String
        isProfessionPrivate:Boolean
        investmentFrom:String
        investmentCount:String
        isInvestmentCountPrivate:Boolean
        emailId:String
        isEmailIdPrivate:Boolean
        mobileNumber:String
        isMobileNumberPrivate:Boolean
        linkedinUrl:String
        isLinkedinUrlPrivate:Boolean
        facebookUrl:String
        isFacebookUrlPrivate:Boolean
        investmentBudget:Investmentbudget,
        profilePic: String
    }
    
    type FunderPortfolio{
        portfolioDetailsId  : String,
        funderAbout         : FunderAbout,
        investments         : [Investments],
        principal           : [Principal],
        team                : [Team],
        areaOfInterest      : [AreaOfInterest],
        successStories      : [SuccessStories]
        services            : Services
    }
  
    input successStories{
        date:String,
        isDatePrivate : Boolean
        storyImage:String,
        storyTitle:String,
        isStoryTitlePrivate:Boolean,
        description:String,
        isDescPrivate:Boolean,
        isPrivate:Boolean,
        isActive:Boolean
        index: Int
    }

    input areaOfInterest{
        industryTypeId:String,
        industryTypeName :String
        domainType:String,
        makePrivate:Boolean,
        isActive:Boolean
        subDomainId : String
        subDomainName :String
        index: Int
    }

    input socialLinks{
        socialLinkType:String,
        userId:String,
        isUserIdPrivate:Boolean
    }
    
    input team{
        title:String,
        firstName:String,
        isFirstNamePrivate:Boolean,
        lastName:String,
        isLastNamePrivate:Boolean,
        designation:String,
        isDesignationPrivate:Boolean,
        companyName:String,
        duration:String,
        isDurationPrivate:Boolean,
        yearsOfExperience:String,
        isYearsOfExperiencePrivate:Boolean,
        qualification:String,
        isQualificationPrivate:Boolean,
        aboutTeam:String,
        isAboutTeamPrivate:Boolean,
        socialLinks:[socialLinks],
        index: Int
    }

    input principal{
        title:String,
        firstName:String,
        isFirstNamePrivate:Boolean,
        lastName:String,
        isLastNamePrivate:Boolean,
        designation:String,
        isDesignationPrivate:Boolean,
        companyName:String,
        duration:String,
        isDurationPrivate:Boolean,
        yearsOfExperience:String,
        isYearsOfExperiencePrivate:Boolean,
        qualification:String,
        isQualificationPrivate:Boolean,
        aboutPrincipal:String,
        isAboutPrincipalPrivate:Boolean,
        socialLinks:[socialLinks],
        index:Int
    }

    input investments{
        dateOfInvestment:String,
        isDateOfInvestmentPrivate :Boolean
        companyName:String,
        isCompanyNamePrivate:Boolean,
        typeOfFundingId:String,
        typeOfFundingName : String,
        isTypeOfFundingPrivate:Boolean,
        aboutInvestment:String,
        isAboutInvestmentPrivate:Boolean,
        isPrivate:Boolean,
        investmentAmount :String,
        isInvestmentAmountPrivate :Boolean
        index: Int
    }
    
    input investmentbudget{
        from:String
        isFromPrivate:Boolean
        to:String
        isToPrivate:Boolean
    }
    input funderAbout{
        firstName : String,
        isFirstNamePrivate:Boolean,
        lastName:String
        isLastNamePrivate:Boolean
        gender:String
        isGenderPrivate:Boolean
        category:String
        isCategoryPrivate:Boolean
        qualification:String
        isQualificationPrivate:Boolean
        employmentStatus:String
        isEmploymentStatusPrivate:Boolean
        professionalTag:String
        isProfessionalTagPrivate:Boolean
        yearsOfExperience:String
        isYearsOfExperiencePrivate:Boolean
        industry:String
        isIndustryPrivate:Boolean
        profession:String
        isProfessionPrivate:Boolean
        investmentFrom:String
        investmentCount:String
        isInvestmentCountPrivate:Boolean
        emailId:String
        isEmailIdPrivate:Boolean
        mobileNumber:String
        isMobileNumberPrivate:Boolean
        linkedinUrl:String
        isLinkedinUrlPrivate:Boolean
        facebookUrl:String
        isFacebookUrlPrivate:Boolean
        investmentBudget:investmentbudget
        profilePic: String
    }
    
    
    input duration{
        hours: String
        minutes: String
    }
    
    input attachments {
        documentName: String
        images: [String]
    }
    
    input services{
        dateOfService:String
        isDateOfServicePrivate :Boolean
        industryType:[String]
        conversationType:[String]
        about:String
        expectedInput : String
        expectedOutput:String
        mode:Boolean
        session:String
        duration:duration
        attachments :[attachments]
        isPrivate :Boolean
        index: Int
  }
    
    input funderPortfolio{
        portfolioDetailsId  : String,
        funderAbout         : funderAbout,
        investments         : [investments],
        principal           : [principal],
        team                : [team],
        areaOfInterest      : [areaOfInterest],
        successStories      : [successStories]
        services            : services
    }
    
    type Query{
        fetchFunderAbout(portfoliodetailsId:String!):FunderAbout
        fetchfunderPortfolioInvestor(portfoliodetailsId:String!):[Investments]
        fetchFunderPrincipal(portfoliodetailsId:String!):[Principal]
        fetchFunderTeam(portfoliodetailsId:String!):[Team]
        fetchFunderAreaOfInterest(portfoliodetailsId:String!):[AreaOfInterest]
        fetchFunderSuccessStories(portfoliodetailsId:String!):[SuccessStories]
        fetchPortfolioClusterId(portfoliodetailsId:String):Portfoliodetails
        fetchfunderPortfolioService(portfoliodetailsId:String!):Services
    }
    
    type Mutation{
        createFunderPortfolio(portfolio:funderPortfolio):response
        updateFunderPortfolio(portfoliodetailsId:String, portfolio:funderPortfolio, indexArray:[String]):response
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], FunderPortfolioSchema]);

let supportedApi = [
  {api:'fetchFunderAbout', actionName:'READ', moduleName:"PORTFOLIO"},
  {api:'fetchfunderPortfolioInvestor', actionName:'READ', moduleName:"PORTFOLIO"},
  {api:'fetchFunderPrincipal', actionName:'READ', moduleName:"PORTFOLIO"},
  {api:'fetchFunderTeam', actionName:'READ', moduleName:"PORTFOLIO"},
  {api:'fetchFunderAreaOfInterest', actionName:'READ', moduleName:"PORTFOLIO"},
  {api:'fetchFunderSuccessStories', actionName:'READ', moduleName:"PORTFOLIO"},
  {api: 'fetchfunderPortfolioService',actionName:'READ', moduleName:"PORTFOLIO" },

  {api:'createFunderPortfolio', actionName:'CREATE', moduleName:"PORTFOLIO"},
  {api:'updateFunderPortfolio', actionName:'UPDATE', moduleName:"PORTFOLIO"},
  {api:'fetchPortfolioClusterId', actionName:'READ', moduleName:"PORTFOLIO"},

]
MlResolver.MlModuleResolver.push(supportedApi)
