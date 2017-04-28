/**
 * Created by venkatsrinag on 24/4/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../../commons/mlSchemaDef';

let FunderPortfolioSchema = `
  
    input funderPortfolio{
        portfolioDetailsId  : String
    }
    
    type Query{
    }
    
    type Mutation{
        createFunderPortfolio(portfolio:funderPortfolio):response
        updateFunderPortfolio(portfoliodetailsId:String, portfolio:funderPortfolio, indexArray:[String]):response
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], FunderPortfolioSchema]);
