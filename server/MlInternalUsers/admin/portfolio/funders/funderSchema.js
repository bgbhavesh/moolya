/**
 * Created by venkatsrinag on 24/4/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../../commons/mlSchemaDef';

let FunderPortfolioSchema = `

    type SuccessStories{
          date:String,
          storyImage:String,
          storyTitle:String,
          isStoryTitlePrivate:Boolean,
          description:String,
          isDescPrivate:Boolean,
          makePrivate:Boolean,
          isActive:Boolean
    }
    
    type AreaofInterest{
        industryType:String,
        domainType:String,
        makePrivate:Boolean,
        isActive:Boolean
    }
    
    type SocialLinks{
        socialLinkType:String,
        userId:String,
        isuserIdPrivate:Boolean
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
        isyearsOfExperiencePrivate:Boolean,
        qualification:String,
        isQualificationPrivate:Boolean,
        aboutTeam:String,
        isAboutTeamPrivate:Boolean,
        socialLinks:[SocialLinks]
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
        isyearsOfExperiencePrivate:Boolean,
        qualification:String,
        isQualificationPrivate:Boolean,
        aboutPrincipal:String,
        isAboutPrincipalPrivate:Boolean,
        socialLinks:[SocialLinks]
    }
    
    type Investments{
        dateOfInvestment:String,
        companyName:String,
        isCompanyNamePrivate:Boolean,
        typeOfFunding:String,
        istypeOfFundingPrivate:Boolean,
        aboutInvestment:String,
        isaboutInvestmentPrivate:Boolean,
        isPivate:Boolean
    }
    
    type Investmentbudget{
        from:String
        isFromPrivate:Boolean
        to:String
        isToPrivate:Boolean
    }
    type FunderAbout{
        firstName : String,
        isfirstNamePrivate:Boolean,
        lastName:String
        islastNamePrivate:Boolean
        gender:String
        isgenderPrivate:Boolean
        category:String
        iscategoryPrivate:Boolean
        qualification:String
        isqualificationPrivate:Boolean
        employmentStatus:String
        isemploymentStatusPrivate:Boolean
        professionalTag:String
        isprofessionalTagPrivate:Boolean
        yearsOfExperience:String
        isyearsOfExperiencePrivate:Boolean
        industry:String
        isindustryPrivate:Boolean
        profession:String
        isprofessionPrivate:Boolean
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
        funderAbout         : [FunderAbout],
        investments         : [Investments],
        principal           : [Principal],
        team                : [Team],
        areaofInterest      : [AreaofInterest],
        successStories      : [SuccessStories]
    }
  
    input successStories{
        date:String,
        storyImage:String,
        storyTitle:String,
        isStoryTitlePrivate:Boolean,
        description:String,
        isDescPrivate:Boolean,
        makePrivate:Boolean,
        isActive:Boolean
    }

    input areaofInterest{
        industryType:String,
        domainType:String,
        makePrivate:Boolean,
        isActive:Boolean
    }

    input socialLinks{
        socialLinkType:String,
        userId:String,
        isuserIdPrivate:Boolean
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
        isyearsOfExperiencePrivate:Boolean,
        qualification:String,
        isQualificationPrivate:Boolean,
        aboutTeam:String,
        isAboutTeamPrivate:Boolean,
        socialLinks:[socialLinks]
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
        isyearsOfExperiencePrivate:Boolean,
        qualification:String,
        isQualificationPrivate:Boolean,
        aboutPrincipal:String,
        isAboutPrincipalPrivate:Boolean,
        socialLinks:[socialLinks]
    }

    input investments{
        dateOfInvestment:String,
        companyName:String,
        isCompanyNamePrivate:Boolean,
        typeOfFunding:String,
        istypeOfFundingPrivate:Boolean,
        aboutInvestment:String,
        isaboutInvestmentPrivate:Boolean,
        isPivate:Boolean
    }
    
    input investmentbudget{
        from:String
        isFromPrivate:Boolean
        to:String
        isToPrivate:Boolean
    }
    input funderAbout{
        firstName : String,
        isfirstNamePrivate:Boolean,
        lastName:String
        islastNamePrivate:Boolean
        gender:String
        isgenderPrivate:Boolean
        category:String
        iscategoryPrivate:Boolean
        qualification:String
        isqualificationPrivate:Boolean
        employmentStatus:String
        isemploymentStatusPrivate:Boolean
        professionalTag:String
        isprofessionalTagPrivate:Boolean
        yearsOfExperience:String
        isyearsOfExperiencePrivate:Boolean
        industry:String
        isindustryPrivate:Boolean
        profession:String
        isprofessionPrivate:Boolean
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
        funderAbout         : [funderAbout],
        investments         : [investments],
        principal           : [principal],
        team                : [team],
        areaofInterest      : [areaofInterest],
        successStories      : [successStories]
    }
    
    type Query{
        fetchFunderAbout(portfoliodetailsId:String!):FunderAbout
        fetchFunderInvestments(portfoliodetailsId:String!):Investments
        fetchFunderPrincipal(portfoliodetailsId:String!):Principal
        fetchFunderTeam(portfoliodetailsId:String!):Team
        fetchFunderAreaofInterest(portfoliodetailsId:String!):Team
        fetchFunderSuccessStories(portfoliodetailsId:String!):SuccessStories
    }
    
    type Mutation{
        createFunderPortfolio(portfolio:funderPortfolio):response
        updateFunderPortfolio(portfoliodetailsId:String, portfolio:funderPortfolio, indexArray:[String]):response
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], FunderPortfolioSchema]);
