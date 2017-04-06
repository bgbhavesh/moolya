import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let HierarchySchema = `
    type Hierarchy
    {
      _id       : String
      level     : String
      module    : String
      role      : String
    } 
    type DepartmentAndSubDepartmentDetails{
      departmentId        : String
      departmentName      : String
      subDepartmentId     : String
      subDepartmentName   : String     
    }    
    type Query{
        fetchMoolyaBasedDepartmentAndSubDepartment(clusterId:String):[DepartmentAndSubDepartmentDetails]
        fetchNonMoolyaBasedDepartmentAndSubDepartment(subChapterId:String):[Department]
    }
`
MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],HierarchySchema]);
