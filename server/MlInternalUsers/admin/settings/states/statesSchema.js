import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let States = `       
    type MlStates 
    {     
        _id         : String
        name        : String
        countryId   : String
        countryCode : String
        isActive    : Boolean
    }
    
    input stateObject{
        name        : String
        countryId   : String
        countryCode : String
        isActive    : Boolean
    }
    
    type Query {
        fetchStates(countryId: String!): [MlStates]      
    }
    
    type Mutation{
        updateState(stateId: String!, state:stateObject!): String
    }
`
MlSchemaDef['schema']=mergeStrings([MlSchemaDef['schema'],States]);
