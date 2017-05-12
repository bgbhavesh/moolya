/**
 * Created by muralidhar on 14/02/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../../commons/mlSchemaDef'
let Filters = `    
        
    type fieldListSpecificsOutput{
      departmentId : String
      subDepartmentId : String
      roleId : [String]
      listValueId : [String]
    }
    
    type filterFieldOutput{
      fieldName : String
      displayName : String
      isActive : Boolean
      isDynamic:Boolean
      fieldType : String
      fieldResolverName:String
      isCustom:Boolean
      fieldList : [fieldListSpecificsOutput]
    }
    
    
    
    type Filters{
        _id:String
       filterName:String
       filterDescription:String
       isActive:Boolean
        moduleName:String
       filterFields:[filterFieldOutput]
    }
    
    input fieldListSpecifics{
      departmentId : String
      subDepartmentId : String
      roleId : [String]
      listValueId : [String]
    }
    input filterField{
      fieldName : String
      displayName : String
      isActive : Boolean
      isDynamic:Boolean
      fieldType : String
      fieldResolverName : String
      fieldList : [fieldListSpecifics]
      isCustom:Boolean
    }
    
    type FiltersDropData{
          label:String,
          value:String
    }
      
 
    
    input filter{
       filterName:String
       filterDescription:String
       isActive:Boolean
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
       updateFilter(filterId:String, filterObject: filter,moduleName:String, actionName:String):response
       
    }
    
    type Query{
        findFilters:[Filters]
        fetchModuleFilters(moduleName:String) : Filters
        fetchFilterListDropDown(moduleName:String!):[FiltersDropData]
        fetchSelectedFilterListDropDown(moduleName:String!,list:[fieldListSpecifics],filteredListId : [GenericFilter]):[FiltersDropData]
        fetchSelectedFilterData(id:String) : Filters
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],Filters]);
