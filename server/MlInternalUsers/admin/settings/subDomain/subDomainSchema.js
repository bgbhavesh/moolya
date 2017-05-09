import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../../commons/mlSchemaDef'


let SubDomainSchema = `
    type SubDomain
    {
        _id:String,
        name:String,
        displayName :String,
        about: String,
        industryId:String,
        isActive:Boolean
    }
    
    input SubDomainMasterData
    {
        name :String,
        displayName :String,
        about: String,
        industryId:String,
        isActive:Boolean
    }
    
    type Mutation 
    {
        createSubDomain(SubDomainMasterData:SubDomainMasterData, moduleName:String, actionName:String):response
        updateSelectedSubDomain(SubDomainId:String, SubDomainMasterData:SubDomainMasterData):response
    }
    type Query{
        findSubDomain(SubDomainId:String): SubDomain
        fetchSubDomains:[SubDomain]
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], SubDomainSchema]);


