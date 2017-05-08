/**
 * Created by venkatsrinag on 24/4/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../../commons/mlSchemaDef';

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
    }
    
    type AreaOfInterest{
        industryTypeId:String,
        industryTypeName :String
        domainType:String,
        makePrivate:Boolean,
        isActive:Boolean
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
        index: Int
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
        index:Int
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
        investmentForm:String
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
        investmentBudget:Investmentbudget
    }
    
    type FunderPortfolio{
        portfolioDetailsId  : String,
        funderAbout         : FunderAbout,
        investments         : [Investments],
        principal           : [Principal],
        team                : [Team],
        areaOfInterest      : [AreaOfInterest],
        successStories      : [SuccessStories]
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
        investmentForm:String
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
    }
    
    input funderPortfolio{
        portfolioDetailsId  : String,
        funderAbout         : funderAbout,
        investments         : [investments],
        principal           : [principal],
        team                : [team],
        areaOfInterest      : [areaOfInterest],
        successStories      : [successStories]
    }
    
    type Query{
        fetchFunderAbout(portfoliodetailsId:String!):FunderAbout
        fetchfunderPortfolioInvestor(portfoliodetailsId:String!):[Investments]
        fetchFunderPrincipal(portfoliodetailsId:String!):[Principal]
        fetchFunderTeam(portfoliodetailsId:String!):[Team]
        fetchFunderAreaOfInterest(portfoliodetailsId:String!):[AreaOfInterest]
        fetchFunderSuccessStories(portfoliodetailsId:String!):[SuccessStories]
    }
    
    type Mutation{
        createFunderPortfolio(portfolio:funderPortfolio):response
        updateFunderPortfolio(portfoliodetailsId:String, portfolio:funderPortfolio, indexArray:[String]):response
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], FunderPortfolioSchema]);
