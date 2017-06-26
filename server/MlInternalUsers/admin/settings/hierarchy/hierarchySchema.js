import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../../commons/mlSchemaDef'
import MlResolver from '../../../../commons/mlResolverDef'

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
        fetchNonMoolyaBasedDepartmentAndSubDepartments(clusterId:String,subChapterId:String):[DepartmentAndSubDepartmentDetails]
        fetchNonMoolyaBasedDepartmentAndSubDepartment(subChapterId:String):[Department]
        fetchRolesForDepartment(departmentId:String,subDepartmentId:String,clusterId:String):[Roles]
        fetchRolesForHierarchy(departmentId:String,subDepartmentId:String, clusterId:String, chapterId:String, subChapterId:String, communityId:String,levelCode:String,currentRoleId:String,roles:[teamStructureAssignmentInput]): [Roles]
        fetchRolesForFinalApprovalHierarchy(departmentId:String,subDepartmentId:String, clusterId:String): [teamStructureAssignment]
    }
    type Mutation{
        updateHierarchyRoles(roles:[roleObject]):response
        updateFinalApprovalRoles(finalRole:FinalApprovalInput):response
    }
`
MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],HierarchySchema]);
let supportedApi = [
  {api:'fetchMoolyaBasedDepartmentAndSubDepartment', actionName:'READ', moduleName:"HIERARCHY"},
  {api:'fetchNonMoolyaBasedDepartmentAndSubDepartment', actionName:'READ', moduleName:"HIERARCHY"},
  {api:'fetchRolesForDepartment', actionName:'READ', moduleName:"HIERARCHY"},
  {api:'fetchRolesForHierarchy', actionName:'READ', moduleName:"HIERARCHY"},
  {api:'fetchRolesForFinalApprovalHierarchy', actionName:'READ', moduleName:"HIERARCHY"},
  {api:'updateHierarchyRoles', actionName:'UPDATE', moduleName:"HIERARCHY"},
  {api:'updateFinalApprovalRoles', actionName:'UPDATE', moduleName:"HIERARCHY"}
]

MlResolver.MlModuleResolver.push(supportedApi)
