import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let HierarchySchema = `
    type Hierarchy
    {
      _id                 : String
      level               : String
      module              : String
      role                : String
    } 
    type DepartmentAndSubDepartmentDetails{
      departmentId        : String
      departmentName      : String
      subDepartmentId     : String
      subDepartmentName   : String
      isMoolya            : Boolean
      isActive            : Boolean
    }    
    input FinalApprovalInput{
      parentDepartment    : String
      parentSubDepartment : String
      department          : String
      subDepartment       : String
      role                : String
      clusterId           : String
    }
    type FinalApproval{
      parentDepartment    : String
      parentSubDepartment : String
      department          : String
      subDepartment       : String
      role                : String
      clusterId           : String
    }
    type Query{
        fetchMoolyaBasedDepartmentAndSubDepartment(clusterId:String):[DepartmentAndSubDepartmentDetails]
        fetchNonMoolyaBasedDepartmentAndSubDepartment(subChapterId:String):[Department]
        fetchRolesForDepartment(departmentId:String,clusterId:String):[Roles]
        fetchRolesForHierarchy(departmentId:String, clusterId:String, chapterId:String, subChapterId:String, communityId:String,levelCode:String): [Roles]
        fetchRolesForFinalApprovalHierarchy(departmentId:String): [Roles]
    }
    type Mutation{
        updateHierarchyRoles(roles:[roleObject]):response
        updateFinalApprovalRoles(finalRole:FinalApprovalInput):response
    }
`
MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],HierarchySchema]);
