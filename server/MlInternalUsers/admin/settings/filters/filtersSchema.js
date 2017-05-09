/**
 * Created by muralidhar on 14/02/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../../commons/mlSchemaDef'
let Filters = `    

    type filterFieldOutput{
      fieldName : String
      displayName : String
      isActive : Boolean
      isDynamic:Boolean
      isRestrictedFilter : Boolean
      fieldType : String
      fieldResolverName:String
      fieldList : [String]
    }
    
    type clusterFieldOutput{
       cluster : String
       chapter : String
       subChapter : String
       department : String
       subDepartment : String
       role : String
    } 
    
    type Filters{
        _id:String
       filterName:String
       filterDescription:String
       isActive:Boolean
       clusterFields : [clusterFieldOutput]
       moduleName:String
       filterFields:[filterFieldOutput]
    }
    
    input filterField{
      fieldName : String
      displayName : String
      isActive : Boolean
      isDynamic:Boolean
      isRestrictedFilter : Boolean
      fieldType : String
      fieldResolverName : String
      fieldList : [String]
    }
    
    type FiltersDropData{
          label:String,
          value:String
    }
      
    input clusterField{
       cluster : String
       chapter : String
       subChapter : String
       department : String
       subDepartment : String
       role : String
    }
    
    input filter{
       filterName:String
       filterDescription:String
       isActive:Boolean
       clusterFields : [clusterField]
       moduleName:String
       filterFields:[filterField]
    }
    
    type GenericFilter {
         fieldName: String,
         value: String,
         fieldType:String,
         operator:String
    }
    
    type Mutation{
        CreateFilter(filterObject:filter):response
    }
    
    type Query{
        findFilters:[Filters]
        fetchModuleFilters(moduleName:String) : [Filters]
        fetchFilterListDropDown(moduleName:String!):[FiltersDropData]
      fetchSelectedFilterListDropDown(moduleName:String!,list:[String],filteredListId : [GenericFilter]):[FiltersDropData]
        fetchSelectedFilterData(id:String) : Filters
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],Filters]);
