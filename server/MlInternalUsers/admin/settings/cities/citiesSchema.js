import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let citiesSchema = `       
    type Cities
    {     
        _id         : String,
        name        : String,
        stateId     : String,
        countryId   : String,
        countryCode : String,
        displayName : String,
        about       : String,
        isActive    : Boolean
    }
    
    input cityObject{
        id         : String,
        name        : String,
        stateId     : String,
        countryId   : String,
        countryCode : String,
        displayName : String,
        about       : String,
        isActive    : Boolean
    }
    
    type Query {
        fetchCities: SearchResp
        fetchCity(cityId: String): Cities
        fetchCities:[Cities]
        fetchCitiesPerState(stateId: String):[Cities]
    }
    
    type Mutation {
        updateCity(cityId: String, city:cityObject, moduleName:String, actionName:String):response      
    }
`

MlSchemaDef['schema']=mergeStrings([MlSchemaDef['schema'], citiesSchema]);
