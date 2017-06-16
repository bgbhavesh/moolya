/**
 * Created by venkatasrinag on 6/4/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../commons/mlSchemaDef';
import MlResolver from '../../../commons/mlResolverDef'

let portfolioSchema = `
    type Portfoliodetails{
        _id:String,
        transactionType:String,
        portfolioUserName:String,
        userId:String,
        userType:String,
        contactNumber:String,
        communityType:String,
        communityCode:String,
        clusterId:String,
        chapterId:String,
        subChapterId:String,
        accountType:String,
        source:String,
        createdBy:String,
        createdAt:String,
        status:String,
        assignedTo:String,
        progress:String,
        isPublic:Boolean,
        isGoLive:Boolean,
        isActive:Boolean,
        registrationId  : String,
        clusterName     : String,
        chapterName     : String,
        subChapterName  : String,
        communityName   : String
        identityType    : String,
        industryId      : String, 
        professionId    : String,
        portfolioId     : String
        transactionId   : String
        transactionCreatedDate : String
        transactionUpdatedDate : String
        allocation      : allocation
    }
      input portfoliodetails{
        _id:String,
        transactionType:String,
        portfolioUserName:String,
        userId:String,
        userType:String,
        contactNumber:String,
        communityType:String,
        communityCode:String,
        clusterId:String,
        chapterId:String,
        subChapterId:String,
        accountType:String,
        source:String,
        createdBy:String,
        status:String,
        assignedTo:String,
        progress:String,
        isPublic:Boolean,
        isGoLive:Boolean,
        isActive:Boolean,
        registrationId  : String,
        clusterName     : String,
        chapterName     : String,
        subChapterName  : String,
        communityName   : String
        identityType    : String,
        industryId      : String, 
        professionId    : String,
        portfolioId     : String
        transactionId   : String
        transactionCreatedDate : String
        transactionUpdatedDate : String
    }
   
    input portfolio{
        ideatorPortfolio:ideatorPortfolio,
        startupPortfolio:startupPortfolio,
        funderPortfolio:funderPortfolio
    }
    
    type Query{
          fetchPortfolioDetails(portfolioId:String):Portfoliodetails
          fetchPortfolioDetailsByUserId:Portfoliodetails
    }
    
    type Mutation{
          createPortfolioRequest(portfoliodetails:portfoliodetails):response
          updatePortfolio(portfoliodetailsId:String, portfolio:portfolio):response
          approvePortfolio(portfoliodetailsId:String):response
          rejectPortfolio(portfoliodetailsId:String):response
          requestForGoLive(portfoliodetailsId:String):response
    }
`
MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], portfolioSchema]);

let supportedApi = [
  {api:'fetchPortfolioDetailsByUserId', actionName:'READ', moduleName:"PORTFOLIO"},
  {api:'fetchPortfolioDetails', actionName:'READ', moduleName:"PORTFOLIO"},

  {api:'createPortfolioRequest', actionName:'CREATE', moduleName:"PORTFOLIO"},
  {api:'updatePortfolio', actionName:'UPDATE', moduleName:"PORTFOLIO"},
  {api:'approvePortfolio', actionName:'UPDATE', moduleName:"PORTFOLIO", isWhiteList:true},
  {api:'rejectPortfolio', actionName:'UPDATE', moduleName:"PORTFOLIO", isWhiteList:true},
  {api:'requestForGoLive', actionName:'UPDATE', moduleName:"PORTFOLIO"},
]
MlResolver.MlModuleResolver.push(supportedApi)
