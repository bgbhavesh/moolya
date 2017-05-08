/**
 * Created by venkatasrinag on 6/4/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../commons/mlSchemaDef';


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
    }
   
    input portfolio{
        ideatorPortfolio:ideatorPortfolio,
        startupPortfolio:startupPortfolio,
        funderPortfolio:funderPortfolio
    }
    
    type Query{
          fetchPortfolioDetails(portfolioId:String):Portfoliodetails
    }
    
    type Mutation{
          createPortfolioRequest(portfoliodetails:portfoliodetails):response
          updatePortfolio(portfoliodetailsId:String, portfolio:portfolio):response
    }
`
MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], portfolioSchema]);
