import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let Role = `

  type AssignRoles{
      cluster:String,
      chapter:String,
      subChapter:String,
      department:String, 
      subDepartment:String, 
      isActive:Boolean
  }
  
  type Modules{
      moduleId:String,
      moduleName:String,
      validFrom:String,
      validTo:String,
      isActive:Boolean,
      actions : [Actions]
  }
  
  type Actions{
      actionId : String
  }

  type Roles{
        _id:String,
        roleName: String, 
        displayName:String, 
        roleType:String,
        subChapter:String,
        userType:String,
        about:String,
        departmentsList : [String],
        subdepartmentsList : [String],
        clustersList   : [String],
        chaptersList   : [String],
        subChapterList : [String],
        assignRoles:[AssignRoles],
        modules: [Modules],
        isActive:Boolean
  }
  
  scalar Date
  input assignroles{
      cluster:String,
      chapter:String,
      subChapter:String,
      department:String, 
      subDepartment:String, 
      isActive:Boolean
  }
  
  input permissions{
      actionId:String,
      validFrom:Date,
      validTo:Date,
      isActive:Boolean
  }
  
  input fieldRestrictions{
      fieldName:String,
      actionId:String
  }
  
  input actions{
      actionId : String
  }
  
  input modules{
      moduleId:String,
      actions : [actions],
      moduleName:String,
      validFrom:String,
      validTo:String,
      isActive:Boolean
  }
  
  input roleObject{
      roleName: String, 
      displayName:String, 
      roleType:String,
      userType:String,
      subChapter:String,
      about:String, 
      assignRoles:[assignroles],
      modules:[modules], 
      isActive:Boolean
  }
  
  type Query {
      fetchRole(roleName: String, roleValue: String, name: String): String
      fetchRolesByDepSubDep(departmentId:String, clusterId:String, chapterId:String, subChapterId:String, communityId:String): [Roles]
      findRole(id:String):Roles
      fetchActiveRoles: [Roles]
      fetchAllAssignedRoles(roleIds:[String]):[String]
      fetchRolesByDepSubDepTest(departmentId:String, clusterId:String, hierarchyLevel:String): [Roles]
  }
  
  type Mutation {
     createRole(role:roleObject, moduleName:String, actionName:String):response
     updateRole(id:String, role:roleObject, moduleName:String, actionName:String):response
  }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],Role]);

