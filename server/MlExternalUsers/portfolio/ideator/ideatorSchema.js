/**
 * Created by venkatasrinag on 3/4/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../commons/mlSchemaDef';

let ideatorPortfolioSchema = ` 
    
    type Ideator{
        ideas:[ideasOutput],
        accountType:String
        chapterName:String,
        userId:String
        name:String
    }
    type ideasOutput{
        _id:String,
        title:String,
        isIdeaTitlePrivate:Boolean,
        description:String,
        isIdeaPrivate:Boolean,
        isActive:Boolean
        portfolioId:String,
        userId:String
    }
    
    
    type Query{
        fetchIdeators:[Ideator]
        fetchIdeaByPortfolioId(portfolioId:String):ideasOutput
    }
    
    type Mutation{
       
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], ideatorPortfolioSchema]);
