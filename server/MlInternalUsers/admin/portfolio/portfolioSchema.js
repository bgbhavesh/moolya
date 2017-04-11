/**
 * Created by venkatasrinag on 6/4/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../mlAdminSchemaDef';


let portfolioSchema = `
    type Portfoliodetails{
        _id:String,
        transcationType:String,
        portfolioUserName:String,
        userId:String,
        userType:String,
        contactNumber:Int,
        communityType:String,
        communityCode:String,
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
      input portfoliodetails{
        _id:String,
        transcationType:String,
        portfolioUserName:String,
        userId:String,
        userType:String,
        contactNumber:Int,
        communityType:String,
        communityCode:String,
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
    
    type Query{
          fetchPortfolioDetails(portfolioId:String):Portfoliodetails
    }
    
    type Mutation{
          createPortfolioRequest(portfoliodetails:portfoliodetails):response
          updatePortfolio(portfoliodetailsId:String, ideatorPortfolio:ideatorPortfolio):response
    }
`
MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], portfolioSchema]);
