/**
 * Created by venkatasrinag on 3/4/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../commons/mlSchemaDef';

let ideatorPortfolioSchema = ` 
    
    type Ideator{
        
        portfolioId:String,
        ideaTitle:String,
        chapterName:String,
        userId:String
        name:String
    }
    
    input idea{
        title:String,
        isIdeaTitlePrivate:Boolean,
        description:String,
        isIdeaPrivate:Boolean,
        isActive:Boolean
    }
    
    type Query{
        fetchIdeators:[Ideator]
    }
    
    type Mutation{
       
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], ideatorPortfolioSchema]);
