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
        id          : String
        name        : String
        countryId   : String
        countryCode : String
        displayName : String
        about       : String
        isActive    : Boolean
    }
    
    type Query {
        fetchStates: SearchResp  
        fetchState(stateId: String): States
        FetchActiveStates(countryId: String):[States]
    }
    
    type Mutation{
        updateState(stateId: String, state:stateObject , moduleName:String, actionName:String):response
    }
`
MlSchemaDef['schema']=mergeStrings([MlSchemaDef['schema'],States]);
