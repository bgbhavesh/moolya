import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let HierarchyAssignmentSchema = `

    type HierarchyAssignment{
      _id                  : String
      parentDepartment    : String
      parentSubDepartment : String
      clusterId           : String
      subChapterId        : String
      isDefaultSubChapter  : Boolean
      teamStructureAssignment : [teamStructureAssignment]
      finalApproval         : finalApproval
    }
      
    input finalApprovalInput{      
      department          : String
      subDepartment       : String
      role                : String
      isChecked           : Boolean
    }
    
    type finalApproval{      
      department          : String
      subDepartment       : String
      role                : String
      isChecked           : Boolean      
    }
   
    input teamStructureAssignmentInput{
      roleId            : String
      roleName          : String
      displayName       : String
      roleType          : String
      isAssigned        : Boolean
      assignedLevel     : String
      levelCode         : String
      reportingRole     : String
    }
  
    type teamStructureAssignment{
      roleId            : String
      roleName          : String
      displayName       : String
      roleType          : String
      isAssigned        : Boolean
      assignedLevel     : String
      levelCode         : String
      reportingRole     : String
    }
    
    input HierarchyAssignmentInput{
      id                  : String
      parentDepartment    : String
      parentSubDepartment : String
      clusterId           : String
      subChapterId        : String
      isDefaultSubChapter  : Boolean
      teamStructureAssignment : [teamStructureAssignmentInput]
      finalApproval         : finalApprovalInput
    }
    type Query{
      fetchAssignedRolesHierarchy(hierarchyId:String,departmentId:String,subDepartmentId:String,type:String):HierarchyAssignment      
      fetchFinalApprovalRole(departmentId:String,subDepartmentId:String,clusterId:String):HierarchyAssignment
    }
    type Mutation {
      updateHierarchyAssignment(hierarchy:HierarchyAssignmentInput):response
    }
`
MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],HierarchyAssignmentSchema]);
