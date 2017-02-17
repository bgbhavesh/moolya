import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let States = `       
    type States 
    {     
        _id         : String
        name        : String
        countryId   : String
        countryCode : String
        displayName : String
        about       : String
        isActive    : Boolean
    }
    
    input stateObject{
        name        : String
        countryId   : String
        countryCode : String
        displayName : String
        about       : String
        isActive    : Boolean
    }
    
    type Query {
        fetchStates: SearchResp  
    }
    
    type Mutation{
        updateState(stateId: String, state:stateObject): String
    }
`
MlSchemaDef['schema']=mergeStrings([MlSchemaDef['schema'],States]);
