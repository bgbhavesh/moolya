/**
 * Created by venkatasrinag on 6/4/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../admin/mlAdminSchemaDef';


let portfolioSchema = `
    type Portfoliodetails{
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
    
    type Query{
          fetchPortfolioDetails(portfolioId:String):Portfoliodetails
    }
`
