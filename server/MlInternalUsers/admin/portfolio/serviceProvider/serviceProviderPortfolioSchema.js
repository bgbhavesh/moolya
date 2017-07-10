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
      privateFields:[PrivateKeys]
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
        awardDescription:String
        isAwardDescriptionPrivate:Boolean
        logo:imagesTypeSchema,
        isPrivate:Boolean,
        index: Int
        privateFields:[PrivateKeys]
    }

    type membershipsOutput{
        membershipDescription : String, 
        isMembershipPrivate   : Boolean,
        privateFields:[PrivateKeys]
    }
    
    type compliancesOutput{
       compliancesDescription:String, 
       isCompliancesPrivate :Boolean,
       privateFields:[PrivateKeys]
    }
    
    type licensesOutput{
       licensesDescription : String, 
       isLicensesPrivate   : Boolean,
       privateFields:[PrivateKeys]
    }
    
     type serviceProviderPortfolioDetails{
         _id                  : String
         userId               : String
         communityType        : String
         portfolioDetailsId   : String
         licenses             : licensesOutput
         compliances          : compliancesOutput
         memberships          : membershipsOutput
         awardsRecognition    : [awardsRecognitionOutput]
         clients              : [clientsOutput]
         services             : servicesOutput
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
        fetchServiceProviderDetails(portfoliodetailsId:String!, key:String!) : serviceProviderPortfolioDetails
        fetchPortfolioMenu(image: String, link: String, communityType: String, templateName: String, id: String, isLink: Boolean, isMenu: Boolean): portfolioMenu
    }
    
    type Mutation{
        createServiceProviderPortfolio(portfolio:serviceProviderPortfolio):response
        updateServiceProviderPortfolio(portfoliodetailsId:String, portfolio:serviceProviderPortfolio):response
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], serviceProviderPortfolioSchema]);

let supportedApi = [
  {api: 'fetchServiceProviderDetails', actionName: 'READ', moduleName: "PORTFOLIO"},
  {api: 'createServiceProviderPortfolio', actionName: 'CREATE', moduleName: "PORTFOLIO"},
  {api: 'updateServiceProviderPortfolio', actionName: 'UPDATE', moduleName: "PORTFOLIO"},
  {api: 'fetchPortfolioMenu', actionName: 'READ', moduleName: "PORTFOLIO"},
]
MlResolver.MlModuleResolver.push(supportedApi)
