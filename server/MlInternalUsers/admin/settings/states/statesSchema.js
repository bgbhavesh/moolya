import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../../commons/mlSchemaDef'
let States = `       
    type States 
    {     
        _id         : String
        name        : String
        countryId   : String
        countryCode : String
        countryName : String
        displayName : String
        about       : String
        isActive    : Boolean
    }
    
    input stateObject{
        id          : String
        name        : String
        countryId   : String
        countryName : String
        countryCode : String
        displayName : String
        about       : String
        isActive    : Boolean
    }
    
    type Query {
        fetchState(stateId: String): States
        FetchActiveStates:[States]
        fetchStatesPerCountry(countryId: String):[States]
        FetchActiveStatesForCluster(clusters:[String]):[States]
    }
    
    type Mutation{
        updateState(stateId: String, state:stateObject , moduleName:String, actionName:String):response
    }
`
MlSchemaDef['schema']=mergeStrings([MlSchemaDef['schema'],States]);
