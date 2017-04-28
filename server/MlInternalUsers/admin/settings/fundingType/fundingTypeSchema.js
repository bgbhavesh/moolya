/**
 * Created by rajatshekhar on 27/4/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../../commons/mlSchemaDef'


let FundingTypesSchema = `
    type FundingType
    {
        _id:String,
        fundingTypeName:String,
        displayName :String,
        about: String,
        icon:String,
        isActive:Boolean
    }
    
    input fundingTypeInput
    {
        fundingTypeName :String,
        displayName :String,
        about: String,
        icon:String,
        isActive:Boolean
    }
    
    type Mutation 
    {
        createFundingType(fundingType:fundingTypeInput, moduleName:String, actionName:String):response
        updateFundingType(fundingTypeId:String, fundingType:fundingTypeInput):response
    }
    type Query{
        fetchFundingType(fundingTypeId:String): FundingType
        fetchFundingTypes:[FundingType]
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], FundingTypesSchema]);


