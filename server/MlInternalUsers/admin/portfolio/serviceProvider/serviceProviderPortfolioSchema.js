/**
 * Created by vishwadeep on 10/7/17.
 */
import {mergeStrings} from "gql-merge";
import MlSchemaDef from "../../../../commons/mlSchemaDef";
import MlResolver from "../../../../commons/mlResolverDef";

let serviceProviderPortfolioSchema = `
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
    
    type portfolioMenu {
      name: String
      id:String
      menu:[PortfolioMenu]
    }
    
    type imagesTypeSchema{
        fileUrl   : String,
        fileName  : String
    } 
    
    type clientsOutput{
        companyName:String,
        isCompanyNamePrivate:Boolean,
        logo:imagesTypeSchema,
        clientDescription:String,
        isClientDescriptionPrivate:Boolean,
        isPrivate :Boolean,
        index:Int
    }
    
    type servicesOutput{
      servicesDescription : String
      isServicesPrivate   : Boolean
    }
    
    type imageFilesInputSchemaOutput{
       fileUrl: String,
       fileName:String
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
        isPrivate:Boolean,
        index: Int
    }

    type membershipsOutput{
        membershipDescription : String, 
        isMembershipPrivate   : Boolean
    }
    
    type compliancesOutput{
       compliancesDescription:String, 
       isCompliancesPrivate :Boolean
    }
    
    type licensesOutput{
       licensesDescription : String, 
       isLicensesPrivate   : Boolean
    }
    
    input logo{
      fileName : String,
      fileUrl:String
    }
  
    input clients{
        companyName:String,
        isCompanyNamePrivate :Boolean,
        logo :logo,
        clientDescription :String,
        isClientDescriptionPrivate :Boolean,
        isPrivate:Boolean,
        index:Int
    }
  
    input services{
        servicesDescription : String
        isServicesPrivate   : Boolean
    }
    
    input imageFilesInputSchema{
       fileUrl: String,
       fileName:String
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
      awardDescription:String
      isAwardDescriptionPrivate:Boolean
      isPrivate:Boolean
      logo : logo,
      index: Int
    }

    input memberships{
      membershipDescription : String, 
      isMembershipPrivate   : Boolean
    }
    
    input compliances{
        compliancesDescription:String, 
        isCompliancesPrivate :Boolean
    }
    
    input licenses{
        licensesDescription : String, 
        isLicensesPrivate   : Boolean
    }

    input serviceProviderPortfolio{
        portfolioDetailsId  : String
        licenses            : licenses
        compliances         : compliances
        memberships         : memberships
        awardsRecognition   : [awardsRecognition]
        aboutUs             : aboutUs
        services            : services
        clients             : [clients]
    }
    
    type Query{
        fetchServiceProviderPortfolioAwards(portfoliodetailsId:String!) : [awardsRecognitionOutput]
        fetchServiceProviderPortfolioMemberships(portfoliodetailsId:String!) : membershipsOutput
        fetchServiceProviderPortfolioCompliances(portfoliodetailsId:String!) : compliancesOutput
        fetchServiceProviderPortfolioLicenses(portfoliodetailsId:String!) : licensesOutput
        fetchServiceProviderPortfolioClients(portfoliodetailsId:String!) : [clientsOutput]
        fetchServiceProviderPortfolioServices(portfoliodetailsId:String!) : servicesOutput
        fetchPortfolioMenu(image: String, link: String, communityType: String, templateName: String, id: String, isLink: Boolean, isMenu: Boolean): portfolioMenu
    }
    
    type Mutation{
        createServiceProviderPortfolio(portfolio:serviceProviderPortfolio):response
        updateServiceProviderPortfolio(portfoliodetailsId:String, portfolio:serviceProviderPortfolio):response
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], serviceProviderPortfolioSchema]);

let supportedApi = [
  {api: 'fetchServiceProviderPortfolioAwards', actionName: 'READ', moduleName: "PORTFOLIO"},
  {api: 'fetchServiceProviderPortfolioMemberships', actionName: 'READ', moduleName: "PORTFOLIO"},
  {api: 'fetchServiceProviderPortfolioCompliances', actionName: 'READ', moduleName: "PORTFOLIO"},
  {api: 'fetchServiceProviderPortfolioLicenses', actionName: 'READ', moduleName: "PORTFOLIO"},
  {api: 'fetchServiceProviderPortfolioClients', actionName: 'READ', moduleName: "PORTFOLIO"},
  {api: 'fetchServiceProviderPortfolioServices', actionName: 'READ', moduleName: "PORTFOLIO"},

  {api: 'createServiceProviderPortfolio', actionName: 'CREATE', moduleName: "PORTFOLIO"},
  {api: 'updateServiceProviderPortfolio', actionName: 'UPDATE', moduleName: "PORTFOLIO"},
  {api: 'fetchPortfolioMenu', actionName: 'READ', moduleName: "PORTFOLIO"},
]
MlResolver.MlModuleResolver.push(supportedApi)
