/**
 * Created by muralidhar on 14/02/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../../commons/mlSchemaDef'
let Filters = `    
    input assignFilter 
    {
    cluster : String
    chapter : String
    subChapter : String
    department : String
    subDepartment : String
    role : String
    }
    
    input filterField{
    fieldName : String
    displayName : String
    isActive : Boolean
    isRestrictedFilter : Boolean
    fieldType : String
    }
    
    input filter{
       filterName:String
       aboutFilter:String
       isActive:String
       assignFilters:[assignFilter]
       transactionType:String
       filterFields:[filterField]
    }
    
    type Mutation{
        CreateFilter(filterObject:filter):String
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],Filters]);
